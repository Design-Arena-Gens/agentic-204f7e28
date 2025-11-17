'use client';

import Image from "next/image";
import Link from "next/link";
import {
  Clapperboard,
  Heart,
  Home,
  Menu,
  MessageCircle,
  PlusSquare,
  Search,
  User,
} from "lucide-react";
import type { User as UserType } from "../lib/types";

type NavSidebarProps = {
  currentUser: UserType;
  onOpenCreateModal?: () => void;
  onLogout?: () => void;
};

const navItems = [
  { id: "home", label: "Home", icon: Home, href: "/" },
  { id: "search", label: "Search", icon: Search, href: "#" },
  { id: "explore", label: "Explore", icon: Clapperboard, href: "#" },
  { id: "messages", label: "Messages", icon: MessageCircle, href: "#" },
  { id: "notifications", label: "Notifications", icon: Heart, href: "#" },
];

export function NavSidebar({
  currentUser,
  onOpenCreateModal,
  onLogout,
}: NavSidebarProps) {
  return (
    <aside className="fixed bottom-0 left-0 right-0 z-20 border-t border-neutral-200 bg-white py-2 dark:border-neutral-800 dark:bg-neutral-950 lg:static lg:h-screen lg:w-64 lg:border-t-0 lg:border-r lg:py-6">
      <div className="mx-auto flex max-w-xl items-center justify-between px-4 lg:block lg:px-6">
        <div className="hidden lg:mb-8 lg:flex lg:items-center lg:gap-3">
          <div className="relative h-11 w-11">
            <Image
              src="/logo.svg"
              alt="Moments"
              fill
              sizes="44px"
              className="object-contain"
            />
          </div>
          <span className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Moments
          </span>
        </div>

        <nav className="flex w-full justify-between lg:block">
          <ul className="flex w-full items-center justify-between lg:flex-col lg:gap-2">
            {navItems.map((item) => (
              <li key={item.id} className="w-full">
                <Link
                  href={item.href}
                  className="group flex h-12 items-center justify-center gap-3 rounded-full px-4 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-900 lg:justify-start"
                >
                  <item.icon className="h-6 w-6" />
                  <span className="hidden lg:inline">{item.label}</span>
                </Link>
              </li>
            ))}
            <li className="w-full lg:hidden">
              <button
                type="button"
                onClick={onOpenCreateModal}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-full px-4 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-900"
              >
                <PlusSquare className="h-6 w-6" />
                <span className="hidden lg:inline">Create</span>
              </button>
            </li>
            <li className="hidden w-full lg:block">
              <button
                type="button"
                onClick={onOpenCreateModal}
                className="flex h-12 w-full items-center gap-3 rounded-full px-4 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-900"
              >
                <PlusSquare className="h-6 w-6" />
                <span>Create</span>
              </button>
            </li>
            <li className="hidden w-full lg:block">
              <Link
                href={`/profile/${currentUser.username}`}
                className="group flex h-12 items-center gap-3 rounded-full px-4 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-900"
              >
                <div className="relative h-8 w-8">
                  <Image
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    fill
                    sizes="32px"
                    className="rounded-full object-cover"
                  />
                </div>
                <span>Profile</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="hidden flex-col gap-2 lg:mt-auto lg:flex">
          <button
            type="button"
            className="flex h-12 items-center gap-3 rounded-full px-4 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-900"
            onClick={onOpenCreateModal}
          >
            <PlusSquare className="h-6 w-6" />
            <span>Create</span>
          </button>
          <button
            type="button"
            className="flex h-12 items-center gap-3 rounded-full px-4 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-900"
            onClick={onLogout}
          >
            <User className="h-6 w-6" />
            <span>Switch</span>
          </button>
          <button
            type="button"
            className="flex h-12 items-center gap-3 rounded-full px-4 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-900"
          >
            <Menu className="h-6 w-6" />
            <span>More</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
