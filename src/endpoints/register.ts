import { Request, Response } from "express";
import { Client as ClientPostgres } from "ts-postgres";

import { hashUsername, hashPassword } from "./../helper/hash";

/**
 * endpoint untuk request
 * request merupakan json dengan property
 * email, username, name, password
 */
async function register(req: Request, res: Response) {
    const passwordHash = hashPassword(req.body.password);
    
    const client = new ClientPostgres({"host": "db-catify-rest", "port": 5432, "database": "catifyrest",
                                           "user": "postgres", "password": "admin"});
    await client.connect();

    try {

        const query = `INSERT \"User\" (email, password, username, name, isadmin) 
                       VALUES ($1, $2, $3, $4, $5);`;

        const argument : any[] = [
            req.body.email,
            req.body.password,      // TODO: change to hashed password
            req.body.username,
            req.body.name,
            'f'
        ];

        client.query(query, argument);

    } finally {
        await client.end();
    }


}

export {
    register
}