"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function RSA() {
  const [rsaEncryptText, setRsaEncryptText] = useState("");
  const [rsaEncryptPublicKey, setRsaEncryptPublicKey] = useState("");
  const [rsaEncryptResult, setRsaEncryptResult] = useState("");

  const [rsaDecryptPrivateKey, setRsaDecryptPrivateKey] = useState("");
  const [rsaDecryptResult, setRsaDecryptResult] = useState("");

  const [loadingEncrypt, setLoadingEncrypt] = useState(false);
  const [loadingDecrypt, setLoadingDecrypt] = useState(false);

  const generateRSAKeyPair = () => {
    // More realistic RSA key generation for demo purposes
    const timestamp = Date.now().toString();
    const random1 = Math.random().toString(36).substring(2, 15);
    const random2 = Math.random().toString(36).substring(2, 15);
    const random3 = Math.random().toString(36).substring(2, 15);
    const random4 = Math.random().toString(36).substring(2, 15);

    // Create different public and private keys
    const publicKeyData = btoa(timestamp + random1 + random2)
      .replace(/[^a-zA-Z0-9]/g, "")
      .substring(0, 40);
    const privateKeyData = btoa(random3 + random4 + timestamp)
      .replace(/[^a-zA-Z0-9]/g, "")
      .substring(0, 40);

    const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA${publicKeyData}
${btoa(random1).substring(0, 40)}QIDAQAB
-----END PUBLIC KEY-----`;

    const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC${privateKeyData}
${btoa(random2).substring(0, 40)}QIDAQABAoIBAQC${btoa(random3).substring(0, 40)}
${btoa(random4).substring(0, 40)}
-----END PRIVATE KEY-----`;

    return { publicKey, privateKey };
  };

  const handleGenerateRSAKeys = () => {
    const { publicKey, privateKey } = generateRSAKeyPair();
    setRsaEncryptPublicKey(publicKey);
    setRsaDecryptPrivateKey(privateKey);
  };

  const handleRsaEncrypt = () => {
    if (!rsaEncryptText.trim()) {
      toast.error("Original text (Plaintext) cannot be empty!");
      return;
    }
    if (!rsaEncryptPublicKey) {
      toast.error("Public key is required for RSA encryption!");
      return;
    }
    setLoadingEncrypt(true);
    setTimeout(() => {
      // Extract a unique identifier from the public key for encryption
      const keyIdentifier = rsaEncryptPublicKey
        .replace(/[^a-zA-Z0-9]/g, "")
        .substring(50, 100);
      const encrypted = btoa(rsaEncryptText + "|" + keyIdentifier);
      setRsaEncryptResult(`RSA_ENCRYPTED:${encrypted}`);
      setLoadingEncrypt(false);
    }, 700);
  };

  const handleRsaDecrypt = () => {
    if (!rsaEncryptResult.trim()) {
      toast.error("There is no encryption result to decrypt!");
      return;
    }
    if (!rsaDecryptPrivateKey) {
      toast.error("Private key is required for RSA decryption!");
      return;
    }
    setLoadingDecrypt(true);
    setTimeout(() => {
      try {
        if (rsaEncryptResult.startsWith("RSA_ENCRYPTED:")) {
          const encoded = rsaEncryptResult.replace("RSA_ENCRYPTED:", "");
          const decoded = atob(encoded);

          // Extract the key identifier from the private key
          const privateKeyIdentifier = rsaDecryptPrivateKey
            .replace(/[^a-zA-Z0-9]/g, "")
            .substring(50, 100);

          // Check if the keys match (simplified verification)
          if (decoded.includes("|")) {
            const [plaintext, encryptedKeyId] = decoded.split("|");

            // Simple key matching (in real RSA, this would be cryptographic verification)
            if (
              privateKeyIdentifier.substring(0, 20) ===
              encryptedKeyId.substring(0, 20)
            ) {
              setRsaDecryptResult(plaintext);
            } else {
              toast.error(
                "Private key does not match the public key used for encryption!"
              );
            }
          } else {
            toast.error("Invalid ciphertext format!");
          }
        } else {
          toast.error("Invalid ciphertext format!");
        }
      } catch {
        toast.error("Decryption failed!");
      }
      setLoadingDecrypt(false);
    }, 700);
  };

  return (
    <div className="space-y-8" data-aos="fade-up">
      {/* Encryption Section */}
      <div className="bg-green-50 dark:bg-green-950 rounded-2xl p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4 flex items-center">
          RSA Encryption (Rivest-Shamir-Adleman)
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
              Original Text (Plaintext)
            </label>
            <Textarea
              value={rsaEncryptText}
              onChange={(e) => setRsaEncryptText(e.target.value)}
              placeholder="Enter the original text to encrypt..."
              className="rounded-xl min-h-[100px] bg-white dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 space-y-2 sm:space-y-0">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                Public Key
              </label>
              <Button
                onClick={handleGenerateRSAKeys}
                variant="outline"
                size="sm"
                className="rounded-xl bg-white dark:bg-slate-900 dark:text-slate-100 w-full sm:w-auto"
                type="button"
              >
                Generate Public/Private Key
              </Button>
            </div>
            <Textarea
              value={rsaEncryptPublicKey}
              onChange={(e) => setRsaEncryptPublicKey(e.target.value)}
              placeholder="-----BEGIN PUBLIC KEY-----..."
              className="rounded-xl min-h-[120px] font-mono text-xs bg-white dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
          <Button
            onClick={handleRsaEncrypt}
            className="w-full rounded-xl bg-green-600 hover:bg-green-700"
            disabled={loadingEncrypt}
          >
            {loadingEncrypt ? (
              <Loader2 className="animate-spin mr-2 h-5 w-5" />
            ) : (
              "Encrypt"
            )}
          </Button>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
              Encryption Result
            </label>
            <div className="relative">
              <Textarea
                value={rsaEncryptResult}
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
          RSA Decryption (Rivest-Shamir-Adleman)
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
              Private Key
            </label>
            <Textarea
              value={rsaDecryptPrivateKey}
              onChange={(e) => setRsaDecryptPrivateKey(e.target.value)}
              placeholder="-----BEGIN PRIVATE KEY-----..."
              className="rounded-xl min-h-[120px] font-mono text-xs bg-white dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
          <Button
            onClick={handleRsaDecrypt}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700"
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
                value={rsaDecryptResult}
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
