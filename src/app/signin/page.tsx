"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SocialButtons from "../components/SocialButtons";
import { authClient } from "@/lib/auth-client";

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#05893e] focus:ring-2 focus:ring-[#05893e]/20";

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    setSubmitting(false);

    if (error) {
      toast.error(error.message || "সাইন ইন করা যায়নি, আবার চেষ্টা করুন");
      return;
    }
    toast.success("সাইন ইন সফল হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <section className="bg-[#f0f5f0] px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">সাইন ইন</h1>
          <p className="mt-1 text-sm text-gray-600">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-[#fafcfa] p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-gray-900">
                ইমেইল
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-gray-900">
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর"
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 rounded-lg bg-[#05893e] px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-800 disabled:opacity-60"
            >
              {submitting ? "অপেক্ষা করুন..." : "সাইন ইন"}
            </button>
          </form>

          <SocialButtons />

          <p className="mt-5 text-center text-sm text-gray-700">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" className="font-semibold text-[#05893e] hover:underline">
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link href="/" className="hover:text-[#05893e]">
            ← হোমে ফিরে যান
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignInPage;