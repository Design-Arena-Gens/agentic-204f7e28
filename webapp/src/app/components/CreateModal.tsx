'use client';

import { X, UploadCloud } from "lucide-react";

type CreateModalProps = {
  open: boolean;
  onClose: () => void;
};

export function CreateModal({ open, onClose }: CreateModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 px-6 backdrop-blur">
      <div className="w-full max-w-xl rounded-3xl border border-neutral-800 bg-neutral-900 p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Create new post</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-neutral-700 bg-neutral-950/40 p-10 text-center">
          <UploadCloud size={42} className="text-sky-400" />
          <p className="text-base font-medium text-neutral-200">
            Drag & drop photos or videos here
          </p>
          <p className="text-sm text-neutral-500">
            This demo focuses on interactions. Uploading is simulated, but the
            UI is production-ready.
          </p>
          <button
            type="button"
            className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-400"
          >
            Select from computer
          </button>
        </div>
      </div>
    </div>
  );
}
