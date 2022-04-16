import { celebrate, Joi } from 'celebrate';
import { NextFunction, Request, Response, Router } from 'express';
import { Container } from 'typedi';
import GeneratorService from '../../../services/generator';

const route = Router();

export default (app) => {
  app.use('/app', route);

  route.post(
    '/generate',
    celebrate({
      body: Joi.object({
        nodeVersion: Joi.string().trim().min(1).required(),
        language: Joi.string().trim().required(),
        dependencies: Joi.array().items(
          Joi.object({ name: Joi.string().required(), version: Joi.string().required() }),
        ),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const generatorService = Container.get(GeneratorService);
        return await generatorService.generateNodeApp(req.body as GenerateRequest);
      } catch (e) {
        console.log(' error ', e);
        return next(e);
      }
    },
  );
};
