import express from "express";
import { addCategory, removeCategory, getCategories } from "../controllers/category.controller.js";
import { verifyToken } from "../middlewares/authentication.js";
export const categoryRouter = express.Router();

categoryRouter.use(verifyToken);
categoryRouter.route("/").get(getCategories);
categoryRouter.route("/add").post(addCategory);
categoryRouter.route("/remove").delete(removeCategory);