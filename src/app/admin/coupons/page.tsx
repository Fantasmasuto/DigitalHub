"use client";

import { useState } from "react";
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Tag, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const demoCoupons = [
  {
    id: "1",
    code: "WELCOME10",
    description: "10% de descuento para nuevos usuarios",
    discount_type: "percentage",
    discount_value: 10,
    min_purchase: 0,
    max_uses: 1000,
    used_count: 245,
    expires_at: "2025-12-31",
    is_active: true,
  },
  {
    id: "2",
    code: "SAVE5",
    description: "$5 de descuento en tu compra",
    discount_type: "fixed",
    discount_value: 5,
    min_purchase: 10,
    max_uses: 500,
    used_count: 89,
    expires_at: "2025-06-30",
    is_active: true,
  },
  {
    id: "3",
    code: "SUMMER25",
    description: "25% descuento de verano",
    discount_type: "percentage",
    discount_value: 25,
    min_purchase: 20,
    max_uses: 200,
    used_count: 200,
    expires_at: "2025-09-01",
    is_active: false,
  },
];

export default function AdminCouponsPage() {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const coupons = demoCoupons.filter(
    (c) =>
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Cupones</h2>
          <p className="text-muted-foreground">Gestiona cupones y promociones</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger render={<Button className="bg-gradient-to-r from-purple-600 to-blue-600" />}>
            <Plus className="mr-2 h-4 w-4" /> Nuevo Cupón
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Cupón</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Código</Label>
                <Input placeholder="CODIGO2025" className="uppercase" />
              </div>
              <div className="space-y-2">
                <Label>Descripción</Label>
                <Input placeholder="Descripción del cupón" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de descuento</Label>
                  <select className="w-full border rounded-md px-3 py-2 text-sm bg-background">
                    <option value="percentage">Porcentaje (%)</option>
                    <option value="fixed">Monto fijo ($)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Valor</Label>
                  <Input type="number" placeholder="10" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Compra mínima ($)</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>Usos máximos</Label>
                  <Input type="number" placeholder="100" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Fecha de expiración</Label>
                <Input type="date" />
              </div>
              <div className="flex items-center gap-2">
                <Switch id="coupon-active" defaultChecked />
                <Label htmlFor="coupon-active">Activo</Label>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-600"
                  onClick={() => {
                    toast.success("Cupón creado (demo)");
                    setDialogOpen(false);
                  }}
                >
                  Crear Cupón
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar cupones..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Código</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Descuento</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Usos</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Expira</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Estado</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-purple-600" />
                        <span className="font-mono font-bold">{coupon.code}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => {
                            navigator.clipboard.writeText(coupon.code);
                            toast.success("Código copiado");
                          }}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{coupon.description}</p>
                    </td>
                    <td className="py-3 px-2 font-medium">
                      {coupon.discount_type === "percentage"
                        ? `${coupon.discount_value}%`
                        : `$${coupon.discount_value.toFixed(2)}`}
                      {coupon.min_purchase > 0 && (
                        <p className="text-xs text-muted-foreground">
                          Min: ${coupon.min_purchase}
                        </p>
                      )}
                    </td>
                    <td className="py-3 px-2">
                      <span>
                        {coupon.used_count}/{coupon.max_uses}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-muted-foreground">
                      {new Date(coupon.expires_at).toLocaleDateString("es")}
                    </td>
                    <td className="py-3 px-2">
                      <Badge
                        className={
                          coupon.is_active
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }
                      >
                        {coupon.is_active ? "Activo" : "Inactivo"}
                      </Badge>
                    </td>
                    <td className="py-3 px-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8" />}>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
