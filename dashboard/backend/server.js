const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
app.use(cors());

// Configura la conexión a MySQL
const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  database: 'practicas',
  password: 'Phoslyte12096',
  port: 3306,               // Puerto por defecto, cámbialo si es diferente
});

// Conecta a la base de datos
db.connect((err) => {
    if (err) {
        console.error("Error de conexión: " + err.stack);
        return;
    }
    console.log("Conectado a MySQL");
});

// Ejemplo de ruta para obtener datos
app.get("/datos", (req, res) => {
    db.query("SELECT * FROM datos", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(5000, () => {
    console.log("Servidor en puerto 5000");
});
