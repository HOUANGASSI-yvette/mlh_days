'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronRight, X, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

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

interface ReportsTableProps {
  activeCategory: string
}

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

function DetailModal({ report, onClose }: { report: Report; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-card border-border w-full max-w-2xl">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl font-bold text-foreground">
              Détails du signalement
            </CardTitle>
            <CardDescription>N° {report.id}</CardDescription>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Report Details Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-sm">Informations sur le signalement</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Type de violation</p>
                <p className="font-medium text-foreground">{report.violation}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Localité</p>
                <p className="font-medium text-foreground">{report.locality}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Date du signalement</p>
                <p className="font-medium text-foreground">{report.date}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Statut</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  report.status === 'pending'
                    ? 'bg-chart-4/20 text-chart-4'
                    : 'bg-chart-2/20 text-chart-2'
                }`}>
                  {report.status === 'pending' ? 'En attente' : 'Validé'}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground text-sm">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{report.description}</p>
          </div>

          {/* Reporter Contact Information */}
          <div className="border-t border-border pt-4 space-y-4">
            <h3 className="font-semibold text-foreground text-sm">Informations du signataire</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-muted rounded-lg">
                  <Mail className="w-4 h-4 text-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground break-all">{report.reporterEmail}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-muted rounded-lg">
                  <Phone className="w-4 h-4 text-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Téléphone</p>
                  <p className="font-medium text-foreground">{report.reporterPhone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              onClick={onClose}
              className="bg-muted text-foreground hover:bg-muted/80"
            >
              Fermer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ReportsTable({ activeCategory }: ReportsTableProps) {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const filteredReports = filterReports(mockReports, activeCategory)

  const getStatusBadge = (status: 'pending' | 'validated') => {
    if (status === 'pending') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-chart-4/20 text-chart-4">
          En attente
        </span>
      )
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-chart-2/20 text-chart-2">
        Validé
      </span>
    )
  }

  return (
    <>
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
                    <TableCell>{getStatusBadge(report.status)}</TableCell>
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

      {selectedReport && (
        <DetailModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </>
  )
}
