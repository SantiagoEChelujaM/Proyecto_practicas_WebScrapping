import { useNoticias } from "@/components/ui/homepaing/NoticiasContext"




type Category = "red" | "orange" | "emerald" | "gray"
type Metric = {
  label: string
  value: number
  percentage: string
  fraction: string
}



const getCategory = (value: number): Category => {
  if (value < 0.3) return "red"
  if (value < 0.7) return "orange"
  return "emerald"
}

const categoryConfig = {
  red: {
    activeClass: "bg-red-500 dark:bg-red-500",
    bars: 1,
  },
  orange: {
    activeClass: "bg-orange-500 dark:bg-orange-500",
    bars: 2,
  },
  emerald: {
    activeClass: "bg-emerald-500 dark:bg-emerald-500",
    bars: 3,
  },
  gray: {
    activeClass: "bg-gray-300 dark:bg-gray-800",
    bars: 0,
  },
} as const

function Indicator({ number }: { number: number }) {
  const category = getCategory(number)
  const config = categoryConfig[category]
  const inactiveClass = "bg-gray-300 dark:bg-gray-800"

  return (
    <div className="flex gap-0.5">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`h-3.5 w-1 rounded-sm ${
            index < config.bars ? config.activeClass : inactiveClass
          }`}
        />
      ))}
    </div>
  )
}

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div>
      <dt className="text-sm text-gray-500 dark:text-gray-500">
        {metric.label}
      </dt>
      <dd className="mt-1.5 flex items-center gap-2">
        <Indicator number={metric.value} />
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          {metric.percentage}{" "}
          <span className="font-medium text-gray-400 dark:text-gray-600">
            - {metric.fraction}
          </span>
        </p>
      </dd>
    </div>
  )
}
export function MetricsCards() {
  const { noticiasFiltradas } = useNoticias()

  const total = noticiasFiltradas.length
  const count = (tipo: string) => noticiasFiltradas.filter(n => n.clasificacion === tipo).length

  const metrics = [
    {
      label: "Noticias Positivas",
      value: count("positivo") / total || 0,
      percentage: `${((count("positivo") / total) * 100 || 0).toFixed(1)}%`,
      fraction: `${count("positivo")}/${total}`,
    },
    {
      label: "Noticias Negativas",
      value: count("negativo") / total || 0,
      percentage: `${((count("negativo") / total) * 100 || 0).toFixed(1)}%`,
      fraction: `${count("negativo")}/${total}`,
    },
    {
      label: "Noticias Neutrales",
      value: count("neutral") / total || 0,
      percentage: `${((count("neutral") / total) * 100 || 0).toFixed(1)}%`,
      fraction: `${count("neutral")}/${total}`,
    },
  ]

  return (
    <>
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
        Métricas de Noticias Filtradas
      </h1>
      <dl className="mt-6 flex flex-wrap items-center gap-x-12 gap-y-8">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </dl>
    </>
  )
}