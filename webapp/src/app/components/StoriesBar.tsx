import Image from "next/image";
import type { HydratedStory } from "../lib/utils";

type StoriesBarProps = {
  stories: HydratedStory[];
};

export function StoriesBar({ stories }: StoriesBarProps) {
  return (
    <section className="mb-6 flex gap-4 overflow-x-auto pb-2">
      {stories.map((story) => (
        <div key={story.id} className="flex w-20 flex-col items-center gap-2">
          <div
            className={`relative h-[70px] w-[70px] overflow-hidden rounded-full border-2 ${
              story.isLive
                ? "border-transparent bg-gradient-to-tr from-rose-500 via-amber-400 to-purple-500 p-[2px]"
                : "border-transparent bg-gradient-to-tr from-neutral-200 to-neutral-100 p-[2px] dark:from-neutral-800 dark:to-neutral-900"
            }`}
          >
            <div className="relative h-full w-full rounded-full bg-white p-[2px] dark:bg-neutral-950">
              <Image
                src={story.image}
                alt={`${story.user.username} story`}
                fill
                sizes="80px"
                className="rounded-full object-cover"
              />
            </div>
          </div>
          <span className="truncate text-xs text-neutral-500 dark:text-neutral-400">
            {story.user.username}
          </span>
        </div>
      ))}
    </section>
  );
}
