const express = require("express");
const Student = require("../models/studentsModel");

//creating a new router
const router = express.Router();

//just checking the router'
router.get("/", (req, res) => {
  res.send(
    "This is a very simple example of rest api. Use'/students' to get all students."
  );
});

//creating a new student using async/await:
router.post("/students", async (req, res) => {
  try {
    console.log(req.body);
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (err) {
    res.status(404).send(err);
  }
});

//getting students data from database
router.get("/students", async (req, res) => {
  try {
    const users = await Student.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(404).send(err);
  }
});

//getting data of individual student using id from database
router.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const individualUser = await Student.findById(_id);
    if (!individualUser) {
      res.status(404).send("User not found");
    } else {
      res.status(200).send(individualUser);
    }
  } catch (err) {
    res.status(404).send(err);
  }
});

//updating student data using patch method
router.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateUser = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(200).send(updateUser);
  } catch (error) {
    res.status(404).send(err);
  }
});

//deleting student using delete method
router.delete("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteUser = await Student.findByIdAndDelete(_id);
    res.status(200).send(deleteUser);
  } catch (error) {
    res.status(404).send(err);
  }
});

//exporting router
module.exports = router;

//creating a new student using promises
// app.post("/students", (req, res) => {
//   console.log(req.body);
//   const user = new Student(req.body);
//   user
//     .save()
//     .then(() => {
//       res.status(201).send(user);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });
