import { useState, useEffect } from 'react'
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
  AlertTriangle,
  Handshake,
  Megaphone,
} from 'lucide-react'
import { cn } from "./ui/utils"

interface SellerSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  productBadge?: number
  orderBadge?: number
  resellerBadge?: number
  marketingBadge?: number
}

const baseNavigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products',  label: 'Produk',    icon: Package },
  { id: 'orders',    label: 'Pesanan',   icon: ShoppingCart },
  { id: 'analytics', label: 'Analitik',  icon: BarChart3 },
  { id: 'customers',  label: 'Pelanggan', icon: Users },
  { id: 'resellers',  label: 'Reseller',  icon: Handshake },
  { id: 'marketing',  label: 'Pemasaran', icon: Megaphone },
  { id: 'payments',   label: 'Keuangan',  icon: CreditCard },
]

const bottomItems = [
  { id: 'notifications', label: 'Notifikasi',  icon: Bell,        badge: '3' },
  { id: 'settings',      label: 'Pengaturan',  icon: Settings },
  { id: 'help',          label: 'Bantuan',     icon: HelpCircle },
]

export function SellerSidebar({ activeTab, onTabChange, productBadge, orderBadge, resellerBadge, marketingBadge }: SellerSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(true)

  useEffect(() => {
    const handler = () => setIsCollapsed(v => !v)
    window.addEventListener('toggle-sidebar', handler)
    return () => window.removeEventListener('toggle-sidebar', handler)
  }, [])

  const navigationItems = baseNavigationItems.map(item => ({
    ...item,
    badge: item.id === 'products'  && productBadge  != null && productBadge  > 0 ? String(productBadge)  :
           item.id === 'orders'    && orderBadge    != null && orderBadge    > 0 ? String(orderBadge)    :
           item.id === 'resellers' && resellerBadge != null && resellerBadge > 0 ? String(resellerBadge) :
           item.id === 'marketing' && marketingBadge!= null && marketingBadge> 0 ? String(marketingBadge):
           undefined,
  }))

  const navBtn = (id: string, label: string, Icon: React.ElementType, badge?: string, badgeColor?: string) => {
    const isActive = activeTab === id
    return (
      <button
        key={id}
        onClick={() => { onTabChange(id); setIsCollapsed(true) }}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
          isActive
            ? "bg-white/20 text-white shadow-sm"
            : "text-indigo-200 hover:bg-white/10 hover:text-white"
        )}
      >
        <Icon className="h-4 w-4 shrink-0" />
        <span className="flex-1 text-left">{label}</span>
        {badge && (
          <span className={cn(
            "text-[11px] h-5 min-w-[20px] px-1.5 rounded-full flex items-center justify-center font-bold",
            badgeColor ?? "bg-indigo-400 text-white"
          )}>
            {badge}
          </span>
        )}
      </button>
    )
  }

  return (
    <>
      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed md:relative left-0 top-0 z-50 h-screen w-64 flex flex-col",
        "bg-gradient-to-b from-indigo-950 via-indigo-900 to-purple-950",
        "transition-transform duration-300 ease-in-out md:translate-x-0",
        isCollapsed ? "-translate-x-full" : "translate-x-0"
      )}>

        {/* Header */}
        <div className="flex items-center gap-3 p-5 border-b border-white/10">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shrink-0">
            <Store className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">Seller Center</p>
            <p className="text-indigo-300 text-xs">Toko Ahmad</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto scrollbar-none">
          <nav className="p-3 space-y-0.5">
            <p className="text-indigo-400 text-[10px] font-semibold uppercase tracking-wider px-3 pt-1 pb-2">Menu Utama</p>
            {navigationItems.map(item =>
              navBtn(
                item.id, item.label, item.icon, item.badge,
                item.id === 'products'  ? "bg-red-500 text-white" :
                item.id === 'resellers' ? "bg-amber-400 text-amber-900" :
                item.id === 'marketing' ? "bg-emerald-400 text-emerald-900" :
                "bg-indigo-400 text-white"
              )
            )}
          </nav>
        </div>

        {/* Quick Stats */}
        <div className="mx-3 mb-3 bg-white/8 rounded-xl p-3 border border-white/10 space-y-2">
          <p className="text-indigo-400 text-[10px] font-semibold uppercase tracking-wider">Ringkasan Hari Ini</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-indigo-300">Penjualan</span>
            <span className="text-xs font-semibold text-white">Rp 2.5jt</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-indigo-300">Pesanan Baru</span>
            <span className="text-xs font-semibold text-emerald-400">5</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-300 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />Stok Rendah
            </span>
            <span className="text-xs font-semibold text-amber-300">12</span>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="p-3 border-t border-white/10 space-y-0.5">
          {bottomItems.map(item =>
            navBtn(item.id, item.label, item.icon, item.badge, "bg-red-500 text-white")
          )}
          <button
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all duration-150"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span className="flex-1 text-left">Keluar</span>
          </button>
        </div>
      </div>
    </>
  )
}
