import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart2, Target, Zap, Info, CheckCircle2, AlertCircle, XCircle } from 'lucide-react'

function fmt(n: number) {
  return n.toFixed(2).replace('.', ',')
}

function clamp(n: number, min = 0, max = 10) {
  return Math.min(max, Math.max(min, n))
}

// ── Simulator 1: Need X on the exam to pass ──
function SimFinalGrade() {
  const [activitiesAvg, setActivitiesAvg] = useState('')
  const [targetGrade] = useState(5)

  const result = useMemo(() => {
    const avg = parseFloat(activitiesAvg.replace(',', '.'))
    if (isNaN(avg)) return null

    // finalGrade = provaReg * 0.6 + avg * 0.4 >= 5
    // provaReg >= (5 - avg * 0.4) / 0.6
    const needed = (targetGrade - avg * 0.4) / 0.6
    const isPossible = needed <= 10
    const neededClamped = clamp(needed)

    return { needed: neededClamped, isPossible, activitiesContrib: avg * 0.4 }
  }, [activitiesAvg, targetGrade])

  return (
    <div className="card space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-univesp-500 to-univesp-700 flex items-center justify-center">
          <Target className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="font-bold text-white text-lg">Nota mínima na Prova Regular</h2>
          <p className="text-univesp-400 text-sm">Quanto você precisa tirar na prova para passar direto?</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-univesp-200 mb-2">
          Média das suas atividades
        </label>
        <input
          type="number"
          min={0}
          max={10}
          step={0.1}
          value={activitiesAvg}
          onChange={(e) => setActivitiesAvg(e.target.value)}
          placeholder="Ex: 8,5"
          className="input-field max-w-48"
        />
        <p className="text-xs text-univesp-500 mt-1 flex items-center gap-1">
          <Info className="w-3 h-3" />
          Se ainda não tem todas as notas, use uma estimativa
        </p>
      </div>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={activitiesAvg}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Breakdown */}
            <div className="glass rounded-xl p-4 font-mono text-sm space-y-1.5">
              <div className="flex justify-between">
                <span className="text-univesp-400">Contribuição das atividades (×0,4)</span>
                <span className="text-emerald-400 font-bold">+{fmt(result.activitiesContrib)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-univesp-400">Meta: média ≥ 5,0</span>
                <span className="text-white">5,00</span>
              </div>
            </div>

            {result.isPossible ? (
              <div className="rounded-2xl bg-gradient-to-r from-univesp-500/20 to-univesp-600/20 border border-univesp-500/30 p-5">
                <p className="text-univesp-300 text-sm mb-1">Você precisa de no mínimo:</p>
                <p className="text-5xl font-black text-white mb-2">{fmt(result.needed)}</p>
                <p className="text-univesp-300 text-sm">na Prova Regular para ser aprovado direto.</p>
                {result.needed <= 3 && (
                  <div className="mt-3 flex items-center gap-2 text-emerald-400 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    Suas atividades estão ótimas! Aprovação bem possível.
                  </div>
                )}
                {result.needed > 3 && result.needed <= 7 && (
                  <div className="mt-3 flex items-center gap-2 text-yellow-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    Meta razoável. Estude bem para a prova!
                  </div>
                )}
                {result.needed > 7 && (
                  <div className="mt-3 flex items-center gap-2 text-orange-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    Nota alta necessária. Foque muito na prova!
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
                <div className="flex items-center gap-2 text-red-400 mb-2">
                  <XCircle className="w-5 h-5" />
                  <p className="font-bold">Aprovação direta impossível</p>
                </div>
                <p className="text-univesp-300 text-sm">
                  Mesmo com 10 na prova, a média seria{' '}
                  <span className="text-white font-bold">{fmt(10 * 0.6 + parseFloat(activitiesAvg.replace(',', '.')) * 0.4)}</span>.
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

// ── Simulator 2: Need X on the exam (exame) to pass ──
function SimExamGrade() {
  const [finalGrade, setFinalGrade] = useState('')

  const result = useMemo(() => {
    const fg = parseFloat(finalGrade.replace(',', '.'))
    if (isNaN(fg)) return null
    if (fg >= 5) return { canSkipExam: true, fg }

    // (fg + exam) / 2 >= 5 → exam >= 10 - fg
    const needed = 10 - fg
    const isPossible = needed <= 10
    return { canSkipExam: false, fg, needed, isPossible }
  }, [finalGrade])

  return (
    <div className="card space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="font-bold text-white text-lg">Nota mínima no Exame</h2>
          <p className="text-univesp-400 text-sm">Ficou de exame? Descubra quanto você precisa tirar.</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-univesp-200 mb-2">
          Sua média bimestral
        </label>
        <input
          type="number"
          min={0}
          max={10}
          step={0.1}
          value={finalGrade}
          onChange={(e) => setFinalGrade(e.target.value)}
          placeholder="Ex: 3,8"
          className="input-field max-w-48"
        />
      </div>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={finalGrade}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {result.canSkipExam ? (
              <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-5 flex items-center gap-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                <div>
                  <p className="font-bold text-emerald-400 text-lg">Você já está aprovado!</p>
                  <p className="text-univesp-300 text-sm">Com média {fmt(result.fg)}, não precisa de exame.</p>
                </div>
              </div>
            ) : result.isPossible ? (
              <div className="space-y-4">
                <div className="glass rounded-xl p-4 font-mono text-sm space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-univesp-400">Sua média bimestral</span>
                    <span className="text-yellow-400 font-bold">{fmt(result.fg)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-univesp-400">Fórmula: (bimestral + exame) ÷ 2 ≥ 5</span>
                    <span className="text-univesp-300">→</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-univesp-400">Exame mínimo necessário</span>
                    <span className="text-white font-bold">{fmt(result.needed!)}</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 p-5">
                  <p className="text-yellow-300 text-sm mb-1">Você precisa de no mínimo:</p>
                  <p className="text-5xl font-black text-white mb-2">{fmt(result.needed!)}</p>
                  <p className="text-univesp-300 text-sm">no Exame para ser aprovado.</p>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-xs text-univesp-400 mb-1">
                    <span>0</span>
                    <span>Meta: {fmt(result.needed!)}</span>
                    <span>10</span>
                  </div>
                  <div className="h-2 bg-univesp-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${result.needed! * 10}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
                <div className="flex items-center gap-2 text-red-400 mb-2">
                  <XCircle className="w-5 h-5" />
                  <p className="font-bold">Reprovação inevitável</p>
                </div>
                <p className="text-univesp-300 text-sm">
                  Com média {fmt(result.fg)}, mesmo tirando 10 no exame a média final seria{' '}
                  <span className="text-white font-bold">{fmt((result.fg + 10) / 2)}</span>.
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

// ── Simulator 3: What-if table ──
function SimWhatIf() {
  const [activitiesAvg, setActivitiesAvg] = useState('')

  const rows = useMemo(() => {
    const avg = parseFloat(activitiesAvg.replace(',', '.'))
    if (isNaN(avg)) return []
    return [2, 3, 4, 5, 6, 7, 8, 9, 10].map((provaGrade) => {
      const final = provaGrade * 0.6 + avg * 0.4
      const status = final >= 5 ? 'approved' : 'exam'
      return { provaGrade, final, status }
    })
  }, [activitiesAvg])

  return (
    <div className="card space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
          <BarChart2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="font-bold text-white text-lg">Tabela de Cenários</h2>
          <p className="text-univesp-400 text-sm">Veja como diferentes notas na prova afetam sua média.</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-univesp-200 mb-2">
          Média das suas atividades
        </label>
        <input
          type="number"
          min={0}
          max={10}
          step={0.1}
          value={activitiesAvg}
          onChange={(e) => setActivitiesAvg(e.target.value)}
          placeholder="Ex: 7,0"
          className="input-field max-w-48"
        />
      </div>

      <AnimatePresence>
        {rows.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-x-auto"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2.5 px-3 text-univesp-400 font-semibold">Nota na Prova</th>
                  <th className="text-left py-2.5 px-3 text-univesp-400 font-semibold">Média Final</th>
                  <th className="text-left py-2.5 px-3 text-univesp-400 font-semibold">Situação</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ provaGrade, final, status }, i) => (
                  <motion.tr
                    key={provaGrade}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-white/5 hover:bg-white/3 transition-colors"
                  >
                    <td className="py-2.5 px-3 font-mono font-bold text-white">{provaGrade},0</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-white">{fmt(final)}</td>
                    <td className="py-2.5 px-3">
                      {status === 'approved' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold">
                          <CheckCircle2 className="w-3 h-3" /> Aprovado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/15 text-yellow-400 text-xs font-semibold">
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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center">
            <BarChart2 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-black gradient-text">Simulador</h1>
        </div>
        <p className="text-univesp-300">Descubra a nota mínima que você precisa para passar e simule diferentes cenários.</p>
      </motion.div>

      <div className="space-y-6">
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
