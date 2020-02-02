const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Course = require("../models/Course");

//@desc  Get all courses
//@route GET /api/v1/courses
//@route GET /api/v1/bootcamps/:bootcampId/courses
//@access Public
exports.getCourses = asyncHandler(async (req, res, next) => {
	let query;
	if (req.params.bootcampId) {
		query = Course.find({ bootcamp: req.params.bootcampId });
	} else {
		query = Course.find().populate({
			path: "bootcamp",
			select: "name description"
		});
	}
	const courses = await query;
	res.status(200).json({
		success: true,
		count: courses.length,
		data: courses
	});
});

//@desc  Get single course
//@route GET /api/v1/courses/:id
//@access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {});

//@desc  Create new course
//@route POST /api/v1/bootcamps
//@access Private
exports.createCourse = asyncHandler(async (req, res, next) => {});

//@desc  Update course
//@route PUT /api/v1/courses/:id
//@access Private
exports.updateCourse = asyncHandler(async (req, res, next) => {});

//@desc  Delete course
//@route DELETE /api/v1/courses/:id
//@access Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {});
