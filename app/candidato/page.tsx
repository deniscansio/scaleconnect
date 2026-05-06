import { redirect } from 'next/navigation'

export default function CandidatoPage() {
  // Redirecionamento no servidor é mais rápido e evita loops no navegador
  redirect('/candidato/jornada-sucesso')
}
