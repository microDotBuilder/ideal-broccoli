import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function getRandomUsersJson(path) {
  return await JSON.parse(readFileSync(join(__dirname, path), "utf8"));
}
