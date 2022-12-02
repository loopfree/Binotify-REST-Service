import { Response, Request } from "express";
import { Client } from "soap";

import { apikey } from "./../helper/apikey";
import { createSoapClient, callSoapMethod } from "./../helper/soapwrapper";

async function declineSubscription(req: Request, res: Response) {
    const url = "http://catify-soap:8042/admin?wsdl";

    const client: Client = await createSoapClient(url) as Client;

    const args = req.body;
    args["apiKey"] = apikey;
    
    // Memanggil fungsi SOAP bernama approveSubscriptionRequest
    res.json(await callSoapMethod(client, "declineSubscriptionRequest", args));
}

export {
    declineSubscription
}
