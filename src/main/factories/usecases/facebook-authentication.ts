import { setupFacebookAuthentication, FacebookAuthentication } from '@/domain/usecases'
import { makeFacebookApi } from '@/main/factories/apis'
import { makePgUserAccountRepository } from '@/main/factories/repos'
import { makeJwtTokenGenerator } from '../crypto'

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  const fbApi = makeFacebookApi()
  const pgUserAccountRepo = makePgUserAccountRepository()
  const jwtTokenGenerator = makeJwtTokenGenerator()
  return setupFacebookAuthentication(
    fbApi,
    pgUserAccountRepo,
    jwtTokenGenerator
  )
}
