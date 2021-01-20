import { Router } from 'express';
import { User } from '../api/user';
import auth from '../infra/auth';

const router = Router();

router.get('/', (req, res) => res.send('Redirect API on!'));

//User Routes
router.post('/login', User.login);
router.post('/register', User.register);
router.get('/checkEmail/:userEmail', User.checkUserEmailTaken);

//Auth example
// router.get('/checkEmail/:userEmail', auth, User.checkUserEmailTaken);

router.use('*', (req, res) => {
    res.status(404).json({ message: `route ${req.originalUrl} does not exists!` });
});

export default router;