var fs = require("fs");
var MarkdownIt = require("markdown-it");
const { exit } = require("process");
var md = new MarkdownIt();
input = process.argv[2];

var template = fs.readFileSync("./template.html").toString();

if (input === undefined) {
  console.error("No input file provided");
  exit();
}
var note = fs.readFileSync(input).toString();
var body = md.render(note);
template = template.replace("${1}", body);
fs.writeFileSync("./test.html", template);
console.log(process.argv);
