"use client"
import { useState, useEffect } from "react"
import { useAuth } from "@/components/providers/AuthProvider"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/AdminLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CloudImageUpload from "@/components/admin/CloudImageUpload"
import SaveButton from "@/components/admin/SaveButton"
import { Loader2, Plus, X, AlertCircle } from "lucide-react"

interface MediaItem {
  type: string
  url: string
  alt: string
}

interface HomepageSettings {
  heroTitle: string
  heroSubtitle: string
  heroMedia: MediaItem[]
  hermesTitle: string
  hermesDescription: string
  hermesImage: string
  lvTitle: string
  lvDescription: string
  lvImage: string
  featuresTitle: string
  featuresDescription: string
  aboutTitle: string
  aboutDescription: string
  aboutImage: string
}

const defaultSettings: HomepageSettings = {
  heroTitle: "Luxury Handbags Redefined",
  heroSubtitle: "Discover authentic Hermès and Louis Vuitton pieces, curated for the discerning collector.",
  heroMedia: [],
  hermesTitle: "Hermès Collection",
  hermesDescription: "Timeless elegance meets unparalleled craftsmanship in our curated Hermès selection.",
  hermesImage: "",
  lvTitle: "Louis Vuitton Collection",
  lvDescription: "Iconic designs and innovative luxury from the world's most prestigious fashion house.",
  lvImage: "",
  featuresTitle: "Why Choose CarryLuxe",
  featuresDescription:
    "Experience luxury shopping with authentication guarantee, worldwide shipping, and expert curation.",
  aboutTitle: "About CarryLuxe",
  aboutDescription:
    "We are passionate curators of luxury handbags, bringing you authenticated pieces from the world's most prestigious brands.",
  aboutImage: "",
}

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [settings, setSettings] = useState<HomepageSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== "admin") {
        router.push("/login")
        return
      }
      loadSettings()
    }
  }, [user, authLoading, router])

  const loadSettings = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/homepage-settings")

      if (response.ok) {
        const data = await response.json()
        setSettings({ ...defaultSettings, ...data })
      } else {
        console.log("No existing settings found, using defaults")
        setSettings(defaultSettings)
      }
    } catch (error) {
      console.error("Error loading settings:", error)
      setError("Failed to load settings")
      setSettings(defaultSettings)
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    try {
      setSaving(true)
      setError(null)
      setSuccess(null)

      // Validate required fields
      if (!settings.heroTitle.trim()) {
        throw new Error("Hero title is required")
      }
      if (!settings.heroSubtitle.trim()) {
        throw new Error("Hero subtitle is required")
      }

      const response = await fetch("/api/homepage-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save settings")
      }

      setSuccess("Settings saved successfully!")

      // Dispatch custom event to update homepage
      window.dispatchEvent(new CustomEvent("homepage-settings-updated", { detail: settings }))

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000)
    } catch (error) {
      console.error("Error saving settings:", error)
      setError(error.message || "Failed to save settings")
    } finally {
      setSaving(false)
    }
  }

  const addHeroMedia = () => {
    setSettings((prev) => ({
      ...prev,
      heroMedia: [...prev.heroMedia, { type: "image", url: "", alt: "" }],
    }))
  }

  const updateHeroMedia = (index: number, field: keyof MediaItem, value: string) => {
    setSettings((prev) => ({
      ...prev,
      heroMedia: prev.heroMedia.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }

  const removeHeroMedia = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      heroMedia: prev.heroMedia.filter((_, i) => i !== index),
    }))
  }

  if (authLoading || loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    )
  }

  if (!user || user.role !== "admin") {
    return null
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-charcoal-600">Manage your CarryLuxe website content</p>
          </div>
          <SaveButton onClick={saveSettings} loading={saving} />
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            <span>✅ {success}</span>
          </div>
        )}

        <Tabs defaultValue="homepage" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="homepage">Homepage</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="homepage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Main banner content and carousel media</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="heroTitle">Hero Title</Label>
                    <Input
                      id="heroTitle"
                      value={settings.heroTitle}
                      onChange={(e) => setSettings((prev) => ({ ...prev, heroTitle: e.target.value }))}
                      placeholder="Enter hero title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                    <Input
                      id="heroSubtitle"
                      value={settings.heroSubtitle}
                      onChange={(e) => setSettings((prev) => ({ ...prev, heroSubtitle: e.target.value }))}
                      placeholder="Enter hero subtitle"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Label>Hero Carousel Media ({settings.heroMedia.length}/10)</Label>
                    {settings.heroMedia.length < 10 && (
                      <Button onClick={addHeroMedia} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Media
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {settings.heroMedia.map((media, index) => (
                      <div key={index} className="relative border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Media {index + 1}</span>
                          <Button onClick={() => removeHeroMedia(index)} size="sm" variant="destructive">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <CloudImageUpload
                          value={media.url}
                          onChange={(url) => {
                            updateHeroMedia(index, "url", url)
                            // Auto-detect media type
                            const type =
                              url.includes("video") ||
                              url.includes(".mp4") ||
                              url.includes(".webm") ||
                              url.includes(".mov")
                                ? "video"
                                : "image"
                            updateHeroMedia(index, "type", type)
                          }}
                          type="both"
                          label="Upload Image or Video"
                        />

                        <div className="mt-2">
                          <Label htmlFor={`alt-${index}`}>Alt Text</Label>
                          <Input
                            id={`alt-${index}`}
                            value={media.alt}
                            onChange={(e) => updateHeroMedia(index, "alt", e.target.value)}
                            placeholder="Describe the media"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hermès Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="hermesTitle">Title</Label>
                    <Input
                      id="hermesTitle"
                      value={settings.hermesTitle}
                      onChange={(e) => setSettings((prev) => ({ ...prev, hermesTitle: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hermesDescription">Description</Label>
                    <Textarea
                      id="hermesDescription"
                      value={settings.hermesDescription}
                      onChange={(e) => setSettings((prev) => ({ ...prev, hermesDescription: e.target.value }))}
                    />
                  </div>
                  <CloudImageUpload
                    value={settings.hermesImage}
                    onChange={(url) => setSettings((prev) => ({ ...prev, hermesImage: url }))}
                    label="Hermès Image"
                    type="image"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Louis Vuitton Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="lvTitle">Title</Label>
                    <Input
                      id="lvTitle"
                      value={settings.lvTitle}
                      onChange={(e) => setSettings((prev) => ({ ...prev, lvTitle: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lvDescription">Description</Label>
                    <Textarea
                      id="lvDescription"
                      value={settings.lvDescription}
                      onChange={(e) => setSettings((prev) => ({ ...prev, lvDescription: e.target.value }))}
                    />
                  </div>
                  <CloudImageUpload
                    value={settings.lvImage}
                    onChange={(url) => setSettings((prev) => ({ ...prev, lvImage: url }))}
                    label="Louis Vuitton Image"
                    type="image"
                  />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Features Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="featuresTitle">Title</Label>
                    <Input
                      id="featuresTitle"
                      value={settings.featuresTitle}
                      onChange={(e) => setSettings((prev) => ({ ...prev, featuresTitle: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="featuresDescription">Description</Label>
                    <Textarea
                      id="featuresDescription"
                      value={settings.featuresDescription}
                      onChange={(e) => setSettings((prev) => ({ ...prev, featuresDescription: e.target.value }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>About Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="aboutTitle">Title</Label>
                    <Input
                      id="aboutTitle"
                      value={settings.aboutTitle}
                      onChange={(e) => setSettings((prev) => ({ ...prev, aboutTitle: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="aboutDescription">Description</Label>
                    <Textarea
                      id="aboutDescription"
                      value={settings.aboutDescription}
                      onChange={(e) => setSettings((prev) => ({ ...prev, aboutDescription: e.target.value }))}
                    />
                  </div>
                  <CloudImageUpload
                    value={settings.aboutImage}
                    onChange={(url) => setSettings((prev) => ({ ...prev, aboutImage: url }))}
                    label="About Image"
                    type="image"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Product Management</CardTitle>
                <CardDescription>Manage your product catalog</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-charcoal-600">Product management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Site Settings</CardTitle>
                <CardDescription>Configure global site settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-charcoal-600">Site settings features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
