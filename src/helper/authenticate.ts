import { Request, Response } from "express";
import jwt from "jsonwebtoken";

function authenticateToken(req: Request, res: Response, next: any) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

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