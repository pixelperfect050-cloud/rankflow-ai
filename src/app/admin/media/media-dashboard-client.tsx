"use client";

import { useState, useRef } from "react";
import { MediaAsset } from "@/types";
import { UploadCloud, Folder, Search, Image as ImageIcon, CheckCircle, AlertCircle, X, Grid, List as ListIcon, Loader2 } from "lucide-react";
import { uploadMediaAction, deleteMediaAction } from "@/features/media/actions";
import { toast } from "sonner";
import Link from "next/link";

interface MediaDashboardProps {
  initialAssets: MediaAsset[];
}

export function MediaDashboardClient({ initialAssets }: MediaDashboardProps) {
  const [assets, setAssets] = useState<MediaAsset[]>(initialAssets);
  const [currentFolder, setCurrentFolder] = useState("/");
  const [search, setSearch] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // A simple way to compute virtual folders based on existing assets
  const folders = Array.from(new Set(assets.map(a => a.folder_path || '/'))).sort();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    const uploadedAssets: MediaAsset[] = [];
    const totalFiles = files.length;
    let successCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder_path", currentFolder);
      // Determine bucket by logic (mock for now)
      formData.append("bucket", "uploads");

      try {
        const res = await uploadMediaAction("00000000-0000-0000-0000-000000000000", formData);
        if (res.success && res.asset) {
          uploadedAssets.push(res.asset);
          successCount++;
        } else {
          toast.error(`Failed to upload ${file.name}: ${res.error}`);
        }
      } catch (error: any) {
        toast.error(`Upload error on ${file.name}`);
      }
      setUploadProgress(Math.round(((i + 1) / totalFiles) * 100));
    }

    if (successCount > 0) {
      toast.success(`Successfully uploaded ${successCount} file(s)`);
      // Prepend to top of list
      setAssets([...uploadedAssets, ...assets]);
    }
    
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const filteredAssets = assets.filter(a => {
    const matchesFolder = currentFolder === "/" || a.folder_path === currentFolder;
    const matchesSearch = a.filename.toLowerCase().includes(search.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex h-[calc(100vh-140px)]">
      
      {/* Sidebar - Virtual Folders */}
      <div className="w-64 border-r border-slate-200 bg-slate-50 flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium disabled:opacity-50"
          >
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
            {isUploading ? `${uploadProgress}%` : "Upload Files"}
          </button>
          <input 
            type="file" 
            multiple 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleUpload}
            accept="image/*"
          />
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Folders</h3>
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => setCurrentFolder("/")}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentFolder === "/" ? "bg-emerald-50 text-emerald-700" : "text-slate-700 hover:bg-slate-100"}`}
              >
                <Folder className="w-4 h-4" />
                All Media
              </button>
            </li>
            {folders.filter(f => f !== "/").map(folder => (
              <li key={folder}>
                <button 
                  onClick={() => setCurrentFolder(folder)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentFolder === folder ? "bg-emerald-50 text-emerald-700" : "text-slate-700 hover:bg-slate-100"}`}
                >
                  <Folder className="w-4 h-4" />
                  {folder.replace(/^\//, '')}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search assets..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
            />
          </div>
          <div className="flex items-center gap-2 text-slate-500 bg-slate-100 p-1 rounded-lg">
            <button className="p-1.5 bg-white rounded shadow-sm text-slate-900"><Grid className="w-4 h-4" /></button>
            <button className="p-1.5 hover:text-slate-900 transition-colors"><ListIcon className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50">
          {filteredAssets.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ImageIcon className="w-12 h-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-slate-900">No media found</h3>
              <p className="text-slate-500 mt-1 max-w-sm">
                Upload some assets or try searching for something else.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredAssets.map(asset => (
                <div key={asset.id} className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="aspect-square bg-slate-100 relative flex items-center justify-center">
                    {asset.status === 'processing' ? (
                      <div className="flex flex-col items-center justify-center text-emerald-600">
                        <Loader2 className="w-6 h-6 animate-spin mb-2" />
                        <span className="text-xs font-medium">Processing</span>
                      </div>
                    ) : (
                       // MOCK IMAGE FOR NOW SINCE STORAGE ISN'T CONNECTED
                      <img src={`https://ui-avatars.com/api/?name=${asset.filename.charAt(0)}&background=random`} alt={asset.filename} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="p-2 border-t border-slate-100">
                    <p className="text-xs font-medium text-slate-700 truncate" title={asset.filename}>{asset.filename}</p>
                    <div className="flex items-center justify-between mt-1 text-[10px] text-slate-500 font-medium">
                      <span>{(asset.size / 1024).toFixed(1)} KB</span>
                      <span className="uppercase">{asset.extension}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
