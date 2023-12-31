const core = require("@actions/core");
// const github = require("@actions/github");

try {
  const token = core.getInput("token");

  const fs = require("fs");
  const path = require("path");
  const repoDirectory = process.env.GITHUB_WORKSPACE;
  const filePath1 = path.join(repoDirectory, "requirements.txt");
  const filePath2 = path.join(repoDirectory, ".recruit.yml");
  const file1 = fs.readFileSync(filePath1, "utf8");
  const file2 = fs.readFileSync(filePath2, "utf8");

  fetch("https://4771-45-86-178-159.ngrok-free.app/ciTest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({ testData: file1, recruit: file2 }),
  });
} catch (error) {
  core.setFailed(error.message);
}
