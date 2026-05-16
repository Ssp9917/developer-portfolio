import { getPortfolioData } from "@/lib/portfolio";
import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";

export const revalidate = 60;

export default async function Home() {
  const portfolio = await getPortfolioData();

  return (
    <>
      <HeroSection personalData={portfolio.profile} />
      <AboutSection personalData={portfolio.profile} />
      <Experience experiences={portfolio.experiences} />
      <Skills skillsData={portfolio.skills} />
      <Projects projectsData={portfolio.projects} />
      <Education educations={portfolio.educations} />
      <ContactSection personalData={portfolio.profile} />
    </>
  );
}
