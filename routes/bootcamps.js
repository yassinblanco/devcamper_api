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
