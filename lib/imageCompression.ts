// Compress image to reduce localStorage usage
export const compressImage = (file: File, maxSizeKB: number = 500): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target?.result as string

      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        // Calculate max dimensions to stay under size limit
        const maxDimension = 1200 // Max width/height
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = (height / width) * maxDimension
            width = maxDimension
          } else {
            width = (width / height) * maxDimension
            height = maxDimension
          }
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Could not get canvas context'))
          return
        }

        ctx.drawImage(img, 0, 0, width, height)

        // Try different quality levels to stay under size limit
        let quality = 0.8
        let dataUrl = canvas.toDataURL('image/jpeg', quality)

        // Estimate size (base64 is ~4/3 of actual size)
        const estimatedSizeKB = (dataUrl.length * 3) / 4 / 1024

        if (estimatedSizeKB > maxSizeKB && quality > 0.1) {
          quality = Math.max(0.1, quality - 0.1)
          dataUrl = canvas.toDataURL('image/jpeg', quality)
        }

        resolve(dataUrl)
      }

      img.onerror = () => {
        reject(new Error('Failed to load image'))
      }
    }

    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }

    reader.readAsDataURL(file)
  })
}
