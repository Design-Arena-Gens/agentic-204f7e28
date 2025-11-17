'use client';

import { useState } from "react";
import Image from "next/image";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
  Smile,
} from "lucide-react";
import { formatCompactNumber, formatRelativeTime, getUserById } from "../lib/utils";
import type { HydratedPost } from "../lib/utils";
import type { User } from "../lib/types";

type PostCardProps = {
  post: HydratedPost;
  currentUser: User;
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
};

export function PostCard({
  post,
  currentUser,
  onToggleLike,
  onAddComment,
}: PostCardProps) {
  const [commentText, setCommentText] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const isLiked = post.likedBy.includes(currentUser.id);
  const primaryLiker = post.likedBy.find((id) => id !== currentUser.id);
  const primaryLikerUser = primaryLiker ? getUserById(primaryLiker) : null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const value = commentText.trim();
    if (!value) return;
    onAddComment(post.id, value);
    setCommentText("");
  };

  return (
    <article className="mb-6 rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <header className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12">
            <Image
              src={post.user.avatar}
              alt={post.user.name}
              fill
              sizes="48px"
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                {post.user.username}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                • {formatRelativeTime(post.createdAt)}
              </span>
            </div>
            {post.location ? (
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {post.location}
              </p>
            ) : null}
          </div>
        </div>
        <button
          className="rounded-full p-2 text-neutral-500 transition hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900"
          type="button"
          aria-label="More"
        >
          <MoreHorizontal size={20} />
        </button>
      </header>

      <div
        className="relative w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900"
        style={{
          aspectRatio: post.aspectRatio ? `${post.aspectRatio}` : "1/1",
        }}
      >
        <Image
          src={post.image}
          alt={post.caption}
          fill
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-cover transition duration-700 ease-out hover:scale-[1.01]"
          priority
        />
      </div>

      <footer className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="rounded-full p-2 text-neutral-700 transition hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-900"
              type="button"
              onClick={() => onToggleLike(post.id)}
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              <Heart
                className={isLiked ? "fill-rose-500 text-rose-500" : ""}
                size={24}
              />
            </button>
            <button
              className="rounded-full p-2 text-neutral-700 transition hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-900"
              type="button"
              aria-label="Comment"
            >
              <MessageCircle size={24} />
            </button>
            <button
              className="rounded-full p-2 text-neutral-700 transition hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-900"
              type="button"
              aria-label="Share"
            >
              <Send size={24} />
            </button>
          </div>
          <button
            className="rounded-full p-2 text-neutral-700 transition hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-900"
            type="button"
            onClick={() => setIsSaved((prev) => !prev)}
            aria-label={isSaved ? "Unsave" : "Save"}
          >
            <Bookmark className={isSaved ? "fill-neutral-900 dark:fill-neutral-100" : ""} />
          </button>
        </div>

        <div className="mt-2">
          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {formatCompactNumber(post.likeCount)} likes
          </p>
          <div className="mt-1">
            <p className="text-sm text-neutral-900 dark:text-neutral-100">
              <span className="font-semibold">{post.user.username}</span>{" "}
              {post.caption}
            </p>
          </div>
          {primaryLikerUser ? (
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              Liked by <span className="font-semibold">{primaryLikerUser.username}</span>
              {post.likedBy.length > 1 ? " and others" : ""}
            </p>
          ) : null}
          {post.comments.length > 0 ? (
            <div className="mt-2 space-y-1">
              {post.comments.map((comment) => (
                <p
                  key={comment.id}
                  className="text-sm text-neutral-900 dark:text-neutral-100"
                >
                  <span className="font-semibold">{comment.user.username}</span>{" "}
                  {comment.text}
                </p>
              ))}
            </div>
          ) : null}
        </div>

        <p className="mt-2 text-xs uppercase tracking-wide text-neutral-400">
          {formatRelativeTime(post.createdAt).toUpperCase()} AGO
        </p>

        <form onSubmit={handleSubmit} className="mt-3 flex items-center gap-2">
          <button
            type="button"
            className="rounded-full p-2 text-neutral-500 transition hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900"
            aria-label="Add emoji"
          >
            <Smile size={20} />
          </button>
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none dark:text-neutral-100"
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
          />
          <button
            type="submit"
            className="text-sm font-semibold text-sky-500 transition disabled:text-sky-300"
            disabled={!commentText.trim()}
          >
            Post
          </button>
        </form>
      </footer>
    </article>
  );
}
