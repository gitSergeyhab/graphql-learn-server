import { Request, Response, Router } from "express";

const testRouter = Router();
testRouter.get("/test1/", async (_: Request, res: Response) => {
  res.status(200).json({ message: "test1" });
});


export { testRouter };