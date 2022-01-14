var express = require("express");
var router = express.Router();

const Chapter = require("../models/Chapter");
const ChapterReview = require("../models/ChapterReview");
const StudentCourse = require("../models/StudentCourse");
const Auth = require("../auth");
const SemesterChapter = require("../models/SemesterChapter");
const SemesterCourse = require("../models/SemesterCourse");

async function updatecalcule(semesterchapter){
  const chapterreview = await ChapterReview.find({semesterchapter: semesterchapter});

  semesterchapter.nombre_de_Reviews=chapterreview.length;

  let s=0;
  for (let index = 0; index < chapterreview.length; index++) {
    const element = chapterreview[index];
    s=s+element.note_review;
  }
  semesterchapter.moyenne_Chapter=s/chapterreview.length;
  await semesterchapter.save();
}

  router.post("/:idchapter/:idterm/:idstudent",Auth.verifyToken,Auth.verifyRole(['student']), async (req, res) => {
    let idchapter = req.params.idchapter;
    
    try {
      if(req.params.idstudent != req.JWT.user.id){throw new Error("Unauthorized")}

      const _chapter1= await Chapter.findOne({_id:idchapter})
      let idcourse=_chapter1.course

      const student_course= await StudentCourse.findOne({user:req.params.idstudent,course:idcourse,term:req.params.idterm})

      const semestercourse = await SemesterCourse.findOne({course:idcourse,term:req.params.idterm})
      const semesterchapter = await SemesterChapter.findOne({chapter:idchapter,semestercourse:semestercourse})

      const obj={student_course:student_course._id,semesterchapter:semesterchapter,note_review:req.body.note_review,text_review:req.body.text_review}
      
      if(await ChapterReview.findOne({semesterchapter:semesterchapter,student_course:student_course._id})){
        throw new Error("You have already reviewed this chapter")
      }
      
      const chapterreview = new ChapterReview(obj);
      await chapterreview.save();

      await updatecalcule(semesterchapter);

      const chapterreview2=await StudentCourse.find(obj).populate(["course",'user','term'])
      res.json(chapterreview2);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  //------------------------


  module.exports = router;