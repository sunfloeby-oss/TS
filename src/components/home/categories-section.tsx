import { Container } from "@/components/home/container";
import { Reveal } from "@/components/home/reveal";
import { SectionHeading } from "@/components/home/section-heading";
import { CategoryCard } from "@/components/home/category-card";
import { EmptyState } from "@/components/home/empty-state";

// This section's own motion signature — a clean, quiet ease-out with no
// overshoot, distinct from the other homepage sections' curves.
const EASING = "cubic-bezier(0.19, 1, 0.22, 1)";
const DURATION = 620;
const STAGGER = 65;

// Fixed, curated categories (not pulled from the DB).
const CATEGORIES = [
  {
    id: "tas",
    name: "Tas",
    slug: "tas",
    imageUrl:
      "https://res.cloudinary.com/dlg1frxo/image/upload/v1786011486/terrashop20/products/sa3szslcuony6mw1uzli.png",
    productCount: 0,
  },
  {
    id: "pouch",
    name: "Pouch",
    slug: "pouch",
    imageUrl:
      "https://res.cloudinary.com/dlg1frxo/image/upload/v1786203739/terrashop20/products/kh48a4tbgfkhuealzfe5.jpg",
    productCount: 0,
  },
];

export async function CategoriesSection() {
  const categories = CATEGORIES;

  return (
    <section className="bg-paper py-14 sm:py-32">
      <Container className="flex flex-col gap-7 px-5 sm:gap-12 sm:px-6">
        <Reveal variant="fade-up" duration={DURATION} easing={EASING}>
          <SectionHeading
            eyebrow="Koleksi kami"
            title="Belanja per Kategori"
            description="Tas branded preloved pilihan dari berbagai gaya dan merek — setiap piece diperiksa dan diautentikasi sebelum masuk katalog kami."
            compact
          />
        </Reveal>

        {categories.length > 0 ? (
          <Reveal
            as="div"
            className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3"
            variant="fade-up"
            stagger
            duration={DURATION}
            easing={EASING}
            staggerDelay={STAGGER}
          >
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </Reveal>
        ) : (
          <EmptyState message="Kategori akan muncul di sini setelah ditambahkan ke katalog." />
        )}
      </Container>
    </section>
  );
}
