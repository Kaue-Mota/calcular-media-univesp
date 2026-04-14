import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calculator, BarChart2, BookOpen, ArrowRight, CheckCircle2, AlertCircle, XCircle } from 'lucide-react'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const cards = [
  {
    to: '/calculadora',
    icon: Calculator,
    color: 'from-univesp-500 to-univesp-700',
    glow: 'hover:shadow-univesp-500/30',
    title: 'Calculadora',
    desc: 'Calcule sua média final e veja se você passou, ficou de exame ou foi reprovado.',
    badge: 'Principal',
  },
  {
    to: '/simulador',
    icon: BarChart2,
    color: 'from-accent-500 to-accent-600',
    glow: 'hover:shadow-accent-500/30',
    title: 'Simulador',
    desc: 'Descubra a nota mínima que você precisa tirar na prova ou exame para ser aprovado.',
    badge: 'Muito útil',
  },
  {
    to: '/guia',
    icon: BookOpen,
    color: 'from-purple-500 to-purple-700',
    glow: 'hover:shadow-purple-500/30',
    title: 'Guia',
    desc: 'Entenda as regras da faculdade, tipos de prova, o que é DP e como funciona o cálculo.',
    badge: 'Tire dúvidas',
  },
]

const steps = [
  { label: 'Aprovado', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', icon: CheckCircle2, desc: 'Média final ≥ 5,0' },
  { label: 'Exame', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20', icon: AlertCircle, desc: 'Média final < 5,0 → vai a exame' },
  { label: 'Reprovado / DP', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', icon: XCircle, desc: 'Após exame, média < 5,0' },
]

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      {/* Hero */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="text-center mb-16"
      >
        <motion.div variants={item} className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-univesp-200 mb-6">
          <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse-soft" />
          Calculadora não oficial para estudantes UNIVESP
        </motion.div>

        <motion.h1 variants={item} className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
          <span className="gradient-text">Calcule suas notas</span>
          <br />
          <span className="gradient-text-orange">com facilidade</span>
        </motion.h1>

        <motion.p variants={item} className="text-univesp-300 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          Ferramenta completa para calcular médias, simular resultados e entender as regras de avaliação da UNIVESP.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/calculadora" className="btn-primary flex items-center gap-2 text-base">
            Calcular agora
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/guia" className="btn-secondary flex items-center gap-2 text-base">
            <BookOpen className="w-4 h-4" />
            Ver o guia
          </Link>
        </motion.div>
      </motion.div>

      {/* Formula cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mb-16"
      >
        <div className="grid md:grid-cols-2 gap-4">
          {/* Formula 1 */}
          <div className="card group">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-univesp-500/20 flex items-center justify-center shrink-0 text-univesp-300 font-bold text-lg">1</div>
              <div>
                <h3 className="font-bold text-white mb-2">Média Bimestral</h3>
                <div className="glass rounded-xl p-3 mb-3 font-mono text-sm">
                  <span className="text-accent-400">(Prova × 0,6)</span>
                  <span className="text-univesp-300"> + </span>
                  <span className="text-emerald-400">(Média Atividades × 0,4)</span>
                </div>
                <p className="text-univesp-400 text-sm">A nota da prova vale 60% e as atividades valem 40% da média final.</p>
              </div>
            </div>
          </div>

          {/* Formula 2 */}
          <div className="card group">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center shrink-0 text-accent-400 font-bold text-lg">2</div>
              <div>
                <h3 className="font-bold text-white mb-2">Média após Exame</h3>
                <div className="glass rounded-xl p-3 mb-3 font-mono text-sm">
                  <span className="text-univesp-300">(</span>
                  <span className="text-accent-400">Nota Bimestral</span>
                  <span className="text-univesp-300"> + </span>
                  <span className="text-yellow-400">Nota Exame</span>
                  <span className="text-univesp-300">) ÷ 2</span>
                </div>
                <p className="text-univesp-400 text-sm">Se a média bimestral for inferior a 5, o aluno vai a exame. A média é feita entre as duas notas.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Status indicators */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="section-title text-center mb-6">Situações possíveis</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {steps.map(({ label, color, bg, icon: Icon, desc }) => (
            <div key={label} className={`rounded-2xl p-5 border ${bg} flex items-start gap-4 transition-transform duration-300 hover:-translate-y-1`}>
              <Icon className={`w-6 h-6 ${color} shrink-0 mt-0.5`} />
              <div>
                <p className={`font-bold ${color} text-lg`}>{label}</p>
                <p className="text-univesp-300 text-sm mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Feature cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.h2 variants={item} className="section-title text-center mb-8">O que você pode fazer</motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map(({ to, icon: Icon, color, glow, title, desc, badge }) => (
            <motion.div key={to} variants={item}>
              <Link
                to={to}
                className={`group block card h-full hover:shadow-xl ${glow} transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-white text-lg">{title}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full glass text-univesp-300">{badge}</span>
                </div>
                <p className="text-univesp-300 text-sm leading-relaxed mb-4">{desc}</p>
                <div className="flex items-center gap-2 text-sm font-medium text-univesp-300 group-hover:text-white transition-colors">
                  Acessar <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
