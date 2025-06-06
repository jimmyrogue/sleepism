"use client";
import { useLanguage } from "@/contexts/language-context";
import { LanguageToggle } from "@/components/language-toggle";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { FC, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const API_URL = "https://www.liangtao.cc/api/belief";

type PlusOne = { id: string; path: string };

const Home: FC = () => {
  const { t, language } = useLanguage();
  const [beliefCount, setBeliefCount] = useState<number>(0);
  const [showPlusOne, setShowPlusOne] = useState(false);
  const [loading, setLoading] = useState(false);
  const [plusOnes, setPlusOnes] = useState<PlusOne[]>([]);

  // 获取当前信仰人数
  const fetchBeliefCount = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setBeliefCount(data.belief ?? 0);
    } catch (e) {
      // 可选：处理错误
    }
  };

  // 增加信仰人数
  const incrementBeliefCount = async () => {
    if (loading) return;
    setLoading(true);
    setBeliefCount((prev) => prev + 1);
    const id = uuidv4();
    function randomBezierPath() {
      // 移动端参数缩小
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
      const scale = isMobile ? 0.5 : 1;
      const x1 = (20 + Math.random() * 80) * scale;
      const y1 = (-40 - Math.random() * 40) * scale;
      const x2 = (40 + Math.random() * 80) * scale;
      const y2 = (-80 - Math.random() * 40) * scale;
      const x3 = (60 + Math.random() * 60) * scale;
      const y3 = (-120 - Math.random() * 40) * scale;
      return `M0,0 C${x1},${y1} ${x2},${y2} ${x3},${y3}`;
    }
    const path = randomBezierPath();
    setPlusOnes((prev) => [...prev, { id, path }]);
    setTimeout(() => {
      setPlusOnes((prev) => prev.filter((item) => item.id !== id));
    }, 800);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip: "127.0.0.1" }),
      });
      if (!res.ok) throw new Error("Failed to increment");
      // 不再 fetchBeliefCount，前端已加
    } catch (e) {
      // 回滚数字
      setBeliefCount((prev) => (prev > 0 ? prev - 1 : 0));
      // 可选：弹出错误提示
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBeliefCount();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-50 flex flex-col items-center justify-center px-4 py-8 md:py-16 text-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-sky-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-1/3 -right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <LanguageToggle className="absolute top-4 right-4 md:top-8 md:right-8 z-10" />

      <div className="w-full max-w-4xl mx-auto space-y-12 md:space-y-16 animate-fade-in relative z-10">
        {/* Logo/Wordmark */}
        <div className="space-y-4 md:space-y-6">
          <div className="flex flex-col items-center justify-center gap-2 md:gap-3">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <Logo
                size="lg"
                animated={true}
                animationType="sleeping"
                className="mb-2 transform scale-90 md:scale-100"
              />
            </div>
            <h1
              className={`text-2xl md:text-4xl lg:text-5xl font-light tracking-wide text-gray-700 ${
                language === "zh" ? "font-normal" : ""
              }`}
            >
              {language === "zh" ? (
                <>
                  <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-purple-600">睡教</span>
                  <span className="mx-2 text-gray-400">·</span>
                  <span className="font-light">The Sleepism</span>
                </>
              ) : (
                <>
                  <span className="font-light">The Sleepism</span>
                  <span className="mx-2 text-gray-400">·</span>
                  <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-purple-600">睡教</span>
                </>
              )}
            </h1>
          </div>
          {/* 醒目的信仰按钮 */}
          <div className="flex justify-center mt-6 relative">
            <Button
              size="lg"
              className="text-lg md:text-2xl px-6 md:px-10 py-3 md:py-6 rounded-full shadow-xl bg-gradient-to-r from-sky-400 to-purple-500 text-white font-bold tracking-wider transition-transform duration-200 hover:scale-105 hover:shadow-2xl focus:ring-4 focus:ring-purple-200"
              onClick={incrementBeliefCount}
            >
              {language === "zh"
                ? `信仰我们 (${beliefCount})`
                : `Believe in Us (${beliefCount})`}
            </Button>
            {plusOnes.map((item) => (
              <span
                key={item.id}
                style={{
                  offsetPath: `path('${item.path}')`,
                  WebkitOffsetPath: `path('${item.path}')`
                } as React.CSSProperties}
                className="absolute -top-4 left-1/2 -translate-x-1/2 text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text drop-shadow-lg animate-curve-rise"
              >
                +z
              </span>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="pt-2 md:pt-4">
          <h2
            className={`text-xl md:text-3xl lg:text-4xl font-light text-gray-600 tracking-wider ${
              language === "zh" ? "font-normal" : ""
            }`}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-purple-600">
              {t("mission")}
            </span>
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-purple-600">
              {t("howToJoin")}
            </span>
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
        <div className="absolute top-4 md:top-10 right-4 md:right-10 opacity-20 pointer-events-none">
          <div className="text-6xl md:text-9xl text-sky-300 animate-float">✧</div>
        </div>
        <div className="absolute bottom-4 md:bottom-10 left-4 md:left-10 opacity-20 pointer-events-none">
          <div className="text-6xl md:text-9xl text-sky-300 animate-float animation-delay-2000">✧</div>
        </div>
      </div>
    </main>
  );
};

export default Home;
