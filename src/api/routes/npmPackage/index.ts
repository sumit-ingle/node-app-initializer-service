import { Request, Response, Router } from 'express';
import { getNpmPackages } from '../../../services/npmPackage';

const route = Router();

export default (app: Router) => {
    app.use('/npm-packages', route);
    route.get('/hello', async (req: Request, res: Response) => {
        return res.json(
            'hello world'
        );
    });
    route.get(
        '/:nodeVersion',
        async (req: Request, res: Response) => {
            return res.json(getNpmPackages(req.params.nodeVersion)).status(200);
        }
    );
};
