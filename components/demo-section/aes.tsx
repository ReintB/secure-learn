"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function AES() {
  const [aesEncryptText, setAesEncryptText] = useState("");
  const [aesEncryptKey, setAesEncryptKey] = useState("");
  const [aesEncryptIV, setAesEncryptIV] = useState("");
  const [aesEncryptResult, setAesEncryptResult] = useState("");

  const [aesDecryptKey, setAesDecryptKey] = useState("");
  const [aesDecryptIV, setAesDecryptIV] = useState("");
  const [aesDecryptResult, setAesDecryptResult] = useState("");

  const [loadingEncrypt, setLoadingEncrypt] = useState(false);
  const [loadingDecrypt, setLoadingDecrypt] = useState(false);

  // Add utility functions for key and IV generation
  const generateAESKeyAndIV = () => {
    const chars = "0123456789abcdef";

    // Generate 256-bit key (64 hex characters)
    let key = "";
    for (let i = 0; i < 64; i++) {
      key += chars[Math.floor(Math.random() * chars.length)];
    }

    // Generate 128-bit IV (32 hex characters)
    let iv = "";
    for (let i = 0; i < 32; i++) {
      iv += chars[Math.floor(Math.random() * chars.length)];
    }

    return { key, iv };
  };

  // Update AES encryption function
  const handleAesEncrypt = () => {
    if (!aesEncryptText.trim()) {
      toast.error("The original text (Plaintext) cannot be empty!");
      return;
    }
    if (!aesEncryptKey) {
      toast.error("Key is required for AES encryption!");
      return;
    }
    if (!aesEncryptIV) {
      toast.error("IV is required for AES encryption!");
      return;
    }
    if (aesEncryptKey.length !== 64) {
      toast.error("Key must be 64 hex characters (256-bit)!");
      return;
    }
    if (aesEncryptIV.length !== 32) {
      toast.error("IV must be 32 hex characters (128-bit)!");
      return;
    }
    setLoadingEncrypt(true);
    setTimeout(() => {
      // Simulate AES encryption
      const combined = aesEncryptText + aesEncryptKey + aesEncryptIV;
      const encrypted = btoa(combined);
      setAesEncryptResult(encrypted);
      setLoadingEncrypt(false);
    }, 700);
  };

  // Update AES decryption function
  const handleAesDecrypt = () => {
    if (!aesEncryptResult.trim()) {
      toast.error("There is no encryption result to decrypt!");
      return;
    }
    if (!aesDecryptKey) {
      toast.error("Key is required for AES decryption!");
      return;
    }
    if (!aesDecryptIV) {
      toast.error("IV is required for AES decryption!");
      return;
    }
    if (aesDecryptKey.length !== 64) {
      toast.error("Key must be 64 hex characters (256-bit)!");
      return;
    }
    if (aesDecryptIV.length !== 32) {
      toast.error("IV must be 32 hex characters (128-bit)!");
      return;
    }
    setLoadingDecrypt(true);
    setTimeout(() => {
      try {
        const decoded = atob(aesEncryptResult);
        const result = decoded
          .replace(aesDecryptKey, "")
          .replace(aesDecryptIV, "");
        setAesDecryptResult(result);
      } catch {
        toast.error("Invalid base64 format!");
      }
      setLoadingDecrypt(false);
    }, 700);
  };

  // Add generate key and IV function (combined)
  const handleGenerateAESKeyAndIV = () => {
    const { key, iv } = generateAESKeyAndIV();
    setAesEncryptKey(key);
    setAesEncryptIV(iv);
  };

  return (
    <div className="space-y-8" data-aos="fade-up">
      {/* Encryption Section */}
      <div className="bg-green-50 dark:bg-green-950 rounded-2xl p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4 flex items-center">
          AES Encryption (Advanced Encryption Standard)
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
              Original Text (Plaintext)
            </label>
            <Textarea
              value={aesEncryptText}
              onChange={(e) => setAesEncryptText(e.target.value)}
              placeholder="Enter the original text to encrypt..."
              className="rounded-xl min-h-[100px] bg-white dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                Key [Hex - 256 bit]
              </label>
              <Input
                value={aesEncryptKey}
                onChange={(e) => setAesEncryptKey(e.target.value)}
                placeholder="Enter 64 hex characters..."
                className="rounded-xl bg-white dark:bg-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                IV [Hex - 128 bit]
              </label>
              <Input
                value={aesEncryptIV}
                onChange={(e) => setAesEncryptIV(e.target.value)}
                placeholder="Enter 32 hex characters..."
                className="rounded-xl bg-white dark:bg-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              onClick={handleGenerateAESKeyAndIV}
              variant="outline"
              className="rounded-xl flex-1 bg-white dark:bg-slate-900 dark:text-slate-100"
              type="button"
            >
              Generate Key & IV
            </Button>
            <Button
              onClick={handleAesEncrypt}
              className="rounded-xl bg-green-600 hover:bg-green-700 flex-1"
              disabled={loadingEncrypt}
            >
              {loadingEncrypt ? (
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
              ) : (
                "Encrypt"
              )}
            </Button>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
              Encryption Result
            </label>
            <div className="relative">
              <Textarea
                value={aesEncryptResult}
                readOnly
                placeholder="Encryption result will appear here..."
                className="rounded-xl min-h-[80px] bg-white dark:bg-slate-900 dark:text-slate-100"
              />
              {loadingEncrypt && (
                <span className="absolute right-4 top-4">
                  <Loader2 className="animate-spin text-green-600 dark:text-green-300" />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Decryption Section */}
      <div className="bg-blue-50 dark:bg-blue-950 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4 flex items-center">
          AES Decryption (Advanced Encryption Standard)
        </h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                Key [Hex - 256 bit]
              </label>
              <Input
                value={aesDecryptKey}
                onChange={(e) => setAesDecryptKey(e.target.value)}
                placeholder="Enter 64 hex characters..."
                className="rounded-xl bg-white dark:bg-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                IV [Hex - 128 bit]
              </label>
              <Input
                value={aesDecryptIV}
                onChange={(e) => setAesDecryptIV(e.target.value)}
                placeholder="Enter 32 hex characters..."
                className="rounded-xl bg-white dark:bg-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
          <Button
            onClick={handleAesDecrypt}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 w-full"
            disabled={loadingDecrypt}
          >
            {loadingDecrypt ? (
              <Loader2 className="animate-spin mr-2 h-5 w-5" />
            ) : (
              "Decrypt"
            )}
          </Button>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
              Decryption Result
            </label>
            <div className="relative">
              <Textarea
                value={aesDecryptResult}
                readOnly
                placeholder="Decryption result will appear here..."
                className="rounded-xl min-h-[80px] bg-white dark:bg-slate-900 dark:text-slate-100"
              />
              {loadingDecrypt && (
                <span className="absolute right-4 top-4">
                  <Loader2 className="animate-spin text-blue-600 dark:text-blue-300" />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
