import { SaveProfilePictureController, Controller } from '@/application/controllers'
import { Required, RequiredBuffer, AllowedMimeTypes, MaxFileSize } from '@/application/validation'

describe('SaveProfilePictureController', () => {
  let buffer: Buffer
  let mimeType: string
  let userId: string
  let file: { buffer: Buffer, mimeType: string }
  let sut: SaveProfilePictureController
  let changeProfilePicture: jest.Mock

  beforeAll(() => {
    buffer = Buffer.from('any_buffer')
    mimeType = 'image/png'
    userId = 'any_user_id'
    file = { buffer, mimeType }
    changeProfilePicture = jest.fn()
    changeProfilePicture.mockResolvedValue({ initials: 'any_initials', pictureUrl: 'any_url' })
  })

  beforeEach(() => {
    sut = new SaveProfilePictureController(changeProfilePicture)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly on save', async () => {
    const validators = sut.buildValidators({ file, userId })

    expect(validators).toEqual([
      new Required(file, 'file'),
      new RequiredBuffer(buffer, 'file'),
      new AllowedMimeTypes(['png', 'jpg'], mimeType),
      new MaxFileSize(5, buffer)
    ])
  })

  it('should build Validators correctly on delete', async () => {
    const validators = sut.buildValidators({ file: undefined, userId })

    expect(validators).toEqual([])
  })

  it('should call ChangeProfilePicture with correct params', async () => {
    await sut.execute({ file, userId })

    expect(changeProfilePicture).toHaveBeenCalledTimes(1)
    expect(changeProfilePicture).toHaveBeenCalledWith({ userId, file })
  })

  it('should return 200 with valid data', async () => {
    const httpResponse = await sut.execute({ file, userId })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { initials: 'any_initials', pictureUrl: 'any_url' }
    })
  })
})
