import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, ShoppingCart, Package, DollarSign, Eye, Plus } from 'lucide-react'

const salesData = [
  { month: 'Jan', sales: 4000, orders: 20 },
  { month: 'Feb', sales: 3000, orders: 18 },
  { month: 'Mar', sales: 5000, orders: 25 },
  { month: 'Apr', sales: 4500, orders: 22 },
  { month: 'May', sales: 6000, orders: 30 },
  { month: 'Jun', sales: 5500, orders: 28 },
]

const categoryData = [
  { name: 'Electronics', value: 35, color: '#8884d8' },
  { name: 'Fashion', value: 25, color: '#82ca9d' },
  { name: 'Home & Garden', value: 20, color: '#ffc658' },
  { name: 'Sports', value: 12, color: '#ff7300' },
  { name: 'Books', value: 8, color: '#00ff00' },
]

const recentOrders = [
  { id: 'ORD-001', customer: 'Ahmad Rizki', product: 'iPhone 14 Pro', amount: 'Rp 15.999.000', status: 'pending', date: '2024-01-15' },
  { id: 'ORD-002', customer: 'Siti Nurhaliza', product: 'Samsung Galaxy S23', amount: 'Rp 12.999.000', status: 'shipped', date: '2024-01-15' },
  { id: 'ORD-003', customer: 'Budi Santoso', product: 'MacBook Air M2', amount: 'Rp 18.999.000', status: 'delivered', date: '2024-01-14' },
  { id: 'ORD-004', customer: 'Dewi Lestari', product: 'iPad Air', amount: 'Rp 8.999.000', status: 'processing', date: '2024-01-14' },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1>Dashboard Overview</h1>
          <p className="text-muted-foreground">Selamat datang kembali! Berikut ringkasan toko Anda hari ini.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Produk
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Penjualan</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div>Rp 125.450.000</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              +12% dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Pesanan</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div>143</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              +8% dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Produk</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div>87</div>
            <p className="text-xs text-muted-foreground">
              12 produk stok rendah
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Pengunjung</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div>2.847</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              +5% dari minggu lalu
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Grafik Penjualan</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Bar dataKey="sales" fill="#8884d8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kategori Produk</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-4">
              {categoryData.map((item) => (
                <div key={`legend-${item.name}`} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-xs">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Pesanan Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div>
                      <p>{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <p>{order.product}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <div className="flex-1 text-right">
                  <p>{order.amount}</p>
                  <Badge 
                    variant={
                      order.status === 'delivered' ? 'default' :
                      order.status === 'shipped' ? 'secondary' :
                      order.status === 'processing' ? 'outline' : 'destructive'
                    }
                    className="text-xs"
                  >
                    {order.status === 'pending' ? 'Menunggu' :
                     order.status === 'processing' ? 'Diproses' :
                     order.status === 'shipped' ? 'Dikirim' : 'Selesai'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}