import HeroSection from "../Hero/HeroSection";
import WhyJoinSection from "../WhyJoin/WhyJoinSection";
import RecruitmentSection from "../Recruitment/RecruitmentSection";
import PositionsSection from "../Positions/PositionsSection";
import FAQSection from "../FAQ/FAQSection";
import Application from "../Application/ApplicationSection"
import AboutSection from "../About/AboutSection";

const CareerLanding=()=>{
  return(
    <main className="overflow-x-hidden bg-white">
      <HeroSection/>
      <AboutSection/>
      <PositionsSection/>
      <RecruitmentSection/>
      <WhyJoinSection/>
      <Application/>
      <FAQSection/>    
    </main>
  );
};

export default CareerLanding;