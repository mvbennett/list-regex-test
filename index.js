const fs = require("fs");

const testsFile = "tests.txt";
let testsList = [];
const stringFile = "strings.txt";
let stringList = [];
const output = fs.createWriteStream("output.txt");
try {
  const testData = fs.readFileSync(testsFile);
  testsList = testData
    .toString()
    .split("\n")
    .map((line) => new RegExp(line.trim(), "i"));

  const stringData = fs.readFileSync(stringFile);
  stringList = stringData
    .toString()
    .split("\n")
    .map((line) => line.trim());
} catch (err) {
  console.error(`Error reading file: ${err}`);
  process.exit(1);
}

for (const test of testsList) {
  stringList.forEach((string) => {
    if (test.test(string)) output.write(`${string}\n`, "utf8");
  });
}
