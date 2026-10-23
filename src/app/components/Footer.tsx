import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white px-4 py-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-gray-700">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p className="text-sm text-gray-500">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
