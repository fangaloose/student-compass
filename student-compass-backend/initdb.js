var configs = require("./configs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const url = configs.mongoUrl;
const connect = mongoose.connect(url);

const Role = require("./models/Role");
const User = require("./models/User");
const Category = require("./models/Category");

connect.then(
  (db) => {
    console.log("Connected correctly to server");
    initDB()
    
  },
  (err) => {
    console.log(err);
  }
);

const initDB = async () => {

  //add ROLES

  const admin = new Role({
    _id: "6196ad25c1e37ade5bb00588",
    desc_role: "admin",
  });
  await admin.save();

  const teacher = new Role({
    _id: "6196ad32c1e37ade5bb0058c",
    desc_role: "teacher",
  });
  await teacher.save();

  const student = new Role({
    _id: "6196ad2ec1e37ade5bb0058a",
    desc_role: "student",
  });
  await student.save();

  //create admin account
  const encryptedPassword = await bcrypt.hash("admin", 10);

  const adminAccount = new User({
    fname: "admin",
    lname: "admin",
    email: "admin@admin.com",
    role: admin._id,
    password: encryptedPassword,
  });
  await adminAccount.save();

  //create categories
  const categories = [
    "Programming",
    "Mathematics",
    "Physics",
    "History",
    "Law",
    "Geography",
  ];
  for (const elm of categories) {
    const caterogy = new Category({ name: elm });
    await caterogy.save();
  }

  console.log("Init DB successfully");
};
