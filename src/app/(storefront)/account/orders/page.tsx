"use client";

import { Package, Clock, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ORDER_STATUS_LABELS } from "@/lib/constants";

const demoOrders = [
  {
    id: "1",
    order_number: "DH-20250428-0001",
    status: "delivered" as const,
    total: 15.97,
    created_at: "2025-04-25T10:30:00Z",
    items: [
      { product_name: "Netflix Premium", quantity: 1, unit_price: 5.99 },
      { product_name: "Spotify Premium", quantity: 1, unit_price: 3.99 },
      { product_name: "Disney+ Premium", quantity: 1, unit_price: 4.99 },
    ],
  },
  {
    id: "2",
    order_number: "DH-20250428-0002",
    status: "pending" as const,
    total: 12.99,
    created_at: "2025-04-27T15:00:00Z",
    items: [
      { product_name: "Xbox Game Pass Ultimate", quantity: 1, unit_price: 12.99 },
    ],
  },
];

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Mis Pedidos</h2>

      {demoOrders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Package className="h-16 w-16 opacity-20 mb-4" />
            <p className="text-lg font-medium">No tienes pedidos aún</p>
            <p className="text-sm">Tus pedidos aparecerán aquí</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {demoOrders.map((order) => {
            const status = ORDER_STATUS_LABELS[order.status];
            return (
              <Card key={order.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-base">{order.order_number}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {new Date(order.created_at).toLocaleDateString("es", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={status.color}>{status.label}</Badge>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>
                          {item.product_name} x{item.quantity}
                        </span>
                        <span className="font-medium">${item.unit_price.toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between pt-2 border-t font-semibold">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
