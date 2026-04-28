"use client";

import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  Package,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const monthlyData = [
  { month: "Ene", ventas: 4200, pedidos: 65 },
  { month: "Feb", ventas: 5100, pedidos: 78 },
  { month: "Mar", ventas: 4800, pedidos: 72 },
  { month: "Abr", ventas: 6300, pedidos: 95 },
  { month: "May", ventas: 5900, pedidos: 88 },
  { month: "Jun", ventas: 7200, pedidos: 110 },
  { month: "Jul", ventas: 6800, pedidos: 102 },
  { month: "Ago", ventas: 8100, pedidos: 125 },
  { month: "Sep", ventas: 7500, pedidos: 115 },
  { month: "Oct", ventas: 9200, pedidos: 140 },
  { month: "Nov", ventas: 10500, pedidos: 158 },
  { month: "Dic", ventas: 12000, pedidos: 180 },
];

const categoryData = [
  { name: "Streaming", value: 42, color: "#8b5cf6" },
  { name: "Gaming", value: 28, color: "#3b82f6" },
  { name: "Música", value: 15, color: "#10b981" },
  { name: "Gift Cards", value: 10, color: "#f59e0b" },
  { name: "Otros", value: 5, color: "#6b7280" },
];

const topProducts = [
  { name: "Netflix Premium", ventas: 245, revenue: 1467.55 },
  { name: "Spotify Premium", ventas: 198, revenue: 790.02 },
  { name: "Xbox Game Pass", ventas: 156, revenue: 2026.44 },
  { name: "Disney+ Premium", ventas: 134, revenue: 668.66 },
  { name: "Google Play $25", ventas: 89, revenue: 2225.0 },
];

const recentOrders = [
  { id: "DH-20250428-0001", customer: "Juan Pérez", total: 15.97, status: "delivered" },
  { id: "DH-20250428-0002", customer: "María García", total: 12.99, status: "pending" },
  { id: "DH-20250428-0003", customer: "Carlos López", total: 29.99, status: "processing" },
  { id: "DH-20250427-0004", customer: "Ana Martínez", total: 8.99, status: "delivered" },
  { id: "DH-20250427-0005", customer: "Pedro Sánchez", total: 25.0, status: "confirmed" },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  processing: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Ventas Totales",
            value: "$87,500",
            change: "+12.5%",
            up: true,
            icon: DollarSign,
            color: "text-green-600",
          },
          {
            title: "Pedidos Hoy",
            value: "24",
            change: "+8.2%",
            up: true,
            icon: ShoppingCart,
            color: "text-blue-600",
          },
          {
            title: "Usuarios",
            value: "1,248",
            change: "+22.1%",
            up: true,
            icon: Users,
            color: "text-purple-600",
          },
          {
            title: "Ticket Promedio",
            value: "$18.50",
            change: "-2.3%",
            up: false,
            icon: TrendingUp,
            color: "text-amber-600",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center gap-1">
                      {stat.up ? (
                        <ArrowUpRight className="h-3 w-3 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 text-red-500" />
                      )}
                      <span className={`text-xs ${stat.up ? "text-green-500" : "text-red-500"}`}>
                        {stat.change}
                      </span>
                      <span className="text-xs text-muted-foreground">vs mes anterior</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Ventas Mensuales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="ventas" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Pie chart */}
        <Card>
          <CardHeader>
            <CardTitle>Ventas por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    {categoryData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders chart + Top products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pedidos por Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line type="monotone" dataKey="pedidos" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" /> Productos Más Vendidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, i) => (
                <div key={product.name} className="flex items-center gap-4">
                  <span className="text-sm font-bold text-muted-foreground w-6">
                    #{i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.ventas} ventas</p>
                  </div>
                  <span className="text-sm font-semibold">${product.revenue.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Pedidos Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Pedido</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Cliente</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Total</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Estado</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-2 font-medium">{order.id}</td>
                    <td className="py-3 px-2">{order.customer}</td>
                    <td className="py-3 px-2 font-medium">${order.total.toFixed(2)}</td>
                    <td className="py-3 px-2">
                      <Badge className={statusColors[order.status]}>{order.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
