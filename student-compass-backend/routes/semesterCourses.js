var express = require("express");
var router = express.Router();

const SemesterCourse = require("../models/SemesterCourse");
const Auth = require("../auth");
const StudentCourse = require("../models/StudentCourse");
const Course = require("../models/Course");
const Chapter = require("../models/Chapter");
const SemesterChapter = require("../models/SemesterChapter");


  router.post("/",Auth.verifyToken,Auth.verifyRole(['teacher']), async (req, res) => {
    try {

      const _semcourse2= await SemesterCourse.findOne({course:req.body.course,term:req.body.term,teacher:req.body.teacher});
      if(_semcourse2){throw new Error("Course already exists");}
      const semcourse = new SemesterCourse({...req.body, nombre_etudiants:0});
      await semcourse.save();

      const semcourseid= semcourse._id;
      const chapters= await Chapter.find({course: req.body.course});


      for (let index = 0; index < chapters.length; index++) {
        const element = chapters[index];
        const semchap = new SemesterChapter({chapter: element._id, semestercourse: semcourseid, moyenne_Chapter: 0,nombre_de_Reviews:0})
        await semchap.save();
      }

      const _semcourse1=await semcourse.populate(["course","term","teacher"])
      res.json(_semcourse1);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  router.delete("/:courseID/:termID",Auth.verifyToken,Auth.verifyRole(['teacher']), async (req, res, next) => {
    try {
      const userin= await StudentCourse.findOne({course: req.params.courseID, term: req.params.termID});
      const onlysemester= await SemesterCourse.find({course: req.params.courseID});     

      if(userin==null && onlysemester.length>1){
        
        const semcourseId = await SemesterCourse.findOne({course: req.params.courseID, term: req.params.termID});
        await SemesterChapter.deleteMany({ semestercourse: semcourseId});
        await SemesterCourse.deleteOne({ course: req.params.courseID , term: req.params.termID });

        res.status(204).send();
      }else{
        res.status(400).send("This course still has students in it in that term, you can't delete it.");
      }
      
    } catch(error) {
      res.status(500).send(error.message);
    }
  });

  module.exports = router;