/*
TODO LIST:
Produce a page to report the machine statuses of the last 24 hours in the database (e.g. January 7th).

    The total net production for the machine (gross output minus scrap).
    The percentage of scrap vs gross production.
    The percentage of downtime for a machine.
    A graph/table showing the net production (gross production – scrap) for every hour. 

*/

import express from "express";
import mysql from "mysql";