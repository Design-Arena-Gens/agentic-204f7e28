import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  demoUsers,
  formatCompactNumber,
  formatFullRelativeTime,
  hydratePosts,
} from "../../lib/utils";

type ProfilePageProps = {
  params: {
    username: string;
  };
};

export default function ProfilePage({ params }: ProfilePageProps) {
  const decodedUsername = decodeURIComponent(params.username);
  const user = demoUsers.find((profile) => profile.username === decodedUsername);

  if (!user) {
    notFound();
  }

  const posts = hydratePosts().filter((post) => post.user.id === user.id);

  return (
    <div className="min-h-screen bg-neutral-100 pb-20 dark:bg-neutral-950">
      <header className="border-b border-neutral-200 bg-white py-4 dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4">
          <Link
            href="/"
            className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-900"
          >
            ← Back to feed
          </Link>
          <span className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Moments
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 pt-10">
        <section className="flex flex-col gap-8 md:flex-row">
          <div className="relative h-36 w-36 self-center rounded-full border-4 border-white shadow-2xl md:h-48 md:w-48">
            <Image
              src={user.avatar}
              alt={user.name}
              fill
              sizes="200px"
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-center">
              <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
                {user.username}
              </h1>
              <div className="flex gap-3">
                <button className="rounded-lg border border-neutral-300 px-4 py-1.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-900">
                  Follow
                </button>
                <button className="rounded-lg border border-neutral-300 px-4 py-1.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-900">
                  Message
                </button>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-neutral-900 dark:text-neutral-200 md:justify-start">
              <span>
                <strong className="font-semibold">
                  {formatCompactNumber(user.posts)}
                </strong>{" "}
                posts
              </span>
              <span>
                <strong className="font-semibold">
                  {formatCompactNumber(user.followers)}
                </strong>{" "}
                followers
              </span>
              <span>
                <strong className="font-semibold">
                  {formatCompactNumber(user.following)}
                </strong>{" "}
                following
              </span>
            </div>
            <div className="mt-6 space-y-2">
              <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {user.name}
              </p>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                {user.bio}
              </p>
              {user.website ? (
                <a
                  href={user.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-sky-500 transition hover:text-sky-400"
                >
                  {user.website.replace(/^https?:\/\//, "")}
                </a>
              ) : null}
            </div>
          </div>
        </section>

        <section className="mt-12 border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
            Posts
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div key={post.id} className="group relative overflow-hidden rounded-2xl bg-neutral-200 dark:bg-neutral-900">
                <Image
                  src={post.image}
                  alt={post.caption}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 hidden items-center justify-center gap-6 bg-black/40 text-white backdrop-blur-sm group-hover:flex">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.42 4.58a5.5 5.5 0 0 0-7.78 0L12 5.22l-.64-.64a5.5 5.5 0 0 0-7.78 7.78l.64.64L12 21.35l7.78-7.35.64-.64a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    <span>{formatCompactNumber(post.likeCount)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span>{post.comments.length}</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 text-xs text-white opacity-0 transition group-hover:opacity-100">
                  <p className="font-semibold">{post.location}</p>
                  <p className="mt-1 line-clamp-2">{post.caption}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.2em]">
                    {formatFullRelativeTime(post.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
