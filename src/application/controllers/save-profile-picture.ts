import { Controller } from '@/application/controllers'
import { ok, HttpResponse } from '@/application/helpers'
import { ChangeProfilePicture } from '@/domain/usecases'
import { Validator, ValidationBuilder } from '@/application/validation'

type HttpRequest = { file?: { buffer: Buffer, mimeType: string }, userId: string }
type Model = Error | { initials?: string, pictureUrl?: string }

export class SaveProfilePictureController extends Controller {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {
    super()
  }

  async execute ({ file, userId }: HttpRequest): Promise<HttpResponse<Model>> {
    const { initials, pictureUrl } = await this.changeProfilePicture({ userId, file })
    return ok({ initials, pictureUrl })
  }

  override buildValidators ({ file }: HttpRequest): Validator[] {
    if (!file) return []

    return [
      ...ValidationBuilder.of({ value: file, fieldName: 'file' })
        .required()
        .image({ allowed: ['png', 'jpg'], maxSizeInMb: 5 })
        .build()
    ]
  }
}
