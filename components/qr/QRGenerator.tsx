'use client'

import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import QRCode from 'qrcode'
import { motion } from 'framer-motion'
import { saveToHistory } from '@/lib/qr-history'
import QRShareButtons from './QRShareButtons'
import { Label } from '@/components/ui/label'

type QRType = 'url' | 'email' | 'phone' | 'text'
type QRColor = 'black' | 'blue' | 'purple' | 'green' | 'red'

const colorMap = {
  black: '#000000',
  blue: '#0066CC',
  purple: '#6B46C1',
  green: '#059669',
  red: '#DC2626',
}

const LOGO_SIZE = 80 // Increased logo size
const QR_SIZE = 400 // QR code size constant

export default function QRGenerator() {
  const [qrType, setQRType] = useState<QRType>('text')
  const [qrColor, setQrColor] = useState<QRColor>('black')
  const [inputValue, setInputValue] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [logo, setLogo] = useState<string | null>(null)

  useEffect(() => {
    // Check for template data
    const templateData = localStorage.getItem('qr-template')
    if (templateData) {
      const template = JSON.parse(templateData)
      setQRType(template.type)
      setInputValue(template.value)
      localStorage.removeItem('qr-template')
    }

    // Check for history item data
    const generatorData = localStorage.getItem('qr-generator-data')
    if (generatorData) {
      const data = JSON.parse(generatorData)
      setQRType(data.type)
      setQrColor(data.color)
      setInputValue(data.value)
      localStorage.removeItem('qr-generator-data')
    }
  }, [])

  const getPlaceholder = () => {
    switch (qrType) {
      case 'email':
        return 'Enter email address'
      case 'phone':
        return 'Enter phone number'
      case 'url':
        return 'Enter website URL'
      default:
        return 'Enter text'
    }
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogo(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addLogoToQRCode = (qrCodeCanvas: HTMLCanvasElement, logoUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const logo = new Image()
      
      if (!ctx) return resolve(qrCodeCanvas.toDataURL())
      
      logo.onload = () => {
        canvas.width = QR_SIZE
        canvas.height = QR_SIZE
        
        // Draw QR code
        ctx.drawImage(qrCodeCanvas, 0, 0)
        
        // Calculate logo size while maintaining aspect ratio
        let logoWidth = LOGO_SIZE
        let logoHeight = LOGO_SIZE
        const ratio = logo.width / logo.height

        if (ratio > 1) {
          // Wider image
          logoHeight = LOGO_SIZE / ratio
        } else {
          // Taller image
          logoWidth = LOGO_SIZE * ratio
        }
        
        // Calculate logo position (center)
        const logoX = (QR_SIZE - logoWidth) / 2
        const logoY = (QR_SIZE - logoHeight) / 2
        
        // Create a white background for the logo with rounded corners
        ctx.fillStyle = '#FFFFFF'
        const padding = 10
        const cornerRadius = 8
        
        ctx.beginPath()
        ctx.moveTo(logoX - padding, logoY - padding + cornerRadius)
        ctx.quadraticCurveTo(logoX - padding, logoY - padding, logoX - padding + cornerRadius, logoY - padding)
        ctx.lineTo(logoX + logoWidth + padding - cornerRadius, logoY - padding)
        ctx.quadraticCurveTo(logoX + logoWidth + padding, logoY - padding, logoX + logoWidth + padding, logoY - padding + cornerRadius)
        ctx.lineTo(logoX + logoWidth + padding, logoY + logoHeight + padding - cornerRadius)
        ctx.quadraticCurveTo(logoX + logoWidth + padding, logoY + logoHeight + padding, logoX + logoWidth + padding - cornerRadius, logoY + logoHeight + padding)
        ctx.lineTo(logoX - padding + cornerRadius, logoY + logoHeight + padding)
        ctx.quadraticCurveTo(logoX - padding, logoY + logoHeight + padding, logoX - padding, logoY + logoHeight + padding - cornerRadius)
        ctx.closePath()
        ctx.fill()
        
        // Draw logo
        ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight)
        
        resolve(canvas.toDataURL())
      }
      
      logo.src = logoUrl
    })
  }

  const generateQRCode = async () => {
    if (!inputValue.trim()) return
    setIsGenerating(true)

    try {
      let finalValue = inputValue

      switch (qrType) {
        case 'email':
          finalValue = `mailto:${inputValue}`
          break
        case 'phone':
          finalValue = `tel:${inputValue}`
          break
        case 'url':
          if (!inputValue.startsWith('http://') && !inputValue.startsWith('https://')) {
            finalValue = `https://${inputValue}`
          }
          break
      }

      const canvas = document.createElement('canvas')
      await QRCode.toCanvas(canvas, finalValue, {
        width: QR_SIZE,
        margin: 1,
        color: {
          dark: colorMap[qrColor],
          light: '#ffffff',
        },
        errorCorrectionLevel: 'H' // Highest error correction for better logo support
      })

      let finalQRCode = canvas.toDataURL()
      
      // Add logo if one is selected
      if (logo) {
        finalQRCode = await addLogoToQRCode(canvas, logo)
      }
      
      setQrCodeUrl(finalQRCode)
      
      // Save to history
      saveToHistory({
        id: Date.now().toString(),
        type: qrType,
        value: inputValue,
        color: qrColor,
        createdAt: new Date(),
        url: finalQRCode
      })
    } catch (error) {
      console.error('Error generating QR code:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadQRCode = () => {
    if (!qrCodeUrl) return
    
    const link = document.createElement('a')
    link.href = qrCodeUrl
    link.download = `qr-code-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select onValueChange={(value) => setQRType(value as QRType)} defaultValue={qrType}>
          <SelectTrigger>
            <SelectValue placeholder="Select QR code type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="url">URL</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="phone">Phone Number</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setQrColor(value as QRColor)} defaultValue={qrColor}>
          <SelectTrigger>
            <SelectValue placeholder="Select QR code color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="black">Black</SelectItem>
            <SelectItem value="blue">Blue</SelectItem>
            <SelectItem value="purple">Purple</SelectItem>
            <SelectItem value="green">Green</SelectItem>
            <SelectItem value="red">Red</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Input
        type="text"
        placeholder={getPlaceholder()}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full transition-all duration-200 focus:scale-[1.01]"
      />

      <div className="space-y-2">
        <Label htmlFor="logo-upload" className="text-sm text-gray-600 dark:text-gray-400">
          Add Logo (Optional)
        </Label>
        <Input
          id="logo-upload"
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="w-full"
        />
      </div>

      <Button 
        onClick={generateQRCode} 
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
        disabled={isGenerating || !inputValue.trim()}
      >
        {isGenerating ? 'Generating...' : 'Generate QR Code'}
      </Button>

      {qrCodeUrl && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <motion.div 
            className="flex justify-center p-4 bg-white rounded-lg shadow-md"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <img 
              src={qrCodeUrl} 
              alt="QR Code" 
              className="rounded-lg w-[300px] h-[300px] object-contain bg-white"
              width={300}
              height={300}
            />
          </motion.div>
          <QRShareButtons
            qrCodeUrl={qrCodeUrl}
            inputValue={inputValue}
            onDownload={downloadQRCode}
          />
        </motion.div>
      )}
    </div>
  )
} 