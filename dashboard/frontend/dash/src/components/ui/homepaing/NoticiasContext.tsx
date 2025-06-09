"use client"
import React, { createContext, useContext, useState, useEffect } from "react"
import { DateRange } from "react-day-picker"

export interface Noticia {
  id_noticia: number
  titulo: string
  fecha: string
  url_noticia: string
  clasificacion: string
  id_pagina_fuente: string
}

interface NoticiasContextProps {
  noticias: Noticia[]
  noticiasFiltradas: Noticia[]
  setSearch: (val: string) => void
  setFiltroFecha: (val: DateRange | undefined) => void
  setClasificacion: (val: string | undefined) => void
}

const NoticiasContext = createContext<NoticiasContextProps | undefined>(undefined)

export const NoticiasProvider = ({ children }: { children: React.ReactNode }) => {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [search, setSearch] = useState("")
  const [filtroFecha, setFiltroFecha] = useState<DateRange | undefined>(undefined)
  const [clasificacion, setClasificacion] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchNoticias = async () => {
      const res = await fetch("http://localhost:5000/api/noticias")
      const data = await res.json()
      setNoticias(data)
    }
    fetchNoticias()
  }, [])

  const noticiasFiltradas = noticias.filter((noticia) => {
    const tituloCoincide = noticia.titulo.toLowerCase().includes(search.toLowerCase())
    const fechaNoticia = new Date(noticia.fecha)
    const dentroRango =
      !filtroFecha?.from || !filtroFecha?.to
        ? true
        : fechaNoticia >= filtroFecha.from && fechaNoticia <= filtroFecha.to
    const clasificacionCoincide =
      !clasificacion || clasificacion.trim() === "" || noticia.clasificacion === clasificacion
    return tituloCoincide && dentroRango && clasificacionCoincide
  })

  return (
    <NoticiasContext.Provider
      value={{
        noticias,
        noticiasFiltradas,
        setSearch,
        setFiltroFecha,
        setClasificacion,
      }}
    >
      {children}
    </NoticiasContext.Provider>
  )
}

export const useNoticias = () => {
  const context = useContext(NoticiasContext)
  if (!context) throw new Error("useNoticias must be used within NoticiasProvider")
  return context
}
