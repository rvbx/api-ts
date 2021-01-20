import express from "express";
import { UserDao } from "../infra/user-dao";
import * as jwt from 'jsonwebtoken';
import * as sqlite3 from 'sqlite3';
import authConfig from '../../config/auth.config';


export class User {

    static login = async (req: express.Request | sqlite3, res: express.Response | any): Promise<void> => {
        const { userEmail, password } = req.body;
        console.log('####################################');
        const user: any = await new UserDao(req.db).findByNameAndPassword(userEmail, password);
        console.log(user);
        if (user) {
            console.log(`User ${userEmail} authenticated`);
            console.log('Authentication Token added to response');
            const token = jwt.sign(user, authConfig.jwtSecret, {
                expiresIn: 86400 // seconds, 24h
            });
            res.set('x-access-token', token);
            res.json(user);
        } else {
            console.log(`Authentication failed for user ${userEmail}`);
            console.log('No token generated');
            res.status(401).json({ message: `Authentication failed for user ${userEmail}` });
        }

    };

    static register = async (req: express.Request | sqlite3, res: express.Response): Promise<void> => {
        const user = req.body;
        const userId = await new UserDao(req.db).add(user);
        res.status(204).end();
    };

    static checkUserEmailTaken = async (req: express.Request | sqlite3, res: express.Response): Promise<void> => {
        const { userEmail } = req.params;
        const user = await new UserDao(req.db).findByEmail(userEmail);
        res.json(!!user);
    };

}
