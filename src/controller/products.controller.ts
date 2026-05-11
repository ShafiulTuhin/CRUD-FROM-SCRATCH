import type { IncomingMessage, ServerResponse } from "node:http";
import { insertProduct, readProduct } from "../service/products.service";
import type { IProduct, IType } from "../types/productTypes";
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
    const product = products.find((prd: IProduct) => prd.id === id);

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
  } else if (method === "PUT" && id !== null) {
    const body = await parseBody(req);
    const products = readProduct();

    const index = products.findIndex((p: IProduct) => p.id === id);
    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "No product found!",
          data: null,
        }),
      );
    }
    products[index] = { id: products[index].id, ...body };
    insertProduct(products);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product updated successfully",
        data: products[index],
      }),
    );
  }
};
