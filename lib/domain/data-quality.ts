export type DataQualityFlag = {
  code: string
  message: string
  severity: 'info' | 'warning'
}

// Known discrepancies between the two source documents
// (Renata-style CSV vs Hernán's PDF "Valoraciones a 27-04-2026").
// The PDF is treated as authoritative for activos comprados; flags surface in UI
// so an operator can reconcile with Simón / Renata before persisting.
export const DATA_QUALITY_FLAGS = {
  addressMismatchSanBorjaBonet: {
    code: 'address_mismatch',
    severity: 'warning',
    message: 'CSV indica "Calle San Borja 5"; PDF de Hernán indica "Calle San Bonet 5". Se usa el dato del PDF.',
  },
  addressMismatchGabrielCabriel: {
    code: 'address_mismatch',
    severity: 'warning',
    message: 'CSV indica "Calle Gabriel 29"; PDF de Hernán indica "Calle Cabriel 29". Se usa el dato del PDF.',
  },
  localityMismatchPerdiz: {
    code: 'locality_mismatch',
    severity: 'warning',
    message: 'CSV indica Madrid; PDF y referencia catastral confirman Castellón (Onda). Se usa Castellón. Considerar renombrar el ID F2-MAD5-5.',
  },
  addressMismatchTabillanTaibilla: {
    code: 'address_mismatch',
    severity: 'warning',
    message: 'CSV indica "Calle Tabillan 3"; PDF de Hernán indica "Calle Taibilla 3". Se usa el dato del PDF.',
  },
  statusConflictMariaAuxiliadora: {
    code: 'status_conflict',
    severity: 'warning',
    message: 'CSV marca como "Pendiente de compra" (94.021€); PDF de Hernán la lista como activo comprado (100.000€). Se asume comprada.',
  },
  statusConflictAvenidaAmerica: {
    code: 'status_conflict',
    severity: 'warning',
    message: 'CSV marca como "Pendiente de compra"; PDF de Hernán la lista como activo comprado (42.312€). Se asume comprada.',
  },
} as const satisfies Record<string, DataQualityFlag>
