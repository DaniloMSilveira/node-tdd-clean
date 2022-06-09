export class AccessToken {
  constructor (private readonly value: string) {

  }

  static get getExpirationInMs (): number {
    return 1800000
  }
}
