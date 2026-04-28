"use client";

import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/products/product-card";
import { DEMO_PRODUCTS } from "@/lib/demo-data";

export default function FavoritesPage() {
  const favoriteProducts = DEMO_PRODUCTS.slice(0, 3);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Mis Favoritos</h2>

      {favoriteProducts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Heart className="h-16 w-16 opacity-20 mb-4" />
            <p className="text-lg font-medium">No tienes favoritos aún</p>
            <p className="text-sm">Los productos que marques como favoritos aparecerán aquí</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} isFavorite />
          ))}
        </div>
      )}
    </div>
  );
}
