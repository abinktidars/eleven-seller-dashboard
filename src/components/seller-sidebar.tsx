import { useState } from 'react'
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  Store,
  Users,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  Menu,
  X,
  AlertTriangle,
  Handshake
} from 'lucide-react'
import { cn } from "./ui/utils"

interface SellerSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  productBadge?: number
  orderBadge?: number
  resellerBadge?: number
}

const baseNavigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products',  label: 'Produk',    icon: Package },
  { id: 'orders',    label: 'Pesanan',   icon: ShoppingCart },
  { id: 'analytics', label: 'Analitik',  icon: BarChart3 },
  { id: 'customers',  label: 'Pelanggan', icon: Users },
  { id: 'resellers',  label: 'Reseller',  icon: Handshake },
  { id: 'payments',   label: 'Keuangan',  icon: CreditCard },
]

const bottomItems = [
  {
    id: 'notifications',
    label: 'Notifikasi',
    icon: Bell,
    badge: '3',
  },
  {
    id: 'settings',
    label: 'Pengaturan',
    icon: Settings,
  },
  {
    id: 'help',
    label: 'Bantuan',
    icon: HelpCircle,
  },
]

export function SellerSidebar({ activeTab, onTabChange, productBadge, orderBadge, resellerBadge }: SellerSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navigationItems = baseNavigationItems.map(item => ({
    ...item,
    badge: item.id === 'products' && productBadge != null && productBadge > 0
      ? String(productBadge)
      : item.id === 'orders' && orderBadge != null && orderBadge > 0
        ? String(orderBadge)
        : item.id === 'resellers' && resellerBadge != null && resellerBadge > 0
          ? String(resellerBadge)
          : undefined,
  }))

  return (
    <>
      {/* Mobile menu button */}
      <Button 
        variant="ghost" 
        size="sm"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
      </Button>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed md:relative left-0 top-0 z-50 h-screen w-64 bg-background border-r transition-transform duration-300 ease-in-out",
        "md:translate-x-0",
        isCollapsed ? "-translate-x-full" : "translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2>Seller Center</h2>
                <p className="text-xs text-muted-foreground">Toko Ahmad</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 h-10",
                      isActive && "bg-secondary"
                    )}
                    onClick={() => {
                      onTabChange(item.id)
                      setIsCollapsed(true) // Close mobile menu
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <Badge
                        variant={
                          item.id === 'products' ? 'destructive' :
                          item.id === 'resellers' ? 'outline' :
                          'default'
                        }
                        className={cn(
                          "text-xs h-5 px-1.5",
                          item.id === 'resellers' && "border-amber-500 text-amber-600"
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                )
              })}
            </nav>
          </div>

          {/* Quick Stats */}
          <div className="p-4 border-t space-y-3">
            <div className="bg-muted/50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Penjualan Hari Ini</span>
                <span className="text-sm">Rp 2.5jt</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Pesanan Baru</span>
                <span className="text-sm">5</span>
              </div>
              <div className="flex items-center justify-between text-orange-600">
                <span className="text-sm flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Stok Rendah
                </span>
                <span className="text-sm">12</span>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="p-4 border-t space-y-2">
            {bottomItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-10",
                    isActive && "bg-secondary"
                  )}
                  onClick={() => {
                    onTabChange(item.id)
                    setIsCollapsed(true)
                  }}
                >
                  <Icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge variant="default" className="text-xs h-5 px-1.5">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              )
            })}
            
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-10 text-destructive hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              <span className="flex-1 text-left">Keluar</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}