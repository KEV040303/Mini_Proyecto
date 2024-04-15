import http from 'http'
import { PORT } from './config.js'
import { html, usuarios, usuariosExport, usuariosImport } from './controller.js'

export const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET') {
    switch (url) {
      case '/':
        html(req, res)
        break

      case '/api/usuarios':
        usuarios(req, res)
        break

      case '/api/usuarios/export':
        usuariosExport(req, res)
        break

      case '/api/usuarios/import':
        usuariosImport(req, res)
        break

      default:
        res.writeHead(404, { 'Content-type': 'text/plain' })
        res.end('404 Not Found')
        break
    }
  }
})

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
