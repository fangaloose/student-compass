var express = require("express");
var router = express.Router();

const Chapter = require("../models/Chapter");
const ChapterReview = require("../models/ChapterReview");
const SemesterChapter = require("../models/SemesterChapter");

const Course = require("../models/Course");
const SemesterCourse = require("../models/SemesterCourse");
const StudentCourse = require("../models/StudentCourse");
const User = require("../models/User");
const Auth = require("../auth");

/* GET category listing. */

async function nbusers(id,termID){
  const nbre= await StudentCourse.find({course: id, term: termID});
  const semestercourse= await SemesterCourse.findOne({course:id, term:termID})
  semestercourse.nombre_etudiants=nbre.length;
  semestercourse.save();
}

router.patch("/:id",Auth.verifyToken,Auth.verifyRole(['teacher']), async (req, res, next) => {
  try {
    const course = await Course.findOne({ _id: req.params.id }).populate(
      "category"
    );

    if (req.body.category) {
      course.category = req.body.category;
    }

    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/",Auth.verifyToken,Auth.verifyRole(['teacher']), async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();

    const _course1 = await course.populate("category");
    res.json(_course1);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id/terms",Auth.verifyToken,Auth.verifyRole(['teacher']), async (req, res, next) => {
  try {
    const _terms = await SemesterCourse.find({
      course: req.params.id,
    }).populate("term");
    let termresponse = [];
    for (let index = 0; index < _terms.length; index++) {
      const element = _terms[index].term;
      termresponse.push(element);
    }
    res.json(termresponse);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//get users in course
router.get("/:id/:termID/users",Auth.verifyToken,Auth.verifyRole(['teacher']), async (req, res, next) => {
  try {
    const _users = await StudentCourse.find({
      course: req.params.id,
      term: req.params.termID,
    }).populate(["user"]);
    let userresponse = [];
    for (let index = 0; index < _users.length; index++) {
      const element = _users[index].user;
      const element2={"id": element._id,"fname": element.fname,"lname": element.lname,"email": element.email,"role": "student"}
      userresponse.push(element2);
    }
    res.json(userresponse);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//delete student from course
router.delete("/:id/:termID/:userID",Auth.verifyToken,Auth.verifyRole(['teacher']), async (req, res, next) => {
  try {
    const _reviews= await ChapterReview.find({}).populate("student_course");
    for (let index = 0; index < _reviews.length; index++) {
      const element = _reviews[index];
      if(element.student_course.user==req.params.userID && element.student_course.term==req.params.termID && element.student_course.course==req.params.id){
        throw Error("This student has reviews in this course, you can't delete him.")
      }
    }
    await StudentCourse.deleteOne({ course: req.params.id , term: req.params.termID, user: req.params.userID});
  
    await nbusers(req.params.id,req.params.termID);
    res.status(204).send();
    
  } catch(error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id",Auth.verifyToken,Auth.verifyRole(['teacher','student']), async (req, res, next) => {
  try {
    const _course = await Course.findOne({ _id: req.params.id });
    res.json(_course);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id/:termID/:studentID/chapters",Auth.verifyToken,Auth.verifyRole(['student']), async (req, res, next) => {
  try {

    let response=[]

    const _chapters = await Chapter.find({ course: req.params.id }).populate("course");

    const UserStudentCourse = await StudentCourse.findOne({user:req.params.studentID,course:req.params.id,term:req.params.termID});
    const _semcourse = await SemesterCourse.findOne({course:req.params.id,term:req.params.termID});

    for (let index = 0; index < _chapters.length; index++) {
      let isrev = false;

      
      const _semchap = await SemesterChapter.findOne({chapter:_chapters[index]._id,semestercourse:_semcourse});
      const UserChapterReview = await ChapterReview.findOne({student_course:UserStudentCourse._id,semesterchapter:_semchap});
      
      if(UserChapterReview){
        isrev=true
      }

      response.push({id:_chapters[index]._id,name:_chapters[index].name_Chapter,isReviewed:isrev})

    }
    res.json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id/:termID/reviews",Auth.verifyToken,Auth.verifyRole(['teacher']), async (req, res, next) => {
  try {
    let myresponse=[]
    const _chapters = await Chapter.find({ course: req.params.id });
    const _semcourse = await SemesterCourse.findOne({ course: req.params.id, term: req.params.termID });
    
    for (let i = 0; i < _chapters.length; i++) {

      let reviews = [];
      const _semchap = await SemesterChapter.findOne({chapter:_chapters[i]._id,semestercourse:_semcourse})
      const _reviews = await ChapterReview.find({ semesterchapter: _semchap._id });

      for (let j = 0; j < _reviews.length; j++) {
        const element = _reviews[j];
        reviews.push({
          id: element._id,
          note: element.note_review,
          text: element.text_review,
        });
      }
      

      myresponse.push({id:_chapters[i]._id,name:_chapters[i].name_Chapter,reviews:reviews,moyenne: _semchap.moyenne_Chapter,

        number_of_reviews:_semchap.nombre_de_Reviews})
    }

    res.json(myresponse);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//add users to course
router.post("/:id/:termID/users",Auth.verifyToken,Auth.verifyRole(['teacher']), async (req, res) => {
  try {
    let tmp=req.body.userArray.map((elm)=>({course:req.params.id,term:req.params.termID,user:elm}));

    let _users=[]

    for (let i = 0; i < tmp.length; i++) {
      const element = tmp[i];
      const hasStudent = await StudentCourse.findOne(element);
      if(!hasStudent){
        _users.push(element);
      }
    }

    let result=await StudentCourse.insertMany(_users);
    await nbusers(req.params.id,req.params.termID);
    res.json(result)
    
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//all the users not in the course
router.get("/:id/:termID/users/not",Auth.verifyToken,Auth.verifyRole(['teacher']), async (req, res, next) => {
  try {
    const _allstudents = await User.find({role: "6196ad2ec1e37ade5bb0058a"});
    


    let usersnot= []
    for (let index = 0; index < _allstudents.length; index++) {
      const element = _allstudents[index];
      const isincourse = await StudentCourse.find({user: element._id,course: req.params.id,term: req.params.termID});
      if( isincourse.length == 0){
        usersnot.push(element);
      }
    }
    res.json(usersnot);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


module.exports = router;
