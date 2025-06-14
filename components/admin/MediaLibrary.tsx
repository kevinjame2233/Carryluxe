"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Search, Trash2, Copy } from "lucide-react"
import Image from "next/image"

interface MediaItem {
  id: string
  url: string
  filename: string
  type: string
  size: number
  uploadedAt: string
}

interface MediaLibraryProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (url: string) => void
  accept?: string
}

export default function MediaLibrary({ isOpen, onClose, onSelect, accept = "image/*" }: MediaLibraryProps) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    // Load media items from localStorage
    const saved = localStorage.getItem("carryluxe-media-library")
    if (saved) {
      try {
        setMediaItems(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to load media library", e)
      }
    }
  }, [])

  const saveMediaItems = (items: MediaItem[]) => {
    setMediaItems(items)
    localStorage.setItem("carryluxe-media-library", JSON.stringify(items))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setIsUploading(true)

    for (const file of Array.from(files)) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const newItem: MediaItem = {
          id: `media-${Date.now()}-${Math.random()}`,
          url: event.target?.result as string,
          filename: file.name,
          type: file.type,
          size: file.size,
          uploadedAt: new Date().toISOString(),
        }

        const updatedItems = [newItem, ...mediaItems]
        saveMediaItems(updatedItems)
      }
      reader.readAsDataURL(file)
    }

    setIsUploading(false)
    e.target.value = "" // Reset input
  }

  const deleteItem = (id: string) => {
    if (confirm("Are you sure you want to delete this media item?")) {
      const updatedItems = mediaItems.filter((item) => item.id !== id)
      saveMediaItems(updatedItems)
    }
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    alert("URL copied to clipboard!")
  }

  const filteredItems = mediaItems.filter((item) => item.filename.toLowerCase().includes(searchTerm.toLowerCase()))

  const isVideo = (type: string) => type.startsWith("video/")
  const isImage = (type: string) => type.startsWith("image/")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Media Library</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Upload Section */}
          <div className="border-2 border-dashed border-cream-300 rounded-lg p-6 text-center">
            <input
              type="file"
              multiple
              accept={accept}
              onChange={handleFileUpload}
              className="hidden"
              id="media-upload"
              disabled={isUploading}
            />
            <label htmlFor="media-upload" className="cursor-pointer">
              <Upload className="h-8 w-8 mx-auto mb-2 text-charcoal-600" />
              <p className="text-charcoal-800">{isUploading ? "Uploading..." : "Click to upload or drag and drop"}</p>
              <p className="text-sm text-charcoal-600">
                {accept.includes("video") ? "Videos and images" : "Images only"}
              </p>
            </label>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search media..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-h-96 overflow-y-auto">
            {filteredItems.map((item) => (
              <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-2">
                  <div className="relative aspect-square bg-cream-100 rounded overflow-hidden mb-2">
                    {isImage(item.type) ? (
                      <Image src={item.url || "/placeholder.svg"} alt={item.filename} fill className="object-cover" />
                    ) : isVideo(item.type) ? (
                      <video src={item.url} className="w-full h-full object-cover" muted />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Upload className="h-8 w-8 text-charcoal-400" />
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-charcoal-800 truncate mb-2">{item.filename}</p>

                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs"
                      onClick={() => {
                        onSelect(item.url)
                        onClose()
                      }}
                    >
                      Select
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => copyUrl(item.url)}>
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-charcoal-600">
              <p>No media items found</p>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
