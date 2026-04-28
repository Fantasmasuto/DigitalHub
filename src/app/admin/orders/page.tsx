"use client";

import { useState } from "react";
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  MoreHorizontal,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ORDER_STATUS_LABELS } from "@/lib/constants";
import { toast } from "sonner";

const demoOrders = [
  {
    id: "1",
    order_number: "DH-20250428-0001",
    customer: "Juan Pérez",
    email: "juan@email.com",
    status: "pending",
    payment_method: "transfer",
    total: 15.97,
    items: 3,
    created_at: "2025-04-28T10:30:00Z",
    has_receipt: true,
  },
  {
    id: "2",
    order_number: "DH-20250428-0002",
    customer: "María García",
    email: "maria@email.com",
    status: "confirmed",
    payment_method: "stripe",
    total: 12.99,
    items: 1,
    created_at: "2025-04-28T09:15:00Z",
    has_receipt: false,
  },
  {
    id: "3",
    order_number: "DH-20250427-0003",
    customer: "Carlos López",
    email: "carlos@email.com",
    status: "processing",
    payment_method: "stripe",
    total: 29.99,
    items: 2,
    created_at: "2025-04-27T14:00:00Z",
    has_receipt: false,
  },
  {
    id: "4",
    order_number: "DH-20250427-0004",
    customer: "Ana Martínez",
    email: "ana@email.com",
    status: "delivered",
    payment_method: "transfer",
    total: 8.99,
    items: 1,
    created_at: "2025-04-27T11:45:00Z",
    has_receipt: true,
  },
  {
    id: "5",
    order_number: "DH-20250426-0005",
    customer: "Pedro Sánchez",
    email: "pedro@email.com",
    status: "cancelled",
    payment_method: "stripe",
    total: 25.0,
    items: 1,
    created_at: "2025-04-26T16:30:00Z",
    has_receipt: false,
  },
];

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deliverDialogOpen, setDeliverDialogOpen] = useState(false);
  const [, setSelectedOrder] = useState<string | null>(null);

  const orders = demoOrders.filter((o) => {
    const matchesSearch =
      o.order_number.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Pedidos</h2>
        <p className="text-muted-foreground">Gestiona y procesa los pedidos</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Pendientes", count: 1, icon: Clock, color: "text-yellow-600" },
          { label: "En Proceso", count: 1, icon: Truck, color: "text-blue-600" },
          { label: "Entregados", count: 1, icon: CheckCircle, color: "text-green-600" },
          { label: "Cancelados", count: 1, icon: XCircle, color: "text-red-600" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <Icon className={`h-8 w-8 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold">{stat.count}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar pedidos..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["all", "pending", "confirmed", "processing", "delivered", "cancelled"].map(
                (status) => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter(status)}
                    className={statusFilter === status ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    {status === "all"
                      ? "Todos"
                      : ORDER_STATUS_LABELS[status]?.label || status}
                  </Button>
                )
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Pedido</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Cliente</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Método</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Total</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Estado</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Fecha</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const status = ORDER_STATUS_LABELS[order.status];
                  return (
                    <tr key={order.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-3 px-2 font-medium">{order.order_number}</td>
                      <td className="py-3 px-2">
                        <div>
                          <p>{order.customer}</p>
                          <p className="text-xs text-muted-foreground">{order.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <Badge variant="outline">
                          {order.payment_method === "stripe" ? "Tarjeta" : "Transferencia"}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 font-medium">${order.total.toFixed(2)}</td>
                      <td className="py-3 px-2">
                        <Badge className={status?.color}>{status?.label}</Badge>
                      </td>
                      <td className="py-3 px-2 text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString("es")}
                      </td>
                      <td className="py-3 px-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8" />}>
                            <MoreHorizontal className="h-4 w-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" /> Ver Detalle
                            </DropdownMenuItem>
                            {order.has_receipt && (
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" /> Ver Comprobante
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            {order.status === "pending" && (
                              <DropdownMenuItem
                                onClick={() => toast.success("Pedido confirmado (demo)")}
                              >
                                <CheckCircle className="mr-2 h-4 w-4 text-green-600" /> Aprobar
                              </DropdownMenuItem>
                            )}
                            {(order.status === "confirmed" || order.status === "processing") && (
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedOrder(order.id);
                                  setDeliverDialogOpen(true);
                                }}
                              >
                                <Truck className="mr-2 h-4 w-4 text-blue-600" /> Entregar
                              </DropdownMenuItem>
                            )}
                            {order.status !== "cancelled" && order.status !== "delivered" && (
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => toast.success("Pedido cancelado (demo)")}
                              >
                                <XCircle className="mr-2 h-4 w-4" /> Cancelar
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Deliver Dialog */}
      <Dialog open={deliverDialogOpen} onOpenChange={setDeliverDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Entregar Credenciales</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Ingresa las credenciales o código que se entregarán al cliente.
            </p>
            <div className="space-y-2">
              <Label>Email / Usuario</Label>
              <Input placeholder="usuario@servicio.com" />
            </div>
            <div className="space-y-2">
              <Label>Contraseña / PIN</Label>
              <Input placeholder="Contraseña o código" />
            </div>
            <div className="space-y-2">
              <Label>Notas adicionales</Label>
              <Textarea placeholder="Instrucciones especiales para el cliente" />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setDeliverDialogOpen(false)}>
                Cancelar
              </Button>
              <Button
                className="bg-gradient-to-r from-purple-600 to-blue-600"
                onClick={() => {
                  toast.success("Credenciales entregadas (demo)");
                  setDeliverDialogOpen(false);
                }}
              >
                Entregar al Cliente
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
