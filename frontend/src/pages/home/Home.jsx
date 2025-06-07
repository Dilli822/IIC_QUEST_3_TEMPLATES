import Contact from "@/components/Contact";
import EmergencyContact from "@/components/EmergencyContact";
import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import FeelingBored from "@/components/FeelingBored";
import Hero from "@/components/Hero";
import JoinDiscussion from "@/components/JoinDiscussion";

import EventsModal from "@/components/EventsModal";
import randImag from "../../../public/images/download.jpeg";
import TermsAndServicesModal from "@/components/TermsAndServices";

function Home() {
  const title = "New Event";
  const image = randImag;
  const description =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati necessitatibus iste aspernatur beatae dolor molestiae, sint fuga repellat. Voluptate explicabo ullam ipsam nemo sit.";
  const showAgainInSec = "10000";

  return (
    <div className="max-w-7xl mx-auto flex flex-col p-5 md:p-0">
      <EventsModal
        title={title}
        image={image}
        description={description}
        showAgainInSec={showAgainInSec}
      />
      <TermsAndServicesModal/>
      <Hero />
      <Features />
      <EmergencyContact />
      <FAQ />
      <JoinDiscussion />
      <Contact />
      <FeelingBored />
    </div>
  );
}

export default Home;
