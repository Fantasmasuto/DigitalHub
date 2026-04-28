"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  GripVertical,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DEMO_PRODUCTS, DEMO_FEATURED_OFFERS } from "@/lib/demo-data";
import type { FeaturedOffer } from "@/types";
import { toast } from "sonner";

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<FeaturedOffer[]>(DEMO_FEATURED_OFFERS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newOffer, setNewOffer] = useState({
    product_id: "",
    title: "",
    subtitle: "",
    badge_text: "Oferta",
  });

  const addOffer = () => {
    if (!newOffer.product_id || !newOffer.title) {
      toast.error("Selecciona un producto y escribe un título");
      return;
    }
    const product = DEMO_PRODUCTS.find((p) => p.id === newOffer.product_id);
    const offer: FeaturedOffer = {
      id: `offer-${Date.now()}`,
      product_id: newOffer.product_id,
      title: newOffer.title,
      subtitle: newOffer.subtitle || null,
      badge_text: newOffer.badge_text || "Oferta",
      sort_order: offers.length + 1,
      is_active: true,
      starts_at: null,
      ends_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      product,
    };
    setOffers((prev) => [...prev, offer]);
    setNewOffer({ product_id: "", title: "", subtitle: "", badge_text: "Oferta" });
    setDialogOpen(false);
    toast.success("Oferta agregada al carrusel");
  };

  const removeOffer = (id: string) => {
    setOffers((prev) => prev.filter((o) => o.id !== id));
    toast.success("Oferta eliminada");
  };

  const toggleOffer = (id: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, is_active: !o.is_active } : o))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Super Ofertas (Carrusel)</h2>
          <p className="text-muted-foreground">
            Configura las ofertas destacadas que aparecen en el carrusel de la página principal
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger render={<Button className="bg-gradient-to-r from-purple-600 to-blue-600" />}>
            <Plus className="mr-2 h-4 w-4" /> Nueva Oferta
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Oferta al Carrusel</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Producto</Label>
                <select
                  className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                  value={newOffer.product_id}
                  onChange={(e) => setNewOffer({ ...newOffer, product_id: e.target.value })}
                >
                  <option value="">Seleccionar producto</option>
                  {DEMO_PRODUCTS.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} — ${p.price}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Título de la oferta</Label>
                <Input
                  placeholder="Ej: Netflix Premium -63% OFF"
                  value={newOffer.title}
                  onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Subtítulo (opcional)</Label>
                <Input
                  placeholder="Ej: ¡El mejor precio del mercado!"
                  value={newOffer.subtitle}
                  onChange={(e) => setNewOffer({ ...newOffer, subtitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Etiqueta / Badge</Label>
                <select
                  className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                  value={newOffer.badge_text}
                  onChange={(e) => setNewOffer({ ...newOffer, badge_text: e.target.value })}
                >
                  <option value="Super Oferta">Super Oferta</option>
                  <option value="Más Vendido">Más Vendido</option>
                  <option value="Nuevo">Nuevo</option>
                  <option value="Oferta">Oferta</option>
                  <option value="Exclusivo">Exclusivo</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Streaming">Streaming</option>
                </select>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button onClick={addOffer} className="bg-gradient-to-r from-purple-600 to-blue-600">
                  Agregar al Carrusel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {offers.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Star className="h-16 w-16 opacity-20 mb-4" />
              <p className="text-lg font-medium">No hay ofertas en el carrusel</p>
              <p className="text-sm">Agrega ofertas para que aparezcan en la página principal</p>
            </CardContent>
          </Card>
        ) : (
          offers.map((offer, index) => {
            const product = offer.product || DEMO_PRODUCTS.find((p) => p.id === offer.product_id);
            return (
              <Card key={offer.id} className={!offer.is_active ? "opacity-50" : ""}>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="text-muted-foreground cursor-grab">
                    <GripVertical className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="shrink-0">#{index + 1}</Badge>
                  {product?.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-16 w-24 object-cover rounded-lg shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs">
                        {offer.badge_text}
                      </Badge>
                      <span className="text-sm font-medium text-muted-foreground">{product?.name}</span>
                    </div>
                    <p className="font-semibold truncate">{offer.title}</p>
                    {offer.subtitle && (
                      <p className="text-sm text-muted-foreground truncate">{offer.subtitle}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <p className="font-bold text-lg">${product?.price.toFixed(2)}</p>
                      {product?.compare_at_price && (
                        <p className="text-xs text-muted-foreground line-through">${product.compare_at_price.toFixed(2)}</p>
                      )}
                    </div>
                    <Switch checked={offer.is_active} onCheckedChange={() => toggleOffer(offer.id)} />
                    <Button variant="ghost" size="sm" onClick={() => removeOffer(offer.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
