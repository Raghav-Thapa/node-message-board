const fs = require("fs");
const path = require("path");

// fs.mkdir(path.join(__dirname,'/test'), {} , err => {
//     if(err) throw err;
//     console.log("folder created...")
// })

fs.writeFile(
  path.join(__dirname, "/test", "hello.txt"),
  "Hello from file ssystem", err => {
    if(err) throw err 
    console.log("written")
  }
);
