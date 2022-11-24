import {createClient} from "soap";

const url = "http://localhost:8042/admin?wsd";

createClient(url, function(err, client) {
    if(err) {
        throw err;
    }

    const args = {}

    client.getSubscriptionRequests(args, function(err: any, res: any) {
        if(err) {
            throw err;

            console.log(res);
        }
    });
});