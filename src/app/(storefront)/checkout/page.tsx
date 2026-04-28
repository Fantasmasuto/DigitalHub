"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CreditCard,
  Building2,
  QrCode,
  ShoppingBag,
  ArrowLeft,
  Tag,
  Shield,
  Upload,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

type PaymentMethodType = "stripe" | "transfer" | "qr";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total());
  const clearCart = useCartStore((s) => s.clearCart);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("stripe");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = total;
  const finalTotal = Math.max(0, subtotal - discount);

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "welcome10") {
      const discountAmount = subtotal * 0.1;
      setDiscount(discountAmount);
      toast.success(`Cupón aplicado: -$${discountAmount.toFixed(2)}`);
    } else if (couponCode.toLowerCase() === "save5") {
      setDiscount(5);
      toast.success("Cupón aplicado: -$5.00");
    } else {
      toast.error("Cupón no válido");
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setOrderPlaced(true);
    clearCart();
    toast.success("¡Pedido realizado con éxito!");
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
        <h1 className="text-2xl font-bold mb-2">Tu carrito está vacío</h1>
        <p className="text-muted-foreground mb-6">Agrega productos para continuar</p>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600" render={<Link href="/" />}>
          Explorar Productos
        </Button>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-lg">
        <div className="mx-auto h-20 w-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-6">
          <Package className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-3xl font-bold mb-2">¡Pedido Confirmado!</h1>
        <p className="text-muted-foreground mb-6">
          {paymentMethod === "transfer"
            ? "Tu pedido está pendiente de verificación. Sube tu comprobante de pago."
            : "Tu pedido ha sido procesado exitosamente. Recibirás tus credenciales pronto."}
        </p>
        <div className="flex flex-col gap-3">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600" render={<Link href="/account/orders" />}>
            Ver Mis Pedidos
          </Button>
          <Button variant="outline" render={<Link href="/" />}>
            Seguir Comprando
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" render={<Link href="/" />}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Seguir comprando
      </Button>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        {/* Left - Payment Method */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Método de Pago</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: "stripe" as const,
                  icon: CreditCard,
                  label: "Tarjeta de Crédito/Débito",
                  desc: "Pago seguro con Stripe",
                },
                {
                  id: "transfer" as const,
                  icon: Building2,
                  label: "Transferencia Bancaria",
                  desc: "Envía y sube tu comprobante",
                },
                {
                  id: "qr" as const,
                  icon: QrCode,
                  label: "Pago por QR",
                  desc: "Escanea y paga fácilmente",
                },
              ].map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                      paymentMethod === method.id
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-950"
                        : "border-border hover:border-purple-300"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg ${
                        paymentMethod === method.id
                          ? "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">{method.label}</p>
                      <p className="text-sm text-muted-foreground">{method.desc}</p>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {/* Payment Details */}
          {paymentMethod === "stripe" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" /> Datos de Tarjeta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Número de tarjeta</Label>
                  <Input placeholder="4242 4242 4242 4242" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Expiración</Label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label>CVC</Label>
                    <Input placeholder="123" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Pago procesado de forma segura por Stripe</span>
                </div>
              </CardContent>
            </Card>
          )}

          {paymentMethod === "transfer" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" /> Datos de Transferencia
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-muted space-y-2">
                  <p className="font-medium">Datos bancarios:</p>
                  <p className="text-sm">Banco: Ejemplo Bank</p>
                  <p className="text-sm">Cuenta: 1234-5678-9012-3456</p>
                  <p className="text-sm">CLABE: 012345678901234567</p>
                  <p className="text-sm">Titular: DigitalHub S.A.</p>
                </div>
                <div className="space-y-2">
                  <Label>Subir comprobante de pago</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-purple-400 transition-colors">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Arrastra tu comprobante o haz click para seleccionar
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Referencia bancaria (opcional)</Label>
                  <Input placeholder="Número de referencia" />
                </div>
                <div className="space-y-2">
                  <Label>Notas adicionales (opcional)</Label>
                  <Textarea placeholder="Información adicional sobre tu pago" />
                </div>
              </CardContent>
            </Card>
          )}

          {paymentMethod === "qr" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" /> Pago por QR
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="mx-auto h-48 w-48 rounded-xl bg-white p-4 border flex items-center justify-center">
                  <QrCode className="h-32 w-32 text-gray-800" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Escanea este código QR con tu app de pagos para completar la transacción
                </p>
                <p className="text-lg font-bold">Total: ${finalTotal.toFixed(2)} USD</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right - Order Summary */}
        <div className="space-y-6">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => {
                const price = item.variant?.price ?? item.product.price;
                return (
                  <div
                    key={`${item.product.id}-${item.variant?.id || ""}`}
                    className="flex gap-3"
                  >
                    <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-muted shrink-0">
                      {item.product.image_url ? (
                        <Image
                          src={item.product.image_url}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center">
                          <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Cant: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">
                      ${(price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                );
              })}

              <Separator />

              {/* Coupon */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Código de cupón"
                    className="pl-10"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                </div>
                <Button variant="outline" onClick={handleApplyCoupon}>
                  Aplicar
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Prueba: WELCOME10 o SAVE5
              </p>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Descuento</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                size="lg"
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                {loading
                  ? "Procesando..."
                  : paymentMethod === "transfer"
                  ? "Confirmar Pedido"
                  : `Pagar $${finalTotal.toFixed(2)}`}
              </Button>

              {paymentMethod === "transfer" && (
                <Badge variant="secondary" className="w-full justify-center py-2">
                  El pedido quedará pendiente de validación
                </Badge>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
