'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users } from 'lucide-react'

// backend: remplacer les données statiques par des appels API pour les données réelles
const genderData = {
  women: 742,
  men: 505,
}

export default function GenderDistribution() {
  const total = genderData.women + genderData.men
  const womenPercentage = ((genderData.women / total) * 100).toFixed(1)
  const menPercentage = ((genderData.men / total) * 100).toFixed(1)

  return (
    <Card className="border-border bg-card h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Répartition par sexe
        </CardTitle>
        <CardDescription>Distribution des signalants</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-chart-1"></div>
              <span className="text-sm font-medium text-foreground">Femmes</span>
            </div>
            <span className="text-sm font-semibold text-foreground">{genderData.women}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="bg-chart-1 h-full transition-all"
              style={{ width: `${womenPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-muted-foreground">{womenPercentage}% du total</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-chart-2"></div>
              <span className="text-sm font-medium text-foreground">Hommes</span>
            </div>
            <span className="text-sm font-semibold text-foreground">{genderData.men}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="bg-chart-2 h-full transition-all"
              style={{ width: `${menPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-muted-foreground">{menPercentage}% du total</p>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total signalants</span>
            <span className="text-lg font-bold text-foreground">{total}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
