var fs = require("fs");
var MarkdownIt = require("markdown-it");
const path = require("path");
const { exit } = require("process");
const yargs = require("yargs");
var md = new MarkdownIt();

const argv = yargs(process.argv.slice(2)).argv;

if (!argv.i) {
  console.error("No input file provided");
  exit();
}
if (!argv.t) {
  console.error("No title provided");
  exit();
}

// const re = /\/.*([A-Za-z0-9]+(_[A-Za-z0-9]+)+)\.[a-z]+/g;
var template = fs.readFileSync("./template.html").toString();

var note = fs.readFileSync(argv.i).toString();
var body = md.render(note);
template = template.replace("${0}", argv.t);
template = template.replace("${1}", body);
fs.writeFileSync(`${argv.t.replaceAll(" ", "_")}.html`, template);
