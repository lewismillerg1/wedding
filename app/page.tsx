import Hero from "@/components/Hero";
import EventDetails from "@/components/EventDetails";
import RSVPForm from "@/components/RSVPForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <EventDetails />
      <RSVPForm />
      <Footer />
    </main>
  );
}
