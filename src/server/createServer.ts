import fastify, {
  type FastifyBaseLogger,
  type FastifyPluginCallback,
  type FastifyPluginOptions,
  type FastifyTypeProvider,
  type RawServerDefault,
  type FastifyServerOptions
} from 'fastify'

// Plugins
import socketIoPlugging from './plugins/socketIo'

export const createServer = (options?: FastifyServerOptions) => {
  const srv = fastify({ logger: true, ...options })

  void srv.register(
    socketIoPlugging as FastifyPluginCallback<
      FastifyPluginOptions,
      RawServerDefault,
      FastifyTypeProvider,
      FastifyBaseLogger
    >
  )

  srv.get('/', (req, res) => {
    void res.send({ status: 'ok' })
  })

  return srv
}
