import FAQs from "@/components/FAQs";
import Hero1 from "@/components/Hero1";
import Hero2 from "@/components/Hero2";
import Hero5 from "@/components/Hero5";
// import News from "@/components/News";
// import OnGoingProjects from "@/components/OnGoingProjects";
import SocialSection from "@/components/SocialSection";
import VillageStats from "@/components/VillageStats";

export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <Hero1 />
      <Hero2 />
      <VillageStats />
      <FAQs />
      {/* <News /> */}
      {/* <OnGoingProjects /> */}
      <Hero5 />
      <SocialSection />
    </div>
  );
}
