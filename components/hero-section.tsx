"use client";

import { Button } from "@/components/ui/button";
import { Zap, BookOpen } from "lucide-react";
import GradientText from "@/animations/GradientText/GradientText";

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

export default function HeroSection({ scrollToSection }: HeroSectionProps) {
  return (
    <section className="relative min-h-[100vh] flex items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50 opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative w-full">
        <div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight tracking-tight">
            Welcome to{" "}
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
              className="custom-class"
            >
              SecureLearn
            </GradientText>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Learn the concepts of encryption and decryption easily, complete
            with interactive simulations!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => scrollToSection("lesson")}
              variant="outline"
              className="text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 px-8 py-4 text-lg rounded-xl transition-all duration-300"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Study the material
            </Button>
            <Button
              onClick={() => scrollToSection("demo")}
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:rotate-1"
            >
              <Zap className="mr-2 h-5 w-5 animate-pulse" />
              Try encryption now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
