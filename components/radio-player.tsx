"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Radio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

const RADIO_STREAM_URL = "https://01.solumedia.com.ar:7786/stream"

function AnimatedBars({ isPlaying }: { isPlaying: boolean }) {
  if (!isPlaying) return null
  
  return (
    <div className="flex items-end gap-1 h-6">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={cn(
            "w-1 bg-accent rounded-full origin-bottom",
            `bar-${i}`
          )}
          style={{ height: "100%" }}
        />
      ))}
    </div>
  )
}

export function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.volume = volume
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlay = async () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      audioRef.current.src = ""
      setIsPlaying(false)
    } else {
      try {
        setIsLoading(true)
        audioRef.current.src = RADIO_STREAM_URL
        await audioRef.current.play()
        setIsPlaying(true)
      } catch (error) {
        console.error("Error playing radio:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    if (value[0] > 0) setIsMuted(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div className={cn(
      "glass-card rounded-2xl p-6 transition-all duration-500",
      isPlaying && "animate-pulse-glow"
    )}>
      <div className="flex items-center gap-6">
        {/* Play Button */}
        <Button
          onClick={togglePlay}
          disabled={isLoading}
          size="lg"
          className={cn(
            "w-20 h-20 rounded-full transition-all duration-300",
            "bg-secondary hover:bg-secondary/80 border-2 border-primary/30",
            isPlaying && "bg-accent/20 border-accent/50"
          )}
        >
          {isLoading ? (
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-8 h-8 text-foreground" />
          ) : (
            <Play className="w-8 h-8 text-foreground ml-1" />
          )}
        </Button>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {isPlaying && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-live-pulse" />
            )}
            <span className={cn(
              "text-sm font-bold tracking-wider",
              isPlaying ? "text-accent" : "text-muted-foreground"
            )}>
              {isPlaying ? "EN VIVO" : "PAUSADO"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Radio className="w-5 h-5 text-primary" />
            <span className="text-lg font-semibold text-foreground">FM 90.7</span>
          </div>
          {isPlaying && (
            <div className="mt-2">
              <AnimatedBars isPlaying={isPlaying} />
            </div>
          )}
        </div>

        {/* Volume Control */}
        <div className="hidden sm:flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="text-muted-foreground hover:text-foreground"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            onValueChange={handleVolumeChange}
            max={1}
            step={0.01}
            className="w-24"
          />
        </div>
      </div>
    </div>
  )
}
