"user strict";

let express = require("express");
let CourseController = require("../controllers/course");
let router = express.Router();
let md_auth = require("../middlewares/authenticated");

router.post("/course", md_auth.authenticated, CourseController.save);
router.get("/courses/:user", CourseController.getCourses);
router.get("/course/:user/:page/:search?", CourseController.search);
router.get("/course/:id", CourseController.getCourse);
router.put("/course/:id", md_auth.authenticated, CourseController.update);
router.delete("/course/:id", md_auth.authenticated, CourseController.delete);

module.exports = router;
