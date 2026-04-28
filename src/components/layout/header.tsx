"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  Moon,
  Sun,
  Heart,
  LogOut,
  Package,
  Settings,
  Tv,
  Music,
  Gamepad2,
  Smartphone,
  Gift,
  Globe,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCartStore } from "@/store/cart-store";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/types";
import { CartSidebar } from "@/components/cart/cart-sidebar";
import { APP_NAME, CATEGORIES } from "@/lib/constants";

const categoryIcons: Record<string, React.ReactNode> = {
  Tv: <Tv className="h-4 w-4" />,
  Music: <Music className="h-4 w-4" />,
  Gamepad2: <Gamepad2 className="h-4 w-4" />,
  Smartphone: <Smartphone className="h-4 w-4" />,
  Gift: <Gift className="h-4 w-4" />,
  Globe: <Globe className="h-4 w-4" />,
};

export function Header() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const itemCount = useCartStore((s) => s.itemCount());
  const setCartOpen = useCartStore((s) => s.setOpen);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const timer = requestAnimationFrame(() => setMounted(true));
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        if (data) setProfile(data);
      }
    };
    getProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: string, session: { user?: { id: string } } | null) => {
      if (event === "SIGNED_IN" && session?.user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        if (data) setProfile(data);
      } else if (event === "SIGNED_OUT") {
        setProfile(null);
      }
    });

    return () => {
      cancelAnimationFrame(timer);
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          {/* Mobile menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <div className="flex flex-col gap-4 mt-8">
                <Link
                  href="/"
                  className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {APP_NAME}
                </Link>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground px-2">Categorías</p>
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/?category=${cat.slug}`}
                      className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-accent text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {categoryIcons[cat.icon]}
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="hidden md:flex items-center gap-2 shrink-0">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">DH</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {APP_NAME}
            </span>
          </Link>

          {/* Mobile logo */}
          <Link href="/" className="md:hidden flex items-center gap-2 shrink-0">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">DH</span>
            </div>
          </Link>

          {/* Categories dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" className="gap-2 hidden md:flex" />}>
              <Menu className="h-4 w-4" />
              Categorías
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {CATEGORIES.map((cat) => (
                <DropdownMenuItem key={cat.slug} onClick={() => router.push(`/?category=${cat.slug}`)}>
                  <div className="flex items-center gap-3 cursor-pointer">
                    {categoryIcons[cat.icon]}
                    <div>
                      <p className="font-medium">{cat.name}</p>
                      <p className="text-xs text-muted-foreground">{cat.description}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden sm:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar plataformas, juegos, gift cards..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}

            {profile && (
              <Button variant="ghost" size="icon" render={<Link href="/account/favorites" />}>
                <Heart className="h-5 w-5" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-purple-600">
                  {itemCount}
                </Badge>
              )}
            </Button>

            {profile ? (
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="relative" />}>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile.avatar_url || undefined} />
                    <AvatarFallback className="bg-purple-100 text-purple-700 text-xs">
                      {(profile.display_name || profile.full_name || profile.email || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{profile.display_name || profile.full_name || "Usuario"}</p>
                    <p className="text-xs text-muted-foreground">{profile.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/account/profile")}>
                    <Settings className="h-4 w-4 mr-2" /> Mi Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/account/orders")}>
                    <Package className="h-4 w-4 mr-2" /> Mis Pedidos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/account/favorites")}>
                    <Heart className="h-4 w-4 mr-2" /> Favoritos
                  </DropdownMenuItem>
                  {profile.role === "admin" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => router.push("/admin/dashboard")} className="text-purple-600">
                        <Settings className="h-4 w-4 mr-2" /> Panel Admin
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" /> Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" render={<Link href="/auth/login" />} className="hidden sm:flex">
                  Iniciar Sesión
                </Button>
                <Button size="sm" render={<Link href="/auth/register" />} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Registrarse
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile search */}
        <div className="sm:hidden px-4 pb-3">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>
      </header>

      <CartSidebar />
    </>
  );
}
