import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('Facebook Api Integration Tests', () => {
  let axiosClient: AxiosHttpClient
  let sut: FacebookApi

  beforeEach(() => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )
  })

  it('should return a Facebook User if token is valid', async () => {
    const fbUser = await sut.loadUser({ token: 'EAAGVhybZBdSIBAPZCHAbuTwP41eZC6w5lJFyzNtKQyIKbtiCXjvs4JMc5fbA2mih8v3FCxK0Wzns6ZCnxy6GFKfgZCQ2xVGISG1ITeXxXzMLHOAXjfuQJbDRDLhaKeSZCs7YeQLTOsmPZB1eMYEOB4bMtMIpm20VuArFNSYNfJD7xKM6Yg0yDRNQHYpckXLZCoRamUU01bxWrhScqUqR9BMs' })

    expect(fbUser).toEqual({
      facebookId: '108133808608973',
      email: 'test_yaqgjah_user@tfbnw.net',
      name: 'Test User'
    })
  })

  it('should return undefined if token is invalid', async () => {
    const fbUser = await sut.loadUser({ token: 'invalid_token' })

    expect(fbUser).toBeUndefined()
  })
})
