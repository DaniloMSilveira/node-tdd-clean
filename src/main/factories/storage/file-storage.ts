import { AwsS3FileStorage } from '@/infra/storage'
import { env } from '@/main/config/env'

export const makeAwsS3FileStorage = (): AwsS3FileStorage => {
  return new AwsS3FileStorage(
    env.aws.accessKey,
    env.aws.secret,
    env.aws.bucket
  )
}
