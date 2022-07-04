import { FacebookAuthenticationService } from '@/data/services'
import { makeFacebookApi } from '@/main/factories/apis'
import { makePgUserAccountRepository } from '@/main/factories/repos'
import { makeJwtTokenGenerator } from '../crypto'

export const makeFacebookAuthenticationService = (): FacebookAuthenticationService => {
  const fbApi = makeFacebookApi()
  const pgUserAccountRepo = makePgUserAccountRepository()
  const jwtTokenGenerator = makeJwtTokenGenerator()
  return new FacebookAuthenticationService(
    fbApi,
    pgUserAccountRepo,
    jwtTokenGenerator
  )
}
