"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "zh" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  zh: {
    title: "睡教",
    subtitle: "The Sleepism",
    mission: "睡眠是神圣的。",
    belief: "我们相信睡眠是一种治愈、反思和与内在自我连接的方式。在这个痴迷于生产力的世界里，我们选择休息。",
    cta: "加入这场静谧的革命",
    howToJoin: "如何加入我们？",
    joinDescription:
      "信仰我们不需要任何费用或付出，只需要您希望加入我们，以及拥有过（或曾经拥有）一次良好的睡眠，即认为已经加入我们。我们希望人类重视睡眠，以此达到与宇宙的连接，获得生命的宁静。",
    siteTitle: "睡教 · The Sleepism",
    siteDescription: "睡眠是神圣的。我们相信睡眠是一种治愈、反思和与内在自我连接的方式。",
  },
  en: {
    title: "The Sleepism",
    subtitle: "睡教",
    mission: "Sleep is sacred.",
    belief:
      "We believe that sleep is a form of healing, reflection, and connection with the inner self. In a world obsessed with productivity, we choose rest.",
    cta: "Join the quiet revolution",
    howToJoin: "How to join us?",
    joinDescription:
      "Believing in us requires no cost or sacrifice. You only need to wish to join us and have experienced (or once experienced) a good night's sleep to be considered one of us. We hope humanity will value sleep, thereby connecting with the universe and finding life's tranquility.",
    siteTitle: "睡教 · The Sleepism",
    siteDescription:
      "Sleep is sacred. We believe that sleep is a form of healing, reflection, and connection with the inner self.",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("sleepism-language") as Language
    if (savedLanguage && (savedLanguage === "zh" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("sleepism-language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
