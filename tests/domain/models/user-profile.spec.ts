import { UserProfile } from '@/domain/models'

describe('UserProfile', () => {
  let sut: UserProfile

  beforeEach(() => {
    sut = new UserProfile('any_user_id')
  })

  it('should create with empty initials when pictureUrl is provided', () => {
    sut.setPicture({ pictureUrl: 'any_url', name: 'any_name' })

    expect(sut).toEqual({
      id: 'any_user_id',
      pictureUrl: 'any_url',
      initials: undefined
    })
  })

  it('should create with empty initials when pictureUrl is provided', () => {
    sut.setPicture({ pictureUrl: 'any_url' })

    expect(sut).toEqual({
      id: 'any_user_id',
      pictureUrl: 'any_url',
      initials: undefined
    })
  })

  it('should create initials with first letter of first and last names', () => {
    sut.setPicture({ name: 'Danilo Martin da Silveira' })

    expect(sut).toEqual({
      id: 'any_user_id',
      pictureUrl: undefined,
      initials: 'DS'
    })
  })

  it('should create initials with first two letters of first name', () => {
    sut.setPicture({ name: 'Danilo' })

    expect(sut).toEqual({
      id: 'any_user_id',
      pictureUrl: undefined,
      initials: 'DA'
    })
  })

  it('should create initials with first letter of name', () => {
    sut.setPicture({ name: 'D' })

    expect(sut).toEqual({
      id: 'any_user_id',
      pictureUrl: undefined,
      initials: 'D'
    })
  })

  it('should create with empty initials when name are not provided', () => {
    sut.setPicture({ name: '' })

    expect(sut).toEqual({
      id: 'any_user_id',
      pictureUrl: undefined,
      initials: undefined
    })
  })

  it('should create with empty initials when name and pictureUrl are not provided', () => {
    sut.setPicture({})

    expect(sut).toEqual({
      id: 'any_user_id',
      pictureUrl: undefined,
      initials: undefined
    })
  })
})
