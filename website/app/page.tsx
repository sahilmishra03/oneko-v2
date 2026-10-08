import type { Metadata } from "next";
import Container from "@/components/container";
import { Header } from "@/components/header";
import { Install } from "@/components/install";
import { Playground } from "@/components/playground";
import { DottedSeparator } from "@/components/separator";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: site.name,
  description: site.description,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <Container>
      <Header />
      <DottedSeparator className="my-10" />
      <Playground />
      <DottedSeparator className="my-10" />
      <Install />
      <DottedSeparator className="my-10" />
    </Container>
  );
}
