"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Package,
  Clock,
  Shield,
  ImageIcon,
  Key,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { DEMO_PRODUCTS, DEMO_CATEGORIES, DEMO_VARIANTS } from "@/lib/demo-data";
import { PRODUCT_TYPE_LABELS } from "@/lib/constants";
import type { ProductVariant } from "@/types";
import { toast } from "sonner";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [variantDialogOpen, setVariantDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [variants, setVariants] = useState<ProductVariant[]>(DEMO_VARIANTS);
  const [newVariant, setNewVariant] = useState({
    name: "", price: "", duration_months: "", warranty_days: "", stock: "",
  });

  const products = DEMO_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addVariant = () => {
    if (!selectedProductId || !newVariant.name || !newVariant.price) {
      toast.error("Completa nombre y precio de la variante");
      return;
    }
    const variant: ProductVariant = {
      id: `var-${Date.now()}`,
      product_id: selectedProductId,
      name: newVariant.name,
      price: parseFloat(newVariant.price),
      compare_at_price: null,
      stock: parseInt(newVariant.stock) || 0,
      sku: null,
      duration_months: newVariant.duration_months ? parseInt(newVariant.duration_months) : null,
      warranty_days: newVariant.warranty_days ? parseInt(newVariant.warranty_days) : null,
      attributes: {},
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setVariants((prev) => [...prev, variant]);
    setNewVariant({ name: "", price: "", duration_months: "", warranty_days: "", stock: "" });
    toast.success("Variante creada");
  };

  const deleteVariant = (id: string) => {
    setVariants((prev) => prev.filter((v) => v.id !== id));
    toast.success("Variante eliminada");
  };

  const openVariantDialog = (productId: string) => {
    setSelectedProductId(productId);
    setVariantDialogOpen(true);
  };

  const selectedProduct = DEMO_PRODUCTS.find((p) => p.id === selectedProductId);
  const productVariants = variants.filter((v) => v.product_id === selectedProductId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Productos</h2>
          <p className="text-muted-foreground">Administra tu catálogo de productos</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger render={<Button className="bg-gradient-to-r from-purple-600 to-blue-600" />}>
            <Plus className="mr-2 h-4 w-4" /> Nuevo Producto
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear Producto</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre</Label>
                  <Input placeholder="Nombre del producto" />
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input placeholder="nombre-del-producto" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Descripción corta</Label>
                <Input placeholder="Descripción breve" />
              </div>
              <div className="space-y-2">
                <Label>Descripción completa</Label>
                <Textarea placeholder="Descripción detallada del producto" rows={4} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Precio</Label>
                  <Input type="number" placeholder="0.00" step="0.01" />
                </div>
                <div className="space-y-2">
                  <Label>Precio anterior</Label>
                  <Input type="number" placeholder="0.00" step="0.01" />
                </div>
                <div className="space-y-2">
                  <Label>Costo</Label>
                  <Input type="number" placeholder="0.00" step="0.01" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Categoría</Label>
                  <select className="w-full border rounded-md px-3 py-2 text-sm bg-background">
                    <option value="">Seleccionar categoría</option>
                    {DEMO_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <select className="w-full border rounded-md px-3 py-2 text-sm bg-background">
                    {Object.entries(PRODUCT_TYPE_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Stock</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>
                    <span className="flex items-center gap-1">
                      <ImageIcon className="h-3.5 w-3.5" /> URL de imagen
                    </span>
                  </Label>
                  <Input placeholder="https://..." />
                  <p className="text-xs text-muted-foreground">Pega la URL de la imagen del producto</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch id="active" defaultChecked />
                  <Label htmlFor="active">Activo</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="featured" />
                  <Label htmlFor="featured">Destacado</Label>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-600"
                  onClick={() => {
                    toast.success("Producto creado (demo)");
                    setDialogOpen(false);
                  }}
                >
                  Crear Producto
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar productos..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Badge variant="secondary">{products.length} productos</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Producto</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Categoría</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Tipo</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Precio</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Stock</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Variantes</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Estado</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const variantCount = variants.filter((v) => v.product_id === product.id).length;
                  return (
                    <tr key={product.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-3">
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="h-10 w-10 rounded-lg object-cover shrink-0"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 flex items-center justify-center shrink-0">
                              <Package className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <Badge variant="secondary">{product.category?.name}</Badge>
                      </td>
                      <td className="py-3 px-2 text-muted-foreground">
                        {PRODUCT_TYPE_LABELS[product.product_type]}
                      </td>
                      <td className="py-3 px-2">
                        <div>
                          <span className="font-medium">${product.price.toFixed(2)}</span>
                          {product.compare_at_price && (
                            <span className="text-xs text-muted-foreground line-through ml-2">
                              ${product.compare_at_price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <Badge variant={product.stock > 10 ? "secondary" : "destructive"}>
                          {product.stock}
                        </Badge>
                      </td>
                      <td className="py-3 px-2">
                        {variantCount > 0 ? (
                          <button
                            onClick={() => openVariantDialog(product.id)}
                            className="text-purple-600 hover:underline text-sm font-medium"
                          >
                            {variantCount} variante{variantCount > 1 ? "s" : ""}
                          </button>
                        ) : (
                          <button
                            onClick={() => openVariantDialog(product.id)}
                            className="text-muted-foreground hover:text-purple-600 text-sm"
                          >
                            + Agregar
                          </button>
                        )}
                      </td>
                      <td className="py-3 px-2">
                        <Badge
                          className={
                            product.is_active
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          }
                        >
                          {product.is_active ? "Activo" : "Inactivo"}
                        </Badge>
                      </td>
                      <td className="py-3 px-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8" />}>
                            <MoreHorizontal className="h-4 w-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" /> Ver
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pencil className="mr-2 h-4 w-4" /> Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openVariantDialog(product.id)}>
                              <Clock className="mr-2 h-4 w-4" /> Variantes
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                            </DropdownMenuItem>
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

      {/* Variant Management Dialog */}
      <Dialog open={variantDialogOpen} onOpenChange={setVariantDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Variantes — {selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Existing variants */}
            {productVariants.length > 0 && (
              <div className="space-y-3">
                {productVariants.map((variant) => (
                  <div key={variant.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{variant.name}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span className="font-semibold text-foreground">${variant.price.toFixed(2)}</span>
                        {variant.duration_months && (
                          <span className="flex items-center gap-0.5">
                            <Clock className="h-3 w-3" /> {variant.duration_months} mes{variant.duration_months > 1 ? "es" : ""}
                          </span>
                        )}
                        {variant.warranty_days && (
                          <span className="flex items-center gap-0.5">
                            <Shield className="h-3 w-3" /> Garantía {variant.warranty_days}d
                          </span>
                        )}
                        <span>Stock: {variant.stock}</span>
                        {variant.credential_count !== undefined && (
                          <span className="flex items-center gap-0.5">
                            <Key className="h-3 w-3" /> {variant.credential_count} creds
                          </span>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => deleteVariant(variant.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Add new variant */}
            <div className="border-t pt-4">
              <p className="text-sm font-medium mb-3">Agregar nueva variante</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Nombre</Label>
                  <Input
                    placeholder="Ej: Spotify 3 Meses"
                    value={newVariant.name}
                    onChange={(e) => setNewVariant({ ...newVariant, name: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Precio</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    value={newVariant.price}
                    onChange={(e) => setNewVariant({ ...newVariant, price: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Duración (meses)</Label>
                  <Input
                    type="number"
                    placeholder="Ej: 3"
                    value={newVariant.duration_months}
                    onChange={(e) => setNewVariant({ ...newVariant, duration_months: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Garantía (días)</Label>
                  <Input
                    type="number"
                    placeholder="Ej: 85"
                    value={newVariant.warranty_days}
                    onChange={(e) => setNewVariant({ ...newVariant, warranty_days: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Stock</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={newVariant.stock}
                    onChange={(e) => setNewVariant({ ...newVariant, stock: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-3">
                <Button onClick={addVariant} size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                  <Plus className="mr-1 h-3.5 w-3.5" /> Agregar Variante
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
