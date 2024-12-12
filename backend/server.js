const express = require('express');
const cors = require('cors');
const { Client } = require('pg');

const app = express();
const port = 5000;

const client = new Client({
  user: process.env.DB_USER,       
  host: process.env.DB_HOST,      
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,       
});

client.connect();

app.use(cors());

app.get('/api/mensajes', async (req, res) => {
  try {
    const result = await client.query('SELECT name FROM mensajes');
    const mensaje = result.rows[0].name;
    res.send(mensaje);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al conectar a la base de datos');
  }
});

app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
