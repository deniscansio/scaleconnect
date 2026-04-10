'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CandidatoPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirecionar para a Jornada de Sucesso como página inicial
    router.push('/candidato/jornada-sucesso')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">🚀</div>
        <p className="text-xl text-gray-600">Redirecionando para sua Jornada de Sucesso...</p>
      </div>
    </div>
  )
}
