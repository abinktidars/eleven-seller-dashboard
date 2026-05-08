import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import {
  Settings,
  Store,
  MapPin,
  Phone,
  Mail,
  Globe,
  Camera,
  Pencil,
  X,
  Check,
  Clock,
} from "lucide-react";

interface StoreInfo {
  storeName: string;
  description: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  email: string;
  website: string;
  operationalHours: string;
  logo: string | null;
}

interface NotificationSettings {
  emailNewOrder: boolean;
  smsPayment: boolean;
  pushNotification: boolean;
  emailLowStock: boolean;
  emailPromotion: boolean;
}

const defaultStoreInfo: StoreInfo = {
  storeName: "Toko Ahmad Electronics",
  description: "Toko elektronik terpercaya dengan produk berkualitas tinggi dan harga terbaik.",
  address: "Jl. Sudirman No. 123",
  city: "Jakarta Pusat",
  province: "DKI Jakarta",
  postalCode: "10220",
  phone: "+62 812-3456-7890",
  email: "toko.ahmad@email.com",
  website: "www.tokoahmad.com",
  operationalHours: "Senin - Sabtu, 08:00 - 20:00",
  logo: null,
};

const defaultNotifications: NotificationSettings = {
  emailNewOrder: true,
  smsPayment: true,
  pushNotification: true,
  emailLowStock: false,
  emailPromotion: false,
};

export function SettingsPage() {
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(defaultStoreInfo);
  const [formData, setFormData] = useState<StoreInfo>(defaultStoreInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState<NotificationSettings>(defaultNotifications);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditStart = () => {
    setFormData({ ...storeInfo });
    setIsEditing(true);
    setSaveSuccess(false);
  };

  const handleCancel = () => {
    setFormData({ ...storeInfo });
    setIsEditing(false);
  };

  const handleSave = () => {
    setStoreInfo({ ...formData });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleChange = (field: keyof StoreInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData((prev) => ({ ...prev, logo: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pengaturan Toko</h1>
          <p className="text-muted-foreground">
            Kelola informasi toko dan preferensi notifikasi Anda
          </p>
        </div>
        {saveSuccess && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium">Perubahan berhasil disimpan</span>
          </div>
        )}
      </div>

      {/* Informasi Toko */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Informasi Toko
            </CardTitle>
            {!isEditing ? (
              <Button size="sm" onClick={handleEditStart} className="flex items-center gap-2">
                <Pencil className="w-4 h-4" />
                Edit Profil
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={handleCancel} className="flex items-center gap-2">
                  <X className="w-4 h-4" />
                  Batal
                </Button>
                <Button size="sm" onClick={handleSave} className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Simpan
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo Toko */}
          <div className="flex items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted flex items-center justify-center overflow-hidden">
                {(isEditing ? formData.logo : storeInfo.logo) ? (
                  <img
                    src={(isEditing ? formData.logo : storeInfo.logo) as string}
                    alt="Logo Toko"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Store className="w-10 h-10 text-muted-foreground/50" />
                )}
              </div>
              {isEditing && (
                <>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                </>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Logo Toko</p>
              {isEditing ? (
                <p className="text-xs text-muted-foreground mt-1">
                  Klik ikon kamera untuk upload logo. Format: JPG, PNG. Maks 2MB.
                </p>
              ) : (
                <p className="text-xs text-muted-foreground mt-1">
                  Logo toko yang ditampilkan kepada pembeli
                </p>
              )}
            </div>
          </div>

          <Separator />

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nama Toko */}
            <div className="md:col-span-2 space-y-1.5">
              <Label className="flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5" />
                Nama Toko
              </Label>
              {isEditing ? (
                <Input
                  value={formData.storeName}
                  onChange={(e) => handleChange("storeName", e.target.value)}
                  placeholder="Masukkan nama toko"
                />
              ) : (
                <p className="text-sm text-muted-foreground py-2">{storeInfo.storeName}</p>
              )}
            </div>

            {/* Deskripsi */}
            <div className="md:col-span-2 space-y-1.5">
              <Label>Deskripsi Toko</Label>
              {isEditing ? (
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Ceritakan tentang toko Anda..."
                  rows={3}
                />
              ) : (
                <p className="text-sm text-muted-foreground py-2">{storeInfo.description}</p>
              )}
            </div>

            {/* Alamat */}
            <div className="md:col-span-2 space-y-1.5">
              <Label className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Alamat
              </Label>
              {isEditing ? (
                <Input
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Jalan, nomor, RT/RW"
                />
              ) : (
                <p className="text-sm text-muted-foreground py-2">{storeInfo.address}</p>
              )}
            </div>

            {/* Kota */}
            <div className="space-y-1.5">
              <Label>Kota</Label>
              {isEditing ? (
                <Input
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  placeholder="Nama kota"
                />
              ) : (
                <p className="text-sm text-muted-foreground py-2">{storeInfo.city}</p>
              )}
            </div>

            {/* Provinsi */}
            <div className="space-y-1.5">
              <Label>Provinsi</Label>
              {isEditing ? (
                <Input
                  value={formData.province}
                  onChange={(e) => handleChange("province", e.target.value)}
                  placeholder="Nama provinsi"
                />
              ) : (
                <p className="text-sm text-muted-foreground py-2">{storeInfo.province}</p>
              )}
            </div>

            {/* Kode Pos */}
            <div className="space-y-1.5">
              <Label>Kode Pos</Label>
              {isEditing ? (
                <Input
                  value={formData.postalCode}
                  onChange={(e) => handleChange("postalCode", e.target.value)}
                  placeholder="Kode pos"
                  maxLength={5}
                />
              ) : (
                <p className="text-sm text-muted-foreground py-2">{storeInfo.postalCode}</p>
              )}
            </div>

            {/* No. Telepon */}
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                No. Telepon
              </Label>
              {isEditing ? (
                <Input
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+62 8xx-xxxx-xxxx"
                  type="tel"
                />
              ) : (
                <p className="text-sm text-muted-foreground py-2">{storeInfo.phone}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                Email Toko
              </Label>
              {isEditing ? (
                <Input
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="email@toko.com"
                  type="email"
                />
              ) : (
                <p className="text-sm text-muted-foreground py-2">{storeInfo.email}</p>
              )}
            </div>

            {/* Website */}
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                Website
              </Label>
              {isEditing ? (
                <Input
                  value={formData.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                  placeholder="www.tokosaya.com"
                />
              ) : (
                <p className="text-sm text-muted-foreground py-2">{storeInfo.website}</p>
              )}
            </div>

            {/* Jam Operasional */}
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Jam Operasional
              </Label>
              {isEditing ? (
                <Input
                  value={formData.operationalHours}
                  onChange={(e) => handleChange("operationalHours", e.target.value)}
                  placeholder="Mis: Senin - Jumat, 09:00 - 18:00"
                />
              ) : (
                <p className="text-sm text-muted-foreground py-2">{storeInfo.operationalHours}</p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-2 pt-2 border-t">
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Batal
              </Button>
              <Button onClick={handleSave}>
                <Check className="w-4 h-4 mr-2" />
                Simpan Perubahan
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pengaturan Notifikasi */}
      <Card>
        <CardHeader>
          <CardTitle>Pengaturan Notifikasi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: "emailNewOrder" as const, label: "Email Pesanan Baru", desc: "Terima notifikasi email saat ada pesanan masuk" },
            { key: "smsPayment" as const, label: "SMS Alert Pembayaran", desc: "Terima SMS saat pembayaran berhasil" },
            { key: "pushNotification" as const, label: "Push Notifikasi", desc: "Notifikasi langsung di browser atau aplikasi" },
            { key: "emailLowStock" as const, label: "Email Stok Rendah", desc: "Peringatan email saat stok produk hampir habis" },
            { key: "emailPromotion" as const, label: "Info Promosi & Promo", desc: "Update promosi dan program seller terbaru" },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between py-2">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={notifications[key] ? "default" : "secondary"}>
                  {notifications[key] ? "Aktif" : "Nonaktif"}
                </Badge>
                <Switch
                  checked={notifications[key]}
                  onCheckedChange={() => handleNotificationChange(key)}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
