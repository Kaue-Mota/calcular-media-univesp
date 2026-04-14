import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calculator, BarChart2, BookOpen, ArrowRight, CheckCircle2, AlertCircle, XCircle, ChevronRight } from 'lucide-react'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const tools = [
  {
    to: '/calculadora',
    icon: Calculator,
    title: 'Calculadora de Média',
    desc: 'Calcule sua média bimestral e descubra se você foi aprovado, ficou de exame ou foi reprovado.',
    cta: 'Calcular agora',
  },
  {
    to: '/simulador',
    icon: BarChart2,
    title: 'Simulador de Notas',
    desc: 'Descubra a nota mínima que você precisa tirar na prova ou exame para ser aprovado.',
    cta: 'Simular',
  },
  {
    to: '/guia',
    icon: BookOpen,
    title: 'Guia de Avaliação',
    desc: 'Entenda as regras da faculdade, tipos de prova, o que é DP e como funciona o cálculo.',
    cta: 'Ver guia',
  },
]

const statuses = [
  { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', label: 'Aprovado',       desc: 'Média final maior ou igual a 5,0' },
  { icon: AlertCircle,  color: 'text-amber-600',   bg: 'bg-amber-50 border-amber-200',     label: 'Exame',          desc: 'Média final menor que 5,0 → vai a exame' },
  { icon: XCircle,      color: 'text-red-600',     bg: 'bg-red-50 border-red-200',         label: 'Reprovado',      desc: 'Após o exame, média menor que 5,0' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-univ-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
            <motion.div variants={item} className="mb-4">
              <span className="chip">Ferramenta não oficial · UNIVESP</span>
            </motion.div>

            <motion.h1 variants={item} className="text-4xl sm:text-5xl md:text-6xl font-black text-univ-900 leading-tight mb-6">
              Calcule suas notas{' '}
              <span className="text-primary-700">com facilidade</span>
            </motion.h1>

            <motion.p variants={item} className="text-univ-500 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
              Ferramenta completa para calcular médias, simular resultados e entender as regras de avaliação da UNIVESP.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-3">
              <Link to="/calculadora" className="btn-primary flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Calcular agora
              </Link>
              <Link to="/guia" className="btn-outline flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Ver o guia
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Fórmulas */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="accent-bar" />
          <h2 className="section-title mb-1">Como é calculada a sua nota</h2>
          <p className="text-univ-500 text-sm mb-8">Entenda as fórmulas que determinam sua situação na disciplina.</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Fórmula 1 */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary-700 text-white font-black text-sm flex items-center justify-center">1</div>
                <h3 className="font-bold text-univ-900">Nota final da disciplina no bimestre</h3>
              </div>
              <div className="formula-box mb-4">
                <span className="text-primary-700 font-semibold">(Prova × 0,6)</span>
                <span className="text-univ-500"> + </span>
                <span className="text-emerald-700 font-semibold">(Média AVA × 0,4)</span>
                <span className="text-univ-500"> = Média Final</span>
              </div>
              <p className="text-univ-500 text-sm">A prova regular vale <strong className="text-univ-700">60%</strong> e as atividades do AVA valem <strong className="text-univ-700">40%</strong>.</p>
            </div>

            {/* Fórmula 2 */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary-700 text-white font-black text-sm flex items-center justify-center">2</div>
                <h3 className="font-bold text-univ-900">Média após Exame</h3>
              </div>
              <div className="formula-box mb-4">
                <span className="text-univ-500">(</span>
                <span className="text-primary-700 font-semibold">Nota Bimestral</span>
                <span className="text-univ-500"> + </span>
                <span className="text-amber-600 font-semibold">Nota Exame</span>
                <span className="text-univ-500">) ÷ 2</span>
              </div>
              <p className="text-univ-500 text-sm">Se a média bimestral for inferior a 5, o aluno vai a exame. A média final é a aritmética entre as duas.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Situações possíveis */}
      <section className="bg-white border-y border-univ-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="accent-bar" />
            <h2 className="section-title mb-1">Situações possíveis</h2>
            <p className="text-univ-500 text-sm mb-8">Seu resultado final depende de quando você atingiu (ou não) a média mínima.</p>

            <div className="grid sm:grid-cols-3 gap-5">
              {statuses.map(({ icon: Icon, color, bg, label, desc }) => (
                <div key={label} className={`rounded-2xl border p-5 ${bg} flex items-start gap-4`}>
                  <Icon className={`w-6 h-6 ${color} shrink-0 mt-0.5`} />
                  <div>
                    <p className={`font-bold text-base ${color}`}>{label}</p>
                    <p className="text-univ-600 text-sm mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ferramentas */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.div variants={item}>
            <div className="accent-bar" />
            <h2 className="section-title mb-1">Ferramentas disponíveis</h2>
            <p className="text-univ-500 text-sm mb-8">Tudo o que você precisa para acompanhar suas notas.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {tools.map(({ to, icon: Icon, title, desc, cta }) => (
              <motion.div key={to} variants={item}>
                <Link to={to} className="group card flex flex-col h-full hover:border-primary-200 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-5 group-hover:bg-primary-700 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary-700 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-bold text-univ-900 text-lg mb-2">{title}</h3>
                  <p className="text-univ-500 text-sm leading-relaxed flex-1 mb-5">{desc}</p>
                  <div className="flex items-center gap-1.5 text-primary-700 font-semibold text-sm">
                    {cta}
                    <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA banner */}
      <section className="bg-primary-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-black text-2xl mb-1">Pronto para calcular?</p>
            <p className="text-primary-200 text-sm">Insira suas notas e descubra sua situação agora mesmo.</p>
          </div>
          <Link to="/calculadora" className="bg-white text-primary-700 font-bold px-8 py-3 rounded-xl hover:bg-primary-50 transition-colors duration-200 flex items-center gap-2 shrink-0">
            Ir para a calculadora
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
