"use client"

import { useState } from "react"
import { Send, Heart, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const WHATSAPP_NUMBER = "5492477639867"

export function PrayerForm() {
  const [nombre, setNombre] = useState("")
  const [telefono, setTelefono] = useState("")
  const [pedido, setPedido] = useState("")
  const [enviado, setEnviado] = useState(false)

  const enviarPedido = () => {
    if (!nombre || !pedido) {
      alert("Por favor completá tu nombre y el pedido de oración.")
      return
    }

    const mensaje = `*Nuevo Pedido de Oración*\n\n*Nombre:* ${nombre}\n*Teléfono:* ${telefono || "No proporcionado"}\n*Pedido:* ${pedido}`
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`
    
    window.open(url, "_blank")
    
    setEnviado(true)
    setTimeout(() => {
      setNombre("")
      setTelefono("")
      setPedido("")
      setEnviado(false)
    }, 3000)
  }

  if (enviado) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Gracias por tu confianza</h3>
        <p className="text-muted-foreground">
          Tu pedido fue enviado. Estaremos orando por vos.
        </p>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
          <Heart className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Oramos por vos</h3>
          <p className="text-sm text-muted-foreground">Tu pedido se enviará por WhatsApp</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Nombre y Apellido *"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="bg-input border-border text-foreground placeholder:text-muted-foreground pl-11"
          />
        </div>
        
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Teléfono (opcional)"
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="bg-input border-border text-foreground placeholder:text-muted-foreground pl-11"
          />
        </div>
        
        <div>
          <Textarea
            placeholder="Contanos cómo podemos orar por vos... *"
            value={pedido}
            onChange={(e) => setPedido(e.target.value)}
            rows={5}
            className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none"
          />
        </div>
        
        <Button
          onClick={enviarPedido}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-6"
          disabled={!nombre || !pedido}
        >
          <Send className="w-5 h-5 mr-2" />
          Enviar Pedido de Oración
        </Button>
      </div>
    </div>
  )
}
