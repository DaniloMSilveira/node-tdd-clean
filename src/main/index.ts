import './config/module-alias'
import 'dotenv/config'
import { env } from '@/main/config/env'
import { app } from '@/main/config/app'

import 'reflect-metadata'
import { createConnection } from 'typeorm'

const port = env.app.port

createConnection()
  .then(() => app.listen(port, () => console.log(`Server running at http://localhost:${port}`)))
  .catch(console.error)
