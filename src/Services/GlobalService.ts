export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const locale = 'en-US'

export function formatUsd(value: any, fractionDigits = 2) {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })

  return formatter.format(value)
}
