"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callSoapMethod = exports.createSoapClient = void 0;
const soap_1 = require("soap");
/**
 * createSoapClient
 * fungsi ini membuat sebuah soap client
 * yang akan melakukan pasing data ke url
 * yang diterima pada parameter
 */
function createSoapClient(url) {
    return new Promise((resolve, reject) => {
        (0, soap_1.createClient)(url, function (err, client) {
            if (err) {
                reject(err);
            }
            resolve(client);
        });
    });
}
exports.createSoapClient = createSoapClient;
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
function callSoapMethod(client, methodName, arg) {
    return new Promise((resolve, reject) => {
        client[methodName](arg, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
}
exports.callSoapMethod = callSoapMethod;
