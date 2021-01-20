import * as jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.config';

const auth = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (token) {
        try {
            const decoded = await jwt.verify(token, authConfig.jwtSecret);
            console.log(`Valid token received: ${token}`);
            req.user = decoded;
            next();
        } catch (err) {
            console.log(err);
            console.log(`Invalid token: ${token}`);
            return res.sendStatus(401);
        }
    } else {
        console.log('Toke is missing!');
        return res.sendStatus(401);
    }
}

export default auth;
