import { createClient, Client} from "soap";

/**
 * createSoapClient
 * fungsi ini membuat sebuah soap client
 * yang akan melakukan pasing data ke url
 * yang diterima pada parameter
 */
function createSoapClient(url: string) {
    return new Promise((resolve, reject) => {
        createClient(url, function(err, client) {
            if(err) {
                reject(err);
            }

            resolve(client);
        })
    })
}

/**
 * 
 * @param client 
 * @param methodName 
 * @param arg 
 * @returns any
 * Menerima client SOAP yang telah dibuat sebelumnya
 * dan memanggil fungsi SOAP beserta dengan argument yang diberikan
 * di dalam parameter
 */
function callSoapMethod(client: Client, methodName: string, arg: any): any {
    return new Promise((resolve, reject) => {
        client[methodName](arg, function(err: any, res: any) {
            if(err) {
                reject(err);
            }

            resolve(res);
        })
    })
}

export {
    createSoapClient,
    callSoapMethod
}