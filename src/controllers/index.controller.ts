import { Request, Response } from "express";
import async from "async";
import { netProductionHourly, totalDownTime, scrapvsgrossPercentage, lastRun, temperature } from "../models/ogeldb.model";

export const index = (_req: Request, res: Response) => {
    try {

        //Bad practice spaghetti callback chain
        // I'd like to have feedback on this one.
        async.parallel([
            callback => netProductionHourly("2x2 brick mould", callback),
            callback => totalDownTime("2x2 brick mould", callback),
            callback => scrapvsgrossPercentage("2x2 brick mould", callback),
            callback => lastRun("2x2 brick mould", callback),
            callback => temperature("2x2 brick mould", callback),

            callback => netProductionHourly("3x2 brick mould", callback),
            callback => totalDownTime("3x2 brick mould", callback),
            callback => scrapvsgrossPercentage("3x2 brick mould", callback),
            callback => lastRun("3x2 brick mould", callback),
            callback => temperature("3x2 brick mould", callback),

            callback => netProductionHourly("4x2 brick mould", callback),
            callback => totalDownTime("4x2 brick mould", callback),
            callback => scrapvsgrossPercentage("4x2 brick mould", callback),
            callback => lastRun("4x2 brick mould", callback),
            callback => temperature("4x2 brick mould", callback),
        ], (_err, results) => {

            return res.render("index", { 
                netProduction2x2: results[0],  
                totalDownTime2x2: results[1],  
                scrapvsgross2x2: results[2],  
                lastRun2x2: results[3],  
                temperature2x2: results[4],  

                netProduction3x2: results[5],  
                totalDownTime3x2: results[6],  
                scrapvsgross3x2: results[7],  
                lastRun3x2: results[8],  
                temperature3x2: results[9],  

                netProduction4x2: results[10],  
                totalDownTime4x2: results[11],  
                scrapvsgross4x2: results[12],  
                lastRun4x2: results[13],  
                temperature4x2: results[14],  

            });
        });

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}