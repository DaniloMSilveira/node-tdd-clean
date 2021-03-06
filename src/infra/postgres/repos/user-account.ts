import { getRepository } from 'typeorm'

import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/domain/contracts/repos'
import { PgUser } from '@/infra/postgres/entities'

type LoadParams = LoadUserAccountRepository.Params
type LoadResult = LoadUserAccountRepository.Result
type SaveParams = SaveFacebookAccountRepository.Params
type SaveResult = SaveFacebookAccountRepository.Result

export class PgUserAccountRepository implements LoadUserAccountRepository, SaveFacebookAccountRepository {
  async load (params: LoadParams): Promise<LoadResult> {
    const pgUserRepo = getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email: params.email })
    if (pgUser) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }

  async saveWithFacebook (params: SaveParams): Promise<SaveResult> {
    const pgUserRepo = getRepository(PgUser)
    let id: string

    if (!params.id) {
      const pgUser = await pgUserRepo.save({
        email: params.email,
        name: params.name,
        facebookId: params.facebookId
      })

      id = pgUser.id.toString()
    } else {
      id = params.id

      await pgUserRepo.update({
        id: parseInt(id)
      }, {
        name: params.name,
        facebookId: params.facebookId
      }
      )
    }

    return { id: id.toString() }
  }
}
