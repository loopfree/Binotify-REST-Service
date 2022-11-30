import { Response, Request } from "express";
import { Client } from "ts-postgres";

async function getPremiumSingers(req: Request, res: Response) {
    const client = new Client({"host": "localhost", "port": 5432, "database": "catifyrest",
                               "user": "postgres", "password": "admin"});
    await client.connect();

    try {
        // Asumsi: admin di binotify premium bukan penyanyi
        const query = "SELECT user_id, name FROM \"User\" WHERE isadmin IS FALSE;";
        const result = client.query(query);
        var body : {singers: {}[]} = {singers: []};
        for await (const row of result) {
            body["singers"].push({id: row.get("user_id"), name: row.get("name")});
        }
        res.json(body);
        
    } finally {
        await client.end();
    }
}

export {
    getPremiumSingers
}
