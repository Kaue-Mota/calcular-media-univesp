import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen, ChevronDown, Monitor, Globe,
  Calendar, Clock, AlertTriangle, GraduationCap,
  CheckCircle2, AlertCircle, XCircle, FileText, Lightbulb,
} from 'lucide-react'

interface AccordionItem {
  id: string
  icon: React.ElementType
  iconColor: string
  title: string
  content: React.ReactNode
}

function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null)
  return (
    <div className="space-y-3">
      {items.map(({ id, icon: Icon, iconColor, title, content }) => (
        <div key={id} className="card-flat overflow-hidden">
          <button
            onClick={() => setOpen(open === id ? null : id)}
            className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-univ-50 transition-colors duration-200"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconColor}`}>
              <Icon className="w-4 h-4" />
            </div>
            <span className="font-semibold text-univ-900 flex-1">{title}</span>
            <motion.div animate={{ rotate: open === id ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-4 h-4 text-univ-400" />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {open === id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 text-univ-600 text-sm leading-relaxed border-t border-univ-100">
                  <div className="pt-5">{content}</div>
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
    iconColor: 'bg-blue-50 text-blue-600',
    title: 'Prova com Cartão',
    content: (
      <div className="space-y-3">
        <p>É uma <strong className="text-univ-800">prova escrita presencial</strong> realizada no polo da UNIVESP com preenchimento de <strong className="text-univ-800">cartão resposta</strong> (gabarito de bolinha).</p>
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3">
          <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p>Você vai ao polo, recebe o caderno de questões e marca as respostas no cartão.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'digital',
    icon: Monitor,
    iconColor: 'bg-purple-50 text-purple-600',
    title: 'Prova Digital',
    content: (
      <div className="space-y-3">
        <p>É uma <strong className="text-univ-800">prova virtual presencial</strong> realizada no polo com um <strong className="text-univ-800">código de acesso</strong>. Você usa o computador do polo.</p>
        <div className="flex items-start gap-3 bg-purple-50 border border-purple-100 rounded-xl p-3">
          <Monitor className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
          <p>O código de acesso é fornecido no polo e garante que a prova seja feita no local determinado.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'online',
    icon: Globe,
    iconColor: 'bg-emerald-50 text-emerald-600',
    title: 'Prova Online',
    content: (
      <div className="space-y-3">
        <p>É uma <strong className="text-univ-800">prova virtual sem código de acesso</strong>. Pode ser realizada de qualquer lugar, mas opcionalmente pode ser feita no polo.</p>
        <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-xl p-3">
          <Globe className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p>A flexibilidade é maior, mas fique atento ao prazo e ao ambiente (sem distrações).</p>
        </div>
      </div>
    ),
  },
]

const provaTypes: AccordionItem[] = [
  {
    id: 'regular',
    icon: Calendar,
    iconColor: 'bg-primary-50 text-primary-700',
    title: 'Provas Regulares',
    content: (
      <div className="space-y-3">
        <p>São as provas realizadas <strong className="text-univ-800">após a conclusão das disciplinas</strong> do bimestre. São as provas normais do calendário acadêmico.</p>
        <ul className="space-y-2 mt-2">
          {['Realizadas ao final de cada bimestre', 'Cobrem o conteúdo das disciplinas do período', 'Valem 60% da média final'].map(t => (
            <li key={t} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: 'segunda-chamada',
    icon: Clock,
    iconColor: 'bg-amber-50 text-amber-600',
    title: 'Provas de 2ª Chamada',
    content: (
      <div className="space-y-3">
        <p>Destinada apenas a estudantes <strong className="text-univ-800">impedidos por motivo de saúde</strong> de comparecer ao polo para realizar a prova presencial.</p>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 space-y-2">
          <p className="font-semibold text-amber-800 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Requisitos obrigatórios:
          </p>
          <ul className="space-y-1.5 text-sm ml-2">
            {[
              'Atestado com laudo médico especificando a impossibilidade acadêmica',
              'Requerimento específico via sistema da UNIVESP',
              'Solicitação dentro do prazo estabelecido',
            ].map(t => (
              <li key={t} className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                <span className="text-amber-800">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-start gap-2.5">
          <Globe className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-blue-800 text-sm"><strong>Realizada online:</strong> a prova de 2ª chamada é feita de forma virtual, sem necessidade de ir ao polo.</p>
        </div>
        <p className="text-xs text-red-600 flex items-center gap-1.5">
          <AlertTriangle className="w-3 h-3" />
          Não é aceita para qualquer motivo — apenas saúde com laudo médico.
        </p>
      </div>
    ),
  },
  {
    id: 'exame',
    icon: AlertCircle,
    iconColor: 'bg-red-50 text-red-600',
    title: 'Provas de Exame',
    content: (
      <div className="space-y-3">
        <p>São realizadas quando o aluno se encaixa em uma das situações:</p>
        <div className="space-y-2">
          <div className="result-exam flex items-center gap-3 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Não realizou a prova regular no bimestre</span>
          </div>
          <div className="result-exam flex items-center gap-3 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>A média final ficou abaixo de 5,0</span>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-start gap-2.5">
          <Globe className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-blue-800 text-sm"><strong>Realizado online:</strong> o exame é feito de forma virtual, sem necessidade de presença no polo.</p>
        </div>
        <div className="bg-univ-50 border border-univ-100 rounded-xl p-4 text-sm">
          <p className="font-semibold text-univ-800 mb-1">Cálculo após o exame:</p>
          <p className="font-mono text-primary-700">(Nota final da disciplina no bimestre + Nota de exame) ÷ 2</p>
          <p className="text-univ-500 mt-1">Resultado maior ou igual a 5 → Aprovado. Menor que 5 → DP.</p>
        </div>
      </div>
    ),
  },
]

const gradeGuide: AccordionItem[] = [
  {
    id: 'calc-media',
    icon: GraduationCap,
    iconColor: 'bg-primary-50 text-primary-700',
    title: 'Como é calculada a média bimestral?',
    content: (
      <div className="space-y-4">
        <div className="formula-box text-center space-y-1">
          <p className="text-xs text-univ-400 mb-2">Fórmula:</p>
          <p>
            <span className="text-primary-700 font-semibold">Prova × 0,6</span>
            <span className="text-univ-400"> + </span>
            <span className="text-emerald-700 font-semibold">Média AVA × 0,4</span>
            <span className="text-univ-400"> = Média Final</span>
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="bg-primary-50 border border-primary-100 rounded-xl p-3">
            <p className="text-primary-700 font-bold mb-1 text-sm">Prova Regular (60%)</p>
            <p className="text-univ-600 text-sm">A prova escrita/digital realizada ao final do bimestre representa 60% da nota.</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
            <p className="text-emerald-700 font-bold mb-1 text-sm">Atividades AVA (40%)</p>
            <p className="text-univ-600 text-sm">A média das atividades realizadas no AVA durante o bimestre representa 40%.</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="font-semibold text-univ-800 text-sm">Resultado:</p>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Média maior ou igual a 5,0 → <strong className="text-emerald-700">Aprovado</strong></span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Média menor que 5,0 → <strong className="text-amber-700">Vai a Exame</strong></span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'calc-exame',
    icon: AlertCircle,
    iconColor: 'bg-amber-50 text-amber-600',
    title: 'Como funciona o cálculo após o Exame?',
    content: (
      <div className="space-y-4">
        <div className="formula-box text-center">
          <p className="text-xs text-univ-400 mb-2">Fórmula:</p>
          <p>
            <span className="text-univ-400">(</span>
            <span className="text-amber-700 font-semibold">Nota final da disciplina no bimestre</span>
            <span className="text-univ-400"> + </span>
            <span className="text-primary-700 font-semibold">Nota de exame</span>
            <span className="text-univ-400">) ÷ 2</span>
          </p>
        </div>
        <p className="text-sm text-univ-600">É a média aritmética entre a nota bimestral e a nota do exame. Ambas têm peso igual.</p>
        <div className="bg-univ-50 border border-univ-100 rounded-xl p-4 text-sm">
          <p className="font-semibold text-univ-800 mb-1">Exemplo prático:</p>
          <p className="text-univ-600">Média bimestral: 3,5 | Nota do exame: 7,0</p>
          <p className="font-mono text-primary-700 mt-1">(3,5 + 7,0) ÷ 2 = 5,25 → Aprovado!</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Média maior ou igual a 5,0 → <strong className="text-emerald-700">Aprovado</strong></span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <XCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>Média menor que 5,0 → <strong className="text-red-700">Reprovado</strong></span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'dp',
    icon: XCircle,
    iconColor: 'bg-red-50 text-red-600',
    title: 'O que é DP (Dependência)?',
    content: (
      <div className="space-y-4">
        <p><strong className="text-univ-800">DP</strong> significa <strong className="text-univ-800">Dependência</strong>. Ocorre quando o aluno <strong className="text-red-700">não consegue aprovação</strong> em uma disciplina após o exame final.</p>
        <div className="result-failed space-y-2">
          <p className="font-bold text-red-700">Quando você fica de DP?</p>
          <ul className="space-y-1.5 text-sm ml-2">
            {[
              'Fez o exame e a média final ficou abaixo de 5,0',
              'Não realizou nenhuma das provas (regular e exame)',
            ].map(t => (
              <li key={t} className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">→</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <p className="font-semibold text-univ-800 text-sm">Consequências do DP:</p>
          <div className="space-y-2 text-sm">
            {[
              'Você terá que cursar a disciplina novamente em outro período.',
              'Pode impactar o progresso no curso dependendo da grade curricular.',
              'Pode impedir a formatura se for uma disciplina obrigatória.',
            ].map(t => (
              <div key={t} className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="text-univ-700">{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-800">
            <strong>Dica:</strong> Use o simulador para descobrir a nota mínima que você precisa no exame e evitar o DP!
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
  show:   { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Guide() {
  return (
    <div>
      {/* Page header */}
      <div className="bg-white border-b border-univ-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="accent-bar" />
            <h1 className="text-3xl font-black text-univ-900 mb-1">Guia de Avaliação</h1>
            <p className="text-univ-500">Entenda as regras, tipos de prova, o que é DP e como funciona o cálculo de notas.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-10">

          {/* Sistema de notas */}
          <motion.section variants={item}>
            <div className="flex items-center gap-3 mb-5">
              <div className="accent-bar mb-0 w-1 h-6 rounded-full" />
              <h2 className="text-xl font-bold text-univ-900">Sistema de Notas</h2>
            </div>
            <Accordion items={gradeGuide} />
          </motion.section>

          {/* Modalidades */}
          <motion.section variants={item}>
            <div className="flex items-center gap-3 mb-5">
              <div className="accent-bar mb-0 w-1 h-6 rounded-full" />
              <h2 className="text-xl font-bold text-univ-900">Modalidades de Prova</h2>
            </div>
            <Accordion items={examTypes} />
          </motion.section>

          {/* Tipos de avaliação */}
          <motion.section variants={item}>
            <div className="flex items-center gap-3 mb-5">
              <div className="accent-bar mb-0 w-1 h-6 rounded-full" />
              <h2 className="text-xl font-bold text-univ-900">Tipos de Avaliação</h2>
            </div>
            <Accordion items={provaTypes} />
          </motion.section>

          {/* Resumo rápido */}
          <motion.section variants={item}>
            <div className="flex items-center gap-3 mb-5">
              <div className="accent-bar mb-0 w-1 h-6 rounded-full" />
              <h2 className="text-xl font-bold text-univ-900">Resumo Rápido</h2>
            </div>
            <div className="card-flat">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-univ-100">
                      <th className="text-left py-3 px-4 text-univ-500 font-semibold">Situação</th>
                      <th className="text-left py-3 px-4 text-univ-500 font-semibold">Condição</th>
                      <th className="text-left py-3 px-4 text-univ-500 font-semibold">Resultado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-univ-50">
                    {[
                      { sit: 'Após prova regular', cond: 'Média maior ou igual a 5,0', res: 'Aprovado',       color: 'text-emerald-600' },
                      { sit: 'Após prova regular', cond: 'Média menor que 5,0',        res: 'Vai a Exame',    color: 'text-amber-600' },
                      { sit: 'Após o exame',       cond: 'Média maior ou igual a 5,0', res: 'Aprovado',       color: 'text-emerald-600' },
                      { sit: 'Após o exame',       cond: 'Média menor que 5,0',        res: 'DP (Reprovado)', color: 'text-red-600' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-univ-50 transition-colors">
                        <td className="py-3 px-4 text-univ-600">{row.sit}</td>
                        <td className="py-3 px-4 text-univ-800">{row.cond}</td>
                        <td className={`py-3 px-4 font-bold ${row.color}`}>{row.res}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 pt-5 border-t border-univ-100 space-y-3">
                <p className="font-semibold text-univ-800 text-sm">Fórmulas:</p>
                <div className="space-y-2">
                  <div className="formula-box">
                    <span className="text-univ-400 text-xs block mb-1">Nota final da disciplina no bimestre:</span>
                    <span className="text-primary-700 font-semibold">Prova × 0,6</span>
                    <span className="text-univ-400"> + </span>
                    <span className="text-emerald-700 font-semibold">Média AVA × 0,4</span>
                  </div>
                  <div className="formula-box">
                    <span className="text-univ-400 text-xs block mb-1">Média após Exame:</span>
                    <span className="text-univ-400">(</span>
                    <span className="text-amber-700 font-semibold">Nota final da disciplina no bimestre</span>
                    <span className="text-univ-400"> + </span>
                    <span className="text-primary-700 font-semibold">Nota de exame</span>
                    <span className="text-univ-400">) ÷ 2</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

        </motion.div>
      </div>
    </div>
  )
}
