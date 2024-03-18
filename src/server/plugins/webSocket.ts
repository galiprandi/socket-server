import fp from 'fastify-plugin'
import {
  type FastifyError,
  type FastifyPluginOptions,
  type FastifyInstance
} from 'fastify'
import { Server } from 'socket.io'
import {
  type ClientToServerEvents,
  type ServerToClientEvents,
  type InterServerEvents,
  type SocketData
} from '../types/server.types.js'

const fastifyPlugin = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (error?: FastifyError) => void
) => {
  fastify.decorate(
    'io',
    new Server<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >(fastify.server, options)
  )

  fastify.addHook('onClose', (fastify: FastifyInstance, done) => {
    fastify.io.close()
    done()
  })

  fastify.log.info('🔌 PLugin: Web Socket registered')

  done()
}
export default fp(fastifyPlugin, {
  fastify: '>=4.x.x',
  name: 'web-socket'
})

declare module 'fastify' {
  interface FastifyInstance {
    io: Server<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >
  }
}
