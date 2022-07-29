import envVar from 'env-var'

export const env = {
  app: {
    port: envVar.get('APP_PORT').asPortNumber() ?? 8080
  },
  facebookApi: {
    clientId: envVar.get('FB_CLIENT_ID').required().asString(),
    clientSecret: envVar.get('FB_CLIENT_SECRET').required().asString(),
    testToken: envVar.get('FB_TEST_TOKEN').asString() ?? 'token'
  },
  jwtSecret: envVar.get('JWT_SECRET').asString() ?? '5df76d2s7g9s',
  aws: {
    accessKey: envVar.get('AWS_ACCESS_KEY').required().asString(),
    secret: envVar.get('AWS_SECRET').required().asString(),
    bucket: envVar.get('AWS_BUCKET').required().asString()
  }
}
