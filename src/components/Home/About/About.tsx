import { SectionFrame } from "@/components/motion/SectionFrame";
import HeroSection from "./HeroSection";
import MissionSection from "./MissionSection";
import EmpoweringSection from "./EmpoweringSection";
import VisionSection from "./VisionSection";
import TechnologySection from "./TechnologySection";
import SupportSection from "./SupportSection";
import CollaborationSection from "./CollaborationSection";
import FutureSection from "./FutureSection";
import CTASection from "./CTASection";
// import CommonWrapper from "@/common/CommonWrapper";

const About = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <SectionFrame pad="none"><HeroSection /></SectionFrame>
      <SectionFrame pad="none"><MissionSection /></SectionFrame>
      <SectionFrame pad="none"><EmpoweringSection /></SectionFrame>
      <SectionFrame pad="none"><VisionSection /></SectionFrame>
      <SectionFrame pad="none"><TechnologySection /></SectionFrame>
      <SectionFrame pad="none"><SupportSection /></SectionFrame>
      <SectionFrame pad="none"><CollaborationSection /></SectionFrame>
      <SectionFrame pad="none"><FutureSection /></SectionFrame>
      <SectionFrame pad="none"><CTASection /></SectionFrame>
    </div>
  );
};

export default About;
