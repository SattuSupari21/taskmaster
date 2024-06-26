import Header from "@/components/Header";
import MainBody from "@/components/MainBody";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      <MainBody />
    </main>
  );
}
