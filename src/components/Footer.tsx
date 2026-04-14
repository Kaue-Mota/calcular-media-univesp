import { Link } from 'react-router-dom'
import { Calculator, BarChart2, BookOpen, GraduationCap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-univ-950 text-white mt-auto">
      {/* Red accent line */}
      <div className="h-1 bg-primary-700" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-700 rounded flex items-center justify-center">
                <span className="text-white font-black text-sm">N</span>
              </div>
              <div>
                <p className="font-black text-white text-sm tracking-tight leading-none">NOTAS UNIVESP</p>
                <p className="text-univ-400 text-xs mt-0.5">Calculadora não oficial</p>
              </div>
            </div>
            <p className="text-univ-400 text-sm leading-relaxed">
              Ferramenta criada para ajudar estudantes da UNIVESP a calcular médias e simular resultados.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Ferramentas</p>
            <nav className="space-y-2.5">
              {[
                { to: '/calculadora', label: 'Calculadora de Média', icon: Calculator },
                { to: '/simulador',   label: 'Simulador de Notas',   icon: BarChart2 },
                { to: '/guia',        label: 'Guia Completo',         icon: BookOpen },
              ].map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center gap-2 text-univ-400 hover:text-white text-sm transition-colors duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Info */}
          <div>
            <p className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Informações</p>
            <div className="space-y-2 text-univ-400 text-sm">
              <p className="flex items-start gap-2">
                <GraduationCap className="w-4 h-4 mt-0.5 shrink-0 text-primary-500" />
                <span>Esta é uma ferramenta <strong className="text-univ-200">não oficial</strong> e independente da UNIVESP.</span>
              </p>
              <p className="text-univ-500 text-xs mt-4">
                As regras de avaliação podem ser atualizadas pela instituição. Consulte sempre o portal oficial da UNIVESP.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-univ-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-univ-500 text-xs">
          <p>© {new Date().getFullYear()} Notas UNIVESP. Ferramenta não oficial.</p>
          <Link to="/" className="hover:text-white transition-colors">Início</Link>
        </div>
      </div>
    </footer>
  )
}
