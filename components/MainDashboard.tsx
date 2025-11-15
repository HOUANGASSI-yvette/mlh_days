'use client'

import { useState } from 'react'
import { 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Shield, 
  BarChart3, 
  Users, 
  Lock, 
  Zap, 
  Eye, 
  Gavel,
  X,
  Mail,
  Phone,
  ChevronRight
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Types
interface Report {
  id: number
  fullName: string
  violation: string
  locality: string
  date: string
  status: 'pending' | 'validated'
  reporterEmail: string
  reporterPhone: string
  description: string
}

// Données mock
const mockReports: Report[] = [
  {
    id: 1247,
    fullName: 'Akouvi Koffi',
    violation: 'Harcèlement',
    locality: 'Lome',
    date: '2024-11-14',
    status: 'pending',
    reporterEmail: 'akouvi.koffi@email.com',
    reporterPhone: '+228 90 12 34 56',
    description: 'Harcèlement répété au sein du département des ressources humaines par un supérieur hiérarchique.',
  },
  {
    id: 1246,
    fullName: 'Amara Diallo',
    violation: 'Discrimination',
    locality: 'Dakar',
    date: '2024-11-14',
    status: 'validated',
    reporterEmail: 'amara.diallo@email.com',
    reporterPhone: '+221 77 98 76 54',
    description: 'Discrimination basée sur l\'origine ethnique lors d\'un processus de recrutement.',
  },
  {
    id: 1245,
    fullName: 'Zainab Hassan',
    violation: 'Abus de pouvoir',
    locality: 'Addis-Abeba',
    date: '2024-11-13',
    status: 'validated',
    reporterEmail: 'zainab.hassan@email.com',
    reporterPhone: '+251 92 34 56 78',
    description: 'Abus de pouvoir par un officiel gouvernemental qui a dépassé ses autorisations légales.',
  },
  {
    id: 1244,
    fullName: 'Kwame Mensah',
    violation: 'Corruption',
    locality: 'Accra',
    date: '2024-11-13',
    status: 'pending',
    reporterEmail: 'kwame.mensah@email.com',
    reporterPhone: '+233 50 11 22 33',
    description: 'Versement de pots-de-vin pour l\'obtention d\'une licence commerciale.',
  },
  {
    id: 1243,
    fullName: 'Nia Okonkwo',
    violation: 'Violence',
    locality: 'Lagos',
    date: '2024-11-12',
    status: 'validated',
    reporterEmail: 'nia.okonkwo@email.com',
    reporterPhone: '+234 81 23 45 67',
    description: 'Violence physique non justifiée lors d\'une intervention policière.',
  },
  {
    id: 1242,
    fullName: 'Sekou Traore',
    violation: 'Fraude',
    locality: 'Bamako',
    date: '2024-11-12',
    status: 'validated',
    reporterEmail: 'sekou.traore@email.com',
    reporterPhone: '+223 66 77 88 99',
    description: 'Fraude documentaire pour l\'obtention de financements publics.',
  },
  {
    id: 1241,
    fullName: 'Amina Sow',
    violation: 'Harcèlement',
    locality: 'Kinshasa',
    date: '2024-11-11',
    status: 'pending',
    reporterEmail: 'amina.sow@email.com',
    reporterPhone: '+243 99 88 77 66',
    description: 'Harcèlement moral systématique affectant la santé mentale de la victime.',
  },
  {
    id: 1240,
    fullName: 'Kofi Anane',
    violation: 'Discrimination',
    locality: 'Accra',
    date: '2024-11-11',
    status: 'validated',
    reporterEmail: 'kofi.anane@email.com',
    reporterPhone: '+233 50 99 88 77',
    description: 'Discrimination basée sur le handicap lors d\'une candidature d\'emploi.',
  },
  {
    id: 1239,
    fullName: 'Fatima Ndiaye',
    violation: 'Abus de pouvoir',
    locality: 'Dakar',
    date: '2024-11-10',
    status: 'validated',
    reporterEmail: 'fatima.ndiaye@email.com',
    reporterPhone: '+221 76 65 54 43',
    description: 'Abus de pouvoir administratif impliquant des détentions arbitraires.',
  },
  {
    id: 1238,
    fullName: 'Juma Kimani',
    violation: 'Corruption',
    locality: 'Nairobi',
    date: '2024-11-10',
    status: 'validated',
    reporterEmail: 'juma.kimani@email.com',
    reporterPhone: '+254 71 23 45 67',
    description: 'Détournement de fonds publics par un agent financier.',
  },
]

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

const genderData = {
  women: 742,
  men: 505,
}

// Composant principal
export default function MainDashboard() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  // Filtrage des rapports
  const filterReports = (reports: Report[], category: string): Report[] => {
    if (category === 'all') return reports

    const categoryMap: Record<string, string> = {
      harassment: 'Harcèlement',
      discrimination: 'Discrimination',
      abuse: 'Abus de pouvoir',
      corruption: 'Corruption',
      violence: 'Violence',
      fraud: 'Fraude',
    }

    const violationType = categoryMap[category]
    return reports.filter((r) => r.violation === violationType)
  }

  // Statistiques
  const getStatistics = (category: string) => {
    if (category === 'all') {
      return {
        total: 1247,
        pending: 156,
        validated: 1091,
      }
    }
    return {
      total: 140,
      pending: 18,
      validated: 122,
    }
  }

  const stats = getStatistics(activeCategory)
  const filteredReports = filterReports(mockReports, activeCategory)
  const total = genderData.women + genderData.men
  const womenPercentage = ((genderData.women / total) * 100).toFixed(1)
  const menPercentage = ((genderData.men / total) * 100).toFixed(1)

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-sidebar-primary" />
            <h1 className="text-xl font-bold text-sidebar-foreground">LexTech</h1>
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
            <p className="font-medium">Admin User</p>
            <p className="text-sidebar-foreground/70">admin@legaltrack.local</p>
          </div>
        </div>
      </aside>

      {/* Contenu principal */}
      <div className="flex-1 overflow-auto">
        <main className="p-8 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Tableau de Bord</h2>
            <p className="text-muted-foreground mt-2">Suivi en temps réel des signalements et violations</p>
          </div>

          {/* Statistiques Cards */}
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

          {/* Répartition par sexe et Tendances */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
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
            </div>
            
            <div className="lg:col-span-2">
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

          {/* Tableau des rapports */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">
                Derniers signalements
              </CardTitle>
              <CardDescription>
                {filteredReports.length} signalements trouvés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="text-foreground font-semibold">N°</TableHead>
                      <TableHead className="text-foreground font-semibold">Nom complet</TableHead>
                      <TableHead className="text-foreground font-semibold">Violation déclarée</TableHead>
                      <TableHead className="text-foreground font-semibold">Localité</TableHead>
                      <TableHead className="text-foreground font-semibold">Date</TableHead>
                      <TableHead className="text-foreground font-semibold">Statut</TableHead>
                      <TableHead className="text-foreground font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow
                        key={report.id}
                        className="border-border hover:bg-muted/30 transition-colors"
                      >
                        <TableCell className="font-medium text-foreground">{report.id}</TableCell>
                        <TableCell className="text-foreground">{report.fullName}</TableCell>
                        <TableCell className="text-foreground">{report.violation}</TableCell>
                        <TableCell className="text-foreground">{report.locality}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{report.date}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            report.status === 'pending'
                              ? 'bg-chart-4/20 text-chart-4'
                              : 'bg-chart-2/20 text-chart-2'
                          }`}>
                            {report.status === 'pending' ? 'En attente' : 'Validé'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => setSelectedReport(report)}
                            variant="outline"
                            size="sm"
                            className="border-border text-foreground hover:bg-muted"
                          >
                            Détails
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredReports.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Aucun signalement trouvé pour cette catégorie.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Modal de détails */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-card border-border w-full max-w-2xl">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-xl font-bold text-foreground">
                  Détails du signalement
                </CardTitle>
                <CardDescription>N° {selectedReport.id}</CardDescription>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-sm">Informations sur le signalement</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Type de violation</p>
                    <p className="font-medium text-foreground">{selectedReport.violation}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Localité</p>
                    <p className="font-medium text-foreground">{selectedReport.locality}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Date du signalement</p>
                    <p className="font-medium text-foreground">{selectedReport.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Statut</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedReport.status === 'pending'
                        ? 'bg-chart-4/20 text-chart-4'
                        : 'bg-chart-2/20 text-chart-2'
                    }`}>
                      {selectedReport.status === 'pending' ? 'En attente' : 'Validé'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-foreground text-sm">Description</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedReport.description}</p>
              </div>

              <div className="border-t border-border pt-4 space-y-4">
                <h3 className="font-semibold text-foreground text-sm">Informations du signataire</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-muted rounded-lg">
                      <Mail className="w-4 h-4 text-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground break-all">{selectedReport.reporterEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-muted rounded-lg">
                      <Phone className="w-4 h-4 text-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Téléphone</p>
                      <p className="font-medium text-foreground">{selectedReport.reporterPhone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  onClick={() => setSelectedReport(null)}
                  className="bg-muted text-foreground hover:bg-muted/80"
                >
                  Fermer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
