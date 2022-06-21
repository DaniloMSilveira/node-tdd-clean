import { HttpResponse, unauthorized, ok } from '@/application/helpers'
import { ValidationBuilder, Validator } from '@/application/validation'
import { Controller } from '@/application/controllers'
import { FacebookAuthentication } from '@/domain/usecases'
import { AccessToken } from '@/domain/models'

type HttpRequest = {
  token: string
}

type Model = Error | {
  accessToken: string
}

export class FacebookLoginController extends Controller {
  constructor (private readonly facebookAuthentication: FacebookAuthentication) {
    super()
  }

  async execute (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const accessToken = await this.facebookAuthentication.execute({ token: httpRequest.token })
    return accessToken instanceof AccessToken
      ? ok({ accessToken: accessToken.value })
      : unauthorized()
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...ValidationBuilder.of({ value: httpRequest.token, fieldName: 'token' }).required().build()
    ]
  }
}
