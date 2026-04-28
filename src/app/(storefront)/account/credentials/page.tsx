"use client";

import { useState } from "react";
import { Key, Eye, EyeOff, Copy, Shield, Clock, Package, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PurchasedCredential {
  id: string;
  order_number: string;
  product_name: string;
  product_image: string | null;
  variant_name: string | null;
  duration_months: number | null;
  warranty_days: number | null;
  email: string;
  password: string;
  purchased_at: string;
  expires_at: string | null;
  warranty_until: string | null;
}

const demoCredentials: PurchasedCredential[] = [
  {
    id: "pc-1",
    order_number: "DH-20250425-0001",
    product_name: "Spotify Premium",
    product_image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&h=300&fit=crop",
    variant_name: "Spotify Premium 3 Meses",
    duration_months: 3,
    warranty_days: 85,
    email: "spotify_user3@mail.com",
    password: "Sp0t1fy#2025c",
    purchased_at: "2025-04-25T10:30:00Z",
    expires_at: "2025-07-25T10:30:00Z",
    warranty_until: "2025-07-19T10:30:00Z",
  },
  {
    id: "pc-2",
    order_number: "DH-20250425-0001",
    product_name: "Netflix Premium",
    product_image: "https://images.unsplash.com/photo-1574375927938-d5a98e8d7e28?w=400&h=300&fit=crop",
    variant_name: "Netflix Premium 1 Mes",
    duration_months: 1,
    warranty_days: 30,
    email: "netflix_acc2@mail.com",
    password: "Nflx#Acc2025b",
    purchased_at: "2025-04-25T10:30:00Z",
    expires_at: "2025-05-25T10:30:00Z",
    warranty_until: "2025-05-25T10:30:00Z",
  },
  {
    id: "pc-3",
    order_number: "DH-20250427-0003",
    product_name: "Disney+ Premium",
    product_image: "https://images.unsplash.com/photo-1640499900704-b00dd6a1104a?w=400&h=300&fit=crop",
    variant_name: null,
    duration_months: null,
    warranty_days: null,
    email: "disney_user1@mail.com",
    password: "Dsny#Prem2025",
    purchased_at: "2025-04-27T15:00:00Z",
    expires_at: null,
    warranty_until: null,
  },
];

export default function CredentialsPage() {
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  const togglePassword = (id: string) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copiado al portapapeles`);
  };

  const isWarrantyActive = (warranty_until: string | null) => {
    if (!warranty_until) return false;
    return new Date(warranty_until) > new Date();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Key className="h-5 w-5" /> Mis Credenciales
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Aquí puedes ver todas las credenciales de tus compras
        </p>
      </div>

      {demoCredentials.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <ShoppingBag className="h-16 w-16 opacity-20 mb-4" />
            <p className="text-lg font-medium">No tienes credenciales aún</p>
            <p className="text-sm">Cuando compres un producto, tus credenciales aparecerán aquí</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {demoCredentials.map((cred) => (
            <Card key={cred.id} className="overflow-hidden">
              <div className="flex">
                {cred.product_image && (
                  <div className="hidden sm:block w-32 shrink-0">
                    <img
                      src={cred.product_image}
                      alt={cred.product_name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <CardTitle className="text-base">{cred.product_name}</CardTitle>
                        {cred.variant_name && (
                          <p className="text-sm text-muted-foreground">{cred.variant_name}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {cred.warranty_until && (
                          <Badge className={
                            isWarrantyActive(cred.warranty_until)
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                          }>
                            <Shield className="h-3 w-3 mr-1" />
                            {isWarrantyActive(cred.warranty_until) ? "Garantía activa" : "Garantía vencida"}
                          </Badge>
                        )}
                        <Badge variant="secondary" className="text-xs">
                          {cred.order_number}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {/* Credentials */}
                    <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Email / Usuario</p>
                          <p className="font-mono text-sm">{cred.email}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(cred.email, "Email")}
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Contraseña</p>
                          <p className="font-mono text-sm">
                            {showPasswords[cred.id] ? cred.password : "••••••••••"}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePassword(cred.id)}
                          >
                            {showPasswords[cred.id] ? (
                              <EyeOff className="h-3.5 w-3.5" />
                            ) : (
                              <Eye className="h-3.5 w-3.5" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(cred.password, "Contraseña")}
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        Compra: {new Date(cred.purchased_at).toLocaleDateString("es", { year: "numeric", month: "short", day: "numeric" })}
                      </span>
                      {cred.duration_months && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Duración: {cred.duration_months} mes{cred.duration_months > 1 ? "es" : ""}
                        </span>
                      )}
                      {cred.expires_at && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Vence: {new Date(cred.expires_at).toLocaleDateString("es", { year: "numeric", month: "short", day: "numeric" })}
                        </span>
                      )}
                      {cred.warranty_days && (
                        <span className="flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          Garantía: {cred.warranty_days} días
                        </span>
                      )}
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
