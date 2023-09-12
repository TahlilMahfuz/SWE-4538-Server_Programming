//File system task
const fs = require('fs');

fs.readFile("./datafile.txt", "utf-8", (error, data) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Before : ");
        console.log(data);
    }
});

fs.writeFile(
    "./datafile.txt",
    "IUT is hell \n",
    (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Write Successful");
        }
    }
);


fs.appendFile(
    "./datafile.txt",
    "Friday bashay jabo......yeeeee",
    (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Append Successful");
        }
    }
);

fs.readFile("./datafile.txt", "utf-8", (error, data) => {
    if (error) {
        console.log(error);
    } else {
        console.log("After : ");
        console.log(data);
    }
});