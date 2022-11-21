import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { authMiddleware } from './middlewares/authMiddleware'
import {TransactionsController} from "./controllers/TransactionsController"

const routes = Router()

routes.post('/register', new UserController().create)
routes.post('/login', new UserController().login)

routes.use(authMiddleware)

routes.get('/profile', new UserController().getProfile)
routes.get('/transactions', new TransactionsController().getTransactions)
routes.post('/transaction', new TransactionsController().transaction)



export default routes