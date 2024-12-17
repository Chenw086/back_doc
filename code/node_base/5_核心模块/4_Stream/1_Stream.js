const fs = require("fs");

let rs = fs.createReadStream("./1.1_test.txt");
let ws = fs.createWriteStream("./1.2_test1.txt"); // 没有对应路径就会创建

rs.pipe(ws);
