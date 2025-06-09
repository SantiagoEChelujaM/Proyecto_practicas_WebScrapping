export const siteConfig = {
  name: "Planner",
  url: "https://planner.tremor.so",
  description: "The simplest dashboard template.",
  baseLinks: {
    main: {
      menu: "/main"
    },
    noticias: {
      tables: "/noticias/tablas",
      grafics: "/noticias/monitoring" /* "/noticias/graficas" */,
      extras: "/noticias/audits" /* "/noticias/extra" */,
    },
  },
}

export type siteConfig = typeof siteConfig
