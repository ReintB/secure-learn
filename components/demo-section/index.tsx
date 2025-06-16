"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CaesarCipher from "./caesar-cipher";
import AES from "./aes";
import RSA from "./rsa";

interface DemoSectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function DemoSection({
  activeTab,
  setActiveTab,
}: DemoSectionProps) {
  return (
    <section
      id="demo"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Try Encryption
          </h2>
          <p className="text-xl text-slate-600">
            Practice various encryption and decryption methods directly
          </p>
        </div>

        <Card className="rounded-2xl border-0 shadow-xl">
          <CardContent className="p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-100 rounded-lg p-1">
                <TabsTrigger value="caesar" className="rounded-lg">
                  Caesar Cipher
                </TabsTrigger>
                <TabsTrigger value="aes" className="rounded-lg">
                  AES
                </TabsTrigger>
                <TabsTrigger value="rsa" className="rounded-lg">
                  RSA
                </TabsTrigger>
              </TabsList>

              <TabsContent value="caesar">
                <CaesarCipher />
              </TabsContent>

              <TabsContent value="aes">
                <AES />
              </TabsContent>

              <TabsContent value="rsa">
                <RSA />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
