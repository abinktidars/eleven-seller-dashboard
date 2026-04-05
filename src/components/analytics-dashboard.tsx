import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'
import { TrendingUp, TrendingDown, Eye, ShoppingCart, Package, DollarSign, Users, Calendar } from 'lucide-react'

// Mock data for analytics
const salesTrendData = [
  { date: '01 Jan', sales: 12000000, orders: 45, visitors: 1250 },
  { date: '02 Jan', sales: 15000000, orders: 52, visitors: 1380 },
  { date: '03 Jan', sales: 18000000, orders: 61, visitors: 1520 },
  { date: '04 Jan', sales: 14000000, orders: 48, visitors: 1290 },
  { date: '05 Jan', sales: 22000000, orders: 75, visitors: 1680 },
  { date: '06 Jan', sales: 19000000, orders: 66, visitors: 1590 },
  { date: '07 Jan', sales: 25000000, orders: 82, visitors: 1890 }
]

const topProductsData = [
  { name: 'iPhone 14 Pro', sales: 45000000, orders: 30, percentage: 35 },
  { name: 'Samsung Galaxy S23', sales: 38000000, orders: 25, percentage: 28 },
  { name: 'MacBook Air M2', sales: 32000000, orders: 18, percentage: 22 },
  { name: 'iPad Air', sales: 15000000, orders: 12, percentage: 15 }
]

const trafficSourceData = [
  { source: 'Organic Search', visitors: 45, color: '#8884d8' },
  { source: 'Social Media', visitors: 25, color: '#82ca9d' },
  { source: 'Direct', visitors: 15, color: '#ffc658' },
  { source: 'Referral', visitors: 10, color: '#ff7300' },
  { source: 'Email', visitors: 5, color: '#00ff00' }
]

const customerSegmentData = [
  { segment: 'New Customer', count: 150, percentage: 60, color: '#8884d8' },
  { segment: 'Returning Customer', count: 80, percentage: 32, color: '#82ca9d' },
  { segment: 'VIP Customer', count: 20, percentage: 8, color: '#ffc658' }
]

const monthlyData = [
  { month: 'Jan', sales: 125000000, orders: 450, customers: 380 },
  { month: 'Feb', sales: 132000000, orders: 478, customers: 425 },
  { month: 'Mar', sales: 148000000, orders: 520, customers: 465 },
  { month: 'Apr', sales: 155000000, orders: 545, customers: 490 },
  { month: 'May', sales: 178000000, orders: 612, customers: 550 },
  { month: 'Jun', sales: 185000000, orders: 645, customers: 580 }
]

export function AnalyticsDashboard() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      notation: 'compact',
      compactDisplay: 'short'
    }).format(price)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('id-ID').format(num)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1>Analitik & Laporan</h1>
          <p className="text-muted-foreground">Pantau performa bisnis dan dapatkan insights untuk mengembangkan toko Anda</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="7days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 Hari Terakhir</SelectItem>
              <SelectItem value="30days">30 Hari Terakhir</SelectItem>
              <SelectItem value="3months">3 Bulan Terakhir</SelectItem>
              <SelectItem value="1year">1 Tahun Terakhir</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div>{formatPrice(125000000)}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              +15.2% dari periode sebelumnya
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Conversion Rate</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div>4.35%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              +0.8% dari periode sebelumnya
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Avg Order Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div>{formatPrice(875000)}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingDown className="w-3 h-3 text-red-500" />
              -2.1% dari periode sebelumnya
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div>156</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              +22% dari periode sebelumnya
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Penjualan</TabsTrigger>
          <TabsTrigger value="products">Produk</TabsTrigger>
          <TabsTrigger value="customers">Pelanggan</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Trend */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Tren Penjualan Harian</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={salesTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle>Produk Terlaris</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProductsData.map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.orders} pesanan</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{formatPrice(product.sales)}</p>
                        <Badge variant="secondary" className="text-xs">
                          {product.percentage}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Traffic Sources */}
            <Card>
              <CardHeader>
                <CardTitle>Sumber Traffic</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={trafficSourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="visitors"
                    >
                      {trafficSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {trafficSourceData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span>{item.source}</span>
                      </div>
                      <span>{item.visitors}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Penjualan Bulanan</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Bar dataKey="sales" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Growth Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Revenue Growth</span>
                    <Badge className="bg-green-100 text-green-700">+15.2%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Order Growth</span>
                    <Badge className="bg-green-100 text-green-700">+12.8%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Customer Growth</span>
                    <Badge className="bg-green-100 text-green-700">+22.3%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">AOV Growth</span>
                    <Badge className="bg-red-100 text-red-700">-2.1%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Targets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Monthly Revenue</span>
                      <span className="text-sm">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Orders Target</span>
                      <span className="text-sm">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">New Customers</span>
                      <span className="text-sm">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}