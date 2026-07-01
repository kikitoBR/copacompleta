/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  Sparkles, 
  Printer, 
  Download, 
  ShieldCheck, 
  FileText, 
  CreditCard, 
  QrCode, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  X, 
  Lock, 
  Smartphone, 
  Mail, 
  User, 
  Copy, 
  AlertCircle, 
  ThumbsUp, 
  Info, 
  Flame, 
  BadgeAlert,
  Coins,
  CheckCircle2,
  BookmarkCheck
} from 'lucide-react';
import { stickersData, testimonials, faqItems, Sticker } from './data';
import { trackEvent } from './utils/tracking';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  // PageView tracking on mount
  useEffect(() => {
    trackEvent('PageView');
  }, []);

  // Conversão general metrics
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Pack opener simulator states
  const [isOpeningPack, setIsOpeningPack] = useState(false);
  const [packStickers, setPackStickers] = useState<Sticker[]>([]);
  const [packOpenedCount, setPackOpenedCount] = useState(0);
  const [revealedIndex, setRevealedIndex] = useState<number>(-1);



  // Live Purchase Alert Simulation
  const [purchaseAlert, setPurchaseAlert] = useState<{name: string; time: string} | null>(null);

  // Countdown timers for urgency (14m 59s)
  const [timeLeft, setTimeLeft] = useState(899);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 899));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulated purchase notification to boost conversion
  useEffect(() => {
    const names = ['Guilherme M.', 'Ana Carolina S.', 'Thiago F.', 'Rafael B.', 'Jessica T.', 'Rodrigo P.', 'Beatriz L.'];
    const interval = setInterval(() => {
      const randomName = names[names.length - 1 - (Math.floor(Math.random() * names.length) % names.length)];
      setPurchaseAlert({ name: randomName, time: 'há 1 min' });
      setTimeout(() => {
        setPurchaseAlert(null);
      }, 5000);
    }, 22000);

    return () => clearInterval(interval);
  }, []);

  // Handle open mock sticker pack
  const handleOpenPack = () => {
    trackEvent('OpenFreePack');
    setIsOpeningPack(true);
    setRevealedIndex(-1);
    
    // Simulate slight lag for suspense
    setTimeout(() => {
      // Shuffle & get 5 random stickers from stickersData
      const shuffled = [...stickersData].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 5);
      setPackStickers(selected);
      setIsOpeningPack(false);
      setPackOpenedCount(prev => prev + 1);
      
      // Reveal cards one by one
      let currentReveal = 0;
      const interval = setInterval(() => {
        if (currentReveal < 5) {
          setRevealedIndex(currentReveal);
          currentReveal++;
        } else {
          clearInterval(interval);
        }
      }, 300);
    }, 1200);
  };

  const downloadAllFreeStickers = () => {
    trackEvent('DownloadFreeSticker', { name: 'all_5_stickers' });
    const stickers = [
      { url: '/vinicius.pdf', name: 'vinicius_junior' },
      { url: '/bellingham.pdf', name: 'jude_bellingham' },
      { url: '/haaland.pdf', name: 'erling_haaland' },
      { url: '/dembele.pdf', name: 'ousmane_dembele' },
      { url: '/marquinhos.pdf', name: 'marquinhos' }
    ];
    
    stickers.forEach((s, i) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = s.url;
        link.download = `${s.name}_gratis.pdf`;
        document.body.appendChild(link);
        link.click();
      }, i * 500);
    });
  };

  return (
    <div className="min-h-screen bg-emerald-50 text-slate-900 font-sans selection:bg-yellow-400 selection:text-emerald-950 overflow-x-hidden">
      
      {/* Top Banner Urgency */}
      <div id="top-urgency-bar" className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 text-slate-950 text-xs md:text-sm font-bold text-center py-2.5 px-4 flex items-center justify-center gap-2 shadow-md relative z-30">
        <span className="animate-pulse bg-white text-emerald-950 text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded mr-1">Oportunidade</span>
        <span className="text-white">Aproveite! O Álbum Completo + Todas as Figurinhas 2026 por apenas <strong className="underline text-yellow-300 font-black">R$ 19,90</strong>. Oferta expira em:</span>
        <span className="font-mono text-xs md:text-sm bg-emerald-950 text-yellow-400 py-0.5 px-2 rounded-md font-bold ml-1">{formatTime(timeLeft)}</span>
      </div>

      {/* Nav Link */}
      <nav id="app-nav" className="bg-emerald-600 px-4 md:px-8 py-4 flex items-center justify-between shadow-md relative z-20">
        <div id="brand-logo" className="flex items-center gap-2.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-950 p-1 flex items-center justify-center shadow-lg border border-emerald-500/10 shrink-0">
            <img 
              src="/logo-copa-2026.svg" 
              alt="Logo Copa 2026" 
              className="object-contain max-h-full"
            />
          </div>
          <div>
            <span className="font-display font-black text-base md:text-lg block tracking-tight text-white uppercase italic">CopaDigital 2026</span>
            <span className="text-[10px] text-yellow-300 -mt-1 font-mono tracking-widest block uppercase font-bold">100% Completo</span>
          </div>
        </div>

        <div id="nav-badges" className="hidden sm:flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-emerald-100">
            <ShieldCheck className="w-4 h-4 text-yellow-400" /> Compra 100% Segura
          </span>
          <span className="flex items-center gap-1.5 text-emerald-100">
            <Printer className="w-4 h-4 text-yellow-400" /> Pronto Para Imprimir
          </span>
        </div>

        <a 
          id="nav-cta-btn"
          href="https://pay.kirvano.com/d8c2dbfc-8478-4aca-97b7-f25fc25d0886"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('InitiateCheckout', { value: 19.90, currency: 'BRL' })}
          className="bg-yellow-400 hover:bg-yellow-350 text-emerald-950 font-display font-black text-xs md:text-sm px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:scale-105 active:scale-95 inline-flex items-center justify-center text-center cursor-pointer"
        >
          Baixar Álbum Agora
        </a>
      </nav>

      {/* Hero Section */}
      <section id="hero-section" className="relative pt-12 pb-24 md:pt-16 md:pb-32 overflow-hidden">
        {/* Background ambient lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-300/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-yellow-300/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Quick Proof Badge */}
            <motion.div 
              id="hero-badge"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 bg-emerald-100 border border-emerald-200 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold mb-6 cursor-default shadow-sm font-display"
            >
              <Flame className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
              <span>JÁ SOMOS MAIS DE <strong className="text-emerald-950 font-black">4.820 COLECIONADORES</strong> ECONOMIZANDO COM ESTE PDF!</span>
            </motion.div>

            {/* Headline and Subhead */}
            <motion.h1 
              id="hero-headline"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-emerald-950 leading-tight tracking-tight px-1"
            >
              Economize R$ 1.500+ e Complete o Seu <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-800 to-emerald-700 underline decoration-yellow-400 decoration-8 underline-offset-4">
                Álbum da Copa 2026 Hoje
              </span>
            </motion.h1>

            <motion.p 
              id="hero-subheadline"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed font-sans"
            >
              Tenha acesso imediato ao <strong className="text-emerald-900 font-extrabold">Guia PDF completo em alta resolução</strong>. Inclui todas as páginas diagramadas, todas as seleções, figurinhas brilhantes normais e as edições especiais ultra raras <span className="text-amber-600 font-extrabold bg-yellow-400/20 px-1.5 py-0.5 rounded">Legends</span>. Pronto para imprimir e se divertir gastando quase nada!
            </motion.p>

            {/* Main Interactive CTA Block */}
            <motion.div 
              id="hero-cta-group"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col items-center justify-center gap-4"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
                <a
                  id="hero-main-cta-btn"
                  href="https://pay.kirvano.com/d8c2dbfc-8478-4aca-97b7-f25fc25d0886"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('InitiateCheckout', { value: 19.90, currency: 'BRL' })}
                  className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-350 hover:to-amber-400 text-emerald-950 font-display font-black text-sm md:text-base py-4 px-6 rounded-xl transition-all duration-300 shadow-xl shadow-yellow-500/20 active:scale-98 tracking-wide uppercase hover:scale-102 flex items-center justify-center gap-2 text-center cursor-pointer text-decoration-none"
                >
                  <Download className="w-5 h-5 -mt-0.5 text-emerald-950" />
                  Quero Meu Álbum Completo Agora
                </a>
              </div>

              {/* Trust Indicators */}
              <div id="hero-trust-row" className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 mt-2 font-semibold">
                <span className="flex items-center gap-1 shadow-sm px-3 py-1.5 bg-white border border-emerald-100 rounded-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping mr-1"></span>
                  R$ 19,90 <span className="text-emerald-600 font-bold ml-1">Pagamento Único</span>
                </span>
                <span className="flex items-center gap-1 shadow-sm px-3 py-1.5 bg-white border border-slate-200 rounded-xl">
                  <Check className="w-3.5 h-3.5 text-emerald-500 font-bold" /> Acesso Imediato por PDF
                </span>
                <span className="flex items-center gap-1 shadow-sm px-3 py-1.5 bg-white border border-slate-200 rounded-xl">
                  <Check className="w-3.5 h-3.5 text-emerald-500 font-bold" /> Impressão Ilimitada
                </span>
              </div>
            </motion.div>
          </div>

          {/* Interactive Pack Opener Simulator Box */}
          <div id="interactive-preview-box" className="mt-16 max-w-4xl mx-auto bg-emerald-950 text-white border-4 border-yellow-400 rounded-3xl p-6 md:p-8 shadow-2xl relative">
            <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 bg-yellow-400 text-emerald-950 text-[10px] md:text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-emerald-950" /> Teste Grátis
            </div>

            <div className="text-center max-w-lg mx-auto mb-6">
              <h3 className="font-display font-extrabold text-xl md:text-2xl text-white">
                Abra um Pacotinho e Teste a Resolução!
              </h3>
              <p className="text-xs md:text-sm text-emerald-200 mt-1">
                Clique abaixo para simular a abertura de um dos nossos pacotes exclusivos. Sinta o gostinho de tirar cartas lendárias e veja a nitidez das artes do PDF!
              </p>
            </div>

            {packOpenedCount === 0 && !isOpeningPack ? (
              /* Closed Booster Pack View */
              <div id="booster-pack-closed" className="my-8 max-w-xs mx-auto bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950 border-4 border-yellow-400 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-center py-10 animate-fade-in">
                {/* Holographic foil shine */}
                <div className="absolute inset-0 holo-bg opacity-20 pointer-events-none" />
                
                {/* FIFA Cup logo */}
                <div className="w-24 h-24 rounded-2xl bg-emerald-950 p-2 flex items-center justify-center border border-emerald-500/10 shadow-lg mb-6">
                  <img src="/logo-copa-2026.svg" alt="Logo Copa 2026" className="object-contain max-h-full" />
                </div>
                
                <h4 className="font-display font-black text-xl text-white tracking-tight uppercase">PACOTE DIGITAL</h4>
                <span className="text-xs text-yellow-300 font-mono tracking-widest block uppercase font-bold mt-1">5 Figurinhas Grátis</span>
                
                <button
                  onClick={handleOpenPack}
                  className="mt-8 bg-yellow-400 hover:bg-yellow-350 text-emerald-950 font-display font-black text-xs md:text-sm py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 fill-emerald-950" /> Abrir Pacotinho
                </button>
              </div>
            ) : (
              /* Opened / Opening Card Grid View */
              <>
                {/* Card output container */}
                <div id="packet-cards-grid" className="grid grid-cols-2 sm:grid-cols-5 gap-3 min-h-[190px] items-center justify-center my-6">
                  <AnimatePresence mode="popLayout">
                    {isOpeningPack ? (
                      <div className="col-span-2 sm:col-span-5 flex flex-col items-center justify-center py-10">
                        <div className="w-12 h-12 border-4 border-yellow-300 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs text-yellow-300 font-mono mt-3 uppercase animate-pulse tracking-widest font-bold">Rasgando Pacotinho...</span>
                      </div>
                    ) : (
                      packStickers.map((sticker, index) => {
                        const isRevealed = index <= revealedIndex;
                        return (
                          <div key={sticker.id + '-' + index} className="flex flex-col items-center gap-2">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                              animate={isRevealed ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0.1, scale: 0.8 }}
                              transition={{ duration: 0.4, type: 'spring', damping: 15 }}
                              className={`relative w-full rounded-xl overflow-hidden shadow-lg transition-all duration-300 aspect-[3/4] ${
                                sticker.type === 'legend' 
                                  ? 'border-2 border-yellow-400 shadow-yellow-500/25' 
                                  : sticker.type === 'shiny'
                                    ? 'border-2 border-cyan-400 shadow-cyan-500/20'
                                    : 'border border-emerald-700'
                              }`}
                            >
                              {sticker.type !== 'normal' && (
                                <div className="absolute inset-0 holo-bg mix-blend-overlay opacity-60 pointer-events-none z-10" />
                              )}
                              <img 
                                src={sticker.imageUrl} 
                                alt={sticker.name} 
                                className="w-full h-full object-cover bg-emerald-950" 
                              />
                            </motion.div>

                            {/* Download button */}
                            {isRevealed && (
                              <button
                                onClick={() => {
                                  trackEvent('DownloadFreeSticker', { name: sticker.id });
                                  const link = document.createElement('a');
                                  link.href = sticker.pdfUrl;
                                  link.download = `${sticker.id}_figuracao.pdf`;
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                                }}
                                className="bg-yellow-400 hover:bg-yellow-350 text-emerald-950 text-[10px] font-black py-1 px-3 rounded-lg flex items-center gap-1 transition-all hover:scale-105 cursor-pointer shadow-md"
                              >
                                <Download className="w-3 h-3 text-emerald-950" /> Baixar PDF
                              </button>
                            )}
                          </div>
                        );
                      })
                    )}
                  </AnimatePresence>
                </div>

                {packOpenedCount >= 1 && !isOpeningPack && (
                  <div className="mt-4 p-4 bg-emerald-900/40 border border-yellow-400/30 rounded-2xl text-center max-w-xl mx-auto">
                    <p className="text-xs md:text-sm text-yellow-300 font-bold">
                      🎉 Pacote gratuito aberto com sucesso!
                    </p>
                    <p className="text-[11px] md:text-xs text-emerald-200 mt-1 leading-relaxed">
                      Você liberou o download das suas primeiras 5 figurinhas. Clique em <strong className="text-white">"Baixar PDF"</strong> em cada figurinha para obter o arquivo em alta resolução. Quer completar o álbum inteiro? Adquira o PDF completo com todas as figurinhas por apenas R$ 19,90!
                    </p>
                  </div>
                )}

                {/* Opener Action Buttons */}
                <div id="opener-controls" className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 border-t border-emerald-800 pt-6">
                  <button
                    id="btn-open-another-pack"
                    disabled={isOpeningPack || packOpenedCount >= 1}
                    onClick={handleOpenPack}
                    className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-350 text-emerald-950 disabled:opacity-50 text-xs md:text-sm font-display font-black py-3 px-6 rounded-xl shadow-md transition-all duration-300 hover:scale-102 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-950 fill-emerald-950" />
                    {packOpenedCount >= 1 ? "Pacote Grátis Aberto (Limite de 1)" : "Confira os Cromos - Abrir Pacote Grátis!"}
                  </button>
                  
                  <button
                    id="btn-download-sample-now"
                    onClick={downloadAllFreeStickers}
                    className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-700 text-yellow-300 text-xs md:text-sm font-display font-bold py-3 px-6 rounded-xl border border-emerald-600 transition-all duration-300 hover:scale-102 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-yellow-300" />
                    Baixar Todas as 5 Figurinhas (Amostra Grátis)
                  </button>
                </div>
                
                <div className="text-center mt-3">
                  <span className="text-[10px] text-emerald-300/75 font-mono">
                    *Amostra contendo os 5 PDFs das figurinhas exibidas acima em altíssima resolução.
                  </span>
                </div>
              </>
            )}
          </div>

        </div>
      </section>

      {/* SEÇÃO FIGURINHA PERSONALIZADA (ORDER BUMP PREVIEW) */}
      <section id="custom-sticker-section" className="py-12 bg-gradient-to-b from-emerald-50 to-emerald-100/50 border-b border-emerald-100 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white border-2 border-amber-400 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            {/* Ribbon Badge */}
            <div className="absolute top-0 left-0 bg-amber-400 text-emerald-950 text-[10px] md:text-xs font-black uppercase px-4 py-1.5 rounded-br-2xl shadow-md">
              Exclusivo no Checkout
            </div>
            
            {/* Visual Preview */}
            <div className="w-full md:w-2/5 flex justify-center shrink-0">
              <div className="relative w-44 aspect-[3/4] rounded-2xl overflow-hidden border-4 border-yellow-400 shadow-2xl shadow-yellow-500/20 rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="absolute inset-0 holo-bg mix-blend-overlay opacity-80 pointer-events-none z-10" />
                <img 
                  src="/figurinha-personalizada.png" 
                  alt="Exemplo Figurinha Personalizada" 
                  className="w-full h-full object-cover bg-emerald-950" 
                />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-emerald-950/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded border border-yellow-400/30 font-mono tracking-wider whitespace-nowrap">
                  SEU FILHO NO ÁLBUM
                </div>
              </div>
            </div>

            {/* Content text */}
            <div className="w-full md:w-3/5 text-center md:text-left">
              <span className="text-[10px] uppercase text-emerald-700 font-mono tracking-widest block font-black">Novidade Especial</span>
              <h3 className="font-display font-black text-2xl text-emerald-950 mt-1">
                Quer ver seu filho no álbum oficial? ⭐️
              </h3>
              <p className="text-sm text-slate-750 mt-3 leading-relaxed">
                Ao finalizar a compra do seu PDF, você terá a oportunidade única de adicionar uma <strong>Figurinha Rara Personalizada com o rosto dele</strong> por apenas <strong>R$ 30,00</strong>!
              </p>
              
              <ul className="mt-4 space-y-2 text-xs md:text-sm text-slate-650 font-semibold">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" /> Nós removemos o fundo da sua foto profissionalmente
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" /> Criamos a arte com fundo brilhante dourado/Legends
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" /> Enviamos o PDF pronto em tamanho real para recortar e colar!
                </li>
              </ul>
              
              <p className="text-xs text-amber-600 font-bold mt-5 flex items-center justify-center md:justify-start gap-1.5 bg-yellow-400/10 py-1.5 px-3 rounded-lg border border-yellow-400/20 inline-flex">
                <Sparkles className="w-4 h-4 fill-amber-500 text-amber-500 shrink-0" />
                Selecione a opção "Figurinha Personalizada" na tela de pagamento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* O QUE ESTÁ INCLUSO (Scope grid) */}
      <section id="detalhes-secao" className="py-20 bg-emerald-50/40 border-b border-emerald-100 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-12">
              <span className="text-xs uppercase text-emerald-700 font-mono tracking-widest block font-black">Conteúdo do Arquivo</span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-emerald-950 mt-1">
                O Que Você Vai Baixar Exatamente?
              </h2>
              <p className="text-sm md:text-base text-slate-650 mt-3 max-w-xl mx-auto">
                Toda a diagramação gráfica foi realizada com precisão milimétrica. Um arquivo PDF pronto para imprimir onde você quiser de forma organizada.
              </p>
            </div>

            <div id="scope-bento-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Box 1 */}
              <div className="bg-white border border-emerald-200/80 p-6 rounded-2xl shadow-sm duration-350 hover:border-emerald-500 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <h5 className="font-display font-bold text-lg text-emerald-950">
                  Álbum Diagramado HD
                </h5>
                <p className="text-xs md:text-sm text-slate-600 mt-2 leading-relaxed">
                  Todas as páginas de introdução, tabelas de grupos, estádios dos jogos no formato nativo para você fazer a impressão frente e verso perfeitamente adaptada.
                </p>
              </div>

              {/* Box 2 */}
              <div className="bg-white border border-emerald-200/80 p-6 rounded-2xl shadow-sm duration-350 hover:border-emerald-500 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-amber-700 mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h5 className="font-display font-bold text-lg text-emerald-950">
                  Todas as Seleções de 2026
                </h5>
                <p className="text-xs md:text-sm text-slate-600 mt-2 leading-relaxed">
                  As folhas de figurinhas organizadas por seleções. Escudos brilhantes, atletas oficiais da Copa e fotos em altíssima qualidade de pixel de 300 DPI.
                </p>
              </div>

              {/* Box 3 */}
              <div className="bg-white border border-emerald-200/80 p-6 rounded-2xl shadow-sm duration-350 hover:border-emerald-500 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-700 mb-4">
                  <BadgeAlert className="w-6 h-6" />
                </div>
                <h5 className="font-display font-bold text-lg text-emerald-950">
                  Todas as Raríssimas "Legends"
                </h5>
                <p className="text-xs md:text-sm text-slate-600 mt-2 leading-relaxed">
                  As famosas figurinhas raras que custam dezenas de reais em mercados paralelos. Vêm todas no PDF (corte brilhante gold) para dar o charme oficial.
                </p>
              </div>

              {/* Box 4 */}
              <div className="bg-white border border-emerald-200/80 p-6 rounded-2xl shadow-sm duration-350 hover:border-emerald-500 hover:shadow-lg transition-all md:col-span-2">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-4">
                  <Printer className="w-6 h-6" />
                </div>
                <h5 className="font-display font-bold text-lg text-emerald-950">
                  Layout de Corte Facilitado
                </h5>
                <p className="text-xs md:text-sm text-slate-600 mt-2 leading-relaxed">
                  Cada folha de figurinhas vem com guias de margem de corte leves nas bordas. Assim, basta usar uma régua e estilete (ou uma tesoura) para recortar tudo reto e com as medidas idênticas às figurinhas vendidas em banca.
                </p>
              </div>

              {/* Box 5 */}
              <div className="bg-white border border-emerald-200/80 p-6 rounded-2xl shadow-sm duration-350 hover:border-emerald-500 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h5 className="font-display font-bold text-lg text-emerald-950">
                  Guia "Instruções Ideais"
                </h5>
                <p className="text-xs md:text-sm text-slate-600 mt-2 leading-relaxed">
                  Guia passo a passo com links e indicação dos melhores papéis adesivos baratos do mercado de e-commerce e configurações exatas da impressora.
                </p>
              </div>

            </div>

            {/* Quick Tutorial Callout on paper */}
            <div id="printing-helper-callout" className="mt-8 p-6 bg-emerald-900/10 border border-emerald-500/20 rounded-2xl flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 shrink-0 bg-emerald-600 flex items-center justify-center text-yellow-300 font-bold rounded-2xl">
                <Printer className="w-8 h-8" />
              </div>
              <div className="text-center md:text-left">
                <h4 className="font-display font-bold text-emerald-950 text-base md:text-lg">
                  💡 Super Dica: Como Fazer o Acabamento Idêntico ao Oficial
                </h4>
                <p className="text-xs md:text-sm text-slate-700 mt-1 leading-relaxed">
                  Vá na papelaria ou compre online <strong className="text-emerald-900">Papel Fotográfico Adesivo Brilhante (Glossy de 115g ou 135g)</strong>. Imprima as páginas de figurinhas nele. Para o álbum em si, imprima em <strong className="text-emerald-900">Papel Couchê Brilhante de 150g ou 180g</strong> frente e verso. Você terá um álbum perfeito e premium pagando uma fração ínfima do preço físico!
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Risco Zero & Garantia */}
      <section id="garantia-secao" className="py-20 bg-emerald-950 relative overflow-hidden text-white">
        {/* Background yellow ambient glow */}
        <div className="absolute -top-24 right-1/4 w-[350px] h-[350px] bg-yellow-400/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-md flex flex-col md:flex-row items-center gap-8 relative z-10">
              
              <div className="w-32 h-32 shrink-0 bg-yellow-400/10 rounded-full flex items-center justify-center text-yellow-300 shadow-inner">
                <ShieldCheck className="w-16 h-16" />
              </div>

              <div>
                <span className="text-[10px] uppercase text-yellow-400 font-mono tracking-widest font-extrabold block">Compra Certificada</span>
                <h3 className="font-display font-extrabold text-2xl md:text-3xl text-white mt-1">
                  Sua Compra é 100% Segura e Garantida!
                </h3>
                <p className="text-xs md:text-sm text-emerald-100 mt-3 leading-relaxed">
                  Sabemos que a qualidade do nosso PDF compilado é incomparável. Todos os pagamentos são processados em ambiente altamente seguro e criptografado de ponta a ponta. Você receberá o acesso definitivo e completo diretamente em seu e-mail e em seu WhatsApp instantes após a confirmação. Adquira com total segurança e comodidade.
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-mono text-emerald-250">
                  <span className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-yellow-350" /> Entrega Instantânea Garantida
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-yellow-350" /> Conexão Criptografada SSL
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos / Social Proof */}
      <section id="depoimentos-secao" className="py-20 bg-emerald-50/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-12">
              <span className="text-xs uppercase text-emerald-700 font-mono tracking-widest block font-black">Depoimentos Reais</span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-emerald-950 mt-1">
                O Que Quem Já Baixou Tem a Dizer?
              </h2>
              <p className="text-sm text-slate-650 mt-2">
                Conheça a experiência de colecionadores e donos de família inteligentes em todo o país.
              </p>
            </div>

            <div id="testimonials-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-white border border-emerald-100 p-6 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                  <div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-xs md:text-sm text-slate-600 italic leading-relaxed">
                      "{t.text}"
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-3 border-t border-emerald-100 pt-4">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <h6 className="font-display font-bold text-xs md:text-sm text-emerald-950">{t.name}</h6>
                      <span className="text-[10px] text-slate-500 block">{t.role}</span>
                      <span className="text-[9px] text-emerald-700 block font-mono font-bold">{t.city}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq-secao" className="py-20 bg-emerald-50/40 border-t border-emerald-100 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            
            <div className="text-center mb-12">
              <span className="text-xs uppercase text-emerald-700 font-mono tracking-widest block font-black">Perguntas Frequentes</span>
              <h2 className="font-display font-extrabold text-3xl text-emerald-950 mt-1">
                Dúvidas Comuns Respondidas
              </h2>
              <p className="text-xs md:text-sm text-slate-650 mt-2">
                Se tiver alguma outra questão, fale conosco após preencher seus dados de compra.
              </p>
            </div>

            <div id="faq-accordion-group" className="space-y-4">
              {faqItems.map((item, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div key={index} className="bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-sm">
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full text-left p-5 flex items-center justify-between text-emerald-950 font-display font-bold text-sm md:text-base hover:bg-emerald-50/50 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-emerald-600" />
                        {item.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-emerald-700" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-emerald-700" />
                      )}
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="border-t border-emerald-50"
                        >
                          <p className="p-5 text-xs md:text-sm text-slate-650 leading-relaxed bg-emerald-50/10">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>



      {/* OFERTA E FECHAMENTO / FOOTER */}
      <footer id="app-footer" className="bg-emerald-950 border-t border-emerald-900 pt-16 pb-12 relative z-10 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 pb-12 border-b border-white/10">
            
            <div className="text-center md:text-left">
              <span className="text-xs uppercase text-yellow-300 font-mono tracking-widest block font-black">Adquira agora mesmo</span>
              <h4 className="font-display font-extrabold text-2xl text-white mt-1">
                Complete Seu Álbum Por Menos de R$ 20!
              </h4>
              <p className="text-xs md:text-sm text-emerald-200 mt-1 max-w-sm">
                Preço promocional válido para as próximas horas. Compra segura com envio imediato e acesso 100% garantido.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="text-center md:text-right">
                <span className="text-xs text-emerald-250 block -mb-1">TUDO DIGITAL COMPLETO</span>
                <span className="font-display font-black text-3xl text-yellow-300">R$ 19,90</span>
                <span className="text-[10px] text-emerald-300 block font-mono">pagamento único</span>
              </div>
              <a
                id="footer-cta-btn"
                href="https://pay.kirvano.com/d8c2dbfc-8478-4aca-97b7-f25fc25d0886"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('InitiateCheckout', { value: 19.90, currency: 'BRL' })}
                className="bg-yellow-400 hover:bg-yellow-350 text-emerald-950 font-display font-black text-xs md:text-sm py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:scale-102 inline-flex items-center justify-center text-center cursor-pointer text-decoration-none"
              >
                Comprar Álbum Completo
              </a>
            </div>

          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-8 text-xs text-emerald-205">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-emerald-900 p-0.5 flex items-center justify-center shadow-md">
                <img 
                  src="/logo-copa-2026.svg" 
                  alt="FIFA 2026 Logo" 
                  className="object-contain max-h-full"
                />
              </div>
              <span>© {new Date().getFullYear()} Copa 2026 Digital • Todos os direitos reservados.</span>
            </div>
            <div className="flex flex-wrap gap-4 text-[11px] justify-center text-emerald-300">
              <span>Termos de Uso</span>
              <span>Políticas de Privacidade</span>
              <span>Contato suporte: kikitogamerBR@gmail.com</span>
            </div>
          </div>

        </div>
      </footer>

      {/* COMPRA REAL-TIME POPUP SIMULATOR (Selo convert) */}
      <AnimatePresence>
        {purchaseAlert && (
          <motion.div
            id="purchase-alert-toast"
            initial={{ opacity: 0, x: -100, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 15 }}
            className="fixed bottom-4 left-4 z-50 bg-white border border-emerald-200 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 max-w-xs cursor-default"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
              <ThumbsUp className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[11px] font-bold text-emerald-950 block truncate">{purchaseAlert.name}</span>
              <span className="text-[10px] text-emerald-700 block -mt-0.5">acabou de garantir o Álbum Completo!</span>
            </div>
            <span className="text-[9px] text-slate-500 font-mono shrink-0 ml-auto">{purchaseAlert.time}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vercel Web Analytics */}
      <Analytics />

    </div>
  );
}
