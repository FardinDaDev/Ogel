import connection from "../db/index";

export function netProductionHourly(machineName: string, callback: any) {
    connection.query("SELECT (x.productionValue - y.scrapValue) as PRODUCTION, x.productionHour from (select HOUR(datetime_from) as productionHour, SUM(value) as productionValue FROM Production WHERE machine_name = ? AND (datetime_from BETWEEN '2018-01-07 00:00:00' AND '2018-01-07 23:55:00') AND variable_name = 'PRODUCTION' GROUP BY HOUR(datetime_from)) x, (select HOUR(datetime_from) AS scrapHour, SUM(value) AS scrapValue FROM Production WHERE machine_name = ? AND (datetime_from BETWEEN '2018-01-07 00:00:00' AND '2018-01-07 23:55:00') AND variable_name = 'SCRAP' GROUP BY HOUR(datetime_from)) y WHERE x.productionHour = y.scrapHour ORDER BY x.productionHour", [machineName, machineName], (err, results) => {
        callback(err, results);
    });
};

export function totalDownTime(machineName: string, callback: any) {
    connection.query("SELECT SUM(TIMESTAMPDIFF (MINUTE, (SELECT y.datetime FROM Runtime y WHERE y.id < x.id AND machine_name = ? AND (DATETIME BETWEEN '2018-01-07 00:00:00' AND '2018-01-07 23:55:00') ORDER BY id DESC LIMIT 1), x.datetime)) AS difference FROM Runtime x WHERE machine_name = ? AND (DATETIME BETWEEN '2018-01-07 00:00:00' AND '2018-01-08 00:00:00') AND isrunning = 1 ORDER BY x.id", [machineName, machineName], (err, results) => {
        callback(err, results);
    });
}

export function scrapvsgrossPercentage(machineName: string, callback: any) {
    connection.query("SELECT (y.scrapValue / x.productionValue * 100) AS percentage, (x.productionValue - y.scrapValue) AS NET_PRODUCTION, x.productionValue AS grossProduction FROM (SELECT SUM(value) as productionValue FROM Production WHERE machine_name = ? AND (datetime_from BETWEEN '2018-01-07 00:00:00' AND '2018-01-07 23:55:00') AND variable_name = 'PRODUCTION') x, (SELECT SUM(value) as scrapValue FROM Production WHERE machine_name = ? AND (datetime_from BETWEEN '2018-01-07 00:00:00' AND '2018-01-07 23:55:00') AND variable_name = 'SCRAP') y", [machineName, machineName], (err, results) => {
        callback(err, results);
    });
}

export function lastRun(machineName: string, callback: any) {
    connection.query("SELECT TIMESTAMPDIFF (MINUTE, DATETIME, '2018-01-08 00:00:00') AS minutes, isrunning FROM Runtime WHERE machine_name = ? ORDER BY id DESC LIMIT 1", [machineName], (err, results) => {
        callback(err, results);
    });
}

export function temperature(machineName: string, callback: any) {
    connection.query("SELECT value FROM Production WHERE machine_name = ? AND variable_name = 'CORE TEMPERATURE' AND (datetime_from BETWEEN '2018-01-07 00:00:00' AND '2018-01-07 23:55:00') ORDER BY datetime_from", [machineName], (err, results) => {
        callback(err, results);
    });
}