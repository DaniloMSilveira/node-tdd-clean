import { ChangeProfilePicture } from '@/domain/usecases'
import { Controller } from '@/application/controllers'
import { HttpResponse, noContent } from '@/application/helpers'

type HttpRequest = { userId: string }

export class DeleteProfilePictureController extends Controller {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {
    super()
  }

  async execute ({ userId }: HttpRequest): Promise<HttpResponse> {
    await this.changeProfilePicture({ userId })
    return noContent()
  }
}
