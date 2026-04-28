"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Package, Heart, Settings, Key } from "lucide-react";

const accountLinks = [
  { href: "/account/profile", label: "Mi Perfil", icon: User },
  { href: "/account/orders", label: "Mis Pedidos", icon: Package },
  { href: "/account/credentials", label: "Mis Credenciales", icon: Key },
  { href: "/account/favorites", label: "Favoritos", icon: Heart },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Settings className="h-6 w-6 text-purple-600" />
        <h1 className="text-2xl font-bold">Mi Cuenta</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <nav className="space-y-1">
          {accountLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div>{children}</div>
      </div>
    </div>
  );
}
