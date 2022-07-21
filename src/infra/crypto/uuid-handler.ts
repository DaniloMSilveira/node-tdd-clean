import { v4 } from 'uuid'
import { UUIDGenerator } from '@/domain/contracts/crypto'

export class UUIDHandler {
  uuid ({ key }: UUIDGenerator.Params): UUIDGenerator.Result {
    const generatedHash = v4()
    return `${key}_${generatedHash}`
  }
}
