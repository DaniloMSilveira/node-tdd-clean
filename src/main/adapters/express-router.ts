import { RequestHandler } from 'express'

import { Controller } from '@/application/controllers'

type Adapter = (controller: Controller) => RequestHandler

export const adaptExpressRoute: Adapter = controller => async (req, res) => {
  const { statusCode, data } = await controller.handle({ ...req.body, ...req.locals })
  const result = statusCode.toString().substring(0, 1) === '2' ? data : { error: data.message }
  res.status(statusCode).json(result)
}
