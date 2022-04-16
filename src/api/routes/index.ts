import { Router } from 'express';
import generate from './generate';
import users from './users';
import npmPackage from './npmPackage';

const router = Router();
users(router);
generate(router);
npmPackage(router);

export default router;
