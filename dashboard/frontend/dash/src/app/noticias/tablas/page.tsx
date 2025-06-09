"use client"
import { useNoticias } from "@/components/ui/homepaing/NoticiasContext"
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
import { Input } from "@/components/Input"
import { RotateCcw } from "lucide-react"
import CalendarDropdown from "@/components/ui/main/calendario"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import { Button } from "@/components/Button"
import { Download } from "lucide-react"
import { DateRange } from "react-day-picker"

export default function NoticiasOverview() {
  const {
    noticiasFiltradas,
    setSearch,
    setFiltroFecha,
    setClasificacion,
  } = useNoticias()

  return (
    <section aria-label="Noticias Table">
      <div className="flex flex-col justify-between gap-2 px-4 py-6 sm:flex-row sm:items-center sm:p-6">
        <div className="flex items-center gap-2">
          <Input
            type="search"
            placeholder="Buscar noticias..."
            className="sm:w-64 [&>input]:py-1.5"
            onChange={(e) => setSearch(e.target.value)}
          />
          <RotateCcw className="cursor-pointer" onClick={() => window.location.reload()} />
        </div>
        <div className="flex flex-col items-center gap-2 sm:flex-row">
          <Select onValueChange={(value) => setClasificacion(value)}>
            <SelectTrigger className="w-full py-1.5 sm:w-44">
              <SelectValue placeholder="Clasificación..." />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value=" ">Todas</SelectItem>
              <SelectItem value="positivo">Positivo</SelectItem>
              <SelectItem value="negativo">Negativo</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
            </SelectContent>
          </Select>

          <CalendarDropdown onRangeChange={setFiltroFecha} />

          <Button variant="secondary" className="w-full gap-2 py-1.5 text-base sm:w-fit sm:text-sm">
            <Download className="-ml-0.5 size-4 shrink-0 text-gray-400 dark:text-gray-600" aria-hidden="true" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="w-full border-t border-gray-200 dark:border-gray-800 overflow-y-auto">
        {noticiasFiltradas.length === 0 ? (
          <p className="text-center py-4">No se encontraron noticias...</p>
        ) : (
          <TableRoot className="w-full text-sm">
            <Table className="min-w-full">
              <TableHead className="sticky top-0 bg-white dark:bg-gray-950 z-10">
                <TableRow>
                  <TableHeaderCell className="w-[1%] text-center">Id</TableHeaderCell>
                  <TableHeaderCell className="w-[40%]">Título</TableHeaderCell>
                  <TableHeaderCell className="w-[15%] text-center">Fecha</TableHeaderCell>
                  <TableHeaderCell className="w-[15%] text-center">Clasificación</TableHeaderCell>
                  <TableHeaderCell className="w-[15%] text-center">Página</TableHeaderCell>
                  <TableHeaderCell className="w-[15%] text-center">URL</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {noticiasFiltradas.map((noticia) => (
                  <TableRow key={noticia.id_noticia}>
                    <TableCell className="text-center">{noticia.id_noticia}</TableCell>
                    <TableCell className="max-w-[300px] truncate">{noticia.titulo}</TableCell>
                    <TableCell className="text-center">
                      {new Date(noticia.fecha).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
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
                    <TableCell className="text-center">{noticia.id_pagina_fuente}</TableCell>
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
        )}
      </div>
    </section>
  )
}
