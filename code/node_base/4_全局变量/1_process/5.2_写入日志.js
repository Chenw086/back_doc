const fs = require("fs");
const path = require("path");
const logFilePath = path.join(__dirname, "app.log");
const logStream = fs.createWriteStream(logFilePath, { flags: "a" });
process.stdout.write = logStream.write.bind(logStream);
process.stderr.write = logStream.write.bind(logStream);
console.log("This message will be written to the log file.");
console.error("This error message will also be written to the log file.");
