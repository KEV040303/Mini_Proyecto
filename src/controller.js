import { pool } from './db.js'
import fs from 'fs'

export const html = async (req, res) => {
  fs.readFile('./index.html', 'utf8', (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end('404 Not Found')
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(data)
    }
  })
}

export const usuarios = async (req, res) => {
  try {
    const data = await pool.query('SELECT * FROM usuarios')
    const response = JSON.stringify(data[0])
    console.log('Usuarios mostrados con éxito')
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(response)
  } catch (err) {
    console.error('Error al obtener usuarios\n', err)
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Internal Server Error')
  }
}

export const usuariosExport = async (req, res) => {
  try {
    const data = await pool.query('SELECT * FROM usuarios')
    const users = data[0]

    let csvContent = 'id,nombres,apellidos,direccion,correo_electronico,dni,edad,fecha_creacion,telefono\n'
    users.forEach(user => {
      const fechaCreacion = new Date(user.fecha_creacion).toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      csvContent += `${user.id},${user.nombres},${user.apellidos},${user.direccion},${user.correo_electronico},${user.dni},${user.edad},${fechaCreacion},${user.telefono}\n`
    })

    const response = {
      mensaje: 'Los siguientes datos se exportaron',
      users
    }
    await fs.promises.writeFile('usuarios.csv', csvContent, 'utf-8')
    console.log('Usuarios exportados con exito.')
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify(response))
  } catch (error) {
    console.error('Error al exportar usuarios\n', error)
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Internal Server Error')
  }
}

export const usuariosImport = async (req, res) => {
  try {
    const csvData = await fs.promises.readFile('usuarios.csv', 'utf-8')
    const rows = csvData.split('\n').filter(row => row.trim() !== '')
    const totalDatosCSV = rows.length - 1
    const usuariosAgregados = []

    for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i].trim().split(',')

      if (rowData.length < 9) {
        console.log(`Error en la fila ${i + 1}: La fila CSV no tiene suficientes elementos.`)
        continue
      }

      const existingUser = await pool.query('SELECT * FROM usuarios WHERE correo_electronico = ?', [rowData[4].trim()])

      if (existingUser[0].length > 0) {
        console.log(`El usuario con correo electrónico ${rowData[4].trim()} ya existe en la base de datos. No se agregará.`)
        continue
      }

      await pool.query(
        'INSERT INTO usuarios (nombres, apellidos, direccion, correo_electronico, dni, edad, fecha_creacion, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          rowData[1].trim(),
          rowData[2].trim(),
          rowData[3].trim(),
          rowData[4].trim(),
          rowData[5].trim(),
          rowData[6].trim(),
          new Date(rowData[7].trim()),
          rowData[8].trim()
        ]
      )

      usuariosAgregados.push({
        nombres: rowData[1].trim(),
        apellidos: rowData[2].trim(),
        correo_electronico: rowData[4].trim()
      })
    }

    let mensaje = ''
    if (usuariosAgregados.length === totalDatosCSV) {
      mensaje = 'Todos los datos se subieron con éxito'
      console.log('Usuarios importados con éxito.')
    } else if (usuariosAgregados.length < totalDatosCSV && usuariosAgregados.length > 0) {
      mensaje = 'Se subieron los siguientes datos'
      console.log('Los datos no repetidos se subieron')
    } else {
      mensaje = 'Ningún dato se subió porque todos están duplicados'
      console.log('Todos los datos están repetidos')
    }

    const response = {
      message: mensaje,
      usuariosAgregados
    }

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(response))
  } catch (error) {
    console.error('Error al importar usuarios\n', error)
    res.writeHead(500, { 'Content-Type': 'text/plain' })
    res.end('Internal Server Error')
  }
}
