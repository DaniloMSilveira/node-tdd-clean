import { newDb, IMemoryDb } from 'pg-mem'

export const makeFakeDb = async (): Promise<IMemoryDb> => {
  const db = newDb()
  const connection = await db.adapters.createTypeormConnection({
    type: 'postgres',
    entities: ['src/infra/postgres/entities/index.ts']
  })

  await connection.synchronize()
  return db
}
