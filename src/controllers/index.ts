import { Request, Response } from "express";
import db from "../db/index";
//import path from "path";

export const index = async (_req: Request, res: Response): Promise<void> => {
    try {
        //let results = await db.all();

        return res.render("index");
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

export const api = async (_req: Request, res: Response): Promise<void> => {
    try {
        let results = await db.all();
        res.json(results);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}