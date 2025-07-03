import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react'
import { saveImageToStorage, validateImageFile } from '../../utils/imageUtils'

const ImageUpload = ({ 
  value, 
  onChange, 
  multiple = false, 
  maxFiles = 5,
  label = "Upload Image",
  className = "" 
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleFileSelect = async (files) => {
    setError('')
    setIsUploading(true)

    try {
      const fileArray = Array.from(files)
      
      if (!multiple && fileArray.length > 1) {
        setError('Please select only one image')
        setIsUploading(false)
        return
      }

      if (multiple && fileArray.length > maxFiles) {
        setError(`Please select maximum ${maxFiles} images`)
        setIsUploading(false)
        return
      }

      const uploadPromises = fileArray.map(async (file) => {
        const validation = validateImageFile(file)
        if (!validation.valid) {
          throw new Error(validation.error)
        }

        const result = await saveImageToStorage(file)
        if (!result.success) {
          throw new Error(result.error)
        }

        return {
          id: result.imageId,
          data: result.imageData,
          name: file.name
        }
      })

      const uploadedImages = await Promise.all(uploadPromises)

      if (multiple) {
        const currentImages = Array.isArray(value) ? value : []
        onChange([...currentImages, ...uploadedImages])
      } else {
        onChange(uploadedImages[0])
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleFileInputChange = (e) => {
    const files = e.target.files
    if (files.length > 0) {
      handleFileSelect(files)
    }
  }

  const removeImage = (indexOrId) => {
    if (multiple) {
      const currentImages = Array.isArray(value) ? value : []
      const newImages = currentImages.filter((_, index) => index !== indexOrId)
      onChange(newImages)
    } else {
      onChange(null)
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  const renderImagePreview = (image, index) => (
    <motion.div
      key={image.id || index}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="relative group"
    >
      <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600">
        <img
          src={image.data}
          alt={image.name}
          className="w-full h-full object-cover"
        />
      </div>
      <motion.button
        type="button"
        onClick={() => removeImage(multiple ? index : null)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X size={12} />
      </motion.button>
    </motion.div>
  )

  const currentImages = multiple ? (Array.isArray(value) ? value : []) : (value ? [value] : [])

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
        className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileInputChange}
          className="hidden"
        />

        {isUploading ? (
          <div className="flex flex-col items-center space-y-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <Upload className="w-8 h-8 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG, WebP up to 5MB {multiple && `(max ${maxFiles} files)`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <AlertCircle className="text-red-600 dark:text-red-400" size={16} />
            <span className="text-red-700 dark:text-red-300 text-sm">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Previews */}
      {currentImages.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {multiple ? `Selected Images (${currentImages.length})` : 'Selected Image'}
          </p>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            <AnimatePresence>
              {currentImages.map((image, index) => renderImagePreview(image, index))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageUpload
