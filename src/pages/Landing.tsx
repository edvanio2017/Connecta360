import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  Zap, 
  Shield, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Smartphone, 
  Mail,
  Layers,
  ChevronDown,
  ChevronUp,
  Calculator,
  Star,
  Quote,
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from '../components/Logo';

const FAQS = [
  {
    question: "Como funciona o preço pré-pago?",
    answer: "Você só paga pelo que usa. Não há taxas mensais ou compromissos mínimos. Faturamos no final de cada mês com base no número total de mensagens enviadas em cada canal."
  },
  {
    question: "Posso usar minha própria conta Twilio ou SendGrid?",
    answer: "Sim! O Connecta360 suporta 'Bring Your Own Key' (BYOK) para clientes empresariais, permitindo que você aproveite seus relacionamentos existentes com provedores enquanto usa nossa API e painel unificados."
  },
  {
    question: "O que acontece se uma mensagem não for entregue?",
    answer: "Nosso sistema Smart Fallback detecta automaticamente falhas de entrega e pode redirecionar a mensagem através de um canal alternativo (por exemplo, se o WhatsApp falhar, enviar via SMS) com base em suas regras pré-definidas."
  },
  {
    question: "Existe um plano gratuito para desenvolvedores?",
    answer: "Com certeza. Cada nova conta inclui 1.000 mensagens gratuitas para ajudar você a construir e testar sua integração. Não é necessário cartão de crédito para começar."
  }
];

const TESTIMONIALS = [
  {
    name: "Alex Rivera",
    role: "CTO na NexaScale",
    content: "O Connecta360 reduziu nossa latência de notificação em 40% e simplificou significativamente nossa base de código. Uma API para tudo é um divisor de águas.",
    avatar: "https://picsum.photos/seed/alex/100/100"
  },
  {
    name: "Elena Smith",
    role: "Líder de Produto na Orbit",
    content: "O recurso de fallback inteligente nos salvou durante uma grande interrupção do provedor de SMS. Nossos clientes nem perceberam porque o WhatsApp assumiu instantaneamente.",
    avatar: "https://picsum.photos/seed/elena/100/100"
  },
  {
    name: "Marcus Thorne",
    role: "Dev Sênior na Quantum",
    content: "A API de comunicação mais amigável para desenvolvedores que já usei. A documentação é impecável e o painel é incrivelmente intuitivo.",
    avatar: "https://picsum.photos/seed/marcus/100/100"
  }
];

const PRICING_RATES = {
  email: 0.09,
  sms: 6.75,
  whatsapp: 13.5,
  telegram: 0.45,
  push: 0.045
};

function PriceCalculator() {
  const [volumes, setVolumes] = useState({
    email: 50000,
    sms: 10000,
    whatsapp: 5000,
    telegram: 2000,
    push: 100000
  });

  const total = Object.entries(volumes).reduce((acc, [key, val]) => {
    const rate = PRICING_RATES[key as keyof typeof PRICING_RATES] || 0;
    return acc + (val as number * rate);
  }, 0);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Calculator className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">Estimador de Custos</h3>
      </div>

      <div className="space-y-6">
        {Object.entries(volumes).map(([channel, value]) => (
          <div key={channel}>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-slate-600 capitalize">{channel}</label>
              <span className="text-sm font-mono text-blue-600 font-bold">{value.toLocaleString()} msgs</span>
            </div>
            <input
              type="range"
              min="0"
              max={channel === 'email' || channel === 'push' ? 1000000 : 100000}
              step={channel === 'email' || channel === 'push' ? 10000 : 1000}
              value={value}
              onChange={(e) => setVolumes({ ...volumes, [channel]: parseInt(e.target.value) })}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        ))}
      </div>

      <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col items-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Total Mensal Estimado</p>
        <div className="text-5xl font-black text-slate-900 flex items-baseline gap-2">
          <span className="text-2xl text-blue-600">Kz</span>
          {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <p className="mt-4 text-xs text-slate-400 italic text-center">
          *Estimativas baseadas em taxas globais padrão. Descontos por volume aplicam-se para &gt;1M de mensagens.
        </p>
      </div>
    </div>
  );
}

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-blue-600 transition-colors"
      >
        <span className="text-lg font-bold text-slate-900">{question}</span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-blue-600" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-600 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/">
                <Logo variant="dark" />
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Recursos</a>
              <a href="#pricing" className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Preços</a>
              <a href="#faq" className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">FAQ</a>
              <div className="h-4 w-px bg-slate-200 mx-2"></div>
              <Link to="/login" className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors">
                Entrar
              </Link>
              <Link to="/signup" className="text-sm font-bold text-white bg-slate-900 px-6 py-2 rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-slate-200">
                Começar agora
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-slate-900 focus:outline-none p-2"
              >
                {isMenuOpen ? <ChevronUp className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                <a 
                  href="#features" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-3 text-base font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
                >
                  Recursos
                </a>
                <a 
                  href="#pricing" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-3 text-base font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
                >
                  Preços
                </a>
                <a 
                  href="#faq" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-3 text-base font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
                >
                  FAQ
                </a>
                <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col gap-3">
                  <Link 
                    to="/login" 
                    className="flex justify-center items-center px-4 py-3 text-base font-bold text-slate-900 bg-slate-50 rounded-lg"
                  >
                    Entrar
                  </Link>
                  <Link 
                    to="/signup" 
                    className="flex justify-center items-center px-4 py-3 text-base font-bold text-white bg-blue-600 rounded-lg shadow-lg shadow-blue-100"
                  >
                    Começar agora
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-lg">
                A Plataforma de Comunicação Unificada
              </span>
              <h1 className="text-6xl lg:text-8xl font-black tracking-tight text-slate-900 leading-[0.9] mb-8">
                Alcance todos, <br />
                <span className="text-blue-600">em qualquer lugar.</span>
              </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
            Uma API para alcançar seus clientes no WhatsApp, SMS, E-mail e Push. 
            Construído para escala, confiabilidade e felicidade do desenvolvedor.
          </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/signup" className="w-full sm:w-auto flex items-center justify-center px-8 py-3 text-base font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 group">
                  Comece Gratuitamente
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="w-full sm:w-auto flex items-center justify-center px-8 py-3 text-base font-bold text-slate-700 bg-white rounded-lg hover:bg-slate-50 transition-all border border-slate-200">
                  Ver Docs da API
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calculator & Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-base font-bold text-blue-600 uppercase tracking-widest mb-4">Preços</h2>
              <h3 className="text-5xl font-black text-slate-900 mb-6 leading-tight">
                Pague apenas pelo <br />
                <span className="text-blue-600 italic">que você envia.</span>
              </h3>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                Sem taxas ocultas. Sem mínimos mensais. Dimensione de 1 a 1 bilhão de mensagens com preços transparentes baseados em volume.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                {[
                  { label: 'E-mail', price: 'Kz 90 / 1k' },
                  { label: 'SMS', price: 'Kz 6.75 / msg' },
                  { label: 'WhatsApp', price: 'Kz 13.5 / msg' },
                  { label: 'Push', price: 'Kz 45 / 1k' },
                ].map(item => (
                  <div key={item.label} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-lg font-bold text-slate-900">{item.price}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 p-6 bg-blue-600 rounded-xl text-white shadow-xl shadow-blue-200">
                <Zap className="h-10 w-10 flex-shrink-0" />
                <div>
                  <p className="font-bold text-lg">Descontos por Volume</p>
                  <p className="text-blue-100 text-sm">Enviando mais de 1M de mensagens? Entre em contacto para taxas empresariais personalizadas.</p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <PriceCalculator />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base font-bold text-blue-600 uppercase tracking-widest mb-4">Depoimentos</h2>
            <h3 className="text-4xl font-black text-slate-900">Confiado por inovadores.</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-xl transition-all relative group"
              >
                <Quote className="absolute top-6 right-8 h-12 w-12 text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(star => <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-600 leading-relaxed mb-8 italic">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full border-2 border-white shadow-md" referrerPolicy="no-referrer" />
                  <div>
                    <p className="font-bold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-400 font-medium">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base font-bold text-blue-600 uppercase tracking-widest mb-4">FAQ</h2>
            <h3 className="text-4xl font-black text-slate-900">Perguntas Comuns</h3>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white border-t border-slate-100 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl font-black text-slate-900 mb-6">Faça seu negócio crescer mais rápido.</h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Junte-se a mais de 500 empresas que confiam no Connecta360 para suas comunicações críticas.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup" className="px-10 py-3 bg-blue-600 text-white rounded-lg font-bold text-base hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
              Comece Gratuitamente
            </Link>
            <button className="px-10 py-3 bg-white text-slate-900 rounded-lg font-bold text-base hover:bg-slate-50 transition-all border border-slate-200">
              Falar com Vendas
            </button>
          </div>
          <p className="mt-8 text-slate-400 text-sm font-medium">Não é necessário cartão de crédito. 1.000 mensagens gratuitas incluídas.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center">
            <Logo variant="dark" className="scale-75 origin-left" />
            <span className="ml-8 text-sm text-slate-400 font-medium">© 2026 Connecta360 Inc.</span>
          </div>
          <div className="flex space-x-8">
            <a href="#" className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors">Privacidade</a>
            <a href="#" className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors">Termos</a>
            <a href="#" className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors">Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
