const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
	let error = { ...err };
	error.message = err.message;

	//Log to console for dev
	console.log(error.message);

	//Mongoose bad ObjectId
	if (error.name === "CastError") {
		const message = `Bootcamp not found with the id of ${error.value}`;
		error = new ErrorResponse(message, 404);
	}

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || "Server Error"
	});
};

module.exports = errorHandler;
