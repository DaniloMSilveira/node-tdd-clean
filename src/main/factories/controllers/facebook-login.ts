import { FacebookLoginController } from '@/application/controllers'
import { makeFacebookAuthentication } from '@/main/factories/usecases'

export const makeFacebookLoginController = (): FacebookLoginController => {
  const fbAuthService = makeFacebookAuthentication()
  return new FacebookLoginController(fbAuthService)
}
