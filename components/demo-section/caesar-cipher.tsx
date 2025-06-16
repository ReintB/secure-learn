"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

export default function CaesarCipher() {
  // Demo states - Encryption
  const [caesarEncryptText, setCaesarEncryptText] = useState("");
  const [caesarEncryptKey, setCaesarEncryptKey] = useState("3");
  const [caesarEncryptResult, setCaesarEncryptResult] = useState("");

  // Demo states - Decryption
  const [caesarDecryptKey, setCaesarDecryptKey] = useState("3");
  const [caesarDecryptResult, setCaesarDecryptResult] = useState("");

  const [loadingEncrypt, setLoadingEncrypt] = useState(false);
  const [loadingDecrypt, setLoadingDecrypt] = useState(false);

  // Caesar Cipher implementation
  const caesarEncrypt = (text: string, shift: number) => {
    if (!text) return "";
    return text.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= "Z" ? 65 : 97;
      return String.fromCharCode(
        ((char.charCodeAt(0) - start + shift) % 26) + start
      );
    });
  };

  const caesarDecrypt = (text: string, shift: number) => {
    if (!text) return "";
    return caesarEncrypt(text, 26 - shift);
  };

  // Auto-encrypt Caesar Cipher when text or key changes
  useEffect(() => {
    if (caesarEncryptText && caesarEncryptKey) {
      setLoadingEncrypt(true);
      setTimeout(() => {
        const result = caesarEncrypt(
          caesarEncryptText,
          Number.parseInt(caesarEncryptKey) || 0
        );
        setCaesarEncryptResult(result);
        setLoadingEncrypt(false);
      }, 500);
    } else {
      setCaesarEncryptResult("");
    }
  }, [caesarEncryptText, caesarEncryptKey]);

  // Auto-decrypt Caesar Cipher when encrypted result or decrypt key changes
  useEffect(() => {
    if (caesarEncryptResult && caesarDecryptKey) {
      setLoadingDecrypt(true);
      setTimeout(() => {
        const result = caesarDecrypt(
          caesarEncryptResult,
          Number.parseInt(caesarDecryptKey) || 0
        );
        setCaesarDecryptResult(result);
        setLoadingDecrypt(false);
      }, 500);
    } else {
      setCaesarDecryptResult("");
    }
  }, [caesarEncryptResult, caesarDecryptKey]);

  return (
    <div className="space-y-8" data-aos="fade-up">
      {/* Encryption Section */}
      <div className="bg-green-50 dark:bg-green-950 rounded-2xl p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4 flex items-center">
          Caesar Cipher Encryption
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
              Original Text (Plaintext)
            </label>
            <Textarea
              value={caesarEncryptText}
              onChange={(e) => setCaesarEncryptText(e.target.value)}
              placeholder="Enter the original text to encrypt..."
              className="rounded-xl min-h-[100px] bg-white dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
              Shift Key
            </label>
            <Input
              type="number"
              value={caesarEncryptKey}
              onChange={(e) => setCaesarEncryptKey(e.target.value)}
              placeholder="Enter shift number (1-25)"
              className="rounded-xl bg-white dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
              Encryption Result (Automatic)
            </label>
            <div className="relative">
              <Textarea
                value={caesarEncryptResult}
                readOnly
                placeholder="Encryption result will appear automatically here..."
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
          Caesar Cipher Decryption
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
              Shift Key
            </label>
            <Input
              type="number"
              value={caesarDecryptKey}
              onChange={(e) => setCaesarDecryptKey(e.target.value)}
              placeholder="Enter shift number (1-25)"
              className="rounded-xl bg-white dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
              Decryption Result (Automatic)
            </label>
            <div className="relative">
              <Textarea
                value={caesarDecryptResult}
                readOnly
                placeholder="Decryption result will appear automatically here..."
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
