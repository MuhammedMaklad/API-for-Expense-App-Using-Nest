import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const method = req.method;
  const url = req.url;
  const timestamp = new Date().toISOString();

  Logger.log(
    `[${timestamp}] ${method} request to ${url}`,
  );
  next();
}