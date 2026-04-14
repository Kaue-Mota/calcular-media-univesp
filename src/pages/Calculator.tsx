import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator as CalculatorIcon, CheckCircle2, AlertCircle, XCircle, RefreshCw, Info } from 'lucide-react'

function clamp(v: number) { return Math.min(10, Math.max(0, v)) }
function fmt(n: number)   { return n.toFixed(2).replace('.', ',') }

/* ─── Resultado bimestral ─── */
function ResultFinal({ grade }: { grade: number }) {
  if (grade >= 5)
    return (
      <div className="result-approved flex items-center gap-4">
        <CheckCircle2 className="w-8 h-8 shrink-0 text-emerald-600" />
        <div>
          <p className="font-black text-2xl text-emerald-700">{fmt(grade)}</p>
          <p className="font-semibold text-sm text-emerald-600">Aprovado! Parabéns!</p>
        </div>
      </div>
    )
  return (
    <div className="result-exam flex items-center gap-4">
      <AlertCircle className="w-8 h-8 shrink-0 text-amber-600" />
      <div>
        <p className="font-black text-2xl text-amber-700">{fmt(grade)}</p>
        <p className="font-semibold text-sm text-amber-600">Vai a Exame</p>
      </div>
    </div>
  )
}

/* ─── Resultado pós-exame ─── */
function ResultExam({ grade }: { grade: number }) {
  if (grade >= 5)
    return (
      <div className="result-approved flex items-center gap-4">
        <CheckCircle2 className="w-8 h-8 shrink-0 text-emerald-600" />
        <div>
          <p className="font-black text-2xl text-emerald-700">{fmt(grade)}</p>
          <p className="font-semibold text-sm text-emerald-600">Aprovado!</p>
        </div>
      </div>
    )
  return (
    <div className="result-failed flex items-center gap-4">
      <XCircle className="w-8 h-8 shrink-0 text-red-600" />
      <div>
        <p className="font-black text-2xl text-red-700">{fmt(grade)}</p>
        <p className="font-semibold text-sm text-red-600">Reprovado</p>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════
   MODO 1 — Calcular nota final bimestral
   (Prova × 0,6) + (AVA × 0,4)
   ══════════════════════════════════════ */
function CalcFinal() {
  const [regularGrade, setRegularGrade] = useState('')
  const [avaGrade,     setAvaGrade]     = useState('')
  const [result,       setResult]       = useState<{ reg: number; ava: number; final: number } | null>(null)

  const reset = () => { setRegularGrade(''); setAvaGrade(''); setResult(null) }

  const calculate = useCallback(() => {
    const reg = parseFloat(regularGrade.replace(',', '.'))
    const ava = parseFloat(avaGrade.replace(',', '.'))
    if (isNaN(reg) || isNaN(ava)) return
    setResult({ reg, ava, final: clamp(reg * 0.6 + ava * 0.4) })
  }, [regularGrade, avaGrade])

  const canCalc = regularGrade !== '' && avaGrade !== ''

  return (
    <div className="space-y-5">
      {/* Prova */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <label className="font-semibold text-univ-800">
            Nota da Prova Regular
            <span className="ml-2 text-xs text-univ-400 font-normal">(0 a 10)</span>
          </label>
          <span className="chip">× 0,6 = peso 60%</span>
        </div>
        <input
          type="number" min={0} max={10} step={0.1}
          value={regularGrade}
          onChange={(e) => setRegularGrade(e.target.value)}
          placeholder="Ex: 7,5"
          className="input-field max-w-xs"
        />
      </div>

      {/* AVA */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <label className="font-semibold text-univ-800">
            Média das Atividades AVA
            <span className="ml-2 text-xs text-univ-400 font-normal">(0 a 10)</span>
          </label>
          <span className="chip">× 0,4 = peso 40%</span>
        </div>
        <input
          type="number" min={0} max={10} step={0.1}
          value={avaGrade}
          onChange={(e) => setAvaGrade(e.target.value)}
          placeholder="Ex: 8,5"
          className="input-field max-w-xs"
        />
        <p className="text-xs text-univ-400 mt-2 flex items-center gap-1.5">
          <Info className="w-3 h-3" />
          Insira a média já calculada pelo sistema AVA
        </p>
      </div>

      {/* Botões */}
      <div className="flex gap-3">
        <button onClick={calculate} disabled={!canCalc} className="btn-primary flex items-center gap-2 flex-1 justify-center">
          <CalculatorIcon className="w-4 h-4" /> Calcular
        </button>
        {result && (
          <button onClick={reset} className="btn-outline flex items-center gap-2 px-4">
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:block">Limpar</span>
          </button>
        )}
      </div>

      {/* Resultado */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ type: 'spring', bounce: 0.25, duration: 0.45 }}
            className="card space-y-4"
          >
            <h3 className="font-bold text-univ-900 text-lg border-b border-univ-100 pb-3">Resultado</h3>

            <div className="bg-univ-50 rounded-xl p-4 border border-univ-100 space-y-2.5 font-mono text-sm">
              <div className="flex justify-between items-center">
                <span className="text-univ-500">Prova Regular × 0,6</span>
                <span className="font-bold text-primary-700">{fmt(result.reg * 0.6)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-univ-500">Média AVA × 0,4</span>
                <span className="font-bold text-emerald-700">{fmt(result.ava * 0.4)}</span>
              </div>
              <div className="border-t border-univ-200 pt-2.5 flex justify-between items-center">
                <span className="font-semibold text-univ-800">Nota final da disciplina no bimestre</span>
                <span className="font-black text-univ-900 text-base">{fmt(result.final)}</span>
              </div>
            </div>

            <ResultFinal grade={result.final} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ══════════════════════════════════════
   MODO 2 — Calcular média após o exame
   (Nota bimestral + Nota de exame) ÷ 2
   ══════════════════════════════════════ */
function CalcExam() {
  const [bimGrade,  setBimGrade]  = useState('')
  const [examGrade, setExamGrade] = useState('')
  const [result, setResult] = useState<{ bim: number; exam: number; final: number } | null>(null)

  const reset = () => { setBimGrade(''); setExamGrade(''); setResult(null) }

  const calculate = useCallback(() => {
    const bim  = parseFloat(bimGrade.replace(',', '.'))
    const exam = parseFloat(examGrade.replace(',', '.'))
    if (isNaN(bim) || isNaN(exam)) return
    setResult({ bim, exam, final: clamp((bim + exam) / 2) })
  }, [bimGrade, examGrade])

  const canCalc = bimGrade !== '' && examGrade !== ''

  return (
    <div className="space-y-5">
      {/* Nota bimestral */}
      <div className="card">
        <label className="block font-semibold text-univ-800 mb-4">
          Nota final da disciplina no bimestre
          <span className="ml-2 text-xs text-univ-400 font-normal">(0 a 10)</span>
        </label>
        <input
          type="number" min={0} max={10} step={0.1}
          value={bimGrade}
          onChange={(e) => setBimGrade(e.target.value)}
          placeholder="Ex: 3,8"
          className="input-field max-w-xs"
        />
        <p className="text-xs text-univ-400 mt-2 flex items-center gap-1.5">
          <Info className="w-3 h-3" />
          Use a calculadora de Média Final para obter este valor
        </p>
      </div>

      {/* Nota de exame */}
      <div className="card border-amber-200 bg-amber-50">
        <label className="block font-semibold text-amber-800 mb-4">
          Nota de exame
          <span className="ml-2 text-xs text-amber-600 font-normal">(0 a 10)</span>
        </label>
        <input
          type="number" min={0} max={10} step={0.1}
          value={examGrade}
          onChange={(e) => setExamGrade(e.target.value)}
          placeholder="Ex: 6,0"
          className="input-field max-w-xs border-amber-200 focus:border-amber-500 focus:ring-amber-500/30"
        />
      </div>

      {/* Botões */}
      <div className="flex gap-3">
        <button onClick={calculate} disabled={!canCalc} className="btn-primary flex items-center gap-2 flex-1 justify-center">
          <CalculatorIcon className="w-4 h-4" /> Calcular
        </button>
        {result && (
          <button onClick={reset} className="btn-outline flex items-center gap-2 px-4">
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:block">Limpar</span>
          </button>
        )}
      </div>

      {/* Resultado */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ type: 'spring', bounce: 0.25, duration: 0.45 }}
            className="card space-y-4"
          >
            <h3 className="font-bold text-univ-900 text-lg border-b border-univ-100 pb-3">Resultado</h3>

            <div className="bg-univ-50 rounded-xl p-4 border border-univ-100 space-y-2.5 font-mono text-sm">
              <div className="flex justify-between items-center">
                <span className="text-univ-500">Nota final da disciplina no bimestre</span>
                <span className="font-bold text-univ-700">{fmt(result.bim)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-univ-500">Nota de exame</span>
                <span className="font-bold text-amber-700">{fmt(result.exam)}</span>
              </div>
              <div className="border-t border-univ-200 pt-2.5 flex justify-between items-center">
                <span className="font-semibold text-univ-800">Média final após o exame</span>
                <span className="font-black text-univ-900 text-base">{fmt(result.final)}</span>
              </div>
            </div>

            <ResultExam grade={result.final} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ══════════════════════════════════════
   PAGE
   ══════════════════════════════════════ */
export default function Calculator() {
  const [mode, setMode] = useState<'final' | 'exam'>('final')

  return (
    <div>
      <div className="bg-white border-b border-univ-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="accent-bar" />
            <h1 className="text-3xl font-black text-univ-900 mb-1">Calculadora de Média</h1>
            <p className="text-univ-500">Calcule sua nota final bimestral ou a média após o exame.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Mode selector */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-6">
          <div className="inline-flex bg-univ-100 rounded-xl p-1 gap-1">
            {(['final', 'exam'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  mode === m
                    ? 'bg-white text-primary-700 shadow-sm border border-univ-100'
                    : 'text-univ-500 hover:text-univ-800'
                }`}
              >
                {m === 'final' ? 'Nota Final Bimestral' : 'Média após Exame'}
              </button>
            ))}
          </div>

          {/* Fórmula do modo ativo */}
          <div className="mt-3 formula-box inline-block text-sm">
            {mode === 'final'
              ? <><span className="text-primary-700 font-semibold">Prova × 0,6</span><span className="text-univ-400"> + </span><span className="text-emerald-700 font-semibold">AVA × 0,4</span></>
              : <><span className="text-univ-700 font-semibold">(Nota bimestral + Nota de exame)</span><span className="text-univ-400"> ÷ 2</span></>
            }
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {mode === 'final' ? <CalcFinal /> : <CalcExam />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
