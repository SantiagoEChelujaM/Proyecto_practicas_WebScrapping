"use client"

import { useEffect, useState } from "react"
import { Card, Title, BarChart } from "@tremor/react"

interface Noticia {
  clasificacion: string
}

export default function ClasificNoticias() {
  const [datos, setDatos] = useState<Noticia[]>([])

  useEffect(() => {
    fetch("http://localhost:5000/all-data") // tu endpoint
      .then((res) => res.json())
      .then((data) => setDatos(data))
      .catch((err) => console.error("Error al cargar datos:", err))
  }, [])

  const conteo = datos.reduce((acc: Record<string, number>, noticia) => {
    acc[noticia.clasificacion] = (acc[noticia.clasificacion] || 0) + 1
    return acc
  }, {})

  const dataFormateada = Object.entries(conteo).map(([clasificacion, cantidad]) => ({
    tipo: clasificacion,
    cantidad,
  }))

  return (
    <Card className="mt-6">
      <Title>Clasificación de Noticias</Title>
      <BarChart
        className="mt-4 h-72"
        data={dataFormateada}
        index="tipo"
        categories={["cantidad"]}
        colors={["blue"]}
        yAxisWidth={48}
      />
    </Card>
  )
}
