import { setupChangeProfilePicture, ChangeProfilePicture } from '@/domain/usecases'
import { makeAwsS3FileStorage } from '@/main/factories/storage'
import { makeUUIDHandler } from '../crypto/uuid-handler'
import { makePgUserProfileRepository } from '../repos'

export const makeChangeProfilePicture = (): ChangeProfilePicture => {
  const fileStorage = makeAwsS3FileStorage()
  const uuidGenerator = makeUUIDHandler()
  const userProfileRepo = makePgUserProfileRepository()
  return setupChangeProfilePicture(
    fileStorage,
    uuidGenerator,
    userProfileRepo
  )
}
