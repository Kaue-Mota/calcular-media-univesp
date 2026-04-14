import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, Zap, BarChart2, Info, CheckCircle2, AlertCircle, XCircle } from 'lucide-react'

function fmt(n: number) { return n.toFixed(2).replace('.', ',') }
function clamp(n: number, min = 0, max = 10) { return Math.min(max, Math.max(min, n)) }

/* ── Simulador 1: nota mínima na prova ── */
function SimFinalGrade() {
  const [avaAvg, setAvaAvg] = useState('')

  const result = useMemo(() => {
    const avg = parseFloat(avaAvg.replace(',', '.'))
    if (isNaN(avg)) return null
    const needed      = (5 - avg * 0.4) / 0.6
    const isPossible  = needed <= 10
    return { needed: clamp(needed), isPossible, avaContrib: avg * 0.4 }
  }, [avaAvg])

  return (
    <div className="card space-y-5">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
          <Target className="w-5 h-5 text-primary-700" />
        </div>
        <div>
          <h2 className="font-bold text-univ-900 text-lg">Nota mínima na Prova Regular</h2>
          <p className="text-univ-500 text-sm">Quanto você precisa tirar na prova para passar direto, sem exame?</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-univ-700 mb-2">
          Média AVA já calculada
        </label>
        <input
          type="number" min={0} max={10} step={0.1}
          value={avaAvg}
          onChange={(e) => setAvaAvg(e.target.value)}
          placeholder="Ex: 8,5"
          className="input-field max-w-xs"
        />
        <p className="text-xs text-univ-400 mt-1.5 flex items-center gap-1.5">
          <Info className="w-3 h-3" />
          Se ainda não finalizou todas as atividades, use uma estimativa
        </p>
      </div>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={avaAvg}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <div className="bg-univ-50 border border-univ-100 rounded-xl p-4 font-mono text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-univ-500">Contribuição AVA (× 0,4)</span>
                <span className="text-emerald-700 font-bold">+{fmt(result.avaContrib)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-univ-500">Meta de aprovação</span>
                <span className="text-univ-800 font-bold">5,00</span>
              </div>
            </div>

            {result.isPossible ? (
              <div className="rounded-2xl border border-primary-200 bg-primary-50 p-6">
                <p className="text-primary-600 text-sm mb-1">Nota mínima necessária na Prova Regular:</p>
                <p className="text-5xl font-black text-primary-700 mb-3">{fmt(result.needed)}</p>
                {result.needed <= 3 && (
                  <div className="flex items-center gap-2 text-emerald-700 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    Suas atividades estão ótimas — aprovação muito acessível!
                  </div>
                )}
                {result.needed > 3 && result.needed <= 7 && (
                  <div className="flex items-center gap-2 text-amber-700 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    Meta razoável. Estude bem para a prova!
                  </div>
                )}
                {result.needed > 7 && (
                  <div className="flex items-center gap-2 text-red-700 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    Nota alta necessária. Foque bastante na prova!
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                <div className="flex items-center gap-2 text-red-700 mb-2">
                  <XCircle className="w-5 h-5" />
                  <p className="font-bold">Aprovação direta não é possível</p>
                </div>
                <p className="text-univ-600 text-sm">
                  Mesmo com 10 na prova, a média seria{' '}
                  <strong className="text-univ-800">{fmt(10 * 0.6 + parseFloat(avaAvg.replace(',', '.')) * 0.4)}</strong>.
                  Você precisará ir ao Exame.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Simulador 2: nota mínima no Exame ── */
function SimExamGrade() {
  const [finalGrade, setFinalGrade] = useState('')

  const result = useMemo(() => {
    const fg = parseFloat(finalGrade.replace(',', '.'))
    if (isNaN(fg)) return null
    if (fg >= 5) return { canSkipExam: true, fg }
    const needed = 10 - fg
    return { canSkipExam: false, fg, needed, isPossible: needed <= 10 }
  }, [finalGrade])

  return (
    <div className="card space-y-5">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
          <Zap className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h2 className="font-bold text-univ-900 text-lg">Nota mínima no Exame</h2>
          <p className="text-univ-500 text-sm">Ficou de exame? Descubra quanto você precisa tirar para passar.</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-univ-700 mb-2">
          Nota final da disciplina no bimestre
        </label>
        <input
          type="number" min={0} max={10} step={0.1}
          value={finalGrade}
          onChange={(e) => setFinalGrade(e.target.value)}
          placeholder="Ex: 3,8"
          className="input-field max-w-xs"
        />
      </div>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={finalGrade}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {result.canSkipExam ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 flex items-center gap-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-emerald-700 text-lg">Você já está aprovado!</p>
                  <p className="text-univ-600 text-sm">Com média {fmt(result.fg)}, não há necessidade de exame.</p>
                </div>
              </div>
            ) : result.isPossible ? (
              <div className="space-y-4">
                <div className="bg-univ-50 border border-univ-100 rounded-xl p-4 font-mono text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-univ-500">Nota final da disciplina no bimestre</span>
                    <span className="text-amber-700 font-bold">{fmt(result.fg)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-univ-500">(nota final no bimestre + nota de exame) ÷ 2 maior ou igual a 5</span>
                    <span className="text-univ-400">→</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                  <p className="text-amber-600 text-sm mb-1">Nota mínima necessária no Exame:</p>
                  <p className="text-5xl font-black text-amber-700 mb-3">{fmt(result.needed!)}</p>
                  <div>
                    <div className="flex justify-between text-xs text-univ-400 mb-1.5">
                      <span>0</span>
                      <span>Meta: {fmt(result.needed!)}</span>
                      <span>10</span>
                    </div>
                    <div className="h-2 bg-amber-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-amber-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${result.needed! * 10}%` }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                <div className="flex items-center gap-2 text-red-700 mb-2">
                  <XCircle className="w-5 h-5" />
                  <p className="font-bold">Reprovação inevitável</p>
                </div>
                <p className="text-univ-600 text-sm">
                  Com média {fmt(result.fg)}, mesmo tirando 10 no exame a média final seria{' '}
                  <strong className="text-univ-800">{fmt((result.fg + 10) / 2)}</strong>.
                  A disciplina ficará como DP.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Simulador 3: tabela de cenários ── */
function SimWhatIf() {
  const [avaAvg, setAvaAvg] = useState('')

  const rows = useMemo(() => {
    const avg = parseFloat(avaAvg.replace(',', '.'))
    if (isNaN(avg)) return []
    return [2, 3, 4, 5, 6, 7, 8, 9, 10].map((prova) => ({
      prova,
      final: prova * 0.6 + avg * 0.4,
      approved: prova * 0.6 + avg * 0.4 >= 5,
    }))
  }, [avaAvg])

  return (
    <div className="card space-y-5">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-univ-100 flex items-center justify-center shrink-0">
          <BarChart2 className="w-5 h-5 text-univ-600" />
        </div>
        <div>
          <h2 className="font-bold text-univ-900 text-lg">Tabela de Cenários</h2>
          <p className="text-univ-500 text-sm">Veja como diferentes notas na prova afetam sua média final.</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-univ-700 mb-2">Média AVA</label>
        <input
          type="number" min={0} max={10} step={0.1}
          value={avaAvg}
          onChange={(e) => setAvaAvg(e.target.value)}
          placeholder="Ex: 7,0"
          className="input-field max-w-xs"
        />
      </div>

      <AnimatePresence>
        {rows.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-univ-100">
                  <th className="text-left py-2.5 px-3 text-univ-500 font-semibold">Nota na Prova</th>
                  <th className="text-left py-2.5 px-3 text-univ-500 font-semibold">Média Final</th>
                  <th className="text-left py-2.5 px-3 text-univ-500 font-semibold">Situação</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ prova, final, approved }, i) => (
                  <motion.tr
                    key={prova}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-univ-50 hover:bg-univ-50 transition-colors"
                  >
                    <td className="py-2.5 px-3 font-mono font-bold text-univ-800">{prova},0</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-univ-900">{fmt(final)}</td>
                    <td className="py-2.5 px-3">
                      {approved ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                          <CheckCircle2 className="w-3 h-3" /> Aprovado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold">
                          <AlertCircle className="w-3 h-3" /> Exame
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Simulator() {
  return (
    <div>
      {/* Page header */}
      <div className="bg-white border-b border-univ-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="accent-bar" />
            <h1 className="text-3xl font-black text-univ-900 mb-1">Simulador de Notas</h1>
            <p className="text-univ-500">Descubra a nota mínima para passar e simule diferentes cenários.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <SimFinalGrade />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <SimExamGrade />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <SimWhatIf />
        </motion.div>
      </div>
    </div>
  )
}
