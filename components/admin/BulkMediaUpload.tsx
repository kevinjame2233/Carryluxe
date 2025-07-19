"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Loader2, ImageIcon, Video, Upload, AlertCircle } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/components/providers/AuthProvider"

interface MediaItem {
  type: string
  url: string
  alt: string
}

interface BulkMediaUploadProps {
  value: MediaItem[]
  onChange: (value: MediaItem[]) => void
  label?: string
  maxItems?: number
}

export default function BulkMediaUpload({
  value = [],
  onChange,
  label = "Media Upload",
  maxItems = 10,
}: BulkMediaUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) return

    // Check if adding these files would exceed the limit
    if (value.length + files.length > maxItems) {
      setError(
        `Cannot upload ${files.length} files. Maximum ${maxItems} items allowed. Currently have ${value.length} items.`,
      )
      return
    }

    // Clear previous errors
    setError(null)
    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Check if user is authenticated
      if (!user || user.role !== "admin") {
        throw new Error("Admin authentication required")
      }

      // Get auth token
      let token = null
      if (typeof window !== "undefined") {
        token =
          localStorage.getItem("auth-token") ||
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("auth-token="))
            ?.split("=")[1]
      }

      const headers: HeadersInit = {}
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }

      const uploadedItems: MediaItem[] = []
      const totalFiles = files.length

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const formData = new FormData()
        formData.append("file", file)

        console.log(`Uploading file ${i + 1}/${totalFiles}:`, file.name)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
          headers,
          credentials: "include",
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `Upload failed for ${file.name}`)
        }

        const result = await response.json()
        const mediaType = file.type.startsWith("video/") ? "video" : "image"

        uploadedItems.push({
          type: mediaType,
          url: result.url,
          alt: file.name,
        })

        // Update progress
        setUploadProgress(Math.round(((i + 1) / totalFiles) * 100))
      }

      // Add uploaded items to existing value
      onChange([...value, ...uploadedItems])

      // Reset progress after a brief delay
      setTimeout(() => {
        setUploadProgress(0)
        setError(null)
      }, 1000)
    } catch (error) {
      console.error("Upload error:", error)
      setError(error.message || "Upload failed")
      setUploadProgress(0)
    } finally {
      setIsUploading(false)
      // Reset file input
      event.target.value = ""
    }
  }

  const removeItem = useCallback(
    (index: number) => {
      const newValue = [...value]
      newValue.splice(index, 1)
      onChange(newValue)
      setError(null)
    },
    [value, onChange],
  )

  const isVideo = (url: string) => {
    return (
      url.includes(".mp4") ||
      url.includes(".webm") ||
      url.includes(".mov") ||
      url.includes("video") ||
      url.includes(".avi")
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>
          {label} ({value.length}/{maxItems})
        </Label>
        {value.length < maxItems && (
          <div className="relative">
            <Input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileChange}
              disabled={isUploading}
              className="w-auto file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded">
                <div className="flex items-center gap-2 text-xs text-charcoal-800">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  {uploadProgress}%
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {isUploading && (
        <div className="w-full bg-cream-200 rounded-full h-2">
          <div
            className="bg-blue-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {value.map((media, index) => (
          <div key={index} className="relative">
            <div className="relative w-full h-32 bg-cream-100 rounded overflow-hidden">
              {media.type === "video" ? (
                <video src={media.url} className="w-full h-full object-cover" muted />
              ) : (
                <Image src={media.url || "/placeholder.svg"} alt={media.alt || "Media"} fill className="object-cover" />
              )}
              <div className="absolute top-2 left-2">
                <div className="bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                  {media.type === "video" ? (
                    <>
                      <Video className="h-3 w-3" />
                      Video
                    </>
                  ) : (
                    <>
                      <ImageIcon className="h-3 w-3" />
                      Image
                    </>
                  )}
                </div>
              </div>
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => removeItem(index)}
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}

        {value.length < maxItems && (
          <div className="w-full h-32 bg-cream-100 rounded border-2 border-dashed border-cream-300 flex items-center justify-center text-charcoal-800">
            <div className="text-center">
              <Upload className="h-6 w-6 mx-auto mb-2" />
              <p className="text-xs">Upload more</p>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-charcoal-600">
        Upload multiple images and videos. Max 50MB per video, 10MB per image.
      </p>
    </div>
  )
}
