import { Router } from 'express';
import generate from './generate';
import npmPackage from './npmPackage';

const router = Router();
generate(router);
npmPackage(router);

export default router;
