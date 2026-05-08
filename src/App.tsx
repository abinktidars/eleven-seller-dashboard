import { useState } from "react";
import { SellerSidebar } from "./components/seller-sidebar";
import { DashboardOverview } from "./components/dashboard-overview";
import { ProductManagement } from "./components/product-management";
import { OrderManagement } from "./components/order-management";
import { AnalyticsDashboard } from "./components/analytics-dashboard";
import { LoginPage } from "./components/login-page";
import { RegisterPage } from "./components/register-page";
import { ForgotPasswordPage } from "./components/forgot-password-page";
import { SettingsPage } from "./components/settings-page";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import {
  Bell,
  HelpCircle,
  Users,
  CreditCard,
  LogOut,
} from "lucide-react";

// Placeholder components for unimplemented sections
function CustomersManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Manajemen Pelanggan</h1>
        <p className="text-muted-foreground">
          Kelola data pelanggan dan hubungan customer Anda
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Total Pelanggan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>1,247 pelanggan</div>
              <p className="text-sm text-muted-foreground">
                +156 pelanggan baru bulan ini
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Segmentasi Pelanggan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">VIP Customer</span>
                <Badge>89</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">
                  Regular Customer
                </span>
                <Badge variant="secondary">658</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">New Customer</span>
                <Badge variant="outline">500</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Lifetime Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div>Rp 2.8 juta</div>
              <p className="text-sm text-muted-foreground">
                Rata-rata nilai pelanggan
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PaymentsManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Keuangan & Pembayaran</h1>
        <p className="text-muted-foreground">
          Pantau keuangan, withdraw, dan laporan pembayaran
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Saldo Tersedia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>Rp 45.250.000</div>
              <Button size="sm">Tarik Saldo</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Settlement</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div>Rp 12.800.000</div>
              <p className="text-sm text-muted-foreground">
                Akan dicairkan dalam 1-3 hari
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Penarikan</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div>Rp 238.500.000</div>
              <p className="text-sm text-muted-foreground">
                Bulan ini
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Notifikasi</h1>
        <p className="text-muted-foreground">
          Pantau semua notifikasi penting dari toko Anda
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifikasi Terbaru
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">
                  Pesanan baru dari Ahmad Rizki
                </p>
                <p className="text-xs text-muted-foreground">
                  5 menit yang lalu
                </p>
              </div>
              <Badge>Baru</Badge>
            </div>

            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">
                  Stok iPhone 14 Pro hampir habis
                </p>
                <p className="text-xs text-muted-foreground">
                  2 jam yang lalu
                </p>
              </div>
              <Badge variant="outline">Stok</Badge>
            </div>

            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">
                  Pembayaran Rp 15.999.000 berhasil
                </p>
                <p className="text-xs text-muted-foreground">
                  1 hari yang lalu
                </p>
              </div>
              <Badge variant="secondary">Pembayaran</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


function HelpPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Pusat Bantuan</h1>
        <p className="text-muted-foreground">
          Dapatkan bantuan dan panduan menggunakan Seller Center
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border rounded-lg">
              <p className="text-sm">
                Bagaimana cara menambah produk baru?
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="text-sm">
                Cara mengatur metode pembayaran?
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="text-sm">
                Bagaimana cara menarik saldo?
              </p>
            </div>
            <Button size="sm" variant="outline">
              Lihat Semua FAQ
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kontak Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm">Email Support</p>
              <p className="text-sm text-muted-foreground">
                seller-support@example.com
              </p>
            </div>
            <div>
              <p className="text-sm">WhatsApp</p>
              <p className="text-sm text-muted-foreground">
                +62 811-2345-6789
              </p>
            </div>
            <div>
              <p className="text-sm">Jam Operasional</p>
              <p className="text-sm text-muted-foreground">
                Senin - Jumat, 09:00 - 18:00
              </p>
            </div>
            <Button size="sm">Hubungi Support</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [authPage, setAuthPage] = useState<"login" | "register" | "forgot-password">("login");

  const handleLogin = (email: string, password: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const handleRegisterSuccess = (email: string) => {
    // Auto login after successful registration
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail("");
    setActiveTab("dashboard");
    setAuthPage("login");
  };

  // Show authentication pages if not authenticated
  if (!isAuthenticated) {
    switch (authPage) {
      case "register":
        return (
          <RegisterPage
            onBackToLogin={() => setAuthPage("login")}
            onRegisterSuccess={handleRegisterSuccess}
          />
        );
      case "forgot-password":
        return (
          <ForgotPasswordPage
            onBackToLogin={() => setAuthPage("login")}
          />
        );
      default:
        return (
          <LoginPage
            onLogin={handleLogin}
            onForgotPassword={() => setAuthPage("forgot-password")}
            onRegister={() => setAuthPage("register")}
          />
        );
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "products":
        return <ProductManagement />;
      case "orders":
        return <OrderManagement />;
      case "analytics":
        return <AnalyticsDashboard />;
      case "customers":
        return <CustomersManagement />;
      case "payments":
        return <PaymentsManagement />;
      case "notifications":
        return <NotificationsPage />;
      case "settings":
        return <SettingsPage />;
      case "help":
        return <HelpPage />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <SellerSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with user info and logout */}
        <header className="border-b bg-background px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Seller Management System</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">{userEmail}</p>
              <p className="text-xs text-muted-foreground">Seller Account</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Keluar
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}