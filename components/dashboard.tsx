'use client'

import StatisticsCards from './statistics-cards'
import GenderDistribution from './gender-distribution'
import ReportsTable from './reports-table'

interface DashboardProps {
  activeCategory: string
}

export default function Dashboard({ activeCategory }: DashboardProps) {
  return (
    <main className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Tableau de Bord</h2>
        <p className="text-muted-foreground mt-2">Suivi en temps réel des signalements et violations</p>
      </div>

      <StatisticsCards activeCategory={activeCategory} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          {/* backend: charger les données de répartition par sexe ici */}
          <GenderDistribution />
        </div>
        <div className="lg:col-span-2">
          {/* Additional statistics card placeholder - backend: ajouter d'autres métriques ici */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Tendances ce mois</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Augmentation par rapport au mois dernier</span>
                <span className="text-xl font-bold text-chart-2">+12%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Taux de résolution</span>
                <span className="text-xl font-bold text-chart-1">68%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Signalements urgents</span>
                <span className="text-xl font-bold text-destructive">7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReportsTable activeCategory={activeCategory} />
    </main>
  )
}
