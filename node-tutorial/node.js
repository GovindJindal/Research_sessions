// import fs from "fs"
// import path from "path"

// const fs = require('fs');
// const path = require('path');

// const filePath = path.join(__dirname, 'a.txt');



// Use only 'require'
const fs = require('fs');
const path = require('path');

// This works perfectly with 'require'
const filePath = path.join(__dirname, 'a.txt');

console.log("File path is:", filePath);