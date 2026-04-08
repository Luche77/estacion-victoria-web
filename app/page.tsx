"use client"

import { useState } from "react"
import { Radio, Book, Calendar, Users, Heart, Home } from "lucide-react"
import { Header } from "@/components/header"
import { RadioPlayer } from "@/components/radio-player"
import { ProgramInfo } from "@/components/program-info"
import { SocialLinks } from "@/components/social-links"
import { PrayerForm } from "@/components/prayer-form"
import { Schedule } from "@/components/schedule"
import { Predicas } from "@/components/predicas"
import { VerseOfDay } from "@/components/verse-of-day"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"

type TabId = "inicio" | "predicas" | "horarios" | "oracion" | "versiculo"

interface Tab {
  id: TabId
  label: string
  icon: typeof Radio
}

const TABS: Tab[] = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "predicas", label: "Prédicas", icon: Book },
  { id: "horarios", label: "Horarios", icon: Calendar },
  { id: "oracion", label: "Oración", icon: Heart },
  { id: "versiculo", label: "Versículo", icon: Users },
]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabId>("inicio")

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main Content Area */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 pb-24">
        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "inicio" && (
            <div className="space-y-6">
              {/* Radio Player - Hero */}
              <section>
                <RadioPlayer />
              </section>

              {/* Program Info */}
              <section>
                <ProgramInfo />
              </section>

              {/* Social Links */}
              <section className="py-4">
                <h2 className="text-center text-xs font-semibold text-muted-foreground tracking-wider mb-4 uppercase">
                  Conectate con nosotros
                </h2>
                <SocialLinks />
              </section>

              {/* Quick Access Cards */}
              <section className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab("predicas")}
                  className="glass-card rounded-xl p-5 text-left hover:border-primary/50 transition-all group"
                >
                  <Book className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-foreground">Prédicas</h3>
                  <p className="text-xs text-muted-foreground mt-1">Escuchá las últimas prédicas</p>
                </button>
                
                <button
                  onClick={() => setActiveTab("versiculo")}
                  className="glass-card rounded-xl p-5 text-left hover:border-accent/50 transition-all group"
                >
                  <Users className="w-8 h-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-foreground">Versículo</h3>
                  <p className="text-xs text-muted-foreground mt-1">Promesa del día</p>
                </button>
                
                <button
                  onClick={() => setActiveTab("horarios")}
                  className="glass-card rounded-xl p-5 text-left hover:border-primary/50 transition-all group"
                >
                  <Calendar className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-foreground">Horarios</h3>
                  <p className="text-xs text-muted-foreground mt-1">Programación y reuniones</p>
                </button>
                
                <button
                  onClick={() => setActiveTab("oracion")}
                  className="glass-card rounded-xl p-5 text-left hover:border-accent/50 transition-all group"
                >
                  <Heart className="w-8 h-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-foreground">Oración</h3>
                  <p className="text-xs text-muted-foreground mt-1">Enviá tu pedido</p>
                </button>
              </section>
            </div>
          )}

          {activeTab === "predicas" && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">Prédicas</h2>
                <p className="text-muted-foreground text-sm mt-1">Biblioteca de mensajes</p>
              </div>
              <Predicas />
            </div>
          )}

          {activeTab === "horarios" && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">Horarios</h2>
                <p className="text-muted-foreground text-sm mt-1">Programación y reuniones</p>
              </div>
              <Schedule />
            </div>
          )}

          {activeTab === "oracion" && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">Pedido de Oración</h2>
                <p className="text-muted-foreground text-sm mt-1">Estamos para acompañarte</p>
              </div>
              <PrayerForm />
            </div>
          )}

          {activeTab === "versiculo" && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">Promesa del Día</h2>
                <p className="text-muted-foreground text-sm mt-1">Palabra de vida para hoy</p>
              </div>
              <VerseOfDay />
            </div>
          )}
        </div>

        {/* Footer - Only on home */}
        {activeTab === "inicio" && (
          <div className="mt-8">
            <Footer />
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50">
        <div className="max-w-2xl mx-auto px-2">
          <div className="flex justify-around items-center py-2">
            {TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex flex-col items-center py-2 px-3 rounded-xl transition-all min-w-[60px]",
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <Icon className={cn(
                    "w-5 h-5 mb-1 transition-transform",
                    isActive && "scale-110"
                  )} />
                  <span className="text-[10px] font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
        {/* Safe area for mobile */}
        <div className="h-safe-area-inset-bottom bg-card" />
      </nav>
    </div>
  )
}
