"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ProgramaInfo {
  status: string
  nombre: string
  horario: string
  enVivo: boolean
}

const PROGRAMAS = [
  { 
    nombre: "Mañanas en Victoria", 
    dias: [1, 2, 3, 4, 5], 
    inicio: 7, 
    fin: 13, 
    horarioTxt: "Lunes a Viernes 07:00 a 13:00hs" 
  },
]

export function ProgramInfo() {
  const [info, setInfo] = useState<ProgramaInfo>({
    status: "",
    nombre: "",
    horario: "",
    enVivo: false,
  })

  useEffect(() => {
    checkProgramacion()
    const timer = setInterval(checkProgramacion, 30000)
    return () => clearInterval(timer)
  }, [])

  const checkProgramacion = () => {
    const ahora = new Date()
    const horaDecimal = ahora.getHours() + ahora.getMinutes() / 60
    const dia = ahora.getDay()

    const vivo = PROGRAMAS.find(
      (p) => p.dias.includes(dia) && horaDecimal >= p.inicio && horaDecimal < p.fin
    )

    if (vivo) {
      setInfo({
        status: "EN VIVO AHORA",
        nombre: vivo.nombre,
        horario: vivo.horarioTxt,
        enVivo: true,
      })
      return
    }

    // Find next program
    let proximoNombre = ""
    let proximoHorario = ""
    let menorDiferencia = Infinity

    for (const prog of PROGRAMAS) {
      for (const diaProg of prog.dias) {
        let diff = (diaProg - dia + 7) % 7
        if (diff === 0 && horaDecimal >= prog.fin) diff = 7
        const horasHastaInicio = diff * 24 + (prog.inicio - horaDecimal)
        if (horasHastaInicio > 0 && horasHastaInicio < menorDiferencia) {
          menorDiferencia = horasHastaInicio
          proximoNombre = prog.nombre
          proximoHorario = prog.horarioTxt
        }
      }
    }

    setInfo({
      status: "PRÓXIMO PROGRAMA",
      nombre: proximoNombre,
      horario: proximoHorario,
      enVivo: false,
    })
  }

  return (
    <div
      className={cn(
        "glass-card rounded-xl p-4 transition-all duration-300",
        info.enVivo && "border-primary bg-primary/5"
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        {info.enVivo && (
          <span className="w-2 h-2 rounded-full bg-red-500 animate-live-pulse" />
        )}
        <span
          className={cn(
            "text-xs font-bold tracking-wider",
            info.enVivo ? "text-primary" : "text-muted-foreground"
          )}
        >
          {info.status}
        </span>
      </div>
      <h3 className="text-lg font-bold text-foreground">{info.nombre}</h3>
      <p className="text-sm text-primary">{info.horario}</p>
    </div>
  )
}
