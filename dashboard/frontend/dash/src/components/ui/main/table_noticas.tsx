"use client"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/Table"
import { Badge } from "@/components/Badge"

interface Noticia {
  id_noticia: number
  titulo: string
  url_noticia: string
  clasificacion: string
  id_pagina_fuente: string
}

export function NoticiasTable() {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/noticias")
        const data = await res.json()
        setNoticias(data)
      } catch (error) {
        console.error("Error al obtener noticias:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNoticias()
  }, [])

  return (
    <div className="w-full h-full border border-gray-200 rounded-md flex flex-col">
      {loading ? (
        <p className="text-center py-4">Cargando noticias...</p>
      ) : (
        <>
          {/* Header fijo */}
          <div className="shrink-0">
            <TableRoot className="w-full text-sm">
              <Table className="min-w-full">
                <TableHead className="sticky top-0 bg-white z-10">
                  <TableRow>
                    <TableHeaderCell className="w-[40%]">Título</TableHeaderCell>
                    <TableHeaderCell className="w-[15%] text-center">Clasificación</TableHeaderCell>
                    <TableHeaderCell className="w-[15%] text-center">Página origen</TableHeaderCell>
                    <TableHeaderCell className="w-[15%] text-center">Url de noticia</TableHeaderCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableRoot>
          </div>

          {/* Body con scroll */}
          <div className="flex-1 overflow-y-auto">
            <TableRoot className="w-full text-sm">
              <Table className="min-w-full">
                <TableBody>
                  {noticias.map((noticia) => (
                    <TableRow key={noticia.id_noticia}>
                      <TableCell className="max-w-[300px] truncate">
                        {noticia.titulo}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={
                            noticia.clasificacion === "positivo"
                              ? "success"
                              : noticia.clasificacion === "negativo"
                              ? "error"
                              : "default"
                          }
                        >
                          {noticia.clasificacion}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {noticia.id_pagina_fuente}
                      </TableCell>
                      <TableCell className="text-center">
                        <a
                          href={noticia.url_noticia}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          Ver noticia
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableRoot>
          </div>
        </>
      )}
    </div>
  )
}
