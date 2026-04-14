import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, BarChart2, BookOpen, Menu, X, GraduationCap } from 'lucide-react'

const navItems = [
  { to: '/',            label: 'Início',       icon: GraduationCap },
  { to: '/calculadora', label: 'Calculadora',  icon: Calculator },
  { to: '/simulador',   label: 'Simulador',    icon: BarChart2 },
  { to: '/guia',        label: 'Guia',         icon: BookOpen },
]

export default function Header() {
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm border-b border-univ-100'}`}>
      {/* Top red stripe */}
      <div className="h-1 bg-primary-700 w-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 group">
            {/* UNIVESP-style logo mark */}
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 bg-primary-700 rounded flex items-center justify-center">
                <span className="text-white font-black text-sm leading-none">N</span>
              </div>
              <div className="leading-tight">
                <p className="font-black text-univ-900 text-sm tracking-tight leading-none">NOTAS</p>
                <p className="font-bold text-primary-700 text-xs tracking-widest leading-none">UNIVESP</p>
              </div>
            </div>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <NavLink
              to="/calculadora"
              className="hidden sm:block btn-primary py-2 px-5 text-sm"
            >
              Calcular agora
            </NavLink>

            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden p-2 rounded-lg text-univ-600 hover:text-primary-700 hover:bg-primary-50 transition-colors"
              aria-label="Menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen
                  ? <motion.div key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}  transition={{ duration: 0.15 }}><X    className="w-5 h-5" /></motion.div>
                  : <motion.div key="menu" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="w-5 h-5" /></motion.div>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-univ-100 bg-white"
          >
            <nav className="px-4 py-3 flex flex-col gap-1">
              {navItems.map(({ to, label, icon: Icon }, idx) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                        isActive ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-univ-600 hover:bg-univ-50 hover:text-univ-900'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </NavLink>
                </motion.div>
              ))}
              <div className="pt-2 border-t border-univ-100 mt-1">
                <NavLink to="/calculadora" className="btn-primary block text-center text-sm py-2.5">
                  Calcular agora
                </NavLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
