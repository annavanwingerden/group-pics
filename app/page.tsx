'use client'
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="container mx-auto px-4 sm:px-6 py-4 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/grouppics.svg"
              alt="Logo"
              width={100}
              height={26}
              className="dark:invert w-24 sm:w-32"
            />
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/sign-in" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Login</Link>
            <Link href="/sign-up" className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 text-sm sm:text-base">
              Get Started
            </Link>
          </div>
          <button className="md:hidden text-gray-600 dark:text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-24">
        <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
              When the trip <span className="text-blue-600">*actually*</span> made it out of the group chat.
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              Finally, a dead-simple way to share and relive your group trip memories — without losing quality, juggling platforms, or leaving anyone out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/sign-up" className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl">
                🎉 Start Sharing for Free
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 sm:mt-10 md:mt-0">
            <Image
              src="/group-trip-hero-alt.jpg"
              alt="Trip Photo Sharing"
              width={600}
              height={400}
              className="w-full rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-12 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12">
            Sharing photos after a group trip shouldn&apos;t be this hard.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-700 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">💔</div>
              <p className="text-base sm:text-lg font-medium">Airdrop? Not for Android friends.</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📦</div>
              <p className="text-base sm:text-lg font-medium">Google Drive? Oops, your storage is full.</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">😩</div>
              <p className="text-base sm:text-lg font-medium">WhatsApp? Hello, pixel soup.</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🔄</div>
              <p className="text-base sm:text-lg font-medium">Dropbox? Wait, who uploaded what where?</p>
            </div>
          </div>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mt-8 sm:mt-12 font-medium">
            Group photo dumps get messy. We make them easy.
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-12 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12">
            A seamless space to gather and relive the best moments.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 text-left max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-700 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-2xl mb-3 sm:mb-4">🔗</div>
              <p className="text-base sm:text-lg font-medium">One link to share with the whole group</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-2xl mb-3 sm:mb-4">📸</div>
              <p className="text-base sm:text-lg font-medium">Upload full-res photos & videos — no quality loss</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-2xl mb-3 sm:mb-4">🛡️</div>
              <p className="text-base sm:text-lg font-medium">Private & secure access for just your group</p>
            </div>
          </div>
          <div className="mt-8 sm:mt-12">
          <Link href="/sign-up" className="mt-8 sm:mt-12 bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl">
            ✨ Create Your First Album Now
          </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 text-left max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-700 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-2xl mb-3 sm:mb-4">1️⃣</div>
              <p className="text-base sm:text-lg font-medium">Create a new trip album</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-2xl mb-3 sm:mb-4">2️⃣</div>
              <p className="text-base sm:text-lg font-medium">Invite your group with one link</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-2xl mb-3 sm:mb-4">3️⃣</div>
              <p className="text-base sm:text-lg font-medium">Everyone uploads their photos</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-2xl mb-3 sm:mb-4">4️⃣</div>
              <p className="text-base sm:text-lg font-medium">Everyone can download all photos</p>
            </div>
          </div>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mt-8 sm:mt-12 font-medium">
            Simple. No apps. No stress.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12">
            Why People Love It
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 text-left max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-700 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <p className="text-base sm:text-lg italic text-gray-600 dark:text-gray-300">&ldquo;Way better than the Google Drive chaos. We actually looked at the photos this time.&rdquo;</p>
              <p className="mt-3 sm:mt-4 font-semibold text-gray-900 dark:text-white">— Sofia, Amsterdam Trip 2024</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <p className="text-base sm:text-lg italic text-gray-600 dark:text-gray-300">&ldquo;Finally something that just works — even for my Android friends.&rdquo;</p>
              <p className="mt-3 sm:mt-4 font-semibold text-gray-900 dark:text-white">— Jay, Birthday Weekend</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <p className="text-base sm:text-lg italic text-gray-600 dark:text-gray-300">&ldquo;It&apos;s like a digital scrapbook. We all got nostalgic 5 minutes in.&rdquo;</p>
              <p className="mt-3 sm:mt-4 font-semibold text-gray-900 dark:text-white">— Ayesha, Road Trip Crew</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-24 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Ready to stop losing your best memories to the group chat void?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Start your first album in seconds — it&apos;s free, and your group will thank you.
          </p>
          <Link href="/sign-up" className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl">
            📸 Start Sharing for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800 py-8 sm:py-12" id="contact">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Image
                src="/grouppics.svg"
                alt="Logo"
                width={80}
                height={20}
                className="dark:invert w-20 sm:w-24"
              />
            </div>
            <div className="flex space-x-6 sm:space-x-8">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm sm:text-base">About</a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm sm:text-base">Privacy</a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm sm:text-base">Terms</a>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 text-center text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          Made with love for trip groups everywhere.❤️
          </div>
        </div>
      </footer>
    </div>
  );
}