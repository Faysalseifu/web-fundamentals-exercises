import fs from "fs/promises";

const data = await fs.readFile("file.txt", "utf8");

console.log(data);