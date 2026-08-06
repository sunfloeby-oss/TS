import type { Metadata } from "next";

import { Container } from "@/components/home/container";
import { SectionHeading } from "@/components/home/section-heading";

export const metadata: Metadata = {
  title: "Tentang Kami — Terrashop20",
};

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="flex flex-1 flex-col">
        <section className="bg-paper py-16 sm:py-24">
          <Container className="flex flex-col gap-10">
            <SectionHeading
              eyebrow="Perusahaan"
              title="Tentang Terrashop20"
              description="Tas branded yang layak dimiliki lagi."
            />

            <div className="flex max-w-2xl flex-col gap-6 text-base leading-relaxed text-slate">
              <p>
                Terrashop20 lahir dari sebuah keresahan sederhana: tas
                branded berkualitas terlalu mahal untuk sering diganti, dan
                terlalu bagus untuk berhenti dipakai begitu tren berganti.
                Kami ingin membangun katalog preloved kecil dan terfokus
                yang membuat tas mewah lebih terjangkau, tanpa mengorbankan
                keaslian maupun kualitas.
              </p>
              <p>
                Setiap tas yang kami jual melewati proses kurasi dan
                autentikasi sebelum masuk katalog. Kami memeriksa kondisi,
                kelengkapan, dan keasliannya satu per satu, dan lebih
                memilih menawarkan lebih sedikit piece yang benar-benar
                terjamin daripada katalog yang dibuat penuh sekadar untuk
                terlihat ramai.
              </p>
              <p>
                Kami adalah tim kecil, dan kami membaca setiap pesan yang
                masuk melalui{" "}
                <a
                  href="/contact"
                  className="text-ink underline underline-offset-4 transition-colors hover:text-signal"
                >
                  halaman kontak
                </a>
                . Jika Anda punya pertanyaan tentang produk, pesanan, atau
                sekadar ingin menyapa, kami senang mendengarnya.
              </p>
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
}
