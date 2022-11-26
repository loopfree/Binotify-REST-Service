import { Response, Request } from "express";
import { Client } from "soap";
import { createSoapClient, callSoapMethod } from "./../helper/soapwrapper";

async function getSubscriptionList(req: Request, res: Response) {
    const url = "http://localhost:8042/admin?wsdl";

    const client: Client = await createSoapClient(url) as Client;

    // Memanggil fungsi SOAP bernama getSubscriptionRequests
    res.json(await callSoapMethod(client, "getSubscriptionRequests", {}));
}

export {
    getSubscriptionList
}
