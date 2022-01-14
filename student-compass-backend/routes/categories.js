var express = require('express');
var router = express.Router();

const Category = require("../models/Category");
const Course = require('../models/Course');
const Auth = require("../auth");

/* GET category listing. */

router.get('/',Auth.verifyToken,Auth.verifyRole(['admin','teacher','student']), async (req, res, next) => {

  try {
    const _data = await Category.find({})
    res.json(_data)
  } catch (error) {
    res.status(500).send(error.message);
  }

});

router.post("/",Auth.verifyToken,Auth.verifyRole(['admin']), async (req, res) => {

  try {
    const category = new Category(req.body);
    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).send(error.message);
  }

});

router.patch("/:id",Auth.verifyToken,Auth.verifyRole(['admin']), async (req, res, next) => {
	try {
		const category = await Category.findOne({ _id: req.params.id })

		if (req.body.name) {
			category.name = req.body.name
		}

		await category.save()
		res.json(category)
	} catch (error){
		res.status(500).send(error.message);
	}
})

router.delete("/:id",Auth.verifyToken,Auth.verifyRole(['admin']), async (req, res, next) => {
  try {
    const hasCourse=await Course.findOne({category: req.params.id})
    if(!hasCourse){
      await Category.deleteOne({ _id: req.params.id });
      res.status(204).send();
    }else{
      res.status(400).send("This category still contains courses, you can't delete it.");
    }
  } catch(error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
