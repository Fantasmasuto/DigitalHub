"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Key,
  Eye,
  EyeOff,
  Trash2,
  Package,
  Shield,
  Clock,
} from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DEMO_PRODUCTS, DEMO_VARIANTS, DEMO_INVENTORY } from "@/lib/demo-data";
import type { Inventory } from "@/types";
import { toast } from "sonner";

export default function AdminInventoryPage() {
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [inventory, setInventory] = useState<Inventory[]>(DEMO_INVENTORY);
  const [newCreds, setNewCreds] = useState({ email: "", password: "", product_id: "", variant_id: "" });
  const [bulkText, setBulkText] = useState("");
  const [bulkProductId, setBulkProductId] = useState("");
  const [bulkVariantId, setBulkVariantId] = useState("");

  const filteredInventory = inventory.filter((inv) => {
    const product = DEMO_PRODUCTS.find((p) => p.id === inv.product_id);
    const matchSearch = !search || product?.name.toLowerCase().includes(search.toLowerCase()) ||
      inv.credentials.email?.toLowerCase().includes(search.toLowerCase());
    const matchProduct = !selectedProduct || inv.product_id === selectedProduct;
    return matchSearch && matchProduct;
  });

  const availableCount = inventory.filter((i) => !i.is_sold).length;
  const soldCount = inventory.filter((i) => i.is_sold).length;

  const productsWithVariants = DEMO_PRODUCTS.filter((p) =>
    DEMO_VARIANTS.some((v) => v.product_id === p.id)
  );

  const togglePassword = (id: string) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addCredential = () => {
    if (!newCreds.email || !newCreds.password || !newCreds.product_id) {
      toast.error("Completa todos los campos");
      return;
    }
    const newInv: Inventory = {
      id: `inv-${Date.now()}`,
      product_id: newCreds.product_id,
      variant_id: newCreds.variant_id || null,
      credentials: { email: newCreds.email, password: newCreds.password },
      is_sold: false,
      sold_at: null,
      order_id: null,
      order_item_id: null,
      created_at: new Date().toISOString(),
    };
    setInventory((prev) => [newInv, ...prev]);
    setNewCreds({ email: "", password: "", product_id: "", variant_id: "" });
    setDialogOpen(false);
    toast.success("Credencial agregada");
  };

  const addBulkCredentials = () => {
    if (!bulkProductId || !bulkText.trim()) {
      toast.error("Selecciona producto y pega las credenciales");
      return;
    }
    const lines = bulkText.trim().split("\n").filter(Boolean);
    const newItems: Inventory[] = lines.map((line, i) => {
      const parts = line.split(/[:|,;\t]+/).map((s) => s.trim());
      return {
        id: `inv-bulk-${Date.now()}-${i}`,
        product_id: bulkProductId,
        variant_id: bulkVariantId || null,
        credentials: { email: parts[0] || "", password: parts[1] || "" },
        is_sold: false,
        sold_at: null,
        order_id: null,
        order_item_id: null,
        created_at: new Date().toISOString(),
      };
    });
    setInventory((prev) => [...newItems, ...prev]);
    setBulkText("");
    setBulkDialogOpen(false);
    toast.success(`${newItems.length} credenciales agregadas`);
  };

  const deleteCredential = (id: string) => {
    setInventory((prev) => prev.filter((i) => i.id !== id));
    toast.success("Credencial eliminada");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Inventario de Credenciales</h2>
          <p className="text-muted-foreground">
            Administra las credenciales digitales para entrega automática
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={bulkDialogOpen} onOpenChange={setBulkDialogOpen}>
            <DialogTrigger render={<Button variant="outline" />}>
              <Package className="mr-2 h-4 w-4" /> Carga Masiva
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Carga Masiva de Credenciales</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Producto</Label>
                  <select
                    className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                    value={bulkProductId}
                    onChange={(e) => setBulkProductId(e.target.value)}
                  >
                    <option value="">Seleccionar producto</option>
                    {productsWithVariants.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                {bulkProductId && (
                  <div className="space-y-2">
                    <Label>Variante (opcional)</Label>
                    <select
                      className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                      value={bulkVariantId}
                      onChange={(e) => setBulkVariantId(e.target.value)}
                    >
                      <option value="">Sin variante</option>
                      {DEMO_VARIANTS.filter((v) => v.product_id === bulkProductId).map((v) => (
                        <option key={v.id} value={v.id}>{v.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="space-y-2">
                  <Label>Credenciales (una por línea: email:password)</Label>
                  <Textarea
                    placeholder={"usuario1@mail.com:contraseña123\nusuario2@mail.com:contraseña456\nusuario3@mail.com:contraseña789"}
                    rows={8}
                    value={bulkText}
                    onChange={(e) => setBulkText(e.target.value)}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Separadores aceptados: : , ; o tab
                  </p>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setBulkDialogOpen(false)}>Cancelar</Button>
                  <Button onClick={addBulkCredentials} className="bg-gradient-to-r from-purple-600 to-blue-600">
                    Agregar {bulkText.trim().split("\n").filter(Boolean).length} Credenciales
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger render={<Button className="bg-gradient-to-r from-purple-600 to-blue-600" />}>
              <Plus className="mr-2 h-4 w-4" /> Nueva Credencial
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar Credencial</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Producto</Label>
                  <select
                    className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                    value={newCreds.product_id}
                    onChange={(e) => setNewCreds({ ...newCreds, product_id: e.target.value, variant_id: "" })}
                  >
                    <option value="">Seleccionar producto</option>
                    {DEMO_PRODUCTS.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                {newCreds.product_id && DEMO_VARIANTS.some((v) => v.product_id === newCreds.product_id) && (
                  <div className="space-y-2">
                    <Label>Variante</Label>
                    <select
                      className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                      value={newCreds.variant_id}
                      onChange={(e) => setNewCreds({ ...newCreds, variant_id: e.target.value })}
                    >
                      <option value="">Sin variante</option>
                      {DEMO_VARIANTS.filter((v) => v.product_id === newCreds.product_id).map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name} {v.duration_months ? `(${v.duration_months} mes${v.duration_months > 1 ? "es" : ""})` : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="space-y-2">
                  <Label>Email / Usuario</Label>
                  <Input
                    placeholder="correo@ejemplo.com"
                    value={newCreds.email}
                    onChange={(e) => setNewCreds({ ...newCreds, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Contraseña</Label>
                  <Input
                    placeholder="contraseña de la cuenta"
                    value={newCreds.password}
                    onChange={(e) => setNewCreds({ ...newCreds, password: e.target.value })}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                  <Button onClick={addCredential} className="bg-gradient-to-r from-purple-600 to-blue-600">
                    Agregar Credencial
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900">
              <Key className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{availableCount}</p>
              <p className="text-sm text-muted-foreground">Disponibles</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
              <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{soldCount}</p>
              <p className="text-sm text-muted-foreground">Vendidas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900">
              <Package className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{inventory.length}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter by product */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedProduct === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedProduct(null)}
        >
          Todos
        </Button>
        {DEMO_PRODUCTS.filter((p) => inventory.some((i) => i.product_id === p.id)).map((p) => (
          <Button
            key={p.id}
            variant={selectedProduct === p.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedProduct(selectedProduct === p.id ? null : p.id)}
          >
            {p.name} ({inventory.filter((i) => i.product_id === p.id && !i.is_sold).length})
          </Button>
        ))}
      </div>

      {/* Inventory list */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por producto o email..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Badge variant="secondary">{filteredInventory.length} credenciales</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Producto</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Variante</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Email/Usuario</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Contraseña</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Estado</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((inv) => {
                  const product = DEMO_PRODUCTS.find((p) => p.id === inv.product_id);
                  const variant = DEMO_VARIANTS.find((v) => v.id === inv.variant_id);
                  return (
                    <tr key={inv.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-3 px-2 font-medium">{product?.name || "—"}</td>
                      <td className="py-3 px-2">
                        {variant ? (
                          <div>
                            <span className="text-sm">{variant.name}</span>
                            {variant.duration_months && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {variant.duration_months} mes{variant.duration_months > 1 ? "es" : ""}
                                {variant.warranty_days && (
                                  <span className="ml-1">| Garantía: {variant.warranty_days}d</span>
                                )}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="py-3 px-2 font-mono text-xs">{inv.credentials.email}</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs">
                            {showPasswords[inv.id] ? inv.credentials.password : "••••••••"}
                          </span>
                          <button onClick={() => togglePassword(inv.id)} className="text-muted-foreground hover:text-foreground">
                            {showPasswords[inv.id] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <Badge className={inv.is_sold
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        }>
                          {inv.is_sold ? "Vendida" : "Disponible"}
                        </Badge>
                      </td>
                      <td className="py-3 px-2">
                        {!inv.is_sold && (
                          <Button variant="ghost" size="sm" onClick={() => deleteCredential(inv.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
