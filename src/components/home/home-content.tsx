"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Tv,
  Music,
  Gamepad2,
  Smartphone,
  Gift,
  Globe,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Headphones,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/products/product-card";
import { DEMO_PRODUCTS, DEMO_CATEGORIES, DEMO_FEATURED_OFFERS } from "@/lib/demo-data";
import { useSearchParams } from "next/navigation";

const iconMap: Record<string, React.ReactNode> = {
  Tv: <Tv className="h-6 w-6" />,
  Music: <Music className="h-6 w-6" />,
  Gamepad2: <Gamepad2 className="h-6 w-6" />,
  Smartphone: <Smartphone className="h-6 w-6" />,
  Gift: <Gift className="h-6 w-6" />,
  Globe: <Globe className="h-6 w-6" />,
};

function SuperOffersCarousel() {
  const activeOffers = DEMO_FEATURED_OFFERS.filter((o) => o.is_active);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % activeOffers.length);
  }, [activeOffers.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + activeOffers.length) % activeOffers.length);
  }, [activeOffers.length]);

  useEffect(() => {
    if (activeOffers.length <= 1) return;
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, [activeOffers.length, goNext]);

  if (activeOffers.length === 0) return null;

  const offer = activeOffers[currentIndex];
  const product = offer.product || DEMO_PRODUCTS.find((p) => p.id === offer.product_id);

  return (
    <section className="container mx-auto px-4 pt-8">
      <div className="flex items-center gap-2 mb-4">
        <Star className="h-5 w-5 text-yellow-500" />
        <h2 className="text-2xl font-bold">Super Ofertas</h2>
      </div>
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative flex flex-col md:flex-row items-center gap-6 p-6 md:p-10">
          {product?.image_url && (
            <div className="w-full md:w-64 h-40 md:h-48 rounded-xl overflow-hidden shrink-0">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 text-center md:text-left space-y-3">
            <Badge className="bg-white/20 text-white border-white/30">
              {offer.badge_text || "Oferta"}
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold">{offer.title}</h3>
            {offer.subtitle && (
              <p className="text-white/80 text-sm md:text-base max-w-lg">{offer.subtitle}</p>
            )}
            <div className="flex items-center gap-3 justify-center md:justify-start">
              {product && (
                <>
                  <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                  {product.compare_at_price && (
                    <span className="text-lg text-white/50 line-through">
                      ${product.compare_at_price.toFixed(2)}
                    </span>
                  )}
                  {product.compare_at_price && (
                    <Badge className="bg-red-500 text-white">
                      -{Math.round((1 - product.price / product.compare_at_price) * 100)}%
                    </Badge>
                  )}
                </>
              )}
            </div>
            <div>
              <Button
                size="lg"
                className="bg-white text-purple-900 hover:bg-white/90"
                render={<Link href={product ? `/product/${product.slug}` : "#"} />}
              >
                Ver Oferta <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {activeOffers.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {activeOffers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex ? "bg-white w-6" : "bg-white/40 w-2"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function MostSoldSection() {
  const topProducts = useMemo(() => {
    return [...DEMO_PRODUCTS]
      .sort((a, b) => {
        const scoreA = (a.is_featured ? 50 : 0) + a.stock + (a.compare_at_price ? 20 : 0);
        const scoreB = (b.is_featured ? 50 : 0) + b.stock + (b.compare_at_price ? 20 : 0);
        return scoreB - scoreA;
      })
      .slice(0, 5);
  }, []);

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-orange-500" />
        <h2 className="text-2xl font-bold">Lo Más Vendido</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {topProducts.map((product, idx) => (
          <div key={product.id} className="relative">
            {idx < 3 && (
              <div className="absolute -top-2 -left-2 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold h-7 w-7 rounded-full flex items-center justify-center shadow-lg">
                #{idx + 1}
              </div>
            )}
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function HomeContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const searchQuery = searchParams.get("search");
  const [activeCategory, setActiveCategory] = useState<string | null>(
    categoryFilter
  );

  const filteredProducts = useMemo(() => {
    let products = DEMO_PRODUCTS;
    const cat = activeCategory || categoryFilter;

    if (cat) {
      const category = DEMO_CATEGORIES.find((c) => c.slug === cat);
      if (category) {
        products = products.filter((p) => p.category_id === category.id);
      }
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return products;
  }, [activeCategory, categoryFilter, searchQuery]);

  const featuredProducts = DEMO_PRODUCTS.filter((p) => p.is_featured);

  return (
    <div>
      {/* Hero */}
      {!categoryFilter && !searchQuery && (
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzR6bTAtMzBWNkgyVjRoMzR6TTYgMzR2Mkgydi0yaDR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
          <div className="container mx-auto px-4 py-20 md:py-28 relative">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Badge className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                <Sparkles className="h-3 w-3 mr-1" /> Marketplace Digital #1
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Todo lo digital,{" "}
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  en un solo lugar
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
                Streaming, música, videojuegos, gift cards y más. Los mejores
                precios del mercado con entrega instantánea.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-purple-900 hover:bg-white/90 text-base"
                  render={<a href="#products" />}
                >
                  Explorar Productos <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 text-base"
                  render={<Link href="/auth/register" />}
                >
                  Crear Cuenta Gratis
                </Button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="container mx-auto px-4 pb-16 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: <Zap className="h-6 w-6" />,
                  title: "Entrega Instantánea",
                  desc: "Recibe tus credenciales al momento de la compra",
                },
                {
                  icon: <Shield className="h-6 w-6" />,
                  title: "100% Seguro",
                  desc: "Pagos protegidos con Stripe y verificación manual",
                },
                {
                  icon: <Headphones className="h-6 w-6" />,
                  title: "Soporte 24/7",
                  desc: "Atención al cliente todo el día, todos los días",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-center gap-4 bg-white/5 rounded-xl p-4 backdrop-blur-sm"
                >
                  <div className="p-3 rounded-lg bg-white/10">{feature.icon}</div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-white/60">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Super Offers Carousel */}
      {!categoryFilter && !searchQuery && <SuperOffersCarousel />}

      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Categories */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Categorías</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {DEMO_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() =>
                  setActiveCategory(activeCategory === cat.slug ? null : cat.slug)
                }
                className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                  activeCategory === cat.slug
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-950"
                    : "border-border hover:border-purple-300"
                }`}
              >
                <div
                  className={`p-3 rounded-xl ${
                    activeCategory === cat.slug
                      ? "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {cat.icon ? iconMap[cat.icon] : null}
                </div>
                <span className="text-sm font-medium">{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Most Sold */}
        {!activeCategory && !searchQuery && <MostSoldSection />}

        {/* Featured */}
        {!activeCategory && !searchQuery && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Productos Destacados</h2>
                <p className="text-muted-foreground">Lo más popular esta semana</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* All/Filtered */}
        <section id="products">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">
                {activeCategory
                  ? DEMO_CATEGORIES.find((c) => c.slug === activeCategory)?.name ||
                    "Productos"
                  : searchQuery
                  ? `Resultados para "${searchQuery}"`
                  : "Todos los Productos"}
              </h2>
              <p className="text-muted-foreground">
                {filteredProducts.length} productos encontrados
              </p>
            </div>
            {activeCategory && (
              <Button variant="ghost" className="text-purple-600" onClick={() => setActiveCategory(null)}>
                Ver todos
              </Button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">No se encontraron productos</p>
              <p className="text-sm">Prueba con otra categoría o búsqueda</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
