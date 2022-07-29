import { Router } from 'express'
import { auth } from '@/main/middlewares'
import { makeSaveProfilePictureController } from '@/main/factories/controllers'
import { adaptExpressRoute, adaptMulter as adaptUpload } from '@/main/adapters'

export default (router: Router): void => {
  const controller = makeSaveProfilePictureController()
  router.delete('/users/picture', auth, adaptExpressRoute(controller))
  router.put('/users/picture', auth, adaptUpload, adaptExpressRoute(controller))
}
