const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Bootcamp = require("./models/Bootcamp");

//Load env vars
dotenv.config({ path: "./config/config.env" });

//Connect to the DB
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
});

//Read JSON files
const bootcamps = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

//Import into DB
const importData = async () => {
	try {
		await Bootcamp.create(bootcamps);
		console.log("Data Imported...");
		process.exit();
	} catch (err) {
		console.error(err);
	}
};

//Delete from DB
const deleteData = async () => {
	try {
		await Bootcamp.deleteMany();
		console.log("Data Deleted...");
		process.exit();
	} catch (err) {
		console.error(err);
	}
};

if (process.argv[2] === "-i") {
	importData();
} else if (process.argv[2] === "-d") {
	deleteData();
}