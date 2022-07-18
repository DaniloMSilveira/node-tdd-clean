import { mock, MockProxy } from 'jest-mock-extended'
import { ChangeProfilePicture, setupChangeProfilePicture } from '@/domain/usecases'
import { UUIDGenerator } from '@/domain/contracts/crypto'
import { UploadFile, DeleteFile } from '@/domain/contracts/storage'
import { SaveUserPicture, LoadUserProfile } from '@/domain/contracts/repos'
import { UserProfile } from '@/domain/models'
import { mocked } from 'ts-jest/utils'

jest.mock('@/domain/models/user-profile')

describe('ChangeProfilePicture', () => {
  let hash: string
  let file: Buffer
  let fileStorage: MockProxy<UploadFile & DeleteFile>
  let hashGenerator: MockProxy<UUIDGenerator>
  let userProfileRepo: MockProxy<SaveUserPicture & LoadUserProfile>
  let sut: ChangeProfilePicture

  beforeAll(() => {
    hash = 'any_hash'
    file = Buffer.from('any_buffer')
    fileStorage = mock()
    fileStorage.upload.mockResolvedValue('any_url')
    hashGenerator = mock()
    hashGenerator.generate.mockReturnValue(hash)
    userProfileRepo = mock()
    userProfileRepo.load.mockResolvedValue({ name: 'Danilo Martin da Silveira' })
  })

  beforeEach(() => {
    sut = setupChangeProfilePicture(fileStorage, hashGenerator, userProfileRepo)
  })

  it('should call UploadFile with correct params', async () => {
    await sut({ userId: 'any_user_id', file })

    expect(fileStorage.upload).toHaveBeenCalledWith({ file, key: hash })
    expect(fileStorage.upload).toHaveBeenCalledTimes(1)
  })

  it('should not call UploadFile when file is undefined', async () => {
    await sut({ userId: 'any_user_id', file: undefined })

    expect(fileStorage.upload).not.toHaveBeenCalled()
  })

  it('should call SaveUserPicture with correct params', async () => {
    await sut({ userId: 'any_user_id', file })

    expect(userProfileRepo.savePicture).toHaveBeenCalledWith(mocked(UserProfile).mock.instances[0])
    expect(userProfileRepo.savePicture).toHaveBeenCalledTimes(1)
  })

  it('should call LoadUserProfile with correct params', async () => {
    await sut({ userId: 'any_user_id', file: undefined })

    expect(userProfileRepo.load).toHaveBeenCalledWith({ id: 'any_user_id' })
    expect(userProfileRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should not call LoadUserProfile with file exists', async () => {
    await sut({ userId: 'any_user_id', file })

    expect(userProfileRepo.load).not.toHaveBeenCalled()
  })

  it('should return correct data on success', async () => {
    mocked(UserProfile).mockImplementationOnce(id => ({
      setPicture: jest.fn(),
      id: 'any_id',
      pictureUrl: 'any_url',
      initials: 'any_initials'
    }))

    const result = await sut({ userId: 'any_user_id', file })

    expect(result).toMatchObject({
      pictureUrl: 'any_url',
      initials: 'any_initials'
    })
  })

  it('should call DeleteFile when file exists and SaveUserPicture throws', async () => {
    userProfileRepo.savePicture.mockRejectedValueOnce(new Error())
    expect.assertions(2)

    const promise = sut({ userId: 'any_user_id', file })

    promise.catch(() => {
      expect(fileStorage.delete).toHaveBeenCalledWith({ key: hash })
      expect(fileStorage.delete).toHaveBeenCalledTimes(1)
    })
  })

  it('should not call DeleteFile when file does not exists and SaveUserPicture throws', async () => {
    userProfileRepo.savePicture.mockRejectedValueOnce(new Error())
    expect.assertions(1)

    const promise = sut({ userId: 'any_user_id', file: undefined })

    promise.catch(() => {
      expect(fileStorage.delete).not.toHaveBeenCalled()
    })
  })

  it('should rethrow if SaveUserPicture throws', async () => {
    const error = new Error('save_error')
    userProfileRepo.savePicture.mockRejectedValueOnce(error)

    const promise = sut({ userId: 'any_user_id', file })

    await expect(promise).rejects.toThrow(error)
  })
})
