import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">DH</span>
              </div>
              <span className="text-xl font-bold">{APP_NAME}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Tu marketplace de confianza para plataformas de streaming, videojuegos, recargas y servicios digitales.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Categorías</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/?category=streaming" className="hover:text-foreground transition-colors">Streaming</Link></li>
              <li><Link href="/?category=musica" className="hover:text-foreground transition-colors">Música</Link></li>
              <li><Link href="/?category=gaming" className="hover:text-foreground transition-colors">Gaming</Link></li>
              <li><Link href="/?category=recargas" className="hover:text-foreground transition-colors">Recargas</Link></li>
              <li><Link href="/?category=gift-cards" className="hover:text-foreground transition-colors">Gift Cards</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Mi Cuenta</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/account/profile" className="hover:text-foreground transition-colors">Mi Perfil</Link></li>
              <li><Link href="/account/orders" className="hover:text-foreground transition-colors">Mis Pedidos</Link></li>
              <li><Link href="/account/favorites" className="hover:text-foreground transition-colors">Favoritos</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Soporte</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">Centro de Ayuda</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Términos y Condiciones</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Política de Privacidad</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Contacto</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
