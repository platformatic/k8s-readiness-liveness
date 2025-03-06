import fastify from 'fastify'

export function create () {
  const app = fastify({ logger: true, hostname: process.env.PLT_SERVER_HOSTNAME })

  let status = true

  globalThis.platformatic.setCustomHealthCheck(async () => {
    return status
  })

  app.get('/', (req, res) => {
    res.send('Hello')
  })

  app.get('/set/status', (req, res) => {
    status = req.query.status === 'true'
    res.send('service status is now set to ' + status)
  })

  // Health check endpoints for Kubernetes probes
  app.get('/status', async (req, res) => {
      res.send({ status: 'ok' })
  })

  app.get('/ready', async (req, res) => {
      res.send({ status: 'ready' })
  })

  return app
}
