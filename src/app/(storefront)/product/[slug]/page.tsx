import { ProductDetail } from "@/components/products/product-detail";
import { DEMO_PRODUCTS } from "@/lib/demo-data";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = DEMO_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = DEMO_PRODUCTS.filter(
    (p) => p.category_id === product.category_id && p.id !== product.id
  ).slice(0, 4);

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
