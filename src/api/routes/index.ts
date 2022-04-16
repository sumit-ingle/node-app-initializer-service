import { Router } from 'express';
import users from './users';
import npmPackage from './npmPackage';

const router = Router();
users(router);
npmPackage(router);

export default router;
