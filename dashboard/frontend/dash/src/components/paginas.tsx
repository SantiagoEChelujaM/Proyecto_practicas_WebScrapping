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
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Text } from '@tremor/react';


interface Paginas {
  id_pagina: number
  url_pagina: string
}


export function PaginaTable() {
  const [noticias, setPaginas] = useState<Paginas[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPaginas = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/paginas") // Cambia esta URL por la tuya
        const data = await res.json()
        setPaginas(data)
      } catch (error) {
        console.error("Error al obtener noticias:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPaginas()
  }, [])

  return (
    <div className="w-full  mx-auto overflow-x-auto">
         <div className="max-h-[400px] overflow-y-auto border border-gray-200 rounded-md">
      {loading ? (
        <p className="text-center py-4">Cargando noticias...</p>
      ) : (
        <TableRoot className="text-sm w-full h-full">
          <Table className="min-w-full">
            <TableHead>
              <TableRow>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>URL</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {noticias.map((pagina) => (
                <TableRow key={pagina.id_pagina}>
                  <TableCell className="max-w-[300px] truncate">
                    <a>
                      {pagina.id_pagina}
                    </a>
                  </TableCell>
                  <TableCell>
                    {pagina.url_pagina}
                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableRoot>
      )}
      </div>
    </div>
  )
}