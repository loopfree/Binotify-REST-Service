import { Request, Response } from "express";
import { Client as ClientPostgres } from "ts-postgres";

import { hashUsername, hashPassword } from "./../helper/hash";

/**
 * endpoint untuk request
 * request merupakan json dengan property
 * email, username, name, password
 */
async function register(req: Request, res: Response) {
    console.log(req.body);
    const passwordHash = hashPassword(req.body.password);
    
    const client = new ClientPostgres({"host": "db-catify-rest", "port": 5432, "database": "catifyrest",
                                           "user": "postgres", "password": "admin"});
    await client.connect();

    try {
        const checkQuery = `SELECT user_id FROM \"User\" WHERE email = $1 OR username = $2;`;
        const checkArgument : any[] = [
            req.body.email,
            req.body.username,
        ];
        const checkRes = await client.query(checkQuery, checkArgument);

        if (checkRes.rows.length > 0) {
            res.json({
                return: "existed"
            });
        } 
        else {
            const query = `INSERT INTO \"User\" (email, password, username, name, isadmin) 
                        VALUES ($1, $2, $3, $4, $5);`;

            const argument : any[] = [
                req.body.email,
                passwordHash,
                req.body.username,
                req.body.name,
                false
            ];

            await client.query(query, argument);

            res.json({
                return: "succeed"
            });
        }
    } catch(e) {
        console.log(e);
        res.json({
            return: "failed"
        });
    }finally {
        await client.end();
    }
}

export {
    register
}