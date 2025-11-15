'use client'

import { Dispatch, SetStateAction } from 'react'
import { AlertCircle, BarChart3, Shield, Users, Lock, Zap, Gavel, Eye } from 'lucide-react'

interface SidebarProps {
  activeCategory: string
  setActiveCategory: Dispatch<SetStateAction<string>>
}

const categories = [
  { id: 'all', label: 'Tous les signalements', icon: BarChart3 },
  { id: 'harassment', label: 'Harcèlement', icon: AlertCircle },
  { id: 'discrimination', label: 'Discrimination', icon: Users },
  { id: 'abuse', label: "Abus de pouvoir", icon: Lock },
  { id: 'corruption', label: 'Corruption', icon: Zap },
  { id: 'violence', label: 'Violence', icon: Shield },
  { id: 'fraud', label: 'Fraude', icon: Eye },
  { id: 'other', label: 'Autres', icon: Gavel },
]

export default function Sidebar({ activeCategory, setActiveCategory }: SidebarProps) {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-sidebar-primary" />
          <h1 className="text-xl font-bold text-sidebar-foreground">{"LexTech"}</h1>
        </div>
        <p className="text-sm text-sidebar-foreground/70 mt-2">Gestion des violations</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {categories.map((category) => {
          const Icon = category.icon
          const isActive = activeCategory === category.id
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground font-medium'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{category.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-sidebar-accent p-3 rounded-lg text-xs text-sidebar-foreground">
          {/* backend: remplacer par les informations de l'utilisateur connecté */}
          <p className="font-medium">Admin User</p>
          <p className="text-sidebar-foreground/70">admin@legaltrack.local</p>
        </div>
      </div>
    </aside>
  )
}
