'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { QRHistoryItem, getHistory } from '@/lib/qr-history'
import { Button } from '@/components/ui/button'
import { useQR } from '@/contexts/QRContext'

export default function QRHistory() {
  const [history, setHistory] = useState<QRHistoryItem[]>([])
  const { setGeneratorData } = useQR()

  useEffect(() => {
    setHistory(getHistory())
  }, [])

  const downloadQR = (item: QRHistoryItem) => {
    const link = document.createElement('a')
    link.href = item.url
    link.download = `qr-code-${item.id}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const useHistoryItem = (item: QRHistoryItem) => {
    setGeneratorData(item)
  }

  if (history.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        No QR codes generated yet
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {history.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 border rounded-lg space-y-3"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.url}
              alt={`QR Code for ${item.value}`}
              className="w-24 h-24 rounded cursor-pointer"
              onClick={() => useHistoryItem(item)}
            />
            <div className="flex-1">
              <p className="font-medium">{item.type.toUpperCase()}</p>
              <p className="text-sm text-muted-foreground break-all">{item.value}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => downloadQR(item)}
              variant="outline"
              className="w-full"
            >
              Download
            </Button>
            <Button
              onClick={() => useHistoryItem(item)}
              variant="outline"
              className="w-full"
            >
              Use Again
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  )
} 