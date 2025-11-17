import Image from "next/image";
import type { HydratedSuggestion } from "../lib/utils";
import type { User } from "../lib/types";

type SuggestionsPanelProps = {
  currentUser: User;
  suggestions: HydratedSuggestion[];
};

export function SuggestionsPanel({
  currentUser,
  suggestions,
}: SuggestionsPanelProps) {
  return (
    <aside className="sticky top-20 hidden w-[320px] flex-col gap-4 lg:flex">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14">
            <Image
              src={currentUser.avatar}
              alt={currentUser.name}
              fill
              sizes="56px"
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {currentUser.username}
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {currentUser.name}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="text-sm font-semibold text-sky-500 transition hover:text-sky-400"
        >
          Switch
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm font-semibold text-neutral-500 dark:text-neutral-400">
        <span>Suggested for you</span>
        <button
          type="button"
          className="text-xs font-semibold text-neutral-900 transition hover:text-neutral-600 dark:text-neutral-200 dark:hover:text-neutral-400"
        >
          See All
        </button>
      </div>

      <ul className="space-y-3">
        {suggestions.map((suggestion) => (
          <li key={suggestion.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10">
                <Image
                  src={suggestion.user.avatar}
                  alt={suggestion.user.name}
                  fill
                  sizes="40px"
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {suggestion.user.username}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {suggestion.reason}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="text-xs font-semibold text-sky-500 transition hover:text-sky-400"
            >
              Follow
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-xs leading-6 text-neutral-400">
        © {new Date().getFullYear()} Moments • Built for creators exploring the
        world together.
      </p>
    </aside>
  );
}
