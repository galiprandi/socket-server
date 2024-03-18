import fp from 'fastify-plugin'
import cors from '@fastify/cors'
import {
  type FastifyInstance,
  type FastifyPluginOptions,
  type FastifyError
} from 'fastify'
import { serverSetting } from '../../schemas/server.schema.js'

const { CORS: origin } = serverSetting

const fastifyPlugin = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (error?: FastifyError) => void
) => {
  void fastify.register(cors, {
    origin,
    ...options
  })
  fastify.log.info('🔌 PLugin: Cors registered')

  done()
}
export default fp(fastifyPlugin, {
  fastify: '>=4.x.x',
  name: 'cors'
})
