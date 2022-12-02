import { Response, Request } from "express";
import { Client as ClientSoap } from "soap";

import { apikey } from "./../helper/apikey";
import { createSoapClient, callSoapMethod } from "./../helper/soapwrapper";
import { Client as ClientPostgres } from "ts-postgres";

async function getPremiumSongsBySubscriber(req: Request, res: Response) {
    const creatorId = req.params.c_id;
    const subscriberId = req.params.s_id;
    console.log("getPremiumSongsBySubscriber");
    const url = "http://catify-soap:8042/check?wsdl";
    const client: ClientSoap = await createSoapClient(url) as ClientSoap;

    const arg: any = {
        apiKey: apikey,
        creatorId: creatorId,
        subscriberId: subscriberId
    }

    const status = await callSoapMethod(client, "checkStatus", arg);
    if (status.return === "ACCEPTED") {
        const client = new ClientPostgres({"host": "db-catify-rest", "port": 5432, "database": "catifyrest",
                                           "user": "postgres", "password": "admin"});
        await client.connect();

        try {
            const query = "SELECT song_id, judul, audio_path FROM \"Song\" WHERE penyanyi_id = $1;";
            const result = client.query(query, [creatorId]);
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

async function getPremiumSongsBySinger(req: Request, res: Response) {
    const creatorId = req.params.c_id;
    const client = new ClientPostgres({"host": "db-catify-rest", "port": 5432, "database": "catifyrest",
                                        "user": "postgres", "password": "admin"});
    await client.connect();

    try {
        const query = "SELECT song_id, judul, audio_path FROM \"Song\" WHERE penyanyi_id = $1;";
        const result = client.query(query, [creatorId]);
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

async function createPremiumSongs(req: Request, res: Response) {
    const reqBody = req.body;          // {judul: '', audioPath: '', creatorId: 1}

    const client = new ClientPostgres({"host": "db-catify-rest", "port": 5432, "database": "catifyrest",
                                        "user": "postgres", "password": "admin"});
    await client.connect();

    try {
        const query = "INSERT INTO \"Song\"(judul, audio_path, penyanyi_id) VALUES ($1, $2, $3);";
        const result = client.query(query, [reqBody["judul"], reqBody["audioPath"], reqBody["creatorId"]]);
        return res.sendStatus(201);
    } finally {
        await client.end();
    }
}

async function deletePremiumSongs(req: Request, res: Response) {
    const reqBody = req.body;          // {songId: 1}
    console.log("deletePremiumSongs with id: " + reqBody["songId"]);

    const client = new ClientPostgres({"host": "db-catify-rest", "port": 5432, "database": "catifyrest",
                                        "user": "postgres", "password": "admin"});
    await client.connect();

    try {
        const query = "DELETE FROM \"Song\" WHERE song_id=$1;";
        const result = client.query(query, [reqBody["songId"]]);
        return res.sendStatus(201);
    } finally {
        await client.end();
    }
}

async function updatePremiumSongs(req: Request, res: Response) {
    const reqBody = req.body;          // {judul: '', audioPath: '', songId: 1}
    console.log("updatePremiumSongs with id: " + reqBody["songId"]);

    const client = new ClientPostgres({"host": "db-catify-rest", "port": 5432, "database": "catifyrest",
                                        "user": "postgres", "password": "admin"});
    await client.connect();

    try {
        const query = "UPDATE \"Song\" SET judul=$1, audio_path=$2 WHERE song_id=$3;";
        const result = client.query(query, [reqBody["judul"], reqBody["audioPath"], reqBody["songId"]]);
        return res.sendStatus(201);
    } finally {
        await client.end();
    }
}

export {
    getPremiumSongsBySubscriber,
    getPremiumSongsBySinger,
    createPremiumSongs,
    deletePremiumSongs,
    updatePremiumSongs,
}
