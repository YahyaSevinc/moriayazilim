import MissionVisionSection from "../components/about/MissionVisionSection";
import TeamSection from "../components/about/TeamSection";
import ValuesSection from "../components/about/ValuesSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <MissionVisionSection />
      <TeamSection />
      <ValuesSection />
    </div>
  );
}
