"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Loader2, ImageIcon, Video } from "lucide-react"
import Image from "next/image"

interface CloudImageUploadProps {
  value?: string
  onChange: (value: string) => void
  label?: string
  accept?: string
  type?: "image" | "video" | "both"
}

export default function CloudImageUpload({
  value,
  onChange,
  label,
  accept = "image/*",
  type = "image",
}: CloudImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append("file", file)

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90))
      }, 100)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Upload failed")
      }

      const result = await response.json()
      onChange(result.url)

      // Reset progress after a brief delay
      setTimeout(() => setUploadProgress(0), 500)
    } catch (error) {
      console.error("Upload error:", error)
      alert(`Upload failed: ${error.message}`)
      setUploadProgress(0)
    } finally {
      setIsUploading(false)
      // Reset file input
      event.target.value = ""
    }
  }

  const clearImage = useCallback(() => {
    onChange("")
  }, [onChange])

  const isVideo = (url: string) => {
    return url.includes(".mp4") || url.includes(".webm") || url.includes(".mov") || url.includes("video")
  }

  const getAcceptString = () => {
    switch (type) {
      case "image":
        return "image/*"
      case "video":
        return "video/*"
      case "both":
        return "image/*,video/*"
      default:
        return accept
    }
  }

  return (
    <div className="space-y-3">
      {label && <Label>{label}</Label>}

      {value ? (
        <div className="relative">
          <div className="relative w-full h-32 bg-cream-100 rounded-lg overflow-hidden border">
            {isVideo(value) ? (
              <video src={value} className="w-full h-full object-cover" muted controls={false} />
            ) : (
              <Image src={value || "/placeholder.svg"} alt="Uploaded content" fill className="object-cover" />
            )}
            <div className="absolute top-2 left-2">
              <div className="bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                {isVideo(value) ? (
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
            onClick={clearImage}
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="relative">
            <Input
              type="file"
              accept={getAcceptString()}
              onChange={handleFileChange}
              disabled={isUploading}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold-50 file:text-gold-700 hover:file:bg-gold-100 disabled:opacity-50"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded">
                <div className="flex items-center gap-2 text-sm text-charcoal-800">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading... {uploadProgress}%
                </div>
              </div>
            )}
          </div>

          {isUploading && (
            <div className="w-full bg-cream-200 rounded-full h-2">
              <div
                className="bg-gold-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}

          <p className="text-xs text-charcoal-600">
            {type === "both"
              ? "Upload images (JPEG, PNG, WebP, GIF) or videos (MP4, WebM, MOV). Max 10MB."
              : type === "video"
                ? "Upload videos (MP4, WebM, MOV). Max 10MB."
                : "Upload images (JPEG, PNG, WebP, GIF). Max 10MB."}
          </p>
        </div>
      )}
    </div>
  )
}
