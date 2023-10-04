const http = require('http')
const fs = require('fs')
const path = require('path')

const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  // Obtenez le chemin du fichier demandé
  let filePath = '.' + req.url

  if (filePath === './') {
    // Si aucune URL spécifique n'est demandée, servez l'index.html par défaut
    filePath = './index.html'
  }

  // Obtenez l'extension du fichier
  const extname = String(path.extname(filePath)).toLowerCase()

  // Associez les extensions de fichiers aux types de contenu MIME
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif'
  }

  const contentType = mimeTypes[extname] || 'application/octet-stream'

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.end('404 Not Found')
      } else {
        res.writeHead(500)
        res.end(`Internal Server Error: ${error.code}`)
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(content, 'utf-8')
    }
  })
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
