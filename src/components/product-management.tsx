import { useState, useRef } from 'react'
import * as XLSX from 'xlsx'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Separator } from "./ui/separator"
import {
  Plus, Search, Edit, Trash2, Eye, Package, AlertTriangle,
  FileSpreadsheet, X, Check, Camera
} from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  status: string
  image: string
  sku: string
  weight?: number
  description?: string
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'iPhone 14 Pro Max',
    category: 'Electronics',
    price: 15999000,
    stock: 25,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop',
    sku: 'IPH14PM-256-SG',
    weight: 240,
    description: 'Smartphone flagship Apple dengan chip A16 Bionic, kamera 48MP, layar Super Retina XDR 6.7 inci.',
  },
  {
    id: 2,
    name: 'Samsung Galaxy S23 Ultra',
    category: 'Electronics',
    price: 18999000,
    stock: 15,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1610792516307-ea5aabac2b31?w=200&h=200&fit=crop',
    sku: 'SGS23U-512-BK',
    weight: 234,
    description: 'Flagship Samsung dengan S Pen terintegrasi, kamera 200MP, dan baterai 5000mAh.',
  },
  {
    id: 3,
    name: 'MacBook Air M2',
    category: 'Electronics',
    price: 18999000,
    stock: 8,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200&h=200&fit=crop',
    sku: 'MBA-M2-256-SG',
    weight: 1240,
    description: 'Laptop tipis Apple dengan chip M2, layar Liquid Retina 13.6 inci, dan ketahanan baterai hingga 18 jam.',
  },
  {
    id: 4,
    name: 'Nike Air Jordan 1',
    category: 'Fashion',
    price: 2499000,
    stock: 3,
    status: 'low_stock',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=200&h=200&fit=crop',
    sku: 'NAJ1-42-RED',
    weight: 500,
    description: 'Sepatu basket ikonik Nike dengan desain retro klasik.',
  },
  {
    id: 5,
    name: 'Adidas Ultraboost 22',
    category: 'Fashion',
    price: 2899000,
    stock: 0,
    status: 'out_of_stock',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
    sku: 'AUB22-43-WHT',
    weight: 350,
    description: 'Sepatu lari premium dengan teknologi Boost untuk kenyamanan maksimal.',
  },
]

const CATEGORIES = ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Other']

const emptyForm: Omit<Product, 'id'> = {
  name: '',
  category: '',
  price: 0,
  stock: 0,
  status: 'active',
  image: '',
  sku: '',
  weight: 0,
  description: '',
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

function deriveStatus(stock: number): string {
  if (stock === 0) return 'out_of_stock'
  if (stock <= 5) return 'low_stock'
  return 'active'
}

function StatusBadge({ stock }: { stock: number }) {
  if (stock === 0)
    return (
      <Badge variant="destructive" className="flex items-center gap-1">
        <AlertTriangle className="w-3 h-3" />
        Habis
      </Badge>
    )
  if (stock <= 5)
    return (
      <Badge variant="outline" className="flex items-center gap-1 text-orange-600 border-orange-600">
        <AlertTriangle className="w-3 h-3" />
        Stok Rendah
      </Badge>
    )
  return <Badge variant="secondary">Aktif</Badge>
}

// ─── View Dialog ────────────────────────────────────────────────────────────
function ViewProductDialog({
  product,
  open,
  onClose,
}: {
  product: Product | null
  open: boolean
  onClose: () => void
}) {
  if (!product) return null
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Detail Produk</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-4">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-24 h-24 rounded-xl object-cover border"
            />
            <div className="flex-1 space-y-1">
              <p className="font-semibold text-lg leading-tight">{product.name}</p>
              <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
              <StatusBadge stock={product.stock} />
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">Kategori</p>
              <p className="font-medium">{product.category}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Harga</p>
              <p className="font-medium">{formatPrice(product.price)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Stok</p>
              <p className={`font-medium ${product.stock === 0 ? 'text-red-600' : product.stock <= 5 ? 'text-orange-600' : ''}`}>
                {product.stock} unit
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Berat</p>
              <p className="font-medium">{product.weight ?? '-'} gram</p>
            </div>
          </div>
          {product.description && (
            <>
              <Separator />
              <div className="text-sm">
                <p className="text-muted-foreground mb-1">Deskripsi</p>
                <p>{product.description}</p>
              </div>
            </>
          )}
        </div>
        <div className="flex justify-end pt-2">
          <Button variant="outline" onClick={onClose}>Tutup</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Add / Edit Dialog ───────────────────────────────────────────────────────
function ProductFormDialog({
  mode,
  initialData,
  open,
  onClose,
  onSave,
}: {
  mode: 'add' | 'edit'
  initialData: Omit<Product, 'id'>
  open: boolean
  onClose: () => void
  onSave: (data: Omit<Product, 'id'>) => void
}) {
  const [form, setForm] = useState<Omit<Product, 'id'>>(initialData)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // sync when dialog opens with fresh data
  useState(() => { setForm(initialData) })

  const set = (field: keyof Omit<Product, 'id'>, value: string | number) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => set('image', reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    if (!form.name.trim() || !form.sku.trim() || !form.category) return
    onSave({ ...form, status: deriveStatus(Number(form.stock)) })
    onClose()
  }

  // reset form on open
  const handleOpenChange = (o: boolean) => {
    if (o) setForm(initialData)
    else onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Tambah Produk Baru' : 'Edit Produk'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          {/* Image */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted flex items-center justify-center overflow-hidden">
                {form.image ? (
                  <img src={form.image} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <Package className="w-8 h-8 text-muted-foreground/40" />
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow hover:bg-primary/90 transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Foto Produk</p>
              <p className="text-xs text-muted-foreground">Klik ikon kamera untuk upload. JPG/PNG, maks 2MB.</p>
              {form.image && (
                <button
                  type="button"
                  onClick={() => set('image', '')}
                  className="text-xs text-red-500 flex items-center gap-1 hover:underline"
                >
                  <X className="w-3 h-3" /> Hapus foto
                </button>
              )}
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="p-name">Nama Produk <span className="text-red-500">*</span></Label>
              <Input
                id="p-name"
                value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder="Masukkan nama produk"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="p-sku">SKU <span className="text-red-500">*</span></Label>
              <Input
                id="p-sku"
                value={form.sku}
                onChange={e => set('sku', e.target.value)}
                placeholder="Kode produk unik"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Kategori <span className="text-red-500">*</span></Label>
              <Select value={form.category} onValueChange={v => set('category', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="p-price">Harga (Rp)</Label>
              <Input
                id="p-price"
                type="number"
                min={0}
                value={form.price}
                onChange={e => set('price', Number(e.target.value))}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="p-stock">Stok</Label>
              <Input
                id="p-stock"
                type="number"
                min={0}
                value={form.stock}
                onChange={e => set('stock', Number(e.target.value))}
                placeholder="0"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="p-weight">Berat (gram)</Label>
              <Input
                id="p-weight"
                type="number"
                min={0}
                value={form.weight}
                onChange={e => set('weight', Number(e.target.value))}
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="p-desc">Deskripsi</Label>
            <Textarea
              id="p-desc"
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Deskripsi produk..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t">
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-1.5" />Batal
            </Button>
            <Button onClick={handleSave} disabled={!form.name.trim() || !form.sku.trim() || !form.category}>
              <Check className="w-4 h-4 mr-1.5" />
              {mode === 'add' ? 'Simpan Produk' : 'Simpan Perubahan'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────
export function ProductManagement() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchTerm, setSearchTerm] = useState('')

  // dialog state
  const [viewProduct, setViewProduct] = useState<Product | null>(null)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null)
  const [isAddOpen, setIsAddOpen] = useState(false)

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // ── CRUD handlers ──
  const handleAdd = (data: Omit<Product, 'id'>) => {
    const newId = Math.max(0, ...products.map(p => p.id)) + 1
    setProducts(prev => [...prev, { id: newId, ...data }])
  }

  const handleEdit = (data: Omit<Product, 'id'>) => {
    if (!editProduct) return
    setProducts(prev => prev.map(p => p.id === editProduct.id ? { ...p, ...data } : p))
  }

  const handleDelete = () => {
    if (!deleteProduct) return
    setProducts(prev => prev.filter(p => p.id !== deleteProduct.id))
    setDeleteProduct(null)
  }

  // ── Export Excel ──
  const handleExport = () => {
    const rows = filtered.map(p => ({
      'ID': p.id,
      'Nama Produk': p.name,
      'SKU': p.sku,
      'Kategori': p.category,
      'Harga (Rp)': p.price,
      'Stok': p.stock,
      'Berat (gram)': p.weight ?? '',
      'Status': p.stock === 0 ? 'Habis' : p.stock <= 5 ? 'Stok Rendah' : 'Aktif',
      'Deskripsi': p.description ?? '',
    }))

    const ws = XLSX.utils.json_to_sheet(rows)
    const colWidths = [
      { wch: 5 }, { wch: 30 }, { wch: 18 }, { wch: 14 },
      { wch: 16 }, { wch: 8 }, { wch: 13 }, { wch: 12 }, { wch: 40 },
    ]
    ws['!cols'] = colWidths

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Produk')
    XLSX.writeFile(wb, `produk-toko-${new Date().toISOString().slice(0, 10)}.xlsx`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Produk</h1>
          <p className="text-muted-foreground">Kelola semua produk yang Anda jual di toko online Anda</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExport} className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4" />
            Export Excel
          </Button>
          <Button onClick={() => setIsAddOpen(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Tambah Produk
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Produk</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">produk terdaftar</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produk Aktif</CardTitle>
            <Package className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.filter(p => p.stock > 5).length}</div>
            <p className="text-xs text-muted-foreground">dengan stok cukup</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stok Rendah</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.filter(p => p.stock <= 5 && p.stock > 0).length}</div>
            <p className="text-xs text-muted-foreground">perlu restock</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Habis Stok</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.filter(p => p.stock === 0).length}</div>
            <p className="text-xs text-muted-foreground">segera restock</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>Daftar Produk</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-80">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari nama produk atau SKU..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>Tidak ada produk yang ditemukan</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produk</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Stok</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{formatPrice(product.price)}</TableCell>
                    <TableCell>
                      <span className={
                        product.stock === 0 ? 'text-red-600 font-medium' :
                        product.stock <= 5 ? 'text-orange-600 font-medium' : ''
                      }>
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell>
                      <StatusBadge stock={product.stock} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          title="Lihat detail"
                          onClick={() => setViewProduct(product)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          title="Edit produk"
                          onClick={() => setEditProduct(product)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          title="Hapus produk"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => setDeleteProduct(product)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* View Dialog */}
      <ViewProductDialog
        product={viewProduct}
        open={!!viewProduct}
        onClose={() => setViewProduct(null)}
      />

      {/* Add Dialog */}
      <ProductFormDialog
        key={isAddOpen ? 'add-open' : 'add-closed'}
        mode="add"
        initialData={emptyForm}
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={handleAdd}
      />

      {/* Edit Dialog */}
      {editProduct && (
        <ProductFormDialog
          key={`edit-${editProduct.id}`}
          mode="edit"
          initialData={{
            name: editProduct.name,
            category: editProduct.category,
            price: editProduct.price,
            stock: editProduct.stock,
            status: editProduct.status,
            image: editProduct.image,
            sku: editProduct.sku,
            weight: editProduct.weight ?? 0,
            description: editProduct.description ?? '',
          }}
          open={!!editProduct}
          onClose={() => setEditProduct(null)}
          onSave={handleEdit}
        />
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteProduct} onOpenChange={open => !open && setDeleteProduct(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Produk</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus <strong>{deleteProduct?.name}</strong>?
              Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Ya, Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
