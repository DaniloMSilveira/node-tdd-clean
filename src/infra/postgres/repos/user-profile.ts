import { getRepository } from 'typeorm'

import { LoadUserProfile, SaveUserPicture } from '@/domain/contracts/repos'
import { PgUser } from '@/infra/postgres/entities'

export class PgUserProfileRepository implements SaveUserPicture, LoadUserProfile {
  async savePicture ({ id, pictureUrl, initials }: SaveUserPicture.Params): Promise<void> {
    const pgUserRepo = getRepository(PgUser)
    await pgUserRepo.update(
      { id: parseInt(id) },
      { pictureUrl, initials }
    )
  }

  async load ({ id }: LoadUserProfile.Params): Promise<LoadUserProfile.Result> {
    const pgUserRepo = getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ id: parseInt(id) })
    if (pgUser) {
      return {
        name: pgUser?.name
      }
    }
  }
}
