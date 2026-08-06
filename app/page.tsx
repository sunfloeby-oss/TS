import { HeroBanner } from "@/components/home/hero-banner";
import { NewArrivals } from "@/components/home/new-arrivals";
import { CategoriesSection } from "@/components/home/categories-section";
import { Footer } from "@/components/home/footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="flex flex-1 flex-col">
        <HeroBanner />
        <CategoriesSection />
        <NewArrivals />
      </main>
      <Footer />
    </div>
  );
}
