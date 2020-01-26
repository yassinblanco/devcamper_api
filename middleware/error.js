const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
	let error = { ...err };
	error.message = err.message;

	//Log to console for dev
	console.log(error);

	//Mongoose bad ObjectId
	if (error.name === "CastError") {
		const message = `Bootcamp not found with the id of ${error.value}`;
		error = new ErrorResponse(message, 404);
	}
	//Mongoose duplicate key
	if (error.code === 11000) {
		const message = "Duplicate field value entered";
		error = new ErrorResponse(message, 400);
	}
	//Mongoose validation error
	if (error.name === "ValidationError") {
		const message = Object.values(error.errors).map(val => val.message);
		error = new ErrorResponse(message, 400);
	}
	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || "Server Error"
	});
};

module.exports = errorHandler;
