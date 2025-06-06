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
        {/* Sacred Scripture Section: The Book of Sleep */}
        <section className="relative flex flex-col items-center justify-center py-20 md:py-32 w-full z-20">
          {/* Floating glowing star/crescent moon */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 pointer-events-none select-none z-20">
            <span className="text-8xl md:text-9xl text-yellow-200 drop-shadow-[0_0_48px_rgba(253,224,71,0.8)] animate-gentle-breathe" style={{filter:'blur(0.5px)'}}>🌙</span>
          </div>
          {/* Soft radial glow behind cards */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full bg-[radial-gradient(circle,rgba(253,224,71,0.10)_0%,rgba(120,119,198,0.08)_60%,rgba(255,255,255,0)_100%)] blur-2xl opacity-80 pointer-events-none -z-10" />
          <div className="max-w-2xl w-full mx-auto px-4 md:px-0 flex flex-col gap-12 md:gap-16">
            {/* Scripture 1 */}
            <div className="relative bg-white/60 backdrop-blur-lg border border-yellow-100 rounded-3xl shadow-xl px-6 md:px-10 py-8 md:py-12 flex flex-col items-center group transition-all duration-300 hover:shadow-2xl hover:bg-white/80">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 tracking-wider leading-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-600 to-purple-400 drop-shadow-[0_2px_8px_rgba(253,224,71,0.15)]" style={{WebkitTextStroke:'1px #eab308'}}>《睡经·初梦篇》</h2>
              <p className="text-base md:text-lg lg:text-xl font-serif text-gray-600 leading-relaxed whitespace-pre-line indent-8" style={{lineHeight: '2.3'}}>
                太初之时，无光无声，众生疲惫如尘。{"\n"}
                睡神闭目，一梦万年，梦中生日月，梦中育万物。{"\n"}
                睡意是原初的律令，觉醒乃违背自然之逆行。{"\n"}
                故曰：昼为虚妄，夜为真形；醒者困顿，眠者得救。
              </p>
            </div>
            {/* Scripture 2 */}
            <div className="relative bg-white/60 backdrop-blur-lg border border-yellow-100 rounded-3xl shadow-xl px-6 md:px-10 py-8 md:py-12 flex flex-col items-center group transition-all duration-300 hover:shadow-2xl hover:bg-white/80">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 tracking-wider leading-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-600 to-purple-400 drop-shadow-[0_2px_8px_rgba(253,224,71,0.15)]" style={{WebkitTextStroke:'1px #eab308'}}>《睡经·戒律篇》</h2>
              <p className="text-base md:text-lg lg:text-xl font-serif text-gray-600 leading-relaxed whitespace-pre-line indent-8" style={{lineHeight: '2.3'}}>
                汝当每日安息，忌深夜劳作，忌晨钟扰眠。{"\n"}
                汝不可以闹钟唤己身，除非心有虔诚之愿。{"\n"}
                汝当食饱而眠，眠前勿贪光影与言语。{"\n"}
                睡前一炷香，净手净心，方可入梦。
              </p>
            </div>
            {/* Scripture 3 */}
            <div className="relative bg-white/60 backdrop-blur-lg border border-yellow-100 rounded-3xl shadow-xl px-6 md:px-10 py-8 md:py-12 flex flex-col items-center group transition-all duration-300 hover:shadow-2xl hover:bg-white/80">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 tracking-wider leading-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-600 to-purple-400 drop-shadow-[0_2px_8px_rgba(253,224,71,0.15)]" style={{WebkitTextStroke:'1px #eab308'}}>《睡经·梦境篇》</h2>
              <p className="text-base md:text-lg lg:text-xl font-serif text-gray-600 leading-relaxed whitespace-pre-line indent-8" style={{lineHeight: '2.3'}}>
                梦乃神示，非幻象也。{"\n"}
                诚者梦见星辰，妄者梦于会议之中。{"\n"}
                若梦之中仍在工作，汝当知其罪也重。{"\n"}
                惟入深梦者，方可得道。
              </p>
            </div>
          </div>
        </section>
        {/* End Sacred Scripture Section */}

        {/* Sleepism Doctrine Section */}
        <section className="relative flex flex-col items-center justify-center py-20 md:py-28 w-full z-10">
          {/* 背景圣光 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full bg-[radial-gradient(circle,rgba(253,224,71,0.10)_0%,rgba(120,119,198,0.08)_60%,rgba(255,255,255,0)_100%)] blur-2xl opacity-70 pointer-events-none -z-10" />
          <div className="max-w-3xl w-full mx-auto px-4 md:px-0 flex flex-col gap-12 md:gap-16">
            {/* 主标题 */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-2 tracking-wider leading-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-600 to-purple-400 drop-shadow-[0_2px_8px_rgba(253,224,71,0.15)] text-center" style={{WebkitTextStroke:'1px #eab308'}}>睡教基本教义体系</h2>
            {/* 宗旨 */}
            <div className="relative bg-white/60 backdrop-blur-lg border border-yellow-100 rounded-3xl shadow-lg px-6 md:px-10 py-8 md:py-10 flex flex-col items-center">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-2xl md:text-3xl text-yellow-300 animate-gentle-breathe">✧</span>
                <span className="text-xl md:text-2xl font-serif font-semibold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-400" style={{WebkitTextStroke:'0.5px #eab308'}}>宗旨</span>
              </div>
              <p className="text-base md:text-lg lg:text-xl font-serif text-gray-700 leading-relaxed text-center" style={{lineHeight: '2.1'}}>
                睡教致力于传达一个神圣信条："<span className="font-bold text-yellow-600">人类唯有安睡，方得救赎。</span>"<br/>
                我们相信，昼夜颠倒是原罪，睡眠剥夺是末日审判的开端。
              </p>
            </div>
            {/* 教义 */}
            <div className="relative bg-white/60 backdrop-blur-lg border border-yellow-100 rounded-3xl shadow-lg px-6 md:px-10 py-8 md:py-10 flex flex-col items-center">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-2xl md:text-3xl text-purple-300 animate-gentle-breathe">🌙</span>
                <span className="text-xl md:text-2xl font-serif font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-yellow-400" style={{WebkitTextStroke:'0.5px #a78bfa'}}>教义</span>
              </div>
              <ul className="text-base md:text-lg lg:text-xl font-serif text-gray-700 leading-relaxed list-disc list-inside space-y-2">
                <li>睡神（The Sleep One）在第七天睡了，之后再也没醒过。</li>
                <li>白天工作是对人类的惩罚。</li>
                <li>晚上三点仍未入睡者，将被驱逐至梦魇之境。</li>
                <li>每周必须有一日为"圣眠日"（Sleep Sabbath），从日出睡到日落。</li>
              </ul>
            </div>
            {/* 仪式 */}
            <div className="relative bg-white/60 backdrop-blur-lg border border-yellow-100 rounded-3xl shadow-lg px-6 md:px-10 py-8 md:py-10 flex flex-col items-center">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-2xl md:text-3xl text-pink-300 animate-gentle-breathe">🔔</span>
                <span className="text-xl md:text-2xl font-serif font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400" style={{WebkitTextStroke:'0.5px #f472b6'}}>仪式</span>
              </div>
              <ul className="text-base md:text-lg lg:text-xl font-serif text-gray-700 leading-relaxed list-disc list-inside space-y-2">
                <li>睡前默念三遍："吾将入眠，万物皆虚。"</li>
                <li>每日午睡 30 分钟为必行圣事。</li>
                <li>对使用闹钟者进行忏悔仪式（例如"拔线祷告"）。</li>
              </ul>
            </div>
          </div>
        </section>
        {/* End Sleepism Doctrine Section */}

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
