import Hero from "@/components/sections/Hero";
import { getHero } from "@/lib/actions";

export const revalidate = 0;

export default async function Home() {
  const heroData = await getHero();
  return (
    <>
      <Hero data={heroData} />
    </>
  );
}
