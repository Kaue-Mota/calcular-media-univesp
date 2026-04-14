import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Calculator, BarChart2, BookOpen, Menu, X } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Início', icon: GraduationCap, exact: true },
  { to: '/calculadora', label: 'Calculadora', icon: Calculator },
  { to: '/simulador', label: 'Simulador', icon: BarChart2 },
  { to: '/guia', label: 'Guia', icon: BookOpen },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-univesp-950/90 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-univesp-500 to-univesp-700 flex items-center justify-center shadow-lg group-hover:shadow-univesp-500/40 transition-all duration-300">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-accent-500 border-2 border-univesp-950" />
            </div>
            <div>
              <span className="font-bold text-white text-base leading-tight block">Notas</span>
              <span className="text-accent-400 font-bold text-xs leading-tight block tracking-wider">UNIVESP</span>
            </div>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `nav-link flex items-center gap-2 ${isActive ? 'active' : ''}`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-lg bg-white/10 -z-10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-xl glass hover:bg-white/10 transition-colors"
            aria-label="Menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
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
            className="md:hidden overflow-hidden border-t border-white/5 bg-univesp-950/95 backdrop-blur-md"
          >
            <nav className="px-4 py-3 flex flex-col gap-1">
              {navItems.map(({ to, label, icon: Icon }, idx) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                >
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'text-univesp-200 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
