"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SocialButtons from "../components/SocialButtons";
import { authClient } from "@/lib/auth-client";

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#05893e] focus:ring-2 focus:ring-[#05893e]/20";

const SignUpPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const update =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    if (form.password !== form.confirm) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    setSubmitting(true);

    const { error } = await authClient.signUp.email({
      name: form.name,
      email: form.email,
      password: form.password,
      callbackURL: "/",
    });

    setSubmitting(false);

    if (error) {
      toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
      return;
    }
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <section className="bg-[#f0f5f0] px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">অ্যাকাউন্ট তৈরি করুন</h1>
          <p className="mt-1 text-sm text-gray-600">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-[#fafcfa] p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-gray-900">
                নাম
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={update("name")}
                placeholder="যেমন: রহিম উদ্দিন"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-gray-900">
                ইমেইল
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={update("email")}
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
                value={form.password}
                onChange={update("password")}
                placeholder="কমপক্ষে ৮ অক্ষর"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="confirm" className="mb-1.5 block text-sm font-semibold text-gray-900">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                id="confirm"
                type="password"
                required
                minLength={8}
                value={form.confirm}
                onChange={update("confirm")}
                placeholder="আবার লিখুন"
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 rounded-lg bg-[#05893e] px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-800 disabled:opacity-60"
            >
              {submitting ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          <SocialButtons />

          <p className="mt-5 text-center text-sm text-gray-700">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="font-semibold text-[#05893e] hover:underline">
              সাইন ইন করুন
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

export default SignUpPage;