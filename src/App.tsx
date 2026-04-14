import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Calculator from './pages/Calculator'
import Simulator from './pages/Simulator'
import Guide from './pages/Guide'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } },
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex-1"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/calculadora" element={<Calculator />} />
          <Route path="/simulador" element={<Simulator />} />
          <Route path="/guia" element={<Guide />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col relative overflow-x-hidden">
        {/* Background decorations */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-univesp-700/20 blur-3xl" />
          <div className="absolute top-1/3 -left-40 w-80 h-80 rounded-full bg-accent-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-univesp-600/15 blur-3xl" />
        </div>

        <Header />
        <main className="flex-1 flex flex-col">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
