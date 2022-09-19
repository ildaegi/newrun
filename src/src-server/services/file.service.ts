import fs from "fs";

export const GIT_REPO_URL = "outsung/daily-modeling";
export const UPLOAD_DIR = "public/models/previewable/";

interface GithubFileUploadProps {
  path: string;
  name: string;
}
export function githubFileUpload({ name, path }: GithubFileUploadProps) {
  const isGlb = path.split(".").pop() === "glb";

  const file = isGlb
    ? fs.readFileSync(path, "binary")
    : fs.readFileSync(path, "utf-8");
  const base64 = isGlb
    ? Buffer.from(file, "binary").toString("base64")
    : Buffer.from(file, "utf8").toString("base64");
  const content = base64;

  const url = `https://api.github.com/repos/${GIT_REPO_URL}/contents/${UPLOAD_DIR}${name}`;

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${process.env.GITHUB_API_KEY}`);
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  const body = JSON.stringify({
    message: "ADD: Upload file for github api",
    content: `${content}`,
  });

  return fetch(url, { method: "PUT", headers, body });
}
