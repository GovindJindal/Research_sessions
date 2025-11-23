// const figlet = require('figlet');

// figlet("RichiRich", function (err, data) {
//   if (err) {
//     console.log("Something went wrong...");
//     console.dir(err);
//     return;
//   }
//   console.log(data);
// });




// import figlet from "figlet";

// async function doStuff() {
//   const text = await figlet.text("Hello World!!");
//   console.log(text);
// }

// doStuff();





import figlet from "figlet";
import chalk from "chalk";

const art = figlet.textSync("Evolve AI");
console.log(chalk.greenBright(art));
