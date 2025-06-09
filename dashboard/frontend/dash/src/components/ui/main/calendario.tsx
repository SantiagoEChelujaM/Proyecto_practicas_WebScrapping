import { useState, useRef, useEffect } from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/Calendar "
import { DateRange } from "react-day-picker"
import { format } from "date-fns"

interface Props {
  onRangeChange: (range: DateRange | undefined) => void
}

export default function CalendarDropdown({ onRangeChange }: Props) {
  const [open, setOpen] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const formatDate = (date: Date) => format(date, "dd/MM/yyyy")

  const getDisplayValue = () => {
    if (!dateRange?.from) return ""
    if (dateRange.from && dateRange.to) {
      return `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`
    }
    return formatDate(dateRange.from)
  }

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
      >
        <CalendarIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <span className="text-sm text-gray-700 dark:text-gray-300">{getDisplayValue()}</span>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 rounded-md bg-white shadow-lg dark:bg-gray-900 p-4">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={(range) => {
              if (range?.from && !range.to) {
                const singleDay = {
                  from: new Date(range.from.setHours(0, 0, 0, 0)),
                  to: new Date(range.from.setHours(23, 59, 59, 999)),
                }
                setDateRange(singleDay)
                onRangeChange(singleDay)
                setOpen(false)
              } else {
                setDateRange(range)
                onRangeChange(range)
              }
            }}
            numberOfMonths={2}
          />
        </div>
      )}
    </div>
  )
}
