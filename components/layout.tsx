'use client'

import { useState } from 'react'
import Sidebar from './sidebar'
import Dashboard from './dashboard'

export function LayoutComponent() {
  const [activeCategory, setActiveCategory] = useState('all')

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      
      <div className="flex-1 overflow-auto">
        <Dashboard activeCategory={activeCategory} />
      </div>
    </div>
  )
}
