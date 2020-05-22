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

const { protect, authorize } = require("../middleware/auth");

const Bootcamp = require("../models/Bootcamp");
const advancedResults = require("../middleware/advancedResults");

//Include other resource routers
const courseRouter = require("./courses");

//Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

router
	.route("/:id/photo")
	.put(protect, authorize("publisher", "admin"), bootcampPhotoUpload);

router
	.route("/")
	.get(advancedResults(Bootcamp, "courses"), getBootcamps)
	.post(protect, authorize("publisher", "admin"), createBootcamp);

router
	.route("/:id")
	.get(getBootcamp)
	.put(protect, authorize("publisher", "admin"), updateBootcamp)
	.delete(protect, authorize("publisher", "admin"), deleteBootcamp);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);
module.exports = router;
