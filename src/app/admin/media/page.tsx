import React from "react";
import { MediaRepository } from "@/features/media/repository/media.repository";
import { MediaDashboardClient } from "./media-dashboard-client";

export const metadata = {
  title: "Media Library | RankFlow AI",
};

// Mock ID
const WORKSPACE_ID = "00000000-0000-0000-0000-000000000000";

export default async function MediaPage() {
  const repo = new MediaRepository();
  const assets = await repo.searchAssets(WORKSPACE_ID);

  return (
    <main className="p-6 max-w-[1600px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Media Library</h1>
        <p className="text-slate-500 mt-1">
          Digital Asset Management. Automatically optimized and synchronized with the Knowledge Graph.
        </p>
      </div>

      <MediaDashboardClient initialAssets={assets} />
    </main>
  );
}
