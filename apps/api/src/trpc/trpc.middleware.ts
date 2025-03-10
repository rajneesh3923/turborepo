import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { TrpcService } from './trpc.service';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { createContext } from './trpc-init.service';

@Injectable()
export class TrpcMiddleware implements NestMiddleware {
  constructor(private trpcService: TrpcService) {}

  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');

    createExpressMiddleware({
      router: this.trpcService.appRouter,
      createContext: createContext,
    })(req, res, next);
  }
}
