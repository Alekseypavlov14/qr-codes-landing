import { Downloader, fileTypeJPEG, fileTypePNG, fileTypeWebp } from '@oleksii-pavlov/qr-codes'
import { fileTypeSVG } from '@oleksii-pavlov/qr-codes/build/downloaders/constants'

const contentField = document.getElementById('demo-form-field-content')

const downloadSVGButton = document.getElementById('qr-code-download-svg')
const downloadPNGButton = document.getElementById('qr-code-download-png')
const downloadJPEGButton = document.getElementById('qr-code-download-jpeg')
const downloadWEBPButton = document.getElementById('qr-code-download-webp')

const qrCodeCanvas = document.getElementById('qr-code-canvas')
const qrCodeSVG = document.getElementById('qr-code-svg')

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
  const canvas = qrCodeCanvas.querySelector('canvas')
  if (!canvas) return

  const value = contentField.value || defaultFileName

  downloader.setFileName(prepareFileName(value))
  downloader.downloadFromCanvas(canvas)
}
function downloadFromSVG() {
  const svg = qrCodeSVG.querySelector('svg')
  if (!svg) return

  const value = contentField.value || defaultFileName

  downloader.setFileName(prepareFileName(value))
  downloader.downloadFromSVG(svg)
}

function prepareFileName(value) {
  const fileName = value
    .trim()
    .replace(/^https?:\/\//, '')
    .replace(/[\/\\:*?"<>|]/g, "-")

  return fileName
}
