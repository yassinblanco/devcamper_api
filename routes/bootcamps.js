const express = require("express");
const {
	getBootcamps,
	getBootcampsInRadius,
	getBootcamp,
	createBootcamp,
	deleteBootcamp,
	updateBootcamp,
	bootcampPhotoUpload,
} = require("../controllers/bootcamps");

const router = express.Router();

const { protect } = require("../middleware/auth");

const Bootcamp = require("../models/Bootcamp");
const advancedResults = require("../middleware/advancedResults");

//Include other resource routers
const courseRouter = require("./courses");

//Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

router.route("/:id/photo").put(protect, bootcampPhotoUpload);

router
	.route("/")
	.get(advancedResults(Bootcamp, "courses"), getBootcamps)
	.post(protect, createBootcamp);

router
	.route("/:id")
	.get(getBootcamp)
	.put(protect, updateBootcamp)
	.delete(protect, deleteBootcamp);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);
module.exports = router;
