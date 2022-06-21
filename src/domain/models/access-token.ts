export class AccessToken {
  constructor (readonly value: string) {}

  static get getExpirationInMs (): number {
    return 1800000
  }
}
