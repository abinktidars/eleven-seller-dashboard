import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Search, Eye, Truck, Package, CheckCircle, Clock, ShoppingCart, DollarSign, AlertCircle } from 'lucide-react'

const mockOrders = [
  {
    id: 'ORD-001',
    customer: {
      name: 'Ahmad Rizki',
      email: 'ahmad.rizki@email.com',
      phone: '+62 812-3456-7890'
    },
    items: [
      { name: 'iPhone 14 Pro Max', quantity: 1, price: 15999000 }
    ],
    total: 15999000,
    status: 'pending',
    paymentStatus: 'waiting',
    shippingAddress: 'Jl. Sudirman No. 123, Jakarta Selatan, DKI Jakarta 12190',
    orderDate: '2024-01-15T10:30:00',
    estimatedDelivery: '2024-01-20'
  },
  {
    id: 'ORD-002',
    customer: {
      name: 'Siti Nurhaliza',
      email: 'siti.nurhaliza@email.com',
      phone: '+62 813-2468-1357'
    },
    items: [
      { name: 'Samsung Galaxy S23 Ultra', quantity: 1, price: 18999000 },
      { name: 'Samsung Galaxy Buds2 Pro', quantity: 1, price: 3299000 }
    ],
    total: 22298000,
    status: 'shipped',
    paymentStatus: 'paid',
    shippingAddress: 'Jl. Gatot Subroto No. 456, Bandung, Jawa Barat 40123',
    orderDate: '2024-01-14T14:20:00',
    estimatedDelivery: '2024-01-19',
    trackingNumber: 'JNE123456789'
  },
  {
    id: 'ORD-003',
    customer: {
      name: 'Budi Santoso',
      email: 'budi.santoso@email.com',
      phone: '+62 814-9876-5432'
    },
    items: [
      { name: 'MacBook Air M2', quantity: 1, price: 18999000 },
      { name: 'Magic Mouse', quantity: 1, price: 1299000 }
    ],
    total: 20298000,
    status: 'delivered',
    paymentStatus: 'paid',
    shippingAddress: 'Jl. Malioboro No. 789, Yogyakarta, DIY 55271',
    orderDate: '2024-01-12T09:15:00',
    estimatedDelivery: '2024-01-17',
    trackingNumber: 'SICEPAT987654321',
    deliveryDate: '2024-01-16T15:30:00'
  },
  {
    id: 'ORD-004',
    customer: {
      name: 'Dewi Lestari',
      email: 'dewi.lestari@email.com',
      phone: '+62 815-1357-2468'
    },
    items: [
      { name: 'Nike Air Jordan 1', quantity: 2, price: 2499000 }
    ],
    total: 4998000,
    status: 'processing',
    paymentStatus: 'paid',
    shippingAddress: 'Jl. Diponegoro No. 321, Surabaya, Jawa Timur 60265',
    orderDate: '2024-01-13T16:45:00',
    estimatedDelivery: '2024-01-18'
  },
  {
    id: 'ORD-005',
    customer: {
      name: 'Eko Prasetyo',
      email: 'eko.prasetyo@email.com',
      phone: '+62 816-8642-9753'
    },
    items: [
      { name: 'iPad Air 5th Gen', quantity: 1, price: 8999000 }
    ],
    total: 8999000,
    status: 'cancelled',
    paymentStatus: 'refunded',
    shippingAddress: 'Jl. Ahmad Yani No. 654, Medan, Sumatera Utara 20111',
    orderDate: '2024-01-11T11:20:00',
    cancelReason: 'Customer requested cancellation'
  }
]

export function OrderManagement() {
  const [orders] = useState(mockOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null)

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Menunggu', variant: 'outline' as const, icon: Clock },
      processing: { label: 'Diproses', variant: 'secondary' as const, icon: Package },
      shipped: { label: 'Dikirim', variant: 'default' as const, icon: Truck },
      delivered: { label: 'Selesai', variant: 'default' as const, icon: CheckCircle },
      cancelled: { label: 'Dibatalkan', variant: 'destructive' as const, icon: AlertCircle }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config.icon
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    )
  }

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      waiting: { label: 'Menunggu Pembayaran', variant: 'outline' as const },
      paid: { label: 'Dibayar', variant: 'default' as const },
      failed: { label: 'Gagal', variant: 'destructive' as const },
      refunded: { label: 'Dikembalikan', variant: 'secondary' as const }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig]
    
    return (
      <Badge variant={config.variant}>
        {config.label}
      </Badge>
    )
  }

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Manajemen Pesanan</h1>
        <p className="text-muted-foreground">Kelola dan pantau semua pesanan yang masuk dari pelanggan</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Pesanan</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div>{orderStats.total}</div>
            <p className="text-xs text-muted-foreground">semua pesanan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Menunggu Proses</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div>{orderStats.pending + orderStats.processing}</div>
            <p className="text-xs text-muted-foreground">perlu diproses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Sedang Dikirim</CardTitle>
            <Truck className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div>{orderStats.shipped}</div>
            <p className="text-xs text-muted-foreground">dalam perjalanan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Penjualan</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div>{formatPrice(orders.reduce((sum, order) => sum + order.total, 0))}</div>
            <p className="text-xs text-muted-foreground">dari semua pesanan</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Semua Pesanan</TabsTrigger>
          <TabsTrigger value="pending">Menunggu ({orderStats.pending})</TabsTrigger>
          <TabsTrigger value="processing">Diproses ({orderStats.processing})</TabsTrigger>
          <TabsTrigger value="shipped">Dikirim ({orderStats.shipped})</TabsTrigger>
          <TabsTrigger value="delivered">Selesai ({orderStats.delivered})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Search and Filter */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <CardTitle>Daftar Pesanan</CardTitle>
                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-80">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari nomor pesanan atau nama pelanggan..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="pending">Menunggu</SelectItem>
                      <SelectItem value="processing">Diproses</SelectItem>
                      <SelectItem value="shipped">Dikirim</SelectItem>
                      <SelectItem value="delivered">Selesai</SelectItem>
                      <SelectItem value="cancelled">Dibatalkan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pesanan</TableHead>
                    <TableHead>Pelanggan</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status Pesanan</TableHead>
                    <TableHead>Pembayaran</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div>
                          <p>{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.items.length} item{order.items.length > 1 ? 's' : ''}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{order.customer.name}</p>
                          <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{formatPrice(order.total)}</TableCell>
                      <TableCell>
                        {getStatusBadge(order.status)}
                      </TableCell>
                      <TableCell>
                        {getPaymentStatusBadge(order.paymentStatus)}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{formatDate(order.orderDate)}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Detail Pesanan {order.id}</DialogTitle>
                            </DialogHeader>
                            {selectedOrder && (
                              <div className="grid gap-6 py-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle>Informasi Pelanggan</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                      <p><strong>Nama:</strong> {selectedOrder.customer.name}</p>
                                      <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
                                      <p><strong>Telepon:</strong> {selectedOrder.customer.phone}</p>
                                      <p><strong>Alamat:</strong> {selectedOrder.shippingAddress}</p>
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardHeader>
                                      <CardTitle>Status Pesanan</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                      <p><strong>Status:</strong> {getStatusBadge(selectedOrder.status)}</p>
                                      <p><strong>Pembayaran:</strong> {getPaymentStatusBadge(selectedOrder.paymentStatus)}</p>
                                      <p><strong>Tanggal Pesan:</strong> {formatDate(selectedOrder.orderDate)}</p>
                                      <p><strong>Estimasi Kirim:</strong> {new Date(selectedOrder.estimatedDelivery).toLocaleDateString('id-ID')}</p>
                                      {selectedOrder.trackingNumber && (
                                        <p><strong>No. Resi:</strong> {selectedOrder.trackingNumber}</p>
                                      )}
                                    </CardContent>
                                  </Card>
                                </div>

                                <Card>
                                  <CardHeader>
                                    <CardTitle>Item Pesanan</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-4">
                                      {selectedOrder.items.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                                          <div>
                                            <p>{item.name}</p>
                                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                          </div>
                                          <p>{formatPrice(item.price * item.quantity)}</p>
                                        </div>
                                      ))}
                                      <div className="flex justify-between items-center pt-4 border-t">
                                        <p>Total</p>
                                        <p>{formatPrice(selectedOrder.total)}</p>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <div className="flex justify-end gap-2">
                                  <Button variant="outline">Cetak Invoice</Button>
                                  <Button variant="outline">Update Status</Button>
                                  <Button>Hubungi Pelanggan</Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}