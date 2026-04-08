"use client"

import { useState, useEffect } from "react"
import { Share2, Book, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Verse {
  texto: string
  ref: string
}

const BACKGROUNDS = [
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
]

export function VerseOfDay() {
  const [verse, setVerse] = useState<Verse>({ 
    texto: "Cargando palabra de vida...", 
    ref: "" 
  })
  const [isLoading, setIsLoading] = useState(true)
  const [bgIndex, setBgIndex] = useState(0)

  useEffect(() => {
    // Set background based on day of year
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    )
    setBgIndex(dayOfYear % BACKGROUNDS.length)
    
    fetchVerse()
  }, [])

  const fetchVerse = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        "https://www.biblegateway.com/votd/get/?format=json&version=RVR1960"
      )
      const data = await response.json()
      
      const cleanText = data.votd.text
        .replace(/<[^>]*>/g, "")
        .replace(/&ldquo;/g, '"')
        .replace(/&rdquo;/g, '"')
        .replace(/&lsquo;/g, "'")
        .replace(/&rsquo;/g, "'")
        .replace(/&#243;/g, "ó")
        .replace(/&#233;/g, "é")
        .replace(/&#225;/g, "á")
        .replace(/&#237;/g, "í")
        .replace(/&#250;/g, "ú")
        .replace(/&#241;/g, "ñ")
        .replace(/&amp;/g, "&")
        .replace(/\[.*?\]/g, "")
        .replace(/[A-Z][a-z]+\.\s*\d+\.\d+\./g, "")
        .trim()

      setVerse({ texto: cleanText, ref: data.votd.display_ref })
    } catch {
      setVerse({ 
        texto: "Jehová es mi pastor; nada me faltará.", 
        ref: "Salmo 23:1" 
      })
    } finally {
      setIsLoading(false)
    }
  }

  const shareVerse = async () => {
    const shareText = `"${verse.texto}"\n— ${verse.ref}\n\nEstación Victoria FM 90.7`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Versículo del Día - Estación Victoria",
          text: shareText,
        })
      } catch {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareText)
      alert("Versículo copiado al portapapeles")
    }
  }

  const changeBg = () => {
    setBgIndex((prev) => (prev + 1) % BACKGROUNDS.length)
  }

  return (
    <div className="space-y-4">
      {/* Verse Card with Background */}
      <div 
        className="relative rounded-2xl overflow-hidden h-72 sm:h-80"
        style={{
          backgroundImage: `url(${BACKGROUNDS[bgIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55" />
        
        {/* Content */}
        <div className={cn(
          "relative z-10 h-full flex flex-col items-center justify-center p-6 text-center",
          "transition-opacity duration-300",
          isLoading && "opacity-50"
        )}>
          {isLoading ? (
            <RefreshCw className="w-8 h-8 text-white animate-spin" />
          ) : (
            <>
              <p className="text-white text-lg sm:text-xl italic leading-relaxed mb-4 text-balance drop-shadow-lg">
                &ldquo;{verse.texto}&rdquo;
              </p>
              <p className="text-white font-bold text-sm sm:text-base drop-shadow-md">
                {verse.ref}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <Button
          variant="outline"
          className="glass-card border-primary/40 hover:bg-primary/10 text-foreground"
          onClick={() => window.open("https://www.biblegateway.com/reading-plans/verse-of-the-day/next?version=RVR1960", "_blank")}
        >
          <Book className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Ver Más</span>
          <span className="sm:hidden">Más</span>
        </Button>
        
        <Button
          variant="outline"
          className="glass-card border-primary/40 hover:bg-primary/10 text-foreground"
          onClick={changeBg}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Fondo</span>
          <span className="sm:hidden">Fondo</span>
        </Button>
        
        <Button
          variant="outline"
          className="glass-card border-accent/40 hover:bg-accent/10 text-foreground"
          onClick={shareVerse}
        >
          <Share2 className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Compartir</span>
          <span className="sm:hidden">Enviar</span>
        </Button>
      </div>
    </div>
  )
}
