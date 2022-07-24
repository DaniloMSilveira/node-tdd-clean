import { InvalidMimeTypeError } from '@/application/errors'

export type Extension = 'png' | 'jpg'

export class AllowedMimeTypes {
  constructor (
    private readonly allowed: Extension[],
    private readonly mimeType: string
  ) {}

  validate (): Error | undefined {
    let isValid = false

    if (this.allowed.includes('png') && this.mimeType === 'image/png') isValid = true
    if (this.allowed.includes('jpg') && this.mimeType === 'image/jpg') isValid = true
    if (this.allowed.includes('jpg') && this.mimeType === 'image/jpeg') isValid = true

    if (!isValid) {
      return new InvalidMimeTypeError(this.allowed)
    }
  }
}
