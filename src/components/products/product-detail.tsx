"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ShoppingCart,
  Heart,
  Star,
  Shield,
  Zap,
  Package,
  Minus,
  Plus,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCartStore } from "@/store/cart-store";
import { PRODUCT_TYPE_LABELS } from "@/lib/constants";
import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/types";
import { toast } from "sonner";

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  const discount = product.compare_at_price
    ? Math.round(
        ((product.compare_at_price - product.price) / product.compare_at_price) * 100
      )
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(`${product.name} x${quantity} agregado al carrito`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground flex items-center gap-1">
          <ChevronLeft className="h-4 w-4" /> Inicio
        </Link>
        {product.category && (
          <>
            <span>/</span>
            <Link
              href={`/?category=${product.category.slug}`}
              className="hover:text-foreground"
            >
              {product.category.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <Package className="h-24 w-24 text-purple-300 dark:text-purple-700" />
            </div>
          )}
          {discount > 0 && (
            <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-lg px-4 py-1">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {product.category && (
            <Badge variant="secondary" className="text-purple-600 dark:text-purple-400">
              {product.category.name}
            </Badge>
          )}
          <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              {product.compare_at_price && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.compare_at_price.toFixed(2)}
                </span>
              )}
            </div>
            {discount > 0 && (
              <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
                Ahorra ${(product.compare_at_price! - product.price).toFixed(2)}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm">
            <Badge variant="outline">
              {PRODUCT_TYPE_LABELS[product.product_type] || product.product_type}
            </Badge>
            {product.stock > 0 ? (
              <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                {product.stock} disponibles
              </span>
            ) : (
              <span className="text-red-500">Agotado</span>
            )}
          </div>

          <Separator />

          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              size="lg"
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Agregar al Carrito - ${(product.price * quantity).toFixed(2)}
            </Button>
          </div>

          <Button variant="outline" className="w-full" size="lg">
            <Heart className="mr-2 h-5 w-5" />
            Agregar a Favoritos
          </Button>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { icon: <Zap className="h-5 w-5" />, label: "Entrega\ninstantánea" },
              { icon: <Shield className="h-5 w-5" />, label: "Pago\nseguro" },
              { icon: <Star className="h-5 w-5" />, label: "Garantía\nincluida" },
            ].map((f) => (
              <div
                key={f.label}
                className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50 text-center"
              >
                <div className="text-purple-600 dark:text-purple-400">{f.icon}</div>
                <span className="text-xs text-muted-foreground whitespace-pre-line">
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Descripción</TabsTrigger>
            <TabsTrigger value="reviews">Reseñas</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="prose dark:prose-invert max-w-none">
              <p>{product.description}</p>
              <h3>Características</h3>
              <ul>
                <li>Tipo: {PRODUCT_TYPE_LABELS[product.product_type]}</li>
                <li>Entrega digital instantánea</li>
                <li>Soporte incluido</li>
                <li>Garantía de funcionamiento</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className="text-center py-8 text-muted-foreground">
              <Star className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>Aún no hay reseñas para este producto</p>
              <p className="text-sm mt-1">
                Sé el primero en dejar una reseña después de tu compra
              </p>
            </div>
          </TabsContent>
          <TabsContent value="faq" className="mt-6">
            <div className="space-y-4">
              {[
                {
                  q: "¿Cómo recibo mi compra?",
                  a: "Una vez confirmado el pago, recibirás las credenciales o código en tu email y en la sección 'Mis Pedidos'.",
                },
                {
                  q: "¿Qué garantía tienen?",
                  a: "Todos nuestros productos incluyen garantía de funcionamiento. Si hay algún problema, contáctanos para soporte.",
                },
                {
                  q: "¿Puedo pedir reembolso?",
                  a: "Sí, si el producto no funciona correctamente, puedes solicitar un reembolso dentro de las primeras 24 horas.",
                },
              ].map((item) => (
                <div key={item.q} className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">{item.q}</h4>
                  <p className="text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Productos Relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
