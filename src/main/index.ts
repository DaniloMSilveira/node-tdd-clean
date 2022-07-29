import './config/module-alias'
import { env } from '@/main/config/env'

import 'reflect-metadata'
import { createConnection } from 'typeorm'

const port = env.app.port

createConnection()
  .then(async () => {
    const { app } = await import('@/main/config/app')
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
  })
  .catch(console.error)
