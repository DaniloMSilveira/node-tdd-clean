import { UUIDGenerator } from '@/domain/contracts/crypto'
import { UploadFile, DeleteFile } from '@/domain/contracts/storage'
import { SaveUserPicture, LoadUserProfile } from '@/domain/contracts/repos'
import { UserProfile } from '@/domain/models'

type Params = {
  userId: string
  file?: Buffer
}

type Result = {
  pictureUrl?: string
  initials?: string
}

export type ChangeProfilePicture = (params: Params) => Promise<Result>

type Setup = (
  fileStorage: UploadFile & DeleteFile,
  hashGenerator: UUIDGenerator,
  userProfileRepo: SaveUserPicture & LoadUserProfile
) => ChangeProfilePicture

export const setupChangeProfilePicture: Setup = (
  fileStorage,
  hashGenerator,
  userProfileRepo
) => async ({ userId, file }) => {
  const key = hashGenerator.generate({ key: userId })
  const data: { pictureUrl?: string, name?: string } = {}

  if (file) {
    data.pictureUrl = await fileStorage.upload({ file, key })
  } else {
    data.name = (await userProfileRepo.load({ id: userId })).name
  }

  const userProfile = new UserProfile(userId)
  userProfile.setPicture(data)

  try {
    await userProfileRepo.savePicture(userProfile)
  } catch (error) {
    if (file) {
      await fileStorage.delete({ key })
    }
    throw error
  }

  return userProfile
}
