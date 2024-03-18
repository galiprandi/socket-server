import fp from 'fastify-plugin'
import cors from '@fastify/cors'
import { type FastifyError } from 'fastify'
import { type FastifyInstance } from 'fastify/types/instance'
import { type FastifyPluginOptions } from 'fastify/types/plugin'
import { serverSetting } from '../../schemas/server.schema'

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
