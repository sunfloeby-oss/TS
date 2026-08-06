import type { Metadata } from "next";

import { Container } from "@/components/home/container";
import { SectionHeading } from "@/components/home/section-heading";

export const metadata: Metadata = {
  title: "Keberlanjutan — Terrashop20",
};

const COMMITMENTS = [
  {
    title: "Fashion Sirkular",
    body: "Setiap tas yang kami jual kembali memperpanjang usia pakainya, mengurangi limbah fashion dan kebutuhan akan produksi baru.",
  },
  {
    title: "Diperiksa, Bukan Ditebak",
    body: "Kami tidak asal menerima titipan — setiap tas melalui proses autentikasi dan pemeriksaan kondisi sebelum masuk katalog kami.",
  },
  {
    title: "Sumber Terpercaya",
    body: "Kami bekerja sama dengan penjual dan mitra yang kami kenal dan percaya, bukan pemasok anonim yang terus berganti.",
  },
] as const;

export default function SustainabilityPage() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="flex flex-1 flex-col">
        <section className="bg-paper py-16 sm:py-24">
          <Container className="flex flex-col gap-12">
            <SectionHeading
              eyebrow="Perusahaan"
              title="Keberlanjutan"
              description="Memperpanjang usia pakai tas branded bukan sekadar slogan. Berikut artinya dalam praktik."
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {COMMITMENTS.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-2 rounded-2xl border border-line p-6"
                >
                  <h3 className="font-serif text-lg font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <p className="max-w-2xl text-base leading-relaxed text-slate">
              Kami adalah tim kecil dan pekerjaan ini terus berlanjut — jika Anda
              memiliki pertanyaan tentang produk atau bahan tertentu, hubungi kami melalui{" "}
              <a
                href="/contact"
                className="text-ink underline underline-offset-4 transition-colors hover:text-signal"
              >
                halaman kontak
              </a>{" "}
              dan kami akan membalas langsung.
            </p>
          </Container>
        </section>
      </main>
    </div>
  );
}
