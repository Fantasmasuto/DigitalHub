"use client";

import { useState } from "react";
import { Search, Users, DollarSign, ShoppingCart, Eye, Mail, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const demoClients = [
  { id: "1", name: "Juan Pérez", email: "juan@email.com", orders: 8, totalSpent: 127.92, joined: "2025-01-15", lastOrder: "2025-04-28" },
  { id: "2", name: "María García", email: "maria@email.com", orders: 15, totalSpent: 245.85, joined: "2024-11-20", lastOrder: "2025-04-27" },
  { id: "3", name: "Carlos López", email: "carlos@email.com", orders: 3, totalSpent: 59.97, joined: "2025-03-10", lastOrder: "2025-04-26" },
  { id: "4", name: "Ana Martínez", email: "ana@email.com", orders: 22, totalSpent: 398.78, joined: "2024-08-05", lastOrder: "2025-04-25" },
  { id: "5", name: "Pedro Sánchez", email: "pedro@email.com", orders: 6, totalSpent: 89.94, joined: "2025-02-28", lastOrder: "2025-04-20" },
  { id: "6", name: "Laura Ramírez", email: "laura@email.com", orders: 12, totalSpent: 189.88, joined: "2024-12-01", lastOrder: "2025-04-22" },
  { id: "7", name: "Diego Torres", email: "diego@email.com", orders: 1, totalSpent: 5.99, joined: "2025-04-25", lastOrder: "2025-04-25" },
];

export default function AdminClientsPage() {
  const [search, setSearch] = useState("");

  const clients = demoClients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalClients = demoClients.length;
  const totalRevenue = demoClients.reduce((s, c) => s + c.totalSpent, 0);
  const avgValue = totalRevenue / totalClients;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Clientes</h2>
        <p className="text-muted-foreground">Gestiona tu base de clientes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Users className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-2xl font-bold">{totalClients}</p>
              <p className="text-xs text-muted-foreground">Total Clientes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">Revenue Total</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold">${avgValue.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">Valor Promedio</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar clientes..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Cliente</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Pedidos</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Gasto Total</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Registrado</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Último Pedido</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-purple-100 text-purple-700 text-xs">
                            {client.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-xs text-muted-foreground">{client.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <Badge variant="secondary">{client.orders}</Badge>
                    </td>
                    <td className="py-3 px-2 font-medium">${client.totalSpent.toFixed(2)}</td>
                    <td className="py-3 px-2 text-muted-foreground">
                      {new Date(client.joined).toLocaleDateString("es")}
                    </td>
                    <td className="py-3 px-2 text-muted-foreground">
                      {new Date(client.lastOrder).toLocaleDateString("es")}
                    </td>
                    <td className="py-3 px-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8" />}>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" /> Ver Perfil
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ShoppingCart className="mr-2 h-4 w-4" /> Ver Pedidos
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" /> Enviar Email
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
