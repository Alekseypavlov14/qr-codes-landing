import { Downloader, fileTypeJPEG, fileTypePNG, fileTypeWebp, fileTypeSVG, canvasEngine, svgEngine } from '@oleksii-pavlov/qr-codes'
import { printer, getQRCode } from './form'

const contentField = document.getElementById('demo-form-field-content')

const downloadSVGButton = document.getElementById('qr-code-download-svg')
const downloadPNGButton = document.getElementById('qr-code-download-png')
const downloadJPEGButton = document.getElementById('qr-code-download-jpeg')
const downloadWEBPButton = document.getElementById('qr-code-download-webp')

const defaultFileName = 'qr-code'

const downloader = new Downloader()

downloadSVGButton.addEventListener('click', () => {
  downloader.setFileType(fileTypeSVG)
  downloadFromSVG()
})
downloadPNGButton.addEventListener('click', () => {
  downloader.setFileType(fileTypePNG)
  downloadFromCanvas()
})
downloadJPEGButton.addEventListener('click', () => {
  downloader.setFileType(fileTypeJPEG)
  downloadFromCanvas()
})
downloadWEBPButton.addEventListener('click', () => {
  downloader.setFileType(fileTypeWebp)
  downloadFromCanvas()
})

function downloadFromCanvas() {
  const qrCode = getQRCode()

  printer.setOutput(canvasEngine)
  const element = printer.print(qrCode)

  const value = contentField.value || defaultFileName

  downloader.setFileName(prepareFileName(value))
  downloader.downloadFromCanvas(element)
}
function downloadFromSVG() {
  const qrCode = getQRCode()

  printer.setOutput(svgEngine)
  const element = printer.print(qrCode)

  const value = contentField.value || defaultFileName

  downloader.setFileName(prepareFileName(value))
  downloader.downloadFromSVG(element)
}

function prepareFileName(value) {
  const fileName = value
    .trim()
    .replace(/^https?:\/\//, '')
    .replace(/[\/\\:*?"<>|]/g, "-")

  return fileName
}
