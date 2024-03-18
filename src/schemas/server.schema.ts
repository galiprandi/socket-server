import z from 'zod'
const { string } = z

const envSchema = z.object({
  PORT: string().default('3000'),
  HOST: string().default('0.0.0.0'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development')
})

const envServer = envSchema.safeParse({
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  NODE_ENV: process.env.NODE_ENV
})

if (!envServer.success) {
  console.error(envServer.error.issues)
  throw new Error('There is an error with the server environment variables')
}

export const serverSetting = envServer.data

type EnvSchemaType = z.infer<typeof envSchema>

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv extends EnvSchemaType {}
  }
}
