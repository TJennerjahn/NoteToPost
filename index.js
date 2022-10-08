var fs = require("fs");
const hljs = require("highlight.js");

// const path = require("path");
const { exit } = require("process");
const yargs = require("yargs");
const md = require("markdown-it")().use(require("markdown-it-highlightjs"), {
  highlight: function (str, lang) {
    console.log(lang);
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          "</code></pre>"
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  },
});

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
