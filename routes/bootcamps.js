const express = require("express");
const {
	getBootcamps,
	getBootcampsInRadius,
	getBootcamp,
	createBootcamp,
	deleteBootcamp,
	updateBootcamp
} = require("../controllers/bootcamps");
const router = express.Router();

//Include other resource routers
const courseRouter = require("./courses");

//Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

router
	.route("/")
	.get(getBootcamps)
	.post(createBootcamp);

router
	.route("/:id")
	.get(getBootcamp)
	.put(updateBootcamp)
	.delete(deleteBootcamp);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);
module.exports = router;
