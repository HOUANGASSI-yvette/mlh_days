'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react'

interface StatisticsCardsProps {
  activeCategory: string
}

// backend: remplacer les données statiques par des appels API dynamiques
const getStatistics = (category: string) => {
  if (category === 'all') {
    return {
      total: 1247,
      pending: 156,
      validated: 1091,
    }
  }
  // backend: adapter les statistiques selon la catégorie sélectionnée
  return {
    total: 140,
    pending: 18,
    validated: 122,
  }
}

export default function StatisticsCards({ activeCategory }: StatisticsCardsProps) {
  const stats = getStatistics(activeCategory)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-border bg-card hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            Total des signalements
          </CardTitle>
          <AlertCircle className="w-5 h-5 text-chart-1" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">{stats.total.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Depuis le début de l'année
          </p>
        </CardContent>
      </Card>

      <Card className="border-border bg-card hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            En attente de validation
          </CardTitle>
          <Clock className="w-5 h-5 text-chart-4" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">{stats.pending}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Requièrent une action
          </p>
        </CardContent>
      </Card>

      <Card className="border-border bg-card hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            Signalements validés
          </CardTitle>
          <CheckCircle2 className="w-5 h-5 text-chart-2" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">{stats.validated}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Traités et archivés
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
