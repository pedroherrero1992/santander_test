export interface Vehicles {
    types: Type[]
    years: Year[]
  }
  
  export interface Type {
    id: number
    description: string
    brands: Brand[]
  }
  
  export interface Brand {
    id: number
    description: string
    models: Model[]
  }
  
  export interface Model {
    id: number
    description: string
    integrationCode: string
  }
  
  export interface Year {
    id: number
    description: string
  }

  export interface RatesI {
    riskEvaluation: RiskEvaluation
    rates: Rates
  }
  
  export interface RiskEvaluation {
    solicitudeNumber: string
    riskEvaluationResultDTO: RiskEvaluationResultDto
  }
  
  export interface RiskEvaluationResultDto {
    statusCode: string
    enableImprovement: string
    repairable: string
    minInstallment: number
    minAmount: number
    finalInstallment: number
    finalAmount: number
    finalInstallmentValue: number
    ltv: number
    finalAlternativeAmount: number
    maxVehicleAmount: number
    minInstallmentUVA: number
    minAmountUVA: number
    finalInstallmentUVA: number
    finalAmountUVA: number
    finalInstallmentValueUVA: number
    ltvUVA: number
    finalAlternativeAmountUVA: number
    maxVehicleAmountUVA: number
    allowsBetterOffer: boolean
    allowsBetterOfferUva: boolean
    applyPricing: boolean
    applyPricingUVA: boolean
    pending: boolean
    submitted: boolean
    approved: boolean
    rejected: boolean
  }
  
  export interface Rates {
    pureEstimatedInstallmentValue: number
    pureEstimatedInstallmentValueWithIva: number
    pureEstimatedInstallmentValueInUVA: number
    capitalInUVAs: number
    tea: number
    cftea: number
    tna: number
    uvaCurrentValue: number
    terms: number[]
  }
  