var express = require("express");
var router = express.Router();

const Chapter = require("../models/Chapter");

const SemesterChapter = require("../models/SemesterChapter");

const Auth = require("../auth");
const SemesterCourse = require("../models/SemesterCourse");

router.delete("/:id",Auth.verifyToken,Auth.verifyRole(['teacher']), async (req, res, next) => {
    try {
      let noReviews=false;
      const semesterchapters=await SemesterChapter.find({chapter: req.params.id});
      for (let index = 0; index < semesterchapters.length; index++) {
        const element = semesterchapters[index];
        if(element.nombre_de_Reviews != 0){
          noReviews=true;
          break;
        }
      }
      
      if(!noReviews){
        await Chapter.deleteOne({ _id: req.params.id });
        for (let index = 0; index < semesterchapters.length; index++) {
          const element = semesterchapters[index];
          await SemesterChapter.deleteOne({ _id: element._id });
        }
        res.status(204).json();
      }else{
        res.status(400).send("This chapter contains reviews, you can't delete it.");
      }
    } catch(error) {
      res.status(500).send(error.message);
    }
  });

  router.post("/",Auth.verifyToken,Auth.verifyRole(['teacher']), async (req, res) => {
    try {
      const chapter = new Chapter(req.body);
      await chapter.save();
      const chapterId=chapter._id;
      const courseId=chapter.course;

      const semestres= await SemesterCourse.find({course: courseId});

      for (let index = 0; index < semestres.length; index++) {
        const element = semestres[index];
        const sem=element._id;
        const semchap = new SemesterChapter({chapter: chapterId, semestercourse: sem, moyenne_Chapter: 0,nombre_de_Reviews:0})
        await semchap.save();
      }

      const _chapter1=await chapter.populate("course");
      res.json(_chapter1);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  module.exports = router;