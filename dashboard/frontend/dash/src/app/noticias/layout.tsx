"use client"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { MetricsCards } from "@/components/ui/homepaing/MetricsCards"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { siteConfig } from "../siteConfig"
import { NoticiasProvider } from "@/components/ui/homepaing/NoticiasContext"

const navigation = [
  { name: "Graficas", href: siteConfig.baseLinks.noticias.grafics },
  { name: "Tablas", href: siteConfig.baseLinks.noticias.tables },
  { name: "Extra", href: siteConfig.baseLinks.noticias.extras },
]
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  return (
    <NoticiasProvider>
      <div className="bg-white dark:bg-gray-925">
        <div className="p-4 sm:p-6">
          <MetricsCards />
        </div>
        <TabNavigation className="mt-6 gap-x-4 px-4 sm:px-6">
          {navigation.map((item) => (
            <TabNavigationLink
              key={item.name}
              asChild
              active={pathname === item.href}
            >
              <Link href={item.href}>{item.name}</Link>
            </TabNavigationLink>
          ))}
        </TabNavigation>
        <>{children}</>
      </div>
    </NoticiasProvider>
  )
}
