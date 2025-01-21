'use client'

import { createContext, useContext } from 'react'
import type { QRHistoryItem } from '@/lib/qr-history'

interface QRContextType {
  setGeneratorData: (data: Partial<QRHistoryItem>) => void
}

const QRContext = createContext<QRContextType | undefined>(undefined)

export function QRProvider({ children }: { children: React.ReactNode }) {
  const setGeneratorData = (data: Partial<QRHistoryItem>) => {
    // Store data in localStorage to handle tab switch
    localStorage.setItem('qr-generator-data', JSON.stringify(data))
    // Use the Shadcn Tabs API to switch tabs
    const event = new CustomEvent('switch-to-generate')
    window.dispatchEvent(event)
  }

  return (
    <QRContext.Provider value={{ setGeneratorData }}>
      {children}
    </QRContext.Provider>
  )
}

export function useQR() {
  const context = useContext(QRContext)
  if (context === undefined) {
    throw new Error('useQR must be used within a QRProvider')
  }
  return context
} 