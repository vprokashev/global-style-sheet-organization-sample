import _ from "lodash";
import path from "path";

const env = {
	API_URL: "",
	NODE_ENV: "development",
	DEV_PORT: "2017",
	PUBLIC_PATH: "/",
	SYSTEM_DATE_FORMAT: "YYYY-MM-DDTHH:mm:ss"
};

_.forEach(env, (value, key) => {
	if (!process.env[key]) {
		process.env[key] = value
	}
});

const {NODE_ENV, API_URL, DEV_PORT, PUBLIC_PATH} = process.env;

const app = require("./server");

app.listen(DEV_PORT, () => {
	console.log(`Dev server listening on port ${app.get('port')}`);
});