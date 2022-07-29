import { SaveProfilePictureController } from '@/application/controllers'
import { makeChangeProfilePicture } from '@/main/factories/usecases'

export const makeSaveProfilePictureController = (): SaveProfilePictureController => {
  const changeProfilePictureService = makeChangeProfilePicture()
  return new SaveProfilePictureController(changeProfilePictureService)
}
