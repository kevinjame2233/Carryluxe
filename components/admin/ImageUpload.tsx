"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, FolderOpen } from "lucide-react"
import Image from "next/image"
import MediaLibrary from "./MediaLibrary"

interface ImageUploadProps {
  value?: string
  onChange: (value: string) => void
  label?: string
  accept?: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, label, accept = "image/*" }) => {
  const [isUploading, setIsUploading] = useState(false)
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      // Simulate image upload and get URL
      const imageUrl = await uploadImage(file)
      onChange(imageUrl)
    } catch (error) {
      console.error("Error uploading image:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const uploadImage = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const imageUrl = URL.createObjectURL(file)
        resolve(imageUrl)
      }, 1000)
    })
  }

  const clearImage = useCallback(() => {
    onChange("")
  }, [onChange])

  return (
    <div>
      {label && <Label>{label}</Label>}
      {value ? (
        <div className="relative w-32 h-32">
          <Image src={value || "/placeholder.svg"} alt="Uploaded Image" fill className="object-cover rounded-md" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={clearImage}
            className="absolute top-0 right-0 rounded-sm opacity-75"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <Input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            disabled={isUploading}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold-50 file:text-gold-700 hover:file:bg-gold-100"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsMediaLibraryOpen(true)}
            disabled={isUploading}
          >
            <FolderOpen className="h-4 w-4" />
          </Button>
          {value && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={clearImage}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
      <MediaLibrary
        isOpen={isMediaLibraryOpen}
        onClose={() => setIsMediaLibraryOpen(false)}
        onSelect={onChange}
        accept={accept}
      />
    </div>
  )
}

export default ImageUpload
