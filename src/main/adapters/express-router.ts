import { RequestHandler } from 'express'

import { Controller } from '@/application/controllers'

type Adapter = (controller: Controller) => RequestHandler

export const adaptExpressRoute: Adapter = controller => async (req, res) => {
  const httpResponse = await controller.handle({ ...req.body })
  const { statusCode, data } = httpResponse
  const result = statusCode === 200 ? data : { error: data.message }
  res.status(statusCode).json(result)
}
