// Dos cambios pequenos en src/app/chat/ChatClient.tsx para las fotos de documentos:
//  1) cuando la lectura no es de alta confianza (toda foto), el chat avisa que se revisen los numeros
//  2) se quita HEIC de la lista de archivos: el iPhone convierte la foto a JPG al subirla
// Solo modifica el archivo si encuentra exactamente las dos lineas esperadas; si no, no toca nada.
// Uso (en la carpeta taxnorth):  node aplicar-fotos.js
const fs = require('fs')
const path = require('path')

const file = path.join('src', 'app', 'chat', 'ChatClient.tsx')
if (!fs.existsSync(file)) {
  console.log('NO SE PUDO: no encuentro ' + file + '. Ejecuta el comando desde la carpeta taxnorth.')
  process.exit(1)
}

const original = fs.readFileSync(file, 'utf8')
const crlf = original.includes('\r\n')
let text = original.replace(/\r\n/g, '\n')

if (text.includes('A photo can be misread')) {
  console.log('Ya estaba aplicado. No se cambio nada.')
  process.exit(0)
}

const messageAnchor = "${fieldLines || 'No specific fields detected.'}\\n\\n---"
const acceptOld = 'accept="image/jpeg,image/png,image/webp,image/heic,application/pdf"'
const count = (s) => text.split(s).length - 1

if (count(messageAnchor) !== 1 || count(acceptOld) !== 1) {
  console.log('NO SE CAMBIO NADA: ese archivo es distinto al que esperaba (mensaje=' + count(messageAnchor) + ', accept=' + count(acceptOld) + ').')
  console.log('Envia src/app/chat/ChatClient.tsx al chat y lo ajusto.')
  process.exit(1)
}

const messageNew =
  "${fieldLines || 'No specific fields detected.'}" +
  "${result.confidence && result.confidence !== 'high' ? '\\n\\n**Please check every number against your original document before sharing it.**' + (result.source === 'photo' ? ' A photo can be misread; a PDF gives the most accurate reading.' : '') : ''}" +
  "\\n\\n---"

text = text.replace(messageAnchor, () => messageNew)
text = text.replace(acceptOld, 'accept="image/jpeg,image/png,image/webp,application/pdf"')

fs.writeFileSync(file, crlf ? text.replace(/\n/g, '\r\n') : text, 'utf8')
console.log('LISTO: el chat ahora avisa cuando una lectura no es de alta confianza. Ya puedes borrar aplicar-fotos.js.')
