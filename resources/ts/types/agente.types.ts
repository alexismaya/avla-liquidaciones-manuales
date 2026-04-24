export type RegimenFiscal = 'MORAL' | 'FISICA_EMPRESARIAL' | 'RESICO'
export type ZonaGeografica = 'FRONTERIZA' | 'RESTO_PAIS'
export type EstatusAgente = 'ACTIVO' | 'BLOQUEADO'

export interface RetencionesFiscales {
  iva: number
  retencionISR?: number
  retencionIVA?: number
}

export interface Agente {
  id: number
  nombre: string
  rfc: string
  estatus: EstatusAgente
  correos: string[]
  correoEnvio: string
  regimenFiscal: RegimenFiscal
  zonaGeografica: ZonaGeografica
  retenciones: RetencionesFiscales
  ejecutivoResponsable: string
}
