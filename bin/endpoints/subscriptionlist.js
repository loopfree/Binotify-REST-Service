"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubscriptionList = void 0;
const soapwrapper_1 = require("./../helper/soapwrapper");
function getSubscriptionList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "http://catify-soap:8042/admin?wsdl";
        const client = yield (0, soapwrapper_1.createSoapClient)(url);
        // Memanggil fungsi SOAP bernama getSubscriptionRequests
        res.json(yield (0, soapwrapper_1.callSoapMethod)(client, "getSubscriptionRequests", {}));
    });
}
exports.getSubscriptionList = getSubscriptionList;
