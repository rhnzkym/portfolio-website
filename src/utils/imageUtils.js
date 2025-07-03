// Utility functions for image handling

export const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export const validateImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  const maxSize = 5 * 1024 * 1024 // 5MB

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Please select a valid image file (JPEG, PNG, or WebP)'
    }
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Image size must be less than 5MB'
    }
  }

  return { valid: true }
}

export const resizeImage = (file, maxWidth = 800, maxHeight = 600, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }
      }

      canvas.width = width
      canvas.height = height

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height)
      canvas.toBlob(resolve, 'image/jpeg', quality)
    }

    img.src = URL.createObjectURL(file)
  })
}

export const generateImageId = () => {
  return `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export const deleteImageFromStorage = (imageId) => {
  // Remove from localStorage if needed
  const images = JSON.parse(localStorage.getItem('portfolioImages') || '{}')
  delete images[imageId]
  localStorage.setItem('portfolioImages', JSON.stringify(images))
}

export const saveImageToStorage = async (file, imageId = null) => {
  try {
    const id = imageId || generateImageId()
    
    // Validate file
    const validation = validateImageFile(file)
    if (!validation.valid) {
      throw new Error(validation.error)
    }

    // Resize image for better performance
    const resizedFile = await resizeImage(file)
    
    // Convert to base64
    const base64 = await convertFileToBase64(resizedFile)
    
    // Save to localStorage
    const images = JSON.parse(localStorage.getItem('portfolioImages') || '{}')
    images[id] = {
      id,
      data: base64,
      name: file.name,
      size: resizedFile.size,
      type: resizedFile.type,
      uploadedAt: new Date().toISOString()
    }
    localStorage.setItem('portfolioImages', JSON.stringify(images))
    
    return { success: true, imageId: id, imageData: base64 }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const getImageFromStorage = (imageId) => {
  const images = JSON.parse(localStorage.getItem('portfolioImages') || '{}')
  return images[imageId] || null
}

export const getAllImagesFromStorage = () => {
  return JSON.parse(localStorage.getItem('portfolioImages') || '{}')
}
