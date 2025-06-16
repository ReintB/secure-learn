import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Key, Lock, Shield, Users } from "lucide-react";

export default function LearnSection() {
  return (
    <section id="lesson" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Encryption & Decryption
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Understand the basics of data security with easy-to-understand
            explanations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardHeader className="p-6 pb-0 flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-slate-800">
                Understanding Encryption & Decryption
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6">
              <CardDescription className="text-slate-600 leading-relaxed text-base">
                Encryption is the process of converting original data
                (plaintext) into unreadable data (ciphertext). Decryption is the
                reverse process, converting ciphertext back to plaintext.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardHeader className="p-6 pb-0 flex items-center gap-3">
              <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-teal-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-slate-800">
                The Difference Between Them
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6">
              <CardDescription className="text-slate-600 leading-relaxed text-base">
                Encryption protects data by hiding it, while decryption reveals
                the hidden data. Both require the correct key to function
                properly.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardHeader className="p-6 pb-0 flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-slate-800">
                Purpose of Use
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6">
              <CardDescription className="text-slate-600 leading-relaxed text-base">
                Protecting data privacy, maintaining information
                confidentiality, preventing unauthorized access, and ensuring
                data integrity during transmission or storage.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Card 4 */}
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardHeader className="p-6 pb-0 flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                <Key className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-slate-800">
                Symmetric Encryption
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6">
              <CardDescription className="text-slate-600 leading-relaxed text-base">
                Uses the same key for encryption and decryption. Examples: AES,
                DES. Faster but requires secure key exchange.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Card 5 */}
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardHeader className="p-6 pb-0 flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                <Lock className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-slate-800">
                Asymmetric Encryption
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6">
              <CardDescription className="text-slate-600 leading-relaxed text-base">
                Uses a pair of keys (public and private key). Examples: RSA,
                ECC. More secure for key exchange but slower in processing.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Card 6 */}
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardHeader className="p-6 pb-0 flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-slate-800">
                Advantages & Disadvantages
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6">
              <CardDescription className="text-slate-600 leading-relaxed text-base">
                Advantages: High data security, privacy protection.
                Disadvantages: Requires computational resources, key management
                complexity.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
