import { Request, Response } from "express";
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
async function login(req: Request, res: Response) {
    const passwordHash = hashPassword(req.body.password);
    
    const client = new ClientPostgres({"host": "db-catify-rest", "port": 5432, "database": "catifyrest",
                                           "user": "postgres", "password": "admin"});
    await client.connect();

    let userType: string = "none";

    try {

        const query = "SELECT isAdmin FROM \"User\" WHERE username = $1 AND password = $1";

        const argument: any = [
            req.body.username,
            passwordHash
        ];

        const result: Awaited<ResultIterator> = await client.query(query, argument);

        for(const row of result) {
            if(row.get("isAdmin") === "f") {
                userType = "penyanyi";
            } else {
                userType = "admin"
            }
        }
    } finally {
        await client.end();
    }

    res.json({
        return: userType
    })
}

export {
    login
}