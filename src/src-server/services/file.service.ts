import fs from "fs";

interface GithubFileUploadProps {
  path: string;
  name: string;
}
export function githubFileUpload({ name, path }: GithubFileUploadProps) {
  const file = fs.readFileSync(path).toString();
  const content = Buffer.from(file, "utf8").toString("base64");

  const url = `https://api.github.com/repos/ildaegi/newrun-upload/src/src-client/assets/model/${name}`;

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${process.env.GITHUB_API_KEY}`);
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  const body = new URLSearchParams();
  body.append("message", "ADD: upload file for github api");
  body.append("content", `${content}`);

  return fetch(url, { method: "PUT", headers, body });
}
