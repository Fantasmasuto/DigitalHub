"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, ProductVariant } from "@/types";

export interface LocalCartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

interface CartStore {
  items: LocalCartItem[];
  isOpen: boolean;
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setOpen: (open: boolean) => void;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (product, variant, quantity = 1) => {
        const items = get().items;
        const existing = items.find(
          (item) =>
            item.product.id === product.id &&
            (item.variant?.id || null) === (variant?.id || null)
        );

        if (existing) {
          set({
            items: items.map((item) =>
              item.product.id === product.id &&
              (item.variant?.id || null) === (variant?.id || null)
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ items: [...items, { product, variant, quantity }] });
        }
      },
      removeItem: (productId, variantId) => {
        set({
          items: get().items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                (item.variant?.id || null) === (variantId || null)
              )
          ),
        });
      },
      updateQuantity: (productId, quantity, variantId) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.product.id === productId &&
            (item.variant?.id || null) === (variantId || null)
              ? { ...item, quantity }
              : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      setOpen: (open) => set({ isOpen: open }),
      total: () =>
        get().items.reduce(
          (sum, item) =>
            sum + (item.variant?.price ?? item.product.price) * item.quantity,
          0
        ),
      itemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: "digitalhub-cart" }
  )
);
