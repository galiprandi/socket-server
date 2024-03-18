import fastify, {
  type FastifyBaseLogger,
  type FastifyPluginCallback,
  type FastifyPluginOptions,
  type FastifyTypeProvider,
  type RawServerDefault,
  type FastifyServerOptions
} from 'fastify'

// Plugins
import webSocket from './plugins/webSocket.js'
import cors from './plugins/cors.js'

export const createServer = (options?: FastifyServerOptions) => {
  const srv = fastify({ logger: true, ...options })

  void srv.register(
    webSocket as FastifyPluginCallback<
      FastifyPluginOptions,
      RawServerDefault,
      FastifyTypeProvider,
      FastifyBaseLogger
    >
  )

  void srv.register(cors as FastifyPluginCallback)

  srv.get('/', (req, res) => {
    void res.send({ status: 'ok' })
  })

  return srv
}
