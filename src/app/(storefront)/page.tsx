import { Suspense } from "react";
import { HomeContent } from "@/components/home/home-content";
import { ProductGridSkeleton } from "@/components/shared/product-grid-skeleton";

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <ProductGridSkeleton />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
