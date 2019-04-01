import { Router } from 'express'
import UserController from './controllers/UserController'
import AmqpController from './controllers/AmqpController'
import SenderController from './controllers/SenderController'

const routes = Router()

routes.get('/users', UserController.index)
routes.post('/user', UserController.create)
routes.get('/worker', AmqpController.connecting)
routes.get('/sender', SenderController.sender)

export default routes
