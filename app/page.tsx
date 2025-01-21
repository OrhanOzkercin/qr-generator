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
        <p className="mt-1 flex items-center justify-center gap-1">
          <a 
            href="https://github.com/ozkercin/qrcode" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-500 hover:text-indigo-600 transition-colors flex items-center gap-1"
          >
            <svg 
              height="16" 
              viewBox="0 0 16 16" 
              width="16" 
              className="fill-current" 
              role="img" 
              aria-label="GitHub icon"
            >
              <title>GitHub icon</title>
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
            </svg>
            View on GitHub
          </a>
        </p>
      </footer>
    </main>
  )
}
