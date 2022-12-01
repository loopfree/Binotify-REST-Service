import { Request, Response } from "express";
import jwt from "jsonwebtoken";

function authenticateToken(req: Request, res: Response, next: any) {

    const token: string = req.headers.authorization === undefined ? "" : req.headers.authorization as string;

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN as string, (err: any, user: any) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        next()
    })
}

export {
    authenticateToken
}