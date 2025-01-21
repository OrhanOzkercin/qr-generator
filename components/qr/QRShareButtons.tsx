'use client'

import { Button } from '@/components/ui/button'
import { Twitter, Copy, Download } from 'lucide-react'
import { toast } from 'sonner'

type ShareOption = {
  name: string
  icon: React.ReactNode
  action: (url: string, text: string) => Promise<void> | void
}

interface QRShareButtonsProps {
  qrCodeUrl: string
  inputValue: string
  onDownload: () => void
}

export default function QRShareButtons({ qrCodeUrl, inputValue, onDownload }: QRShareButtonsProps) {
  const shareOptions: ShareOption[] = [
    {
      name: 'X',
      icon: <Twitter className="w-4 h-4" />,
      action: (url, text) => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
        window.open(twitterUrl, '_blank')
        toast.success('Opened in X (Twitter)')
      }
    },
    {
      name: 'Copy',
      icon: <Copy className="w-4 h-4" />,
      action: async (_url, text) => {
        try {
          await navigator.clipboard.writeText(text)
          toast.success('Copied to clipboard!')
        } catch {
          toast.error('Failed to copy')
        }
      }
    }
  ]

  return (
    <div className="grid grid-cols-3 gap-2">
      <Button 
        onClick={onDownload} 
        variant="outline" 
        className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
      >
        <Download className="w-4 h-4" />
        Download
      </Button>
      {shareOptions.map((option) => (
        <Button
          key={option.name}
          onClick={() => option.action(qrCodeUrl, inputValue)}
          variant="outline"
          className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
        >
          {option.icon}
          {option.name}
        </Button>
      ))}
    </div>
  )
} 