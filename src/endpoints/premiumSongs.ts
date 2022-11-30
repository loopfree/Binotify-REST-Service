import { Response, Request } from "express";
import { Client as ClientSoap } from "soap";
import { createSoapClient, callSoapMethod } from "./../helper/soapwrapper";
import { Client as ClientPostgres } from "ts-postgres";

async function getPremiumSongs(req: Request, res: Response) {
    const reqBody = req.body;          // {creatorId: 1, subscriberId: 1}
    const url = "http://localhost:8042/check?wsdl";
    const client: ClientSoap = await createSoapClient(url) as ClientSoap;
    const status = await callSoapMethod(client, "checkStatus", reqBody);     // What type? Awaited<string>

    if (status === "ACCEPTED") {
        const client = new ClientPostgres({"host": "localhost", "port": 6002, "database": "catifyrest",
                                           "user": "postgres", "password": "admin"});
        await client.connect();

        try {
            const query = "SELECT song_id, judul, audio_path FROM \"Song\" WHERE penyanyi_id = $1;";
            const result = client.query(query, [reqBody["creatorId"]]);
            var resBody : {songs: {}[]} = {songs: []};
            for await (const row of result) {
                resBody["songs"].push({id: row.get("song_id"), judul: row.get("judul"), audio_path: row.get("audio_path")});
            }

            return res.status(200).json(resBody);
        } catch (e) {
            console.log(e);
            return res.status(500).json({error: e});
        } finally {
            await client.end();
        }
    }
    else {
        res.sendStatus(403);
    }
}

async function createPremiumSongs(req: Request, res: Response) {
    const reqBody = req.body;          // {creatorId: 1, subscriberId: 1}

    const client = new ClientPostgres({"host": "localhost", "port": 6002, "database": "catifyrest",
                                        "user": "postgres", "password": "admin"});
    await client.connect();

    try {
        const query = "INSERT INTO \"Song\"(judul, audio_path, penyanyi_id) VALUES ();";
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

export {
    getPremiumSongs,
    createPremiumSongs,
}
