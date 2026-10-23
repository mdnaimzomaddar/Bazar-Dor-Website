"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  // লগইন না থাকলে সাইন ইন পেজে পাঠাবে
  useEffect(() => {
    if (!isPending && !session) router.push("/signin");
  }, [isPending, session, router]);

  // সেশন লোড হলে নামের ঘর পূরণ করবে
  useEffect(() => {
    if (session?.user?.name) setName(session.user.name);
  }, [session?.user?.name]);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }

    setSaving(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setSaving(false);

    if (error) {
      toast.error(error.message || "আপডেট করা যায়নি, আবার চেষ্টা করুন");
      return;
    }
    toast.success("প্রোফাইল আপডেট হয়েছে");
    router.refresh();
  };

  if (isPending || !session) {
    return (
      <section className="bg-[#f0f5f0] px-4 py-12">
        <p className="text-center text-gray-500">লোড হচ্ছে...</p>
      </section>
    );
  }

  const user = session.user;
  const initial = (user.name || user.email || "?").charAt(0).toUpperCase();

  return (
    <section className="bg-[#f0f5f0] px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-5">
          <h1 className="text-3xl font-bold text-gray-900">আমার প্রোফাইল</h1>
          <p className="mt-1 text-sm text-gray-600">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* user card */}
        <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-[#fafcfa] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="h-16 w-16 rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-green-100 text-2xl font-bold text-green-700">
                {initial}
              </div>
            )}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-fit rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            ↩ সাইন আউট
          </button>
        </div>

        {/* edit form */}
        <div className="mt-5 rounded-2xl border border-gray-200 bg-[#fafcfa] p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">তথ্য</h2>

          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-gray-900">
                নাম
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#05893e] focus:ring-2 focus:ring-[#05893e]/20"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-gray-900">
                ইমেইল
              </label>
              <input
                id="email"
                type="email"
                value={user.email}
                disabled
                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-3 py-2.5 text-sm text-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={saving || name.trim() === user.name}
              className="rounded-lg bg-[#05893e] px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-800 disabled:opacity-60"
            >
              {saving ? "অপেক্ষা করুন..." : "আপডেট"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;