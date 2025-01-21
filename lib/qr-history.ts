export type QRHistoryItem = {
  id: string
  type: 'url' | 'email' | 'phone' | 'text'
  value: string
  color: string
  createdAt: Date
  url: string
}

export const saveToHistory = (item: QRHistoryItem) => {
  const history = JSON.parse(localStorage.getItem('qr-history') || '[]') as QRHistoryItem[]
  localStorage.setItem('qr-history', JSON.stringify([item, ...history].slice(0, 10)))
}

export const getHistory = (): QRHistoryItem[] => {
  return JSON.parse(localStorage.getItem('qr-history') || '[]')
} 