import { Router } from "express";
import * as controller from "../controllers/index.controller";

export const index = Router();

index.get("/", controller.index);