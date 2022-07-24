import { Controller } from '@/application/controllers'
import { ok, HttpResponse } from '@/application/helpers'
import { ChangeProfilePicture } from '@/domain/usecases'
import { Validator, ValidationBuilder } from '@/application/validation'

type HttpRequest = { file: { buffer: Buffer, mimeType: string }, userId: string }
type Model = Error | { initials?: string, pictureUrl?: string }

export class SaveProfilePictureController extends Controller {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {
    super()
  }

  async execute ({ file, userId }: HttpRequest): Promise<HttpResponse<Model>> {
    const data = await this.changeProfilePicture({ userId, file: file.buffer })
    return ok(data)
  }

  override buildValidators ({ file }: HttpRequest): Validator[] {
    return [
      ...ValidationBuilder.of({ value: file, fieldName: 'file' })
        .required()
        .image({ allowed: ['png', 'jpg'], maxSizeInMb: 5 })
        .build()
    ]
  }
}
