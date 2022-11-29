import { Request, Response } from "express";
import { Client as ClientPostgres } from "ts-postgres";

import { hashUsername, hashPassword } from "./../helper/hash";

/**
 * endpoint untuk request
 * request merupakan json dengan property
 * email, username, name, password
 */
async function register(req: Request, res: Response) {
    /**
     * membuat id singer dari username singer
     */
    const singerId = hashUsername(req.body.username);
    const passwordHash = hashPassword(req.body.password);
    
    const client = new ClientPostgres({"host": "localhost", "port": 6002, "database": "catifyrest",
                                           "user": "postgres", "password": "admin"});
    await client.connect();

    try {

        const query = "INSERT \"User\" VALUES ($1, $2, $3, $4, $5, 'f');";

        const argument: any = [
            singerId,
            req.body.email,
            req.body.password,
            req.body.username,
            req.body.name,
        ];

        client.query(query);
    } finally {
        await client.end();
    }


}

export {
    register
}