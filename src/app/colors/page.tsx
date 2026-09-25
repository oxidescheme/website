import type { Metadata } from "next";
import { ColorsList } from "@/components/ColorsList";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "colors",
};

export default function ColorsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-5 pb-24 md:px-8">
      <PageIntro
        label="The palette"
        title="Colors."
        description="Neutral surfaces and text set the hierarchy. Equal-lightness accents give syntax and meaningful states their own voice."
      />
      <ColorsList />
    </main>
  );
}
