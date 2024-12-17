const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

/*  
    将 access 与 mkdir 处理成 async 风格
*/
const access = promisify(fs.access);
const mkdir = promisify(fs.mkdir);

async function myMkdir(dirPath, cb) {
  let paths = dirPath.split("/");
  for (let i = 1; i <= paths.length; i++) {
    let current = paths.slice(0, i).join("/");
    try {
      await access(current);
    } catch {
      await mkdir(current);
    }
  }
  cb && cb();
}

myMkdir("a/b/c/d");
console.log(__dirname);
