"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Loader2, ImageIcon, Video, AlertCircle } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/components/providers/AuthProvider"

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
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Clear previous errors
    setError(null)
    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Check if user is authenticated
      if (!user || user.role !== "admin") {
        throw new Error("Admin authentication required")
      }

      const formData = new FormData()
      formData.append("file", file)

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90))
      }, 200)

      // Get auth token from localStorage or cookie
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

      console.log("Uploading file:", file.name, "Size:", file.size, "Type:", file.type)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        headers,
        credentials: "include", // Include cookies
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Upload failed with status ${response.status}`)
      }

      const result = await response.json()
      console.log("Upload successful:", result.url)

      onChange(result.url)

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

  const clearImage = useCallback(() => {
    onChange("")
    setError(null)
  }, [onChange])

  const isVideo = (url: string) => {
    return (
      url.includes(".mp4") ||
      url.includes(".webm") ||
      url.includes(".mov") ||
      url.includes("video") ||
      url.includes(".avi")
    )
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

  const getFileTypeText = () => {
    switch (type) {
      case "image":
        return "Upload images (JPEG, PNG, WebP, GIF). Max 10MB."
      case "video":
        return "Upload videos (MP4, WebM, MOV, AVI). Max 50MB."
      case "both":
        return "Upload images (JPEG, PNG, WebP, GIF) or videos (MP4, WebM, MOV, AVI). Max 10MB for images, 50MB for videos."
      default:
        return "Upload files. Max 10MB."
    }
  }

  return (
    <div className="space-y-3">
      {label && <Label>{label}</Label>}

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

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

          <p className="text-xs text-charcoal-600">{getFileTypeText()}</p>
        </div>
      )}
    </div>
  )
}
