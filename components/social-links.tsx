"use client"

import { Facebook, Instagram, MapPin, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const SOCIAL_LINKS = [
  {
    name: "WhatsApp",
    icon: MessageCircle,
    url: "https://wa.me/5492477639867",
    color: "hover:bg-green-600/20 hover:border-green-500/50",
  },
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/estacion.victoria.777",
    color: "hover:bg-blue-600/20 hover:border-blue-500/50",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/siquemiglesia_pergamino/",
    color: "hover:bg-pink-600/20 hover:border-pink-500/50",
  },
  {
    name: "Ubicación",
    icon: MapPin,
    url: "https://maps.google.com/?q=-33.8910754,-60.5785407",
    color: "hover:bg-red-600/20 hover:border-red-500/50",
  },
]

export function SocialLinks() {
  return (
    <div className="flex justify-center gap-4">
      {SOCIAL_LINKS.map((link) => (
        <Button
          key={link.name}
          variant="outline"
          size="icon"
          className={`w-14 h-14 rounded-full glass-card border-primary/40 transition-all duration-300 ${link.color}`}
          onClick={() => window.open(link.url, "_blank")}
          title={link.name}
        >
          <link.icon className="w-6 h-6" />
        </Button>
      ))}
    </div>
  )
}
