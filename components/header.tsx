"use client"

import Image from "next/image"

export function Header() {
  return (
    <header className="text-center py-6 px-4">
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40">
          <Image
            src="/images/logo.png"
            alt="Estación Victoria FM 90.7"
            fill
            className="object-contain invert"
            priority
          />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Estación Victoria
          </h1>
          <p className="text-primary text-base font-medium">FM 90.7 MHz</p>
          <p className="text-muted-foreground text-xs mt-1">Siquem Iglesia Pergamino</p>
        </div>
      </div>
    </header>
  )
}
