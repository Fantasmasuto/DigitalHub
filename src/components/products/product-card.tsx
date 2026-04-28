"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Star, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart-store";
import { PRODUCT_TYPE_LABELS } from "@/lib/constants";
import type { Product } from "@/types";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  onToggleFavorite?: (productId: string) => void;
  isFavorite?: boolean;
}

export function ProductCard({ product, onToggleFavorite, isFavorite }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock <= 0) return;
    addItem(product);
    toast.success(`${product.name} agregado al carrito`);
  };

  return (
    <Link href={`/product/${product.slug}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-sm">
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <Package className="h-16 w-16 text-purple-300 dark:text-purple-700" />
            </div>
          )}

          {discount > 0 && (
            <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
              -{discount}%
            </Badge>
          )}

          {product.is_featured && (
            <Badge className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
              Destacado
            </Badge>
          )}

          {onToggleFavorite && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite(product.id);
              }}
            >
              <Heart
                className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
              />
            </Button>
          )}
        </div>

        <CardContent className="p-4 space-y-2">
          {product.category && (
            <p className="text-xs text-purple-600 dark:text-purple-400 font-medium uppercase tracking-wide">
              {product.category.name}
            </p>
          )}
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-purple-600 transition-colors">
            {product.name}
          </h3>
          {product.short_description && (
            <p className="text-xs text-muted-foreground line-clamp-2">{product.short_description}</p>
          )}

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {PRODUCT_TYPE_LABELS[product.product_type] || product.product_type}
            </Badge>
            {product.stock > 0 ? (
              <span className="text-xs text-green-600 dark:text-green-400">
                {product.stock} disponible{product.stock > 1 ? "s" : ""}
              </span>
            ) : (
              <span className="text-xs text-red-500">Agotado</span>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
              {product.compare_at_price && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.compare_at_price.toFixed(2)}
                </span>
              )}
            </div>
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>

          {product.reviews && product.reviews.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span>
                {(product.reviews.reduce((a, r) => a + r.rating, 0) / product.reviews.length).toFixed(1)}
              </span>
              <span>({product.reviews.length})</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
