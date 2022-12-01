import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { Client as ClientPostgres, ResultIterator } from "ts-postgres";

import { hashUsername, hashPassword } from "./../helper/hash";

/**
 * endpoint untuk request
 * request merupakan json dengan property
 * username, password
 * endpoint ini akan merespon dengan tiga bentuk
 * none->menandakan login gagal
 * penyanyi->menandakan yang login adalah penyanyi
 * admin->menandakan yang login merupakan admin
 * pesan tersebut disimpan di dalam json dengan dengan property
 * return
 */

function generateAccessToken(username: string) {
    return sign(username, process.env.TOKEN as string);
}

async function login(req: Request, res: Response) {
    const passwordHash = hashPassword(req.body.password === undefined ? "" : req.body.password as string);
    
    const client = new ClientPostgres({"host": "db-catify-rest", "port": 5432, "database": "catifyrest",
                                           "user": "postgres", "password": "admin"});
    await client.connect();

    let userType: string = "none";

    try {

        const query = "SELECT isadmin FROM \"User\" WHERE username = $1 AND password = $2";

        const argument: any = [
            req.body.username,
            passwordHash
        ];

        const result: Awaited<ResultIterator> = await client.query(query, argument);

        for(const row of result.rows) {
            console.log(row[0]);
            if(row[0] == false) {
                userType = "penyanyi";
            } else {
                userType = "admin"
            }
        }
    } finally {
        await client.end();
    }

    res.json({
        return: userType,
        token: generateAccessToken(req.body.username)
    })
}

export {
    login
}