import { adaptExpressMiddleware } from '@/main/adapters'
import { makeAuthenticationMiddleware } from '@/main/factories/middlewares'

const authenticationMiddleware = makeAuthenticationMiddleware()
export const auth = adaptExpressMiddleware(authenticationMiddleware)
