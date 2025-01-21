'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'

const templates = [
  {
    id: '1',
    name: 'Business Card',
    description: 'Professional contact information for networking',
    type: 'text' as const,
    value: `CONTACT INFO
Name: John Doe
Title: Software Engineer
Company: Tech Corp
Email: john@example.com
Phone: +1 (234) 567-8900
Website: www.example.com
LinkedIn: linkedin.com/in/johndoe`,
    icon: '👔',
    category: 'Professional'
  },
  {
    id: '2',
    name: 'Social Media Bundle',
    description: 'Collection of social media profile links',
    type: 'text' as const,
    value: `SOCIAL MEDIA LINKS
Twitter: twitter.com/username
Instagram: instagram.com/username
LinkedIn: linkedin.com/in/username
GitHub: github.com/username
Facebook: facebook.com/username
YouTube: youtube.com/@username`,
    icon: '📱',
    category: 'Social'
  },
  {
    id: '3',
    name: 'WiFi Access',
    description: 'Quick WiFi network connection',
    type: 'text' as const,
    value: 'WIFI:S:MyNetworkName;T:WPA;P:MySecurePassword;;',
    icon: '📶',
    category: 'Network'
  },
  {
    id: '4',
    name: 'Event Details',
    description: 'Complete event information and registration',
    type: 'text' as const,
    value: `EVENT INFORMATION
Name: Annual Tech Conference
Date: October 15, 2024
Time: 9:00 AM - 5:00 PM
Location: Tech Convention Center
Address: 123 Innovation St, Tech City
Registration: eventbrite.com/event123
Contact: events@example.com`,
    icon: '📅',
    category: 'Events'
  },
  {
    id: '5',
    name: 'Restaurant Menu',
    description: 'Digital menu for easy customer access',
    type: 'url' as const,
    value: 'https://restaurant-menu.example.com',
    icon: '🍽️',
    category: 'Business'
  },
  {
    id: '6',
    name: 'Calendar Event',
    description: 'Add event to calendar',
    type: 'text' as const,
    value: `BEGIN:VEVENT
SUMMARY:Team Meeting
DTSTART:20240125T100000Z
DTEND:20240125T110000Z
DESCRIPTION:Weekly team sync meeting
LOCATION:Conference Room A
END:VEVENT`,
    icon: '📆',
    category: 'Events'
  },
  {
    id: '7',
    name: 'Cryptocurrency Wallet',
    description: 'Cryptocurrency wallet address',
    type: 'text' as const,
    value: `CRYPTO WALLET ADDRESSES
Bitcoin (BTC): bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
Ethereum (ETH): 0x71C7656EC7ab88b098defB751B7401B5f6d8976F`,
    icon: '💰',
    category: 'Finance'
  },
  {
    id: '8',
    name: 'Product Information',
    description: 'Detailed product specifications and support',
    type: 'text' as const,
    value: `PRODUCT INFORMATION
Name: Smart Watch Pro
Model: SW-2024
Serial: SN123456789
Support: support.example.com/SW-2024
Manual: manual.example.com/SW-2024
Warranty Registration: warranty.example.com`,
    icon: '📦',
    category: 'Business'
  },
  {
    id: '9',
    name: 'Location',
    description: 'Geographic location coordinates',
    type: 'text' as const,
    value: `geo:37.7749,-122.4194
Location Name: San Francisco
Address: San Francisco, CA, USA`,
    icon: '📍',
    category: 'Location'
  },
  {
    id: '10',
    name: 'App Download',
    description: 'Multi-platform app download links',
    type: 'text' as const,
    value: `APP DOWNLOAD LINKS
iOS: apps.apple.com/app/id123456789
Android: play.google.com/store/apps/details?id=com.example.app
Website: app.example.com`,
    icon: '📲',
    category: 'Technology'
  },
  {
    id: '11',
    name: 'Digital Business Card',
    description: 'Modern vCard format',
    type: 'text' as const,
    value: `BEGIN:VCARD
VERSION:3.0
FN:Jane Smith
TITLE:Marketing Director
ORG:Digital Solutions Inc.
TEL:+1-555-123-4567
EMAIL:jane@example.com
URL:www.janesportfolio.com
END:VCARD`,
    icon: '💼',
    category: 'Professional'
  },
  {
    id: '12',
    name: 'Coupon Code',
    description: 'Promotional discount code',
    type: 'text' as const,
    value: `SPECIAL OFFER
Store: Example Store
Code: SAVE25NOW
Discount: 25% off
Valid Until: December 31, 2024
Terms: Valid on all items. Cannot be combined with other offers.
Website: shop.example.com`,
    icon: '🏷️',
    category: 'Marketing'
  }
]

export default function QRTemplates() {
  const handleTemplateClick = (template: typeof templates[0]) => {
    localStorage.setItem('qr-template', JSON.stringify({
      type: template.type,
      value: template.value
    }))
    window.dispatchEvent(new CustomEvent('switch-to-generate'))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map((template, index) => (
        <motion.div
          key={template.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{template.icon}</span>
                <div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription className="text-xs">{template.category}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{template.description}</p>
              <Button 
                onClick={() => handleTemplateClick(template)}
                variant="outline"
                className="w-full"
              >
                Use Template
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
} 