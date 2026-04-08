"use client"

import { Radio, Church, Clock } from "lucide-react"

interface ScheduleItem {
  dia: string
  eventos: { nombre: string; hora: string }[]
}

const PROGRAMACION_RADIO: ScheduleItem[] = [
  {
    dia: "LUNES A VIERNES",
    eventos: [{ nombre: "Mañanas en Victoria", hora: "07:00 a 13:00hs" }],
  },
]

const REUNIONES_IGLESIA: ScheduleItem[] = [
  {
    dia: "MIÉRCOLES",
    eventos: [{ nombre: "Reunión General", hora: "20:00hs" }],
  },
  {
    dia: "VIERNES",
    eventos: [{ nombre: "Reunión de Espiga", hora: "20:00hs" }],
  },
  {
    dia: "SÁBADOS",
    eventos: [
      { nombre: "Preas y Adn", hora: "17:00hs" },
      { nombre: "Jóvenes", hora: "19:30hs" },
    ],
  },
  {
    dia: "DOMINGOS",
    eventos: [
      { nombre: "Reunión General", hora: "10:30hs" },
      { nombre: "Reunión General", hora: "19:00hs" },
    ],
  },
]

export function Schedule() {
  return (
    <div className="space-y-6">
      {/* Programación de Radio */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <Radio className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">Programación de Radio</h3>
            <p className="text-sm text-muted-foreground">Estación Victoria FM 90.7</p>
          </div>
        </div>

        <div className="space-y-3">
          {PROGRAMACION_RADIO.map((item, index) => (
            <div
              key={index}
              className="bg-secondary/50 rounded-xl p-4"
            >
              <p className="text-primary text-xs font-bold tracking-wider mb-2">
                {item.dia}
              </p>
              {item.eventos.map((evento, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  <span className="text-foreground font-medium">{evento.nombre}</span>
                  <span className="text-muted-foreground text-sm">— {evento.hora}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Reuniones de Iglesia */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
            <Church className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">Días de Reunión</h3>
            <p className="text-sm text-muted-foreground">Siquem Iglesia Pergamino</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {REUNIONES_IGLESIA.map((item, index) => (
            <div
              key={index}
              className="bg-secondary/50 rounded-xl p-4"
            >
              <p className="text-accent text-xs font-bold tracking-wider mb-2">
                {item.dia}
              </p>
              {item.eventos.map((evento, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm mb-1 last:mb-0">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-foreground">{evento.nombre}</span>
                  <span className="text-muted-foreground">— {evento.hora}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
