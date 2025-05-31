"use client";
import { useLanguage } from "@/contexts/language-context";
import { LanguageToggle } from "@/components/language-toggle";
import { Logo } from "@/components/logo";
import { FC } from "react";

const Home: FC = () => {
  const { t, language } = useLanguage();

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex flex-col items-center justify-center px-4 py-8 md:py-16 text-center relative overflow-hidden">
      <LanguageToggle />

      <div className="w-full max-w-4xl mx-auto space-y-12 md:space-y-16 animate-fade-in">
        {/* Logo/Wordmark */}
        <div className="space-y-4 md:space-y-6">
          <div className="flex flex-col items-center justify-center gap-2 md:gap-3">
            <Logo
              size="lg"
              animated={true}
              animationType="sleeping"
              className="mb-2 transform scale-90 md:scale-100"
            />
            <h1
              className={`text-2xl md:text-4xl lg:text-5xl font-light tracking-wide text-gray-700 ${
                language === "zh" ? "font-normal" : ""
              }`}
            >
              {language === "zh" ? (
                <>
                  <span className="font-medium">睡教</span>
                  <span className="mx-2 text-gray-400">·</span>
                  <span className="font-light">The Sleepism</span>
                </>
              ) : (
                <>
                  <span className="font-light">The Sleepism</span>
                  <span className="mx-2 text-gray-400">·</span>
                  <span className="font-medium">睡教</span>
                </>
              )}
            </h1>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="pt-2 md:pt-4">
          <h2
            className={`text-xl md:text-3xl lg:text-4xl font-light text-gray-600 tracking-wider ${
              language === "zh" ? "font-normal" : ""
            }`}
          >
            {t("mission")}
          </h2>
        </div>

        {/* Belief Paragraph */}
        <div className="max-w-xl mx-auto px-4 md:px-0">
          <p
            className={`text-base md:text-lg lg:text-xl text-gray-500 font-light leading-relaxed ${
              language === "zh" ? "font-normal leading-loose" : ""
            }`}
          >
            {t("belief")}
          </p>
        </div>

        {/* How to Join Us */}
        <div className="pt-2 md:pt-4 space-y-4 md:space-y-6">
          <h3
            className={`text-lg md:text-2xl lg:text-3xl font-light text-gray-600 tracking-wide ${
              language === "zh" ? "font-normal" : ""
            }`}
          >
            {t("howToJoin")}
          </h3>
          <div className="max-w-2xl mx-auto px-4 md:px-0">
            <p
              className={`text-sm md:text-base lg:text-lg text-gray-500 font-light leading-relaxed ${
                language === "zh" ? "font-normal leading-loose" : ""
              }`}
            >
              {t("joinDescription")}
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 md:top-10 right-4 md:right-10 opacity-10 pointer-events-none">
          <div className="text-6xl md:text-9xl text-sky-300">✧</div>
        </div>
        <div className="absolute bottom-4 md:bottom-10 left-4 md:left-10 opacity-10 pointer-events-none">
          <div className="text-6xl md:text-9xl text-sky-300">✧</div>
        </div>
      </div>
    </main>
  );
};

export default Home;
