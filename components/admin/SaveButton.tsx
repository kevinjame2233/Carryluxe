"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Save, Check } from "lucide-react"

interface SaveButtonProps {
  onSave: () => void | Promise<void>
  disabled?: boolean
  children?: React.ReactNode
  className?: string
  variant?: "default" | "outline" | "destructive" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export default function SaveButton({
  onSave,
  disabled = false,
  children = "Save Changes",
  className = "",
  variant = "default",
  size = "default",
}: SaveButtonProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave()
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      console.error("Save failed:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Button
      onClick={handleSave}
      disabled={disabled || isSaving}
      variant={saved ? "outline" : variant}
      size={size}
      className={`${className} ${saved ? "border-green-500 text-green-600" : ""}`}
    >
      {isSaving ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-current mr-2" />
          Saving...
        </>
      ) : saved ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Saved!
        </>
      ) : (
        <>
          <Save className="h-4 w-4 mr-2" />
          {children}
        </>
      )}
    </Button>
  )
}
