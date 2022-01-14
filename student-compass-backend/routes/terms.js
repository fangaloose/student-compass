var express = require('express');
var router = express.Router();

const SemesterCourse = require('../models/SemesterCourse');
const Term = require('../models/Term');
const Auth = require("../auth");

/* GET terms listing. */

router.get("/",Auth.verifyToken,Auth.verifyRole(['admin','teacher']), async (req, res, next) => {
  try {
    const term = await Term.find({});
    res.json(term);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//get all terms not in course
router.get("/course/:id",Auth.verifyToken,Auth.verifyRole(['teacher']), async (req, res, next) => {
  try {
    const _allterms = await Term.find({});
    
    let termsnot= []
    for (let index = 0; index < _allterms.length; index++) {
      const element = _allterms[index];
      const isincourse = await SemesterCourse.find({course: req.params.id, term: element._id});
      if( isincourse.length == 0){
        termsnot.push(element);
      }
    }
    res.json(termsnot);
  } catch (error) {
    res.status(404).send(error.message);
  }
});


router.get('/current',Auth.verifyToken,Auth.verifyRole(['student']), async (req, res, next) => {

    try {
      let response=[];
      const term = await Term.find({});
      for(let i = 0; i < term.length; i++){
        if(term[i].startDate <= Date.now() && term[i].endDate >= Date.now()){
          response=[term[i]];
          break;
        }
      }

      res.json(response);

    } catch (error) {
      res.status(500).send(error.message);
    }
  
  });

  router.get("/:id",Auth.verifyToken,Auth.verifyRole(['teacher','student']), async (req, res, next) => {
    try {
      const term = await Term.find({_id: req.params.id});
      res.json(term);
    } catch (error) {
      res.status(404).send(error.message);
    }
  });

  router.patch("/:id",Auth.verifyToken,Auth.verifyRole(['admin']), async (req, res, next) => {
    try {
      const term = await Term.findOne({ _id: req.params.id });
  
      if (req.body.name) {
        term.name = req.body.name;
      }
      if (req.body.startDate) {
        term.startDate = req.body.startDate;
      }
      if (req.body.endDate) {
        term.endDate = req.body.endDate;
      }
  
      await term.save();
      res.json(term);
    } catch(error) {
      res.status(500).send(error.message);
    }
  });

  router.delete("/:id",Auth.verifyToken,Auth.verifyRole(['admin']), async (req, res, next) => {
    try {
      const exists=await SemesterCourse.findOne({term: req.params.id});
      if(!exists){
        await Term.deleteOne({ _id: req.params.id });
        res.status(204).json();
      }else{
        res.status(400).send("This term still contains courses, you can't delete it.");
      }
    } catch(error) {
      res.status(500).send(error.message);
    }
  });

  router.post("/",Auth.verifyToken,Auth.verifyRole(['admin']), async (req, res) => {
    try {
      const terms = await Term.find();
      for(let i = 0; i < terms.length; i++){
        //(StartA <= EndB) and (EndA >= StartB) implique overlap
        const StartA=new Date(terms[i].startDate);
        const EndA=new Date(terms[i].endDate);
        const StartB=new Date(req.body.startDate);
        const EndB=new Date(req.body.endDate);

        if(StartA<=EndB && EndA>=StartB){
          throw Error("Term overlap!")
        }
      }

      const term = new Term(req.body);
      await term.save();
      res.json(term);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

module.exports = router;
