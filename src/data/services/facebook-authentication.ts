import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/usecases'
import { FacebookAccount } from '@/domain/models/facebook-account'
import { LoadFacebookUserApi } from '@/data/contracts/api'
import {
  LoadUserAccountRepository,
  SaveFacebookAccountRepository
} from '@/data/contracts/repos'

export class FacebookAuthenticationService {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & SaveFacebookAccountRepository
  ) {}

  async execute (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.facebookApi.loadUser(params)

    if (fbData) {
      const accountData = await this.userAccountRepo.load({ email: fbData?.email })
      const fbAccount = new FacebookAccount(fbData, accountData)
      await this.userAccountRepo.saveWithFacebook(fbAccount)
    }

    return new AuthenticationError()
  }
}
