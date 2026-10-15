import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="p-2 mt-2 text-center w-full text-4xl font-bold italic bg-white dark:bg-black dark:text-zink-50">Next.js JobListing</h1>
      <main className="flex h-full w-full max-w-7xl flex-col lg:flex-row gap-10 items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
           Find or Create Jobs
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            With AI Induced Job listings and Job Profiles
          </p>
          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
            <a
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
              href="/login"
            >

              Get Started
            </a>

          </div>
        </div>

        <div>
          <Image
            width={700}
            height={800}
            alt="hero image"
            src={'/image/hero-1.png'}
            className="rounded-2xl lg:rounded-4xl"
          />
        </div>
      </main>
    </div>
  );
}
