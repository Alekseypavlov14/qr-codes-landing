import { Downloader, fileTypeJPEG, fileTypePNG } from '@oleksii-pavlov/qr-codes'

const contentField = document.getElementById('demo-form-field-content')

const downloadPNGButton = document.getElementById('qr-code-download-png')
const downloadJPEGButton = document.getElementById('qr-code-download-jpeg')

const qrCodeContainer = document.getElementById('demo-result-qr-code-container')

const defaultFileName = 'qr-code'

const downloader = new Downloader()

downloadPNGButton.addEventListener('click', () => {
  downloader.setFileType(fileTypePNG)
  download()
})
downloadJPEGButton.addEventListener('click', () => {
  downloader.setFileType(fileTypeJPEG)
  download()
})

function download() {
  const canvas = qrCodeContainer.querySelector('canvas')
  if (!canvas) return

  const value = contentField.value || defaultFileName

  downloader.setFileName(prepareFileName(value))
  downloader.download(canvas)
}

function prepareFileName(value) {
  const fileName = value
    .trim()
    .replace(/^https?:\/\//, '')
    .replace(/[\/\\:*?"<>|]/g, "-")

  return fileName
}
