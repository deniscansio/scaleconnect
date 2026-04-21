import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    activeCompanies: 10,
    totalCompanies: 20,
    activeCandidates: 50,
    totalCandidates: 100,
    activePartners: 5,
    totalPartners: 10,
    monthlyRevenue: 'R$ 5.000',
    totalRevenue: 'R$ 50.000',
  })
}
