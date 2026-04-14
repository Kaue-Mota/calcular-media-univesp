import { GraduationCap, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-auto py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-univesp-500 to-univesp-700 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-white text-sm">Notas UNIVESP</span>
              <p className="text-univesp-400 text-xs">Calculadora não oficial</p>
            </div>
          </div>

          <nav className="flex items-center gap-6 text-sm text-univesp-400">
            <Link to="/" className="hover:text-white transition-colors">Início</Link>
            <Link to="/calculadora" className="hover:text-white transition-colors">Calculadora</Link>
            <Link to="/simulador" className="hover:text-white transition-colors">Simulador</Link>
            <Link to="/guia" className="hover:text-white transition-colors">Guia</Link>
          </nav>

          <p className="text-univesp-500 text-xs flex items-center gap-1.5">
            Feito com <Heart className="w-3 h-3 text-accent-500 fill-accent-500" /> para estudantes UNIVESP
          </p>
        </div>
      </div>
    </footer>
  )
}
