import { Response, Request } from "express";
import { Client as ClientSoap } from "soap";
import { createSoapClient, callSoapMethod } from "./../helper/soapwrapper";
import { Client as ClientPostgres } from "ts-postgres";

async function getPremiumSongs(req: Request, res: Response) {
    var reqBody = req.body;          // {creatorId: 1, subscriberId: 1}
    const url = "http://catify-soap:8042/check?wsdl";
    const client: ClientSoap = await createSoapClient(url) as ClientSoap;
    const status = await callSoapMethod(client, "checkStatus", reqBody);     // What type? Awaited<string>

    if (status === "ACCEPTED") {
        const client = new ClientPostgres({"host": "db-catify-rest", "port": 5432, "database": "catifyrest",
                                           "user": "postgres", "password": "admin"});
        await client.connect();

        try {
            const query = "SELECT song_id, judul, audio_path FROM \"Song\" WHERE penyanyi_id = $1;";
            const result = client.query(query, [reqBody["creatorId"]]);
            var resBody : {songs: {}[]} = {songs: []};
            for await (const row of result) {
                resBody["songs"].push({id: row.get("song_id"), judul: row.get("judul"), audio_path: row.get("audio_path")});
            }
            res.status(200);
            res.json(resBody);
            
        } finally {
            await client.end();
        }
    }
    else {
        res.sendStatus(403);
    }
}

export {
    getPremiumSongs
}
