const http = require("http");
const fs = require("fs");
//const registration = require("./registration.js");
const minimist = require("minimist");
const args = minimist(process.argv.slice(2), {
  string: ["port"],
  default: { port: "5000" },
});
let homeContent = "";
let projectContent = "";
let registrationContent = "";
let registrationJS = "";

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

fs.readFile("registration.html", (err, registration) => {
  if (err) {
    throw err;
  }
  registrationContent = registration;
});

fs.readFile("registration.js", (err, js) => {
  if (err) throw err;
  registrationJS = js;
});

http
  .createServer((request, response) => {
    let url = request.url;

    if (url === "/project") {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(projectContent);
    } else if (url === "/registration") {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(registrationContent);
    } else if (url === "/registration.js") {
      response.writeHead(200, { "Content-Type": "application/javascript" });
      response.end(registrationJS);
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(homeContent);
    }
  })
  .listen(args.port, () => {
    console.log(`Server running on http://localhost:${args.port}`);
  });
