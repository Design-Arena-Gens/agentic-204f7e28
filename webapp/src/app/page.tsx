'use client';

import { useMemo, useState } from "react";
import { AuthScreen } from "./components/AuthScreen";
import { CreateModal } from "./components/CreateModal";
import { NavSidebar } from "./components/NavSidebar";
import { PostCard } from "./components/PostCard";
import { StoriesBar } from "./components/StoriesBar";
import { SuggestionsPanel } from "./components/SuggestionsPanel";
import { hydratePosts, hydrateStories, hydrateSuggestions, demoUsers } from "./lib/utils";
import type { HydratedPost } from "./lib/utils";
import type { User } from "./lib/types";

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [feedPosts, setFeedPosts] = useState<HydratedPost[]>(() => hydratePosts());

  const stories = useMemo(() => hydrateStories(), []);
  const suggestions = useMemo(() => hydrateSuggestions(), []);

  const handleToggleLike = (postId: string) => {
    if (!currentUser) return;
    setFeedPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const hasLiked = post.likedBy.includes(currentUser.id);
        const likedBy = hasLiked
          ? post.likedBy.filter((id) => id !== currentUser.id)
          : [...post.likedBy, currentUser.id];
        return {
          ...post,
          likedBy,
          likeCount: hasLiked ? Math.max(0, post.likeCount - 1) : post.likeCount + 1,
        };
      })
    );
  };

  const handleAddComment = (postId: string, text: string) => {
    if (!currentUser) return;
    const trimmed = text.trim();
    if (!trimmed) return;
    setFeedPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const newComment = {
          id: `c-${post.id}-${Date.now()}`,
          text: trimmed,
          user: currentUser,
          createdAt: new Date().toISOString(),
        };
        return {
          ...post,
          comments: [...post.comments, newComment],
        };
      })
    );
  };

  const filteredSuggestions = useMemo(() => {
    if (!currentUser) return suggestions;
    return suggestions.filter((suggestion) => suggestion.user.id !== currentUser.id);
  }, [currentUser, suggestions]);

  return (
    <div className="min-h-screen bg-neutral-100 pb-24 font-sans text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <CreateModal open={showCreateModal} onClose={() => setShowCreateModal(false)} />

      {currentUser ? (
        <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 pt-6 lg:px-8 lg:pt-10">
          <div className="hidden lg:block">
            <NavSidebar
              currentUser={currentUser}
              onOpenCreateModal={() => setShowCreateModal(true)}
              onLogout={() => setCurrentUser(null)}
            />
          </div>

          <main className="flex-1 lg:pl-4">
            <div className="mx-auto w-full max-w-[620px]">
              <StoriesBar stories={stories} />
              <div className="space-y-6">
                {feedPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    currentUser={currentUser}
                    onToggleLike={handleToggleLike}
                    onAddComment={handleAddComment}
                  />
                ))}
              </div>
            </div>
          </main>

          <SuggestionsPanel currentUser={currentUser} suggestions={filteredSuggestions} />

          <div className="lg:hidden">
            <NavSidebar
              currentUser={currentUser}
              onOpenCreateModal={() => setShowCreateModal(true)}
              onLogout={() => setCurrentUser(null)}
            />
          </div>
        </div>
      ) : (
        <AuthScreen users={demoUsers} onSelectUser={setCurrentUser} />
      )}
    </div>
  );
}
