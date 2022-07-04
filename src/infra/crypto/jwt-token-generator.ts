import { sign } from 'jsonwebtoken'

import { TokenGenerator } from '@/data/contracts/crypto'

type Params = TokenGenerator.Params
type Result = TokenGenerator.Result

export class JwtTokenGenerator {
  constructor (private readonly secret: string) {}

  async generateToken (params: Params): Promise<Result> {
    const expirationInSeconds = params.expirationInMs / 1000
    return sign({ key: params.key }, this.secret, { expiresIn: expirationInSeconds })
  }
}
