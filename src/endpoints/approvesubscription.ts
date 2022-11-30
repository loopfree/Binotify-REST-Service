import { Response, Request } from "express";
import { Client } from "soap";
import { createSoapClient, callSoapMethod } from "./../helper/soapwrapper";

async function approveSubscription(req: Request, res: Response) {
    console.log("Argument: ", req.body);
    const url = "http://catify-soap:8042/admin?wsdl";

    const client: Client = await createSoapClient(url) as Client;

    const args = req.body;
    
    // Memanggil fungsi SOAP bernama approveSubscriptionRequest
    res.json(await callSoapMethod(client, "approveSubscriptionRequest", args));
}

export {
    approveSubscription
}
