import envVar from 'env-var'

export const env = {
  app: {
    port: envVar.get('APP_PORT').asPortNumber() ?? 8080
  },
  facebookApi: {
    clientId: envVar.get('FB_CLIENT_ID').required().asString(),
    clientSecret: envVar.get('FB_CLIENT_SECRET').required().asString()
  },
  jwtSecret: envVar.get('JWT_SECRET').asString() ?? '5df76d2s7g9s'
}
