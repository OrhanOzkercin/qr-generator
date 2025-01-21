'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import QRGenerator from './qr/QRGenerator'
import QRHistory from './qr/QRHistory'
import QRTemplates from './qr/QRTemplates'
import { motion } from 'framer-motion'

export default function QRCodeGenerator() {
  const [activeTab, setActiveTab] = useState('generate')

  useEffect(() => {
    const handleSwitchToGenerate = () => {
      setActiveTab('generate')
    }

    window.addEventListener('switch-to-generate', handleSwitchToGenerate)
    return () => {
      window.removeEventListener('switch-to-generate', handleSwitchToGenerate)
    }
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6 border rounded-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 shadow-lg"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="generate">
          <QRGenerator />
        </TabsContent>

        <TabsContent value="history">
          <QRHistory />
        </TabsContent>

        <TabsContent value="templates">
          <QRTemplates />
        </TabsContent>
      </Tabs>
    </motion.div>
  )
} 