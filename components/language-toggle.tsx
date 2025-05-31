"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { Logo } from "@/components/logo"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="fixed top-6 right-6 z-10 flex items-center">
      <Logo size="sm" className="mr-3 hidden sm:block" animated={true} animationType="gentle" />
      <div className="flex gap-2">
        <Button
          variant={language === "zh" ? "default" : "ghost"}
          size="sm"
          onClick={() => setLanguage("zh")}
          className={`text-sm font-medium transition-all duration-200 ${
            language === "zh"
              ? "bg-sky-200 text-sky-800 hover:bg-sky-300"
              : "text-gray-500 hover:text-gray-700 hover:bg-sky-50"
          }`}
        >
          中文
        </Button>
        <Button
          variant={language === "en" ? "default" : "ghost"}
          size="sm"
          onClick={() => setLanguage("en")}
          className={`text-sm font-medium transition-all duration-200 ${
            language === "en"
              ? "bg-sky-200 text-sky-800 hover:bg-sky-300"
              : "text-gray-500 hover:text-gray-700 hover:bg-sky-50"
          }`}
        >
          EN
        </Button>
      </div>
    </div>
  )
}
