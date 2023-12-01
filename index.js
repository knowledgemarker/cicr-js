const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");
const path = require("path");

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput("who-to-greet");
  console.log(`Hello ${nameToGreet}!`);
  const time = new Date().toTimeString();
  core.setOutput("time", time);

  const requirementsPath = path.join(github.workspace, "requirements.txt");
  const requirements = fs.readFileSync(requirementsPath, "utf8");
  const firstLine = requirements.split("\n")[0];
  console.log(`First line of requirements.txt: ${firstLine}`);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
