"use client";

import { useState } from "react";
import HeroSection from "@/components/hero-section";
import LearnSection from "@/components/material-section";
import DemoSection from "@/components/demo-section";
import Footer from "@/components/footer";

export default function LearnEncryption() {
  const [activeTab, setActiveTab] = useState("caesar");

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <HeroSection scrollToSection={scrollToSection} />
      <LearnSection />
      <DemoSection activeTab={activeTab} setActiveTab={setActiveTab} />
      <Footer />
    </div>
  );
}
