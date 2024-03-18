import { serverSetting } from './schemas/server.schema.js'
import { createServer } from './server/createServer.js'

const { PORT, HOST } = serverSetting

;(() => {
  const app = createServer({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: true,
          ignore: 'pid,hostname,reqId,req,res,responseTime'
        }
      }
    }
  })

  app.listen(
    {
      port: Number(PORT),
      host: HOST,
      listenTextResolver: (address) => `🚀 Server listening at ${address}`
    },
    (err) => {
      if (err != null) {
        console.error(err)
        process.exit(1)
      }
    }
  )
})()
