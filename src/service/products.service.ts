import path from "node:path";
import fs from "fs";

const filepath = path.join(process.cwd(), "./src/database/db.json");
export const readProduct = () => {
  const products = fs.readFileSync(filepath, "utf-8");
  return JSON.parse(products);
};

export const insertProduct = (payload: any) => {
  fs.writeFileSync(filepath, JSON.stringify(payload));
};
