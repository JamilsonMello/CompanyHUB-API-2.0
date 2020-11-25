import { IHttpRequest } from '@/presentation/protocols'
import { IMiddleware } from '@/presentation/protocols/middleware'
import { NextFunction, Request, Response } from 'express'

export const adapMiddleware = (middleware: IMiddleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: IHttpRequest = {
      headers: req.headers,
      body: req.body
    }

    const httpResponse = await middleware.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body)
      next()
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}