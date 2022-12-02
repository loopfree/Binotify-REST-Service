import { Response, Request } from "express";
import { Client } from "soap";

import { apikey } from "./../helper/apikey";
import { createSoapClient, callSoapMethod } from "./../helper/soapwrapper";

async function getSubscriptionList(req: Request, res: Response) {
    const url = "http://catify-soap:8042/admin?wsdl";

    const client: Client = await createSoapClient(url) as Client;

    const arg = {
        "apiKey": apikey
    }

    // Memanggil fungsi SOAP bernama getSubscriptionRequests
    res.json(await callSoapMethod(client, "getSubscriptionRequests", arg));
}

export {
    getSubscriptionList
}
