var express = require("express");
var router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var configs = require("../configs");

const User = require("../models/User");
const SemesterCourse = require("../models/SemesterCourse");
const Course = require("../models/Course");
const Term = require("../models/Term");
const StudentCourse = require("../models/StudentCourse");

const Auth = require("../auth");
const sendEmail = require("../mail");

/* GET users listing. */

router.get("/",Auth.verifyToken,Auth.verifyRole(['admin']), async (req, res, next) => {
  try {
    const user = await User.find({}).populate("role");
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.patch("/:id",Auth.verifyToken,Auth.verifyRole(['admin','teacher','student']), async (req, res, next) => {
  try {
    
    if(req.params.id != req.JWT.user.id){
      throw new Error("You are not authorized to update this user")
    }

    const user = await User.findOne({ _id: req.params.id }).populate("role");

    if (req.body.password) {
      if(await bcrypt.compare(req.body.oldpassword, user.password)){
        const encryptedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = encryptedPassword;
      }else{
        throw new Error("Old password is incorrect");
      }

    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id",Auth.verifyToken,Auth.verifyRole(['admin']), async (req, res, next) => {
  try {

    const _user=await User.findOne({ _id: req.params.id })
    if(!_user){
      throw new Error("User does not exist")
    }

    const _user2=await User.findOne({ _id: req.params.id }).populate("role")
    if(_user2.role.desc_role=="admin"){
      throw new Error("You can't delete admin user")
    }

    const a = await SemesterCourse.findOne({ teacher: req.params.id });
    const b = await StudentCourse.findOne({ user: req.params.id });
    if (!a && !b) {
      await User.deleteOne({ _id: req.params.id });
      res.status(204).send();
    } else {
      if (a) {
        res
          .status(400)
          .send("This teacher still owns courses, you can't delete them.");
      }
      if (b) {
        //check if students have reviews
        res
          .status(400)
          .send(
            "This student is still enrolled in courses, you can't delete them."
          );
      }
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id/courses",Auth.verifyToken,Auth.verifyRole(['teacher']), async (req, res, next) => {
  try {
    const semcourse = await SemesterCourse.find({ teacher: req.params.id });

    let output = {};
    for (let i = 0; i < semcourse.length; i++) {
      if (output[semcourse[i].course] == undefined) {
        output[semcourse[i].course] = [semcourse[i].term];
      } else {
        output[semcourse[i].course].push(semcourse[i].term);
      }
    }

    let output2 = [];
    for (let key in output) {
      let course = await Course.find({ _id: key });
      let terms = [];

      for (let i = 0; i < output[key].length; i++) {
        const term = await Term.find({ _id: output[key][i] });
        terms.push(...term);
      }

      output2.push({
        id: course[0]._id,
        title: course[0].name_Course,
        description: course[0].description_Course,
        category: course[0].category,
        terms: terms,
      });
    }

    res.json(output2);
    //res.json(data.courseData2);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id/courses/current",Auth.verifyToken,Auth.verifyRole(['student']), async (req, res, next) => {
  //return current sem courses onlu. for student
  try {
    let currentTerm = -1;

    const term = await Term.find();
    for (let i = 0; i < term.length; i++) {
      if (term[i].startDate <= Date.now() && term[i].endDate >= Date.now()) {
        currentTerm = term[i]._id;
        break;
      }
    }

    if(currentTerm==-1){
      throw new Error("No current term")
    }

    const studentCourse = await StudentCourse.find({
      user: req.params.id,
      term: currentTerm,
    });

    let output = {};
    for (let i = 0; i < studentCourse.length; i++) {
      if (output[studentCourse[i].course] == undefined) {
        output[studentCourse[i].course] = [studentCourse[i].term];
      } else {
        output[studentCourse[i].course].push(studentCourse[i].term);
      }
    }

    let output2 = [];
    for (let key in output) {
      let course = await Course.find({ _id: key });
      let terms = [];

      for (let i = 0; i < output[key].length; i++) {
        const term = await Term.find({ _id: output[key][i] });
        terms.push(...term);
      }

      output2.push({
        id: course[0]._id,
        title: course[0].name_Course,
        description: course[0].description_Course,
        category: course[0].category,
        terms: terms,
      });
    }

    res.json(output2);
    //res.json(data.courseData2);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/",Auth.verifyToken,Auth.verifyRole(['admin']), async (req, res) => {
  try {
    const _user = await User.findOne({ email: req.body.email });
    if (_user) throw Error("email already exists");

    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const _beforehash=req.body.password;
    req.body.password = encryptedPassword;

    const user = new User(req.body);
    await user.save();

    const _user1 = await user.populate("role");

    const txt="Hi "+_user1.fname+" "+_user1.lname+",\n\n"+"Welcome to the course management system. Your account has been created.\n\n"+"Your account details are as follows:\n\n"+"Email: "+_user1.email+"\n\n"+"Password: "+_beforehash+"\n\n"+"Please change your password after logging in.\n\n"+"Thank you for using our system.\n\n"+"Regards,\n\n"+"Course Management System";
    await sendEmail(req.body.email, txt);

    res.json(_user1);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate("role");
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      throw Error("incorrect email or password");
    }

    const token = jwt.sign({ user }, configs.tokenKey, {
      expiresIn: "2h",
    });

    let resp = {
      id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      role: user.role.desc_role,
      jwt: token,
    };

    res.json(resp);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
