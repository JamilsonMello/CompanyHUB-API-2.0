import { Router } from 'express'
import { adapMiddleware } from '../../adapters/expressMiddleware.adapter'
import { makeDeleteController } from '../../factories/controller/service/deleteServiceController'
import { makeAuthMiddleware } from '../../factories/middlewares/authMiddleware'

const routes = Router()

routes.delete(
  '/services/:id',
  adapMiddleware(makeAuthMiddleware(false)),
  makeDeleteController()
)

export default routes