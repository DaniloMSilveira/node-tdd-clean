import { Required, RequiredString, RequiredBuffer } from '@/application/validation'
import { RequiredFieldError } from '@/application/errors'

describe('Required', () => {
  it('should return RequiredFieldError if value is null', () => {
    const sut = new Required(null as any, 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return RequiredFieldError if value is undefined', () => {
    const sut = new Required(undefined as any, 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return undefined if value is not empty', () => {
    const sut = new Required('any_value', 'any_field')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})

describe('RequiredString', () => {
  it('should extends Required', () => {
    const sut = new RequiredString('any_value', 'any_field')

    expect(sut).toBeInstanceOf(Required)
  })

  it('should return RequiredFieldError if value is empty', () => {
    const sut = new RequiredString('', 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return undefined if value is not empty', () => {
    const sut = new RequiredString('any_value', 'any_field')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})

describe('RequiredBuffer', () => {
  it('should extends Required', () => {
    const sut = new RequiredBuffer(Buffer.from('any_value'), 'any_field')

    expect(sut).toBeInstanceOf(Required)
  })

  it('should return RequiredFieldError if value is empty', () => {
    const sut = new RequiredBuffer(Buffer.from(''), 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return undefined if value is not empty', () => {
    const sut = new RequiredBuffer(Buffer.from('any_value'), 'any_field')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
