export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "DigitalHub";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const CATEGORIES = [
  { name: "Streaming", slug: "streaming", icon: "Tv", description: "Netflix, Disney+, Max, Prime Video y más" },
  { name: "Música", slug: "musica", icon: "Music", description: "Spotify, Apple Music, YouTube Music y más" },
  { name: "Gaming", slug: "gaming", icon: "Gamepad2", description: "Game Pass, Robux, Diamantes, Pavos y más" },
  { name: "Recargas", slug: "recargas", icon: "Smartphone", description: "Recargas de celular y datos móviles" },
  { name: "Gift Cards", slug: "gift-cards", icon: "Gift", description: "Tarjetas de regalo para todas las plataformas" },
  { name: "Otros Servicios", slug: "otros-servicios", icon: "Globe", description: "VPN, almacenamiento, software y más" },
] as const;

export const ORDER_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
  confirmed: { label: "Confirmado", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  processing: { label: "Procesando", color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300" },
  delivered: { label: "Entregado", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
  refunded: { label: "Reembolsado", color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300" },
};

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  stripe: "Tarjeta de crédito/débito",
  transfer: "Transferencia bancaria",
  qr: "Pago por QR",
};

export const PRODUCT_TYPE_LABELS: Record<string, string> = {
  profile: "Perfil",
  full_account: "Cuenta completa",
  membership: "Membresía",
  subscription: "Suscripción",
  gift_card: "Tarjeta de regalo",
  recharge: "Recarga",
  code: "Código",
};
