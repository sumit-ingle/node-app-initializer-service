import { NextFunction, Request, Response, Router } from 'express';
import { Container } from 'typedi';
import GeneratorService from '../../../services/generator';
import { GenerateRequest } from '../../../models/GenerateRequest';

const route = Router();

export default (app) => {
  app.use('/app', route);

  route.post('/generate', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const generatorService = Container.get(GeneratorService);
      const appUrl = await generatorService.generateNodeApp(req.body as GenerateRequest);
      return res.download(appUrl);
    } catch (e) {
      console.log(' error ', e);
      return next(e);
    }
  });
};
