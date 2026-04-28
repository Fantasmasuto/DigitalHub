export type UserRole = "user" | "admin";
export type OrderStatus = "pending" | "confirmed" | "processing" | "delivered" | "cancelled" | "refunded";
export type PaymentMethod = "stripe" | "transfer" | "qr";
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";
export type ProductType = "profile" | "full_account" | "membership" | "subscription" | "gift_card" | "recharge" | "code";

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  display_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  role: UserRole;
  address: Record<string, string>;
  payment_info: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price: number;
  compare_at_price: number | null;
  cost_price: number | null;
  category_id: string | null;
  product_type: ProductType;
  image_url: string | null;
  images: string[];
  stock: number;
  is_active: boolean;
  is_featured: boolean;
  metadata: Record<string, unknown>;
  tags: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
  category?: Category;
  variants?: ProductVariant[];
  reviews?: Review[];
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  price: number;
  compare_at_price: number | null;
  stock: number;
  sku: string | null;
  attributes: Record<string, unknown>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  variant_id: string | null;
  quantity: number;
  created_at: string;
  updated_at: string;
  product?: Product;
  variant?: ProductVariant;
}

export interface Favorite {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  product?: Product;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  status: OrderStatus;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  coupon_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
  payment?: Payment;
  profile?: Profile;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id: string | null;
  product_name: string;
  product_image: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  credentials: Record<string, string>;
  delivered_at: string | null;
  created_at: string;
}

export interface Payment {
  id: string;
  order_id: string;
  user_id: string;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  currency: string;
  stripe_payment_id: string | null;
  stripe_session_id: string | null;
  receipt_url: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ManualPaymentReceipt {
  id: string;
  payment_id: string;
  user_id: string;
  receipt_image_url: string;
  bank_reference: string | null;
  notes: string | null;
  verified_by: string | null;
  verified_at: string | null;
  created_at: string;
}

export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  profile?: Profile;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  link: string | null;
  created_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string | null;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  min_purchase: number;
  max_uses: number | null;
  used_count: number;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SalesAnalytics {
  id: string;
  date: string;
  total_sales: number;
  total_orders: number;
  total_revenue: number;
  avg_order_value: number;
  new_customers: number;
  category_breakdown: Record<string, number>;
  product_breakdown: Record<string, number>;
  created_at: string;
}

export interface AdminLog {
  id: string;
  admin_id: string;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  details: Record<string, unknown>;
  ip_address: string | null;
  created_at: string;
}

export interface Inventory {
  id: string;
  product_id: string;
  variant_id: string | null;
  credentials: Record<string, string>;
  is_sold: boolean;
  sold_at: string | null;
  order_id: string | null;
  created_at: string;
}
