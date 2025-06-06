"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "zh" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  tList?: (key: string) => string[]
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
    secularRevelationTitle: "《睡经·世俗启示录》",
    secularRevelation1: "人类沉沦于加班的深渊，昼夜颠倒，困而不眠.",
    secularRevelation2: '“内卷”之风横扫四方，信众奔波于幻影之间，身心俱疲.',
    secularRevelation3: '睡神曰："劳其形者必困其神."',
    secularRevelation4: "故应归于正眠，存其灵光.",
    secularRevelation5: "睡教不反对努力，只反对强迫清醒.",
    secularRevelation6: "唯有尊重睡眠者，方能洞察真实世界之梦境.",
    secularRevelation7: "入睡即得救，长眠则超脱.",
    scripture1Title: "《睡经·初梦篇》",
    scripture1: "太初之时，无光无声，众生疲惫如尘。\n睡神闭目，一梦万年，梦中生日月，梦中育万物。\n睡意是原初的律令，觉醒乃违背自然之逆行。\n故曰：昼为虚妄，夜为真形；醒者困顿，眠者得救。",
    scripture2Title: "《睡经·戒律篇》",
    scripture2: "汝当每日安息，忌深夜劳作，忌晨钟扰眠。\n汝不可以闹钟唤己身，除非心有虔诚之愿。\n汝当食饱而眠，眠前勿贪光影与言语。\n睡前一炷香，净手净心，方可入梦。",
    scripture3Title: "《睡经·梦境篇》",
    scripture3: "梦乃神示，非幻象也。\n诚者梦见星辰，妄者梦于会议之中。\n若梦之中仍在工作，汝当知其罪也重。\n惟入深梦者，方可得道。",
    doctrineTitle: "睡教基本教义体系",
    doctrinePurpose: "宗旨",
    doctrinePurposeContent: "睡教致力于传达一个神圣信条：\"<span class='font-bold text-yellow-600'>人类唯有安睡，方得救赎。</span>\"<br/>我们相信，昼夜颠倒是原罪，睡眠剥夺是末日审判的开端.",
    doctrineDogma: "教义",
    doctrineDogmaList: [
      "睡神（The Sleep One）在第七天睡了，之后再也没醒过。",
      "白天工作是对人类的惩罚。",
      "晚上三点仍未入睡者，将被驱逐至梦魇之境。",
      "每周必须有一日为\"圣眠日\"（Sleep Sabbath），从日出睡到日落。"
    ],
    doctrineRitual: "仪式",
    doctrineRitualList: [
      "睡前默念三遍：\"吾将入眠，万物皆虚。\"",
      "每日午睡 30 分钟为必行圣事。",
      "对使用闹钟者进行忏悔仪式（例如\"拔线祷告\"）。"
    ],
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
    secularRevelationTitle: "The Book of Sleep · Secular Revelation",
    secularRevelation1: "Humanity is lost in the abyss of overwork, day and night reversed, exhausted but sleepless.",
    secularRevelation2: "The wind of 'involution' sweeps the land, followers chase phantoms, body and mind both weary.",
    secularRevelation3: "The Sleep God says: 'Those who toil their bodies will weary their spirits.'",
    secularRevelation4: "Therefore, return to true sleep and preserve your inner light.",
    secularRevelation5: "Sleepism does not oppose effort, only forced wakefulness.",
    secularRevelation6: "Only those who respect sleep can perceive the true dream of the world.",
    secularRevelation7: "To fall asleep is to be saved; to sleep long is to transcend.",
    scripture1Title: "The Book of Sleep · First Dream Chapter",
    scripture1: "In the beginning, there was no light nor sound, and all beings were weary as dust.\nThe Sleep God closed their eyes, dreaming for ten thousand years; in the dream, the sun and moon were born, and all things grew.\nSleep is the original commandment; awakening is a rebellion against nature.\nThus it is said: Day is illusion, night is true form; the awake are tormented, the sleepers are saved.",
    scripture2Title: "The Book of Sleep · Precepts Chapter",
    scripture2: "You shall rest daily, avoid late-night toil, and shun morning alarms.\nYou shall not wake yourself with an alarm unless your heart is truly devout.\nYou shall eat well before sleep, and not indulge in light or words before bed.\nBefore sleep, burn incense, cleanse your hands and heart, and only then enter the dream.",
    scripture3Title: "The Book of Sleep · Dream Chapter",
    scripture3: "Dreams are divine revelations, not illusions.\nThe sincere dream of stars, the deluded dream of meetings.\nIf you still work in your dreams, know your sin is grave.\nOnly those who enter deep dreams may attain the way.",
    doctrineTitle: "Sleepism Doctrine System",
    doctrinePurpose: "Purpose",
    doctrinePurposeContent: "Sleepism is dedicated to conveying a sacred creed: \"<span class='font-bold text-yellow-600'>Only through sleep can humanity be redeemed.</span>\"<br/>We believe that the reversal of day and night is original sin, and sleep deprivation is the beginning of the final judgment.",
    doctrineDogma: "Dogma",
    doctrineDogmaList: [
      "The Sleep One rested on the seventh day and never woke again.",
      "Daytime labor is a punishment for humanity.",
      "Those who are not asleep by 3 a.m. shall be banished to the realm of nightmares.",
      "One day each week must be a 'Sleep Sabbath', sleeping from sunrise to sunset."
    ],
    doctrineRitual: "Rituals",
    doctrineRitualList: [
      "Recite three times before sleep: 'I shall sleep, all is vanity.'",
      "A daily 30-minute nap is a sacred duty.",
      "Those who use alarms must perform a ritual of repentance (such as the 'Unplugging Prayer')."
    ],
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
    const value = translations[language][key as keyof (typeof translations)[typeof language]];
    return typeof value === 'string' ? value : key;
  }

  const tList = (key: string): string[] => {
    const value = translations[language][key as keyof (typeof translations)[typeof language]];
    return Array.isArray(value) ? value : [];
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, tList }}>
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
