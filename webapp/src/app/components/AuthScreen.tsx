'use client';

import { useState } from "react";
import Image from "next/image";
import type { User } from "../lib/types";

type AuthScreenProps = {
  users: User[];
  onSelectUser: (user: User) => void;
};

export function AuthScreen({ users, onSelectUser }: AuthScreenProps) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const selectedUser =
      users.find((user) => user.username === username) ?? users[0];
    if (!username) {
      setError("Choose one of the demo accounts to continue.");
      return;
    }
    setError(null);
    onSelectUser(selectedUser);
  };

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-neutral-950/80 px-6 backdrop-blur-md">
      <div className="flex w-full max-w-4xl flex-col gap-10 rounded-3xl border border-neutral-800 bg-neutral-950/80 p-10 shadow-2xl lg:flex-row lg:items-center">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 rounded-full border border-neutral-800 px-3 py-1 text-xs uppercase tracking-[0.3em] text-neutral-400">
            Moments
          </div>
          <h1 className="mt-6 text-4xl font-semibold text-neutral-100 md:text-5xl">
            Share the moments that move you.
          </h1>
          <p className="mt-4 text-lg text-neutral-400">
            Pick a demo account and explore a fully interactive Instagram-style
            experience — stories, feeds, comments, and more.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6"
        >
          <div className="space-y-3">
            {users.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => {
                  setUsername(user.username);
                  setError(null);
                }}
                className={`flex w-full items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/60 p-3 text-left transition hover:border-sky-500 hover:bg-neutral-900 ${
                  username === user.username
                    ? "border-sky-500 bg-neutral-900"
                    : ""
                }`}
              >
                <div className="relative h-12 w-12">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    sizes="48px"
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-100">
                    {user.username}
                  </p>
                  <p className="text-xs text-neutral-500">{user.name}</p>
                </div>
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="mt-2 rounded-xl bg-sky-500 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
          >
            Continue
          </button>
          {error ? (
            <p className="text-xs text-rose-400">{error}</p>
          ) : (
            <p className="text-xs text-neutral-500">
              Demo logins only — no password required.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
