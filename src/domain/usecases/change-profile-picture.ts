import { UUIDGenerator } from '@/domain/contracts/crypto'
import { UploadFile, DeleteFile } from '@/domain/contracts/storage'
import { SaveUserPicture, LoadUserProfile } from '@/domain/contracts/repos'
import { UserProfile } from '@/domain/models'

type Params = {
  userId: string
  file?: { buffer: Buffer, mimeType: string }
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
  const data: { pictureUrl?: string, name?: string } = {}
  let key

  if (file) {
    const hash = hashGenerator.generate({ key: userId })
    key = `${hash}.${file?.mimeType.split('/')[1]}`
    data.pictureUrl = await fileStorage.upload({ file: file.buffer, key })
  } else {
    data.name = (await userProfileRepo.load({ id: userId }))?.name
  }

  const userProfile = new UserProfile(userId)
  userProfile.setPicture(data)

  try {
    await userProfileRepo.savePicture(userProfile)
  } catch (error) {
    if (key) {
      await fileStorage.delete({ key })
    }
    throw error
  }

  return userProfile
}
