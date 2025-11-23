const chalk = require('chalk');
const figlet = require('figlet');

figlet.text(
  "EVOLVE AI",
  {
    font: "ANSI Shadow", 
    horizontalLayout: "default",
    verticalLayout: "default"
  },
  function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }

    console.log(
      chalk.blueBright.bold(data)
    );
  }
);
