import { mocked } from 'ts-jest/utils'
import { v4 } from 'uuid'
import { UUIDHandler } from '@/infra/crypto'

jest.mock('uuid')

describe('UUIDHandler', () => {
  let sut: UUIDHandler

  beforeAll(() => {
    mocked(v4).mockReturnValue('any_uuid')
  })

  beforeEach(() => {
    sut = new UUIDHandler()
  })

  it('should call uuid.v4', () => {
    sut.generate({ key: 'any_key' })

    expect(v4).toHaveBeenCalledTimes(1)
  })

  it('should return correct uuid', () => {
    const uuid = sut.generate({ key: 'any_key' })

    expect(uuid).toBe('any_key_any_uuid')
  })
})
