"user strict";
let validator = require("validator");
let Course = require("../models/course");

let controller = {
  save: (req, res) => {
    //Recolect params by post
    let params = req.body;
    //Validate data

    try {
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);
    } catch (error) {
      return res.status(200).send({
        message: "DATA_INCOMPLETE",
      });
    }

    if (validate_title && validate_content) {
      //Create object
      let course = new Course();

      //Assign values
      course.title = params.title;
      course.content = params.content;
      course.user = req.user.sub;
      //Save course

      course.save((err, taskStored) => {
        if (err || !taskStored) {
          return res.status(500).send({
            status: "error",
            message: "ERROR_IN_REQUEST",
          });
        }

        //Return response
        return res.status(200).send({
          status: "success",
          taskStored,
        });
      });
    } else {
      return res.status(200).send({
        message: "NOT_VALID_VALIDATION",
      });
    }
  },

  getCourse: (req, res) => {
    //Pick id course from URL

    let courseId = req.params.id;
    //Find id by course
    Course.findById(courseId)
      .populate("user")
      .exec((err, course) => {
        if (err != null) {
          return res.status(500).send({
            status: "error",
            message: "ERROR_IN_REQUEST",
          });
        }

        if (!course) {
          return res.status(404).send({
            status: "error",
            message: "COURSE_NOT_EXISTS",
          });
        }

        //Return response
        return res.status(200).send({
          status: 200,
          course,
        });
      });
  },

  getCourses: (req, res) => {
    let userId = req.params.user;
    //Find user condition
    Course.find({
      user: userId,
    })
      .sort([["exp", "descending"]])
      .exec((err, courses) => {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: "ERROR_GET_COURSES",
          });
        }

        if (!courses || courses.length == 0) {
          return res.status(404).send({
            status: "error",
            message: "NOT_COURSES",
          });
        }

        //Return response
        return res.status(200).send({
          status: "success",
          courses,
        });
      });
  },

  update: (req, res) => {
    //Pick ip of course
    let courseId = req.params.id;
    //Pick data from method POST
    var params = req.body;
    //Validate data

    try {
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);
    } catch (error) {
      return res.status(200).send({
        message: "DATA_INCOMPLETE",
      });
    }

    if (validate_title && validate_content) {
      //Set a json with the data
      let update = {
        title: params.title,
        content: params.content,
      };

      //Find and update of course by id and user's id

      Course.findOneAndUpdate(
        {
          _id: courseId,
          user: req.user.sub,
        },
        update,
        {
          new: true,
        },
        (err, taskUpdated) => {
          if (err != null) {
            return res.status(500).send({
              status: "error",
              message: "ERROR_IN_REQUEST",
            });
          }

          if (!taskUpdated) {
            return res.status(404).send({
              status: "error",
              message: "Error al actualizar el curso",
            });
          }

          //Return response
          return res.status(200).send({
            status: "success",
            course: taskUpdated,
          });
        }
      );
    } else {
      return res.status(200).send({
        message: "NOT_VALID_VALIDATION",
      });
    }
  },

  delete: (req, res) => {
    //Pick el id of url
    let courseId = req.params.id;

    //FindByDelete by course id and user id
    Course.findOneAndDelete(
      {
        _id: courseId,
        user: req.user.sub,
      },
      (err, taskRemoved) => {
        if (err != null) {
          return res.status(500).send({
            status: "error",
            message: "ERROR_IN_REQUEST",
          });
        }

        if (!taskRemoved) {
          return res.status(404).send({
            status: "error",
            message: "COURSE_NOT_FOUND",
          });
        }

        //Return response
        return res.status(200).send({
          status: "success",
          course: taskRemoved,
        });
      }
    );
  },

  search: (req, res) => {
    //Pick string to find
    let searchString = req.params.search;
    //Pick id of user && page
    let userId = req.params.user;
    if (
      !req.params.page ||
      req.params.page == 0 ||
      req.params.page == "0" ||
      req.params.page == null ||
      req.params.page == undefined ||
      !validator.isInt(req.params.page)
    ) {
      var page = 1;
    } else {
      var page = parseInt(req.params.page);
    }
    //Indicate options of pagination
    var options = {
      sort: {
        date: -1,
      },
      populate: "user",
      limit: 10,
      page: page,
    };

    //Find or

    if (searchString) {
      var extendOption = {
        user: userId,
        $or: [
          {
            title: {
              $regex: searchString,
              $options: "i",
            },
          },
          {
            content: {
              $regex: searchString,
              $options: "i",
            },
          },
        ],
      };
    } else {
      var extendOption = {
        user: userId,
      };
    }

    Course.paginate(extendOption, options, (err, courses) => {
      if (err != null) {
        return res.status(500).send({
          status: "error",
          message: "Error en la peticion",
        });
      }

      if (!courses) {
        return res.status(404).send({
          status: "error",
          message: "No hay cursos disponibles",
        });
      }

      //return response
      return res.status(200).send({
        status: "success",
        courses: courses.docs,
        totalDocs: courses.totalDocs,
        totalPages: courses.totalPages,
      });
    });
  },
};

module.exports = controller;
