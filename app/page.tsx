'use client'

import QRCodeGenerator from '@/components/QRCodeGenerator'

export default function Home() {
  return (
    <main className="container max-w-5xl mx-auto py-8 px-4">
      <div className="flex flex-col items-center mb-8 space-y-2">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-10 h-10" role="img" aria-label="QR Code icon">
            <title>QR Code icon</title>
            <path d="M3 4.875C3 3.839 3.84 3 4.875 3h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 013 9.375v-4.5zM3 14.625c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 013 19.125v-4.5zM12.75 4.875c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 01-1.875-1.875v-4.5zM12.75 14.625c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 01-1.875-1.875v-4.5z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          QR Code Generator
        </h1>
        <p className="text-muted-foreground text-sm">
          Create custom QR codes with your own templates and designs
        </p>
      </div>
      <QRCodeGenerator />
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>Created by Orhan Özkercin</p>
        <p className="mt-1 flex items-center justify-center gap-1">
          Built with
          <a 
            href="https://cursor.sh" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-500 hover:text-indigo-600 transition-colors"
          >
            Cursor
          </a>
        </p>
      </footer>
    </main>
  )
}
