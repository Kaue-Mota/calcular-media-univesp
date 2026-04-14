import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Calculator as CalculatorIcon, CheckCircle2, AlertCircle, XCircle, RefreshCw, Info } from 'lucide-react'

type Status = 'approved' | 'exam' | 'failed' | null

interface Result {
  activitiesAvg: number
  finalGrade: number
  status: Status
  examGrade?: number
  examFinal?: number
  examStatus?: Status
}

function clamp(v: number) {
  return Math.min(10, Math.max(0, v))
}

function fmt(n: number) {
  return n.toFixed(2).replace('.', ',')
}

const StatusBadge = ({ status, grade }: { status: Status; grade: number }) => {
  if (status === 'approved')
    return (
      <div className="result-approved rounded-2xl p-5 flex items-center gap-4">
        <CheckCircle2 className="w-8 h-8 shrink-0" />
        <div>
          <p className="font-black text-2xl">{fmt(grade)}</p>
          <p className="font-semibold text-sm">Aprovado! Parabéns!</p>
        </div>
      </div>
    )
  if (status === 'exam')
    return (
      <div className="result-exam rounded-2xl p-5 flex items-center gap-4">
        <AlertCircle className="w-8 h-8 shrink-0" />
        <div>
          <p className="font-black text-2xl">{fmt(grade)}</p>
          <p className="font-semibold text-sm">Vai a Exame</p>
        </div>
      </div>
    )
  return (
    <div className="result-failed rounded-2xl p-5 flex items-center gap-4">
      <XCircle className="w-8 h-8 shrink-0" />
      <div>
        <p className="font-black text-2xl">{fmt(grade)}</p>
        <p className="font-semibold text-sm">Reprovado (DP)</p>
      </div>
    </div>
  )
}

export default function Calculator() {
  const [examGrade, setExamGrade] = useState('')
  const [regularGrade, setRegularGrade] = useState('')
  const [activities, setActivities] = useState<string[]>([''])
  const [result, setResult] = useState<Result | null>(null)
  const [mode, setMode] = useState<'final' | 'exam'>('final')

  const addActivity = () => setActivities((a) => [...a, ''])
  const removeActivity = (i: number) => setActivities((a) => a.filter((_, idx) => idx !== i))
  const updateActivity = (i: number, v: string) =>
    setActivities((a) => a.map((x, idx) => (idx === i ? v : x)))

  const reset = () => {
    setRegularGrade('')
    setExamGrade('')
    setActivities([''])
    setResult(null)
  }

  const calculate = useCallback(() => {
    const reg = parseFloat(regularGrade.replace(',', '.'))
    const validActivities = activities
      .map((a) => parseFloat(a.replace(',', '.')))
      .filter((n) => !isNaN(n))

    if (isNaN(reg) || validActivities.length === 0) return

    const activitiesAvg = validActivities.reduce((a, b) => a + b, 0) / validActivities.length
    const finalGrade = clamp(reg * 0.6 + activitiesAvg * 0.4)
    const status: Status = finalGrade >= 5 ? 'approved' : 'exam'

    if (mode === 'exam' && status === 'exam') {
      const exam = parseFloat(examGrade.replace(',', '.'))
      if (!isNaN(exam)) {
        const examFinal = clamp((finalGrade + exam) / 2)
        const examStatus: Status = examFinal >= 5 ? 'approved' : 'failed'
        setResult({ activitiesAvg, finalGrade, status, examGrade: exam, examFinal, examStatus })
        return
      }
    }

    setResult({ activitiesAvg, finalGrade, status })
  }, [regularGrade, activities, examGrade, mode])

  const canCalculate = regularGrade !== '' && activities.some((a) => a !== '')

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-univesp-500 to-univesp-700 flex items-center justify-center">
            <CalculatorIcon className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-black gradient-text">Calculadora</h1>
        </div>
        <p className="text-univesp-300">Calcule sua média final bimestral e, se necessário, a média após o exame.</p>
      </motion.div>

      {/* Mode selector */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-6">
        <div className="glass rounded-2xl p-1.5 flex gap-1 w-full sm:w-auto sm:inline-flex">
          {(['final', 'exam'] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setResult(null) }}
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                mode === m
                  ? 'bg-univesp-600 text-white shadow-lg'
                  : 'text-univesp-300 hover:text-white'
              }`}
            >
              {m === 'final' ? 'Média Final' : 'Com Exame'}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="space-y-5">
        {/* Regular grade */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="card">
          <label className="block text-sm font-semibold text-univesp-200 mb-3">
            Nota da Prova Regular
            <span className="ml-2 text-xs text-univesp-400 font-normal">(0 a 10)</span>
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min={0}
              max={10}
              step={0.1}
              value={regularGrade}
              onChange={(e) => setRegularGrade(e.target.value)}
              placeholder="Ex: 7,5"
              className="input-field max-w-48"
            />
            <div className="glass rounded-xl px-4 py-3 text-sm text-univesp-300 flex items-center gap-2">
              <span className="text-accent-400 font-bold">× 0,6</span>
              <span>= peso 60%</span>
            </div>
          </div>
        </motion.div>

        {/* Activities */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="card">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-univesp-200">
              Notas das Atividades
              <span className="ml-2 text-xs text-univesp-400 font-normal">(0 a 10 cada)</span>
            </label>
            <div className="glass rounded-xl px-3 py-1.5 text-xs text-univesp-300 flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold">× 0,4</span>
              <span>= peso 40%</span>
            </div>
          </div>
          <div className="space-y-3">
            <AnimatePresence>
              {activities.map((act, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-univesp-400 text-sm font-medium w-6 shrink-0">#{i + 1}</span>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    step={0.1}
                    value={act}
                    onChange={(e) => updateActivity(i, e.target.value)}
                    placeholder={`Atividade ${i + 1}`}
                    className="input-field max-w-48"
                  />
                  {activities.length > 1 && (
                    <button
                      onClick={() => removeActivity(i)}
                      className="p-2 rounded-xl text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            <button
              onClick={addActivity}
              className="flex items-center gap-2 text-sm text-univesp-300 hover:text-white glass hover:bg-white/10 px-4 py-2.5 rounded-xl transition-all duration-200 mt-2"
            >
              <Plus className="w-4 h-4" />
              Adicionar atividade
            </button>
          </div>

          {/* Live activities preview */}
          {activities.some((a) => a !== '') && (
            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-xs text-univesp-400">
                Média das atividades:{' '}
                <span className="text-emerald-400 font-bold">
                  {fmt(
                    activities
                      .filter((a) => a !== '')
                      .reduce((s, a) => s + parseFloat(a.replace(',', '.')), 0) /
                      activities.filter((a) => a !== '').length || 0
                  )}
                </span>
              </p>
            </div>
          )}
        </motion.div>

        {/* Exam grade (mode === exam) */}
        <AnimatePresence>
          {mode === 'exam' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="card border-yellow-500/20 bg-yellow-500/5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                  <label className="text-sm font-semibold text-yellow-300">
                    Nota do Exame
                    <span className="ml-2 text-xs text-univesp-400 font-normal">(0 a 10)</span>
                  </label>
                </div>
                <input
                  type="number"
                  min={0}
                  max={10}
                  step={0.1}
                  value={examGrade}
                  onChange={(e) => setExamGrade(e.target.value)}
                  placeholder="Ex: 6,0"
                  className="input-field max-w-48 border-yellow-500/30 focus:ring-yellow-500/50 focus:border-yellow-500/50"
                />
                <p className="text-xs text-univesp-400 mt-2 flex items-center gap-1.5">
                  <Info className="w-3 h-3" />
                  Só preencha se sua média bimestral for menor que 5,0
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex gap-3">
          <button
            onClick={calculate}
            disabled={!canCalculate}
            className="btn-primary flex items-center gap-2 flex-1 justify-center"
          >
            <CalculatorIcon className="w-4 h-4" />
            Calcular
          </button>
          {result && (
            <button onClick={reset} className="btn-secondary flex items-center gap-2 px-4">
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:block">Limpar</span>
            </button>
          )}
        </motion.div>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
              className="card space-y-4"
            >
              <h3 className="font-bold text-white text-lg">Resultado</h3>

              {/* Breakdown */}
              <div className="glass rounded-xl p-4 space-y-2 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-univesp-400">Prova Regular × 0,6</span>
                  <span className="text-accent-400 font-bold">{fmt(parseFloat(regularGrade.replace(',', '.')) * 0.6)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-univesp-400">Média Atividades × 0,4</span>
                  <span className="text-emerald-400 font-bold">{fmt(result.activitiesAvg * 0.4)}</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between">
                  <span className="text-white font-semibold">Média Bimestral</span>
                  <span className="text-white font-bold">{fmt(result.finalGrade)}</span>
                </div>
              </div>

              <StatusBadge status={result.status} grade={result.finalGrade} />

              {/* Exam result */}
              {result.examStatus && result.examFinal !== undefined && result.examGrade !== undefined && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3"
                >
                  <div className="glass rounded-xl p-4 space-y-2 font-mono text-sm">
                    <div className="flex justify-between">
                      <span className="text-univesp-400">Média Bimestral</span>
                      <span className="text-univesp-200">{fmt(result.finalGrade)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-univesp-400">Nota do Exame</span>
                      <span className="text-yellow-400 font-bold">{fmt(result.examGrade)}</span>
                    </div>
                    <div className="border-t border-white/10 pt-2 flex justify-between">
                      <span className="text-white font-semibold">Média Final (pós-exame)</span>
                      <span className="text-white font-bold">{fmt(result.examFinal)}</span>
                    </div>
                  </div>
                  <StatusBadge status={result.examStatus} grade={result.examFinal} />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
