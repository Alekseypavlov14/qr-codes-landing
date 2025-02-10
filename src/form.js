import { designCircles, designClassic, designLiquid, designLiquidOil, designOil, ERROR_CORRECTION_H, ERROR_CORRECTION_L, ERROR_CORRECTION_M, ERROR_CORRECTION_Q, Printer, QRCode } from '@oleksii-pavlov/qr-codes'

const defaultDarkColor = '#000'
const defaultLightColor = '#fff'
const defaultDesign = designClassic
const defaultErrorCorrection = ERROR_CORRECTION_M

const optionValueAttribute = 'data-value'
const chipActiveClass = 'chip--active'

const contentField = document.getElementById('demo-form-field-content')
const darkColorField = document.getElementById('demo-form-field-dark-color')
const lightColorField = document.getElementById('demo-form-field-light-color')

const darkColorIndicator = document.getElementById('demo-form-dark-color-indicator')
const lightColorIndicator = document.getElementById('demo-form-light-color-indicator')

const designField = document.getElementById('demo-form-field-design')
const designFieldOptions = Array.from(designField.querySelectorAll(`[${optionValueAttribute}]`))

const errorCorrectionField = document.getElementById('demo-form-field-error-correction')
const errorCorrectionFieldOptions = Array.from(errorCorrectionField.querySelectorAll(`[${optionValueAttribute}]`))

const qrCodeContainer = document.getElementById('demo-result-qr-code-container')

let designValue = defaultDesign
let errorCorrectionValue = defaultLightColor

const printer = new Printer({
  darkColor: defaultDarkColor,
  lightColor: defaultLightColor,
  design: defaultDesign,
  resolutionIncreaseCoefficient: 10
})

fillDarkIndicator()
fillLightIndicator()

contentField.addEventListener('change', updateQRCode)
darkColorField.addEventListener('change', updateQRCode)
darkColorField.addEventListener('change', fillDarkIndicator)
lightColorField.addEventListener('change', updateQRCode)
lightColorField.addEventListener('change', fillLightIndicator)

onEnter(contentField, updateQRCode)
onEnter(darkColorField, updateQRCode)
onEnter(darkColorField, fillDarkIndicator)
onEnter(lightColorField, updateQRCode)
onEnter(darkColorField, fillLightIndicator)

designFieldOptions.forEach(chip => {
  chip.addEventListener('click', () => {
    const value = chip.getAttribute(optionValueAttribute)
    designValue = getDesignOption(value)
    updateDesignChips(value)
    updateQRCode()
  })
})
errorCorrectionFieldOptions.forEach(chip => {
  chip.addEventListener('click', () => {
    const value = chip.getAttribute(optionValueAttribute)
    errorCorrectionValue = getErrorCorrectionOption(value)
    updateErrorCorrectionChips(value)
    updateQRCode()
  })
})

function updateQRCode() {
  const message = contentField.value
  const darkColor = darkColorField.value || defaultDarkColor
  const lightColor = lightColorField.value || defaultLightColor

  const qrCode = QRCode.create({
    message: message,
    minimalErrorCorrection: errorCorrectionValue
  })

  printer.setDarkColor(darkColor)
  printer.setLightColor(lightColor)
  printer.setDesign(designValue)

  qrCodeContainer.innerHTML = ''
  printer.print(qrCode)(qrCodeContainer)
}

function updateDesignChips(value) {
  const chips = Array.from(designField.querySelectorAll(`[${optionValueAttribute}]`))
  chips.forEach(chip => chip.classList.remove(chipActiveClass))

  const activeChip = chips.find(chip => {
    const optionValue = chip.getAttribute(optionValueAttribute)
    return value === optionValue
  })

  if (!activeChip) return

  activeChip.classList.add(chipActiveClass)
}
function updateErrorCorrectionChips(value) {
  const chips = Array.from(errorCorrectionField.querySelectorAll(`[${optionValueAttribute}]`))
  chips.forEach(chip => chip.classList.remove(chipActiveClass))

  const activeChip = chips.find(chip => {
    const optionValue = chip.getAttribute(optionValueAttribute)
    return value === optionValue
  })

  if (!activeChip) return

  activeChip.classList.add(chipActiveClass)
}
function fillDarkIndicator() {
  fillIndicator(darkColorIndicator, darkColorField.value || defaultDarkColor)
}
function fillLightIndicator() {
  fillIndicator(lightColorIndicator, lightColorField.value || defaultLightColor)
}
function fillIndicator(indicator, color) {
  indicator.style.backgroundColor = color
}

function getDesignOption(value) {
  return getOneOfOptions(
    [designClassic, designCircles, designLiquid, designLiquidOil, designOil],
    value,
    defaultDesign
  )
}
function getErrorCorrectionOption(value) {
  return getOneOfOptions(
    [ERROR_CORRECTION_L, ERROR_CORRECTION_M, ERROR_CORRECTION_Q, ERROR_CORRECTION_H],
    value,
    defaultErrorCorrection
  )
}
function getOneOfOptions(options, value, defaultOption) {
  const index = options.findIndex(option => option === value)
  if (index === -1) return defaultOption

  return options[index]
}

function onEnter(input, handler) {
  input.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return 
    handler(e)
  })
}
