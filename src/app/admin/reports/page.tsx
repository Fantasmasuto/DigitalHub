"use client";

import { Download, Calendar, TrendingUp, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { toast } from "sonner";

const dailyData = [
  { day: "Lun", ventas: 1200, pedidos: 18 },
  { day: "Mar", ventas: 980, pedidos: 15 },
  { day: "Mié", ventas: 1500, pedidos: 22 },
  { day: "Jue", ventas: 1100, pedidos: 17 },
  { day: "Vie", ventas: 1800, pedidos: 28 },
  { day: "Sáb", ventas: 2200, pedidos: 35 },
  { day: "Dom", ventas: 1900, pedidos: 30 },
];

const categoryRevenue = [
  { category: "Streaming", revenue: 3250, percentage: 42 },
  { category: "Gaming", revenue: 2170, percentage: 28 },
  { category: "Música", revenue: 1160, percentage: 15 },
  { category: "Gift Cards", revenue: 775, percentage: 10 },
  { category: "Otros", revenue: 390, percentage: 5 },
];

const monthlyTrend = [
  { month: "Ene", revenue: 4200, profit: 2100 },
  { month: "Feb", revenue: 5100, profit: 2550 },
  { month: "Mar", revenue: 4800, profit: 2400 },
  { month: "Abr", revenue: 6300, profit: 3150 },
  { month: "May", revenue: 5900, profit: 2950 },
  { month: "Jun", revenue: 7200, profit: 3600 },
  { month: "Jul", revenue: 6800, profit: 3400 },
  { month: "Ago", revenue: 8100, profit: 4050 },
  { month: "Sep", revenue: 7500, profit: 3750 },
  { month: "Oct", revenue: 9200, profit: 4600 },
  { month: "Nov", revenue: 10500, profit: 5250 },
  { month: "Dic", revenue: 12000, profit: 6000 },
];

export default function AdminReportsPage() {
  const handleExport = (format: string) => {
    toast.success(`Exportando reporte en ${format.toUpperCase()} (demo)`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Reportes</h2>
          <p className="text-muted-foreground">Análisis detallado de ventas y rendimiento</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport("csv")}>
            <Download className="mr-2 h-4 w-4" /> CSV
          </Button>
          <Button variant="outline" onClick={() => handleExport("pdf")}>
            <Download className="mr-2 h-4 w-4" /> PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Revenue Mensual", value: "$12,000", change: "+14.3%", icon: TrendingUp },
          { label: "Ganancia Neta", value: "$6,000", change: "+14.3%", icon: BarChart3 },
          { label: "Pedidos del Mes", value: "180", change: "+13.9%", icon: Calendar },
          { label: "Margen Promedio", value: "50%", change: "+0.5%", icon: TrendingUp },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <Badge variant="secondary" className="text-green-600 mt-1">
                      {stat.change}
                    </Badge>
                  </div>
                  <Icon className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="daily">
        <TabsList>
          <TabsTrigger value="daily">Diario</TabsTrigger>
          <TabsTrigger value="monthly">Mensual</TabsTrigger>
          <TabsTrigger value="category">Por Categoría</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ventas de la Semana</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="ventas" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Ventas ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tendencia Revenue vs Ganancia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} name="Revenue" />
                    <Area type="monotone" dataKey="profit" stroke="#10b981" fill="#10b981" fillOpacity={0.2} name="Ganancia" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="category" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue por Categoría</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryRevenue} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" />
                    <YAxis dataKey="category" type="category" width={100} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="revenue" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Revenue ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 space-y-3">
                {categoryRevenue.map((cat) => (
                  <div key={cat.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{cat.category}</span>
                      <Badge variant="secondary">{cat.percentage}%</Badge>
                    </div>
                    <span className="font-semibold">${cat.revenue.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
