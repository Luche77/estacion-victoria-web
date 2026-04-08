"use client"

export function Footer() {
  return (
    <footer className="text-center py-10 px-4 mt-8">
      <div className="w-24 h-px bg-primary/30 mx-auto mb-6" />
      
      <h2 className="text-xl font-bold text-foreground mb-1">
        Siquem Iglesia Pergamino
      </h2>
      <p className="text-primary font-medium mb-3">
        Lugar de Refugio
      </p>
      <p className="text-muted-foreground text-sm">
        Av. de Mayo 1168
      </p>
      
      <div className="w-24 h-px bg-primary/30 mx-auto mt-6" />
      
      <p className="text-muted-foreground text-xs mt-6">
        © {new Date().getFullYear()} Estación Victoria FM 90.7
      </p>
    </footer>
  )
}
