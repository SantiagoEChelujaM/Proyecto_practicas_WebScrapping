// index.js
import express from "express";
import cors    from "cors";
import mysql   from "mysql2";
import dotenv  from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

// Configuración de conexión a MySQL
const db = mysql.createConnection({
  host:     process.env.DB_HOST     || "localhost",
  user:     process.env.DB_USER     || "root",
  password: process.env.DB_PASS     || "Phoslyte124096",
  database: process.env.DB_DATABASE || "practicas",
  port:     Number(process.env.DB_PORT) || 3306
});

db.connect(err => {
  if (err) {
    console.error("Error de conexión:", err.stack);
    process.exit(1);
  }
  console.log("✅ Conectado a MySQL (practicas)");
});

app.get("/all-data", async (_req, res) => {
  try {
    const sql = `
      SELECT
        n.id_noticia,
        n.titulo,
        n.url_noticia,
        n.clasificacion,
        p.url_pagina AS pagina_origen
      FROM noticias n
      JOIN paginas p
        ON n.id_pagina_fuente = p.id_pagina;
    `;
    const [rows] = await db.promise().query(sql);
    res.json(rows);
  } catch (error) {
    console.error("Error en /all-data:", error.message);
    res.status(500).send("Error en la consulta");
  }
});

app.get("/", (_req, res) => {
  res.send("✅ API Noticias-practicas funcionando");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);
