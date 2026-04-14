import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen, ChevronDown, Monitor, Laptop, Globe,
  Calendar, Clock, AlertTriangle, GraduationCap,
  CheckCircle2, AlertCircle, XCircle, FileText, Lightbulb,
} from 'lucide-react'

interface AccordionItem {
  id: string
  icon: React.ElementType
  color: string
  title: string
  content: React.ReactNode
}

function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null)
  return (
    <div className="space-y-3">
      {items.map(({ id, icon: Icon, color, title, content }) => (
        <div key={id} className="card p-0 overflow-hidden">
          <button
            onClick={() => setOpen(open === id ? null : id)}
            className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/5 transition-colors duration-200"
          >
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white flex-1">{title}</span>
            <motion.div animate={{ rotate: open === id ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-4 h-4 text-univesp-400" />
            </motion.div>
          </button>
          <AnimatePresence initial={false}>
            {open === id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 text-univesp-300 text-sm leading-relaxed border-t border-white/5">
                  <div className="pt-4">{content}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

const examTypes: AccordionItem[] = [
  {
    id: 'cartao',
    icon: FileText,
    color: 'from-blue-500 to-blue-700',
    title: 'Prova com Cartão',
    content: (
      <div className="space-y-3">
        <p>
          É uma <strong className="text-white">prova escrita presencial</strong> realizada no polo da UNIVESP com
          preenchimento de <strong className="text-white">cartão resposta</strong> (gabarito de bolinha).
        </p>
        <div className="glass rounded-xl p-3 flex items-center gap-3">
          <FileText className="w-5 h-5 text-blue-400 shrink-0" />
          <p className="text-sm">Você vai ao polo, recebe o caderno de questões e marca as respostas no cartão.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'digital',
    icon: Monitor,
    color: 'from-purple-500 to-purple-700',
    title: 'Prova Digital',
    content: (
      <div className="space-y-3">
        <p>
          É uma <strong className="text-white">prova virtual presencial</strong> realizada no polo com um{' '}
          <strong className="text-white">código de acesso</strong>. Você usa computador no polo, mas é uma prova online.
        </p>
        <div className="glass rounded-xl p-3 flex items-center gap-3">
          <Monitor className="w-5 h-5 text-purple-400 shrink-0" />
          <p className="text-sm">O código de acesso é fornecido no polo e garante que a prova seja feita no local determinado.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'online',
    icon: Globe,
    color: 'from-emerald-500 to-emerald-700',
    title: 'Prova Online',
    content: (
      <div className="space-y-3">
        <p>
          É uma <strong className="text-white">prova virtual sem código de acesso</strong>. Pode ser realizada de qualquer lugar,
          mas opcionalmente pode ser feita no polo.
        </p>
        <div className="glass rounded-xl p-3 flex items-center gap-3">
          <Globe className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-sm">A flexibilidade é maior, mas fique atento ao prazo e ao ambiente (sem distrações).</p>
        </div>
      </div>
    ),
  },
]

const provaTypes: AccordionItem[] = [
  {
    id: 'regular',
    icon: Calendar,
    color: 'from-univesp-500 to-univesp-700',
    title: 'Provas Regulares',
    content: (
      <div className="space-y-3">
        <p>
          São as provas realizadas <strong className="text-white">após a conclusão das disciplinas</strong> cursadas no
          bimestre. São as provas normais do calendário acadêmico.
        </p>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Realizadas ao final de cada bimestre</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Cobrem o conteúdo das disciplinas do período</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Valem 60% da média final</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 'segunda-chamada',
    icon: Clock,
    color: 'from-amber-500 to-amber-700',
    title: 'Provas de 2ª Chamada',
    content: (
      <div className="space-y-3">
        <p>
          Destinada apenas a estudantes <strong className="text-white">impedidos por motivo de saúde</strong> de
          comparecer ao polo para realizar a prova presencial.
        </p>
        <div className="glass rounded-xl p-3 space-y-2">
          <p className="text-white font-semibold text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Requisitos obrigatórios:
          </p>
          <ul className="space-y-1.5 ml-6 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-0.5">•</span>
              <span>Atestado com <strong className="text-white">laudo médico</strong> especificando a impossibilidade acadêmica</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-0.5">•</span>
              <span>Requerimento específico via sistema da UNIVESP</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-0.5">•</span>
              <span>Solicitação dentro do prazo estabelecido</span>
            </li>
          </ul>
        </div>
        <p className="text-xs text-univesp-500 flex items-center gap-1.5">
          <AlertTriangle className="w-3 h-3 text-red-400" />
          Não é aceita para qualquer motivo — apenas saúde com laudo.
        </p>
      </div>
    ),
  },
  {
    id: 'exame',
    icon: AlertCircle,
    color: 'from-red-500 to-red-700',
    title: 'Provas de Exame',
    content: (
      <div className="space-y-3">
        <p>São realizadas quando o aluno se encaixa em uma das situações:</p>
        <div className="space-y-2">
          <div className="result-exam rounded-xl p-3 flex items-center gap-3">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="text-sm">Não realizou a prova regular no bimestre</span>
          </div>
          <div className="result-exam rounded-xl p-3 flex items-center gap-3">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="text-sm">Realizou a prova, mas a média final ficou abaixo de 5,0</span>
          </div>
        </div>
        <div className="glass rounded-xl p-3 text-sm">
          <p className="text-white font-semibold mb-1">Cálculo após o exame:</p>
          <p className="font-mono text-accent-400">(Média Bimestral + Nota do Exame) ÷ 2</p>
          <p className="text-univesp-400 mt-1">Se o resultado for ≥ 5 → Aprovado. Se for {'<'} 5 → DP.</p>
        </div>
      </div>
    ),
  },
]

const gradeGuide: AccordionItem[] = [
  {
    id: 'calc-media',
    icon: GraduationCap,
    color: 'from-univesp-500 to-univesp-700',
    title: 'Como é calculada a média bimestral?',
    content: (
      <div className="space-y-4">
        <div className="glass rounded-xl p-4 font-mono text-center space-y-2">
          <p className="text-sm text-univesp-400">Fórmula:</p>
          <p className="text-white text-base">
            <span className="text-accent-400">(Prova × 0,6)</span>
            {' '}+{' '}
            <span className="text-emerald-400">(Média Atividades × 0,4)</span>
            {' '}= Média Final
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="glass rounded-xl p-3">
            <p className="text-accent-400 font-bold mb-1">Prova Regular (60%)</p>
            <p className="text-sm text-univesp-300">A prova escrita/digital realizada ao final do bimestre representa 60% da sua nota.</p>
          </div>
          <div className="glass rounded-xl p-3">
            <p className="text-emerald-400 font-bold mb-1">Atividades (40%)</p>
            <p className="text-sm text-univesp-300">A média de todas as atividades realizadas durante o bimestre representa 40% da nota.</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-white font-semibold text-sm">Resultado:</p>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-sm">Média ≥ 5,0 → <strong className="text-emerald-400">Aprovado</strong></span>
          </div>
          <div className="flex items-center gap-3">
            <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0" />
            <span className="text-sm">Média {'<'} 5,0 → <strong className="text-yellow-400">Vai a Exame</strong></span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'calc-exame',
    icon: AlertCircle,
    color: 'from-yellow-500 to-amber-600',
    title: 'Como funciona o cálculo após o Exame?',
    content: (
      <div className="space-y-4">
        <div className="glass rounded-xl p-4 font-mono text-center">
          <p className="text-sm text-univesp-400 mb-2">Fórmula:</p>
          <p className="text-white text-base">
            <span className="text-univesp-200">(</span>
            <span className="text-yellow-400">Média Bimestral</span>
            {' '}+{' '}
            <span className="text-accent-400">Nota do Exame</span>
            <span className="text-univesp-200">)</span>
            {' '}÷ 2 = Média Final
          </p>
        </div>
        <p className="text-sm text-univesp-300">
          É simplesmente a média aritmética entre a nota bimestral e a nota do exame. Ambas têm peso igual.
        </p>
        <div className="glass rounded-xl p-4 space-y-2 text-sm">
          <p className="text-white font-semibold">Exemplo prático:</p>
          <p className="text-univesp-300">Média bimestral: 3,5 | Nota do exame: 7,0</p>
          <p className="font-mono text-accent-400">(3,5 + 7,0) ÷ 2 = 5,25 → Aprovado!</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-sm">Média ≥ 5,0 → <strong className="text-emerald-400">Aprovado</strong></span>
          </div>
          <div className="flex items-center gap-3">
            <XCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span className="text-sm">Média {'<'} 5,0 → <strong className="text-red-400">Reprovado (DP)</strong></span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'dp',
    icon: XCircle,
    color: 'from-red-500 to-rose-700',
    title: 'O que é DP (Dependência)?',
    content: (
      <div className="space-y-4">
        <p>
          <strong className="text-white">DP</strong> significa{' '}
          <strong className="text-white">Dependência</strong>. Ocorre quando o aluno{' '}
          <strong className="text-red-400">não consegue aprovação</strong> em uma disciplina após o exame final.
        </p>
        <div className="result-failed rounded-xl p-4 space-y-2">
          <p className="font-bold">Quando você fica de DP?</p>
          <ul className="space-y-1.5 text-sm ml-2">
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-0.5">→</span>
              <span>Fez o exame e a média final ficou abaixo de 5,0</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-0.5">→</span>
              <span>Não realizou nenhuma das provas (regular e exame)</span>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <p className="text-white font-semibold text-sm">Consequências do DP:</p>
          <div className="space-y-2 text-sm">
            <div className="glass rounded-xl p-3 flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Você terá que <strong className="text-white">cursar a disciplina novamente</strong> em outro período</span>
            </div>
            <div className="glass rounded-xl p-3 flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Pode <strong className="text-white">impactar o progresso</strong> no curso dependendo da grade curricular</span>
            </div>
            <div className="glass rounded-xl p-3 flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Pode impedir a formatura se for uma disciplina obrigatória</span>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-300">
            <strong>Dica:</strong> Use o simulador para descobrir a nota mínima que você precisa tirar no exame e evitar o DP!
          </p>
        </div>
      </div>
    ),
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Guide() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-black gradient-text">Guia UNIVESP</h1>
        </div>
        <p className="text-univesp-300">Entenda as regras de avaliação, tipos de prova, o que é DP e como funciona o sistema de notas.</p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">

        {/* How grades work */}
        <motion.section variants={item}>
          <h2 className="section-title flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-accent-400" />
            Sistema de Notas
          </h2>
          <Accordion items={gradeGuide} />
        </motion.section>

        {/* Exam types */}
        <motion.section variants={item}>
          <h2 className="section-title flex items-center gap-2 mb-4">
            <Laptop className="w-5 h-5 text-accent-400" />
            Modalidades de Prova
          </h2>
          <Accordion items={examTypes} />
        </motion.section>

        {/* Prova categories */}
        <motion.section variants={item}>
          <h2 className="section-title flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-accent-400" />
            Tipos de Avaliação
          </h2>
          <Accordion items={provaTypes} />
        </motion.section>

        {/* Quick reference */}
        <motion.section variants={item}>
          <h2 className="section-title flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-accent-400" />
            Resumo Rápido
          </h2>
          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-univesp-400 font-semibold">Situação</th>
                    <th className="text-left py-3 px-4 text-univesp-400 font-semibold">Condição</th>
                    <th className="text-left py-3 px-4 text-univesp-400 font-semibold">Resultado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { sit: 'Após prova regular', cond: 'Média ≥ 5,0', res: 'Aprovado', resColor: 'text-emerald-400' },
                    { sit: 'Após prova regular', cond: 'Média < 5,0', res: 'Vai a Exame', resColor: 'text-yellow-400' },
                    { sit: 'Após o exame', cond: 'Média ≥ 5,0', res: 'Aprovado', resColor: 'text-emerald-400' },
                    { sit: 'Após o exame', cond: 'Média < 5,0', res: 'DP (Reprovado)', resColor: 'text-red-400' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/3 transition-colors">
                      <td className="py-3 px-4 text-univesp-200">{row.sit}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.cond}</td>
                      <td className={`py-3 px-4 font-bold ${row.resColor}`}>{row.res}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 pt-5 border-t border-white/5 space-y-3">
              <p className="text-white font-semibold text-sm">Fórmulas:</p>
              <div className="space-y-2 font-mono text-sm">
                <div className="glass rounded-xl p-3">
                  <span className="text-univesp-400 text-xs block mb-1">Média Bimestral:</span>
                  <span className="text-accent-400">Prova × 0,6</span>
                  <span className="text-univesp-300"> + </span>
                  <span className="text-emerald-400">Atividades × 0,4</span>
                </div>
                <div className="glass rounded-xl p-3">
                  <span className="text-univesp-400 text-xs block mb-1">Média após Exame:</span>
                  <span className="text-univesp-300">(</span>
                  <span className="text-yellow-400">Média Bimestral</span>
                  <span className="text-univesp-300"> + </span>
                  <span className="text-accent-400">Nota Exame</span>
                  <span className="text-univesp-300">) ÷ 2</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

      </motion.div>
    </div>
  )
}
