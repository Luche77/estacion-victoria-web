"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, Download, ChevronDown, ChevronUp, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Predica {
  titulo: string
  predicador: string
  fecha: string
  audioUrl: string
}

// Sample predicas data (in real app, fetch from API)
const SAMPLE_PREDICAS: Predica[] = [
  {
    titulo: "La Fe que Mueve Montañas",
    predicador: "Pastor Juan",
    fecha: "24/03/2024",
    audioUrl: "https://example.com/predica1.mp3"
  },
  {
    titulo: "El Poder de la Oración",
    predicador: "Pastor Carlos",
    fecha: "17/03/2024",
    audioUrl: "https://example.com/predica2.mp3"
  },
  {
    titulo: "Viviendo en Victoria",
    predicador: "Pastor Juan",
    fecha: "10/03/2024",
    audioUrl: "https://example.com/predica3.mp3"
  },
]

export function Predicas() {
  const [isOpen, setIsOpen] = useState(false)
  const [predicas, setPredicas] = useState<Predica[]>([])
  const [predicaActual, setPredicaActual] = useState<Predica | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Try to fetch real predicas, fallback to sample
    fetchPredicas()
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }
    }
  }, [])

  const fetchPredicas = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/Luche77/estacion-victoria-data/main/predicas.json"
      )
      const data = await response.json()
      setPredicas(data.predicas || SAMPLE_PREDICAS)
    } catch {
      setPredicas(SAMPLE_PREDICAS)
    }
  }

  const playPredica = async (predica: Predica) => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
    }

    // If same predica, toggle play/pause
    if (predicaActual?.audioUrl === predica.audioUrl) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        await audioRef.current.play()
        setIsPlaying(true)
      }
      return
    }

    // Different predica - stop current and play new
    setIsLoading(true)
    audioRef.current.pause()
    audioRef.current.src = predica.audioUrl
    setPredicaActual(predica)

    try {
      await audioRef.current.play()
      setIsPlaying(true)
    } catch (error) {
      console.error("Error playing predica:", error)
      alert("No se pudo reproducir la prédica. Verificá tu conexión.")
    } finally {
      setIsLoading(false)
    }

    audioRef.current.onended = () => {
      setIsPlaying(false)
      setPredicaActual(null)
    }
  }

  const downloadPredica = (predica: Predica) => {
    window.open(predica.audioUrl, "_blank")
  }

  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        className="w-full glass-card border-primary/40 hover:bg-primary/10 text-foreground py-6 justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="font-semibold">Prédicas</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </Button>

      {isOpen && (
        <div className="glass-card rounded-xl p-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <h3 className="text-primary font-bold text-center mb-4">
            Últimas Prédicas
          </h3>

          {predicas.length === 0 ? (
            <p className="text-muted-foreground text-center text-sm">
              Cargando prédicas...
            </p>
          ) : (
            predicas.map((predica, index) => {
              const isActive = predicaActual?.audioUrl === predica.audioUrl

              return (
                <div
                  key={index}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg transition-colors",
                    "border-b border-border/30 last:border-0",
                    isActive && "bg-primary/10"
                  )}
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => playPredica(predica)}
                    disabled={isLoading && isActive}
                    className="shrink-0"
                  >
                    {isLoading && isActive ? (
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    ) : isActive && isPlaying ? (
                      <Pause className="w-6 h-6 text-primary" />
                    ) : (
                      <Play className="w-6 h-6 text-primary" />
                    )}
                  </Button>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">
                      {predica.titulo}
                    </p>
                    <p className="text-xs text-primary">
                      {predica.predicador} · {predica.fecha}
                    </p>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => downloadPredica(predica)}
                    className="shrink-0 text-primary hover:text-primary/80"
                  >
                    <Download className="w-5 h-5" />
                  </Button>
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
