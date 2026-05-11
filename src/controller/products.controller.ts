import type { IncomingMessage, ServerResponse } from "node:http";
import { insertProduct, readProduct } from "../service/products.service";
import type { IType } from "../types/productTypes";
import { parseBody } from "../utility/parseBody";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  const products = readProduct();

  const partsUrl = url?.split("/");
  const id =
    partsUrl && partsUrl[1] === "products" ? Number(partsUrl[2]) : null;
  console.log(id);

  if (url === "/products" && method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Successfully retrieved",
        data: products,
      }),
    );
  } else if (id !== null && method === "GET") {
    const product = products.find((prd: IType) => prd.id === id);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product successfully retrieved",
        data: product,
      }),
    );
  } else if (method === "POST" && url === "/products") {
    const body = await parseBody(req);
    const newProduct = {
      id: Date.now(),
      ...body,
    };
    products.push(newProduct);
    insertProduct(products);
    console.log(products);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Successfully retrieved",
        data: newProduct,
      }),
    );
  }
};
