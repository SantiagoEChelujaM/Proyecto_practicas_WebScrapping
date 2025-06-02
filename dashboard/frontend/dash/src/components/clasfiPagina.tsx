"use client"
import { useEffect, useState } from "react"
import { Card, Title, BarChart } from "@tremor/react"

interface Noticia {
  id_noticia: number
  titulo: string
  fecha: Date
  url_noticia: string
  clasificacion: string
  id_pagina_fuente: string
}

const paginasFuente: Record<string, string> = {
  "1": "laverdadnoticias.com",
  "2": "yucatan.com.mx",
  "3": "quintafuerza.mx",
  "4": "quintanaroohoy.com",
}

export const BartChartPaginas = () => {
  const [chartdata, setChartdata] = useState<{ name: string; count: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/noticias")
        const data: Noticia[] = await res.json()

        const conteo: Record<string, number> = {}
        data.forEach((noticia) => {
          const idFuente = noticia.id_pagina_fuente
          conteo[idFuente] = (conteo[idFuente] || 0) + 1
        })

        const formateado = Object.entries(conteo).map(([id, count]) => ({
          name: paginasFuente[id] || `Página ${id}`,
          count,
        }))

        setChartdata(formateado)
      } catch (error) {
        console.error("Error al obtener noticias:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNoticias()
  }, [])

  return (
    <Card className="w-full overflow-x-auto rounded shadow p-4">
      <Title className="mb-2">Noticias por página fuente</Title>
      <BarChart
        className="h-64"
        data={chartdata}
        index="name"
        categories={["count"]}
        colors={["blue"]}
        layout="vertical"
        yAxisWidth={120}
      />
    </Card>
  )
}
