"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, ZoomOut, RotateCw, Maximize2, X, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { KycFiles } from "@/types/kyc";

interface KycDocumentViewerProps {
  files: KycFiles;
}

export default function KycDocumentViewer({ files }: KycDocumentViewerProps) {
  const [activeTab, setActiveTab] = useState<"idFront" | "idBack" | "selfie">("idFront");
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const tabs = [
    { key: "idFront", label: "ID Front", data: files?.idFront },
    { key: "idBack", label: "ID Back", data: files?.idBack },
    { key: "selfie", label: "Selfie Image", data: files?.selfie },
  ] as const;

  const currentDoc = files?.[activeTab];

  const getKycImageUrl = (url: string) => {
    if (!url) return "";
    const mediaIndex = url.indexOf("/media/");
    if (mediaIndex !== -1) {
      const relativePath = url.substring(mediaIndex);
      return `${process.env.NEXT_PUBLIC_BASE_URL || ""}${relativePath}`;
    }
    return url;
  };

  const currentImgUrl = currentDoc?.url ? getKycImageUrl(currentDoc.url) : "";

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.75));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
  const handleReset = () => {
    setZoom(1);
    setRotation(0);
  };

  return (
    <div className="bg-white border border-zinc-200/60 rounded-2xl shadow-xs overflow-hidden flex flex-col h-[550px]">
      {/* File Navigation Tabs */}
      <div className="flex bg-zinc-50 border-b border-zinc-100 p-2 justify-between items-center shrink-0">
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  handleReset();
                }}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-indigo-950 border border-zinc-200/60 shadow-3xs"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Upload status indicator */}
        <div className="flex items-center gap-1.5 px-3 text-[11px] font-bold">
          {currentDoc?.isUploaded ? (
            <span className="text-emerald-600 flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5" />
              Uploaded
            </span>
          ) : (
            <span className="text-zinc-400 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" />
              Missing
            </span>
          )}
        </div>
      </div>

      {/* Main Image View */}
      <div className="flex-1 bg-zinc-900 relative overflow-hidden flex items-center justify-center p-6">
        {tabs.some(t => t.data?.url) ? (
          tabs.map((tab) => {
            const isSelected = activeTab === tab.key;
            const imgUrl = tab.data?.url ? getKycImageUrl(tab.data.url) : "";
            if (!imgUrl) return null;

            return (
              <div
                key={tab.key}
                className={cn(
                  "absolute inset-0 flex items-center justify-center p-6 transition-opacity duration-200",
                  isSelected ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
                )}
              >
                {/* Loader Overlay */}
                {!loadedImages[tab.key] && !failedImages[tab.key] && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 bg-zinc-900 z-20">
                    <Loader2 className="h-8 w-8 animate-spin text-zinc-600 mb-2" />
                    <p className="text-xs font-semibold">Loading {tab.label}...</p>
                  </div>
                )}

                {/* Error Overlay */}
                {failedImages[tab.key] && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-rose-500 bg-zinc-900 z-20 p-4 text-center">
                    <AlertCircle className="h-8.5 w-8.5 mb-2 text-rose-500" />
                    <p className="text-xs font-semibold">Failed to Load Image</p>
                    <p className="text-[10px] text-zinc-500 mt-1 max-w-[200px] break-all select-all">{imgUrl}</p>
                  </div>
                )}

                <div
                  className="transition-transform duration-200 ease-out"
                  style={{
                    transform: isSelected ? `scale(${zoom}) rotate(${rotation}deg)` : undefined,
                  }}
                >
                  <Image
                    src={imgUrl}
                    alt={tab.label}
                    width={600}
                    height={380}
                    unoptimized
                    priority // Preload in parallel eagerly
                    onLoad={() => setLoadedImages((prev) => ({ ...prev, [tab.key]: true }))}
                    onError={() => setFailedImages((prev) => ({ ...prev, [tab.key]: true }))}
                    className="max-h-[380px] max-w-full rounded-lg shadow-md object-contain select-none cursor-zoom-in"
                    onClick={() => setIsLightboxOpen(true)}
                    draggable={false}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-zinc-500 text-center space-y-2">
            <AlertCircle className="h-10 w-10 mx-auto text-zinc-600" />
            <p className="text-sm font-semibold">No Document Image Provided</p>
          </div>
        )}

        {/* Viewer Tools Controls */}
        {currentImgUrl && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black/75 text-white px-3 py-1.5 rounded-full backdrop-blur-xs shadow-md border border-white/10">
            <button
              onClick={handleZoomIn}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              onClick={handleRotate}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              title="Rotate"
            >
              <RotateCw className="h-4 w-4" />
            </button>
            <button
              onClick={handleReset}
              className="px-2 py-1 text-[10px] font-bold hover:bg-white/10 rounded transition-colors cursor-pointer"
              title="Reset view"
            >
              Reset
            </button>
            <div className="h-4 w-[1px] bg-white/20 mx-1" />
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              title="Lightbox view"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && currentImgUrl && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-4 text-white border-b border-white/10 shrink-0">
            <span className="text-sm font-bold capitalize">
              Audit Panel: {tabs.find((t) => t.key === activeTab)?.label}
            </span>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Big Viewer body */}
          <div className="flex-1 overflow-hidden flex items-center justify-center p-6 relative">
            {!loadedImages[`${activeTab}-lightbox`] && !failedImages[`${activeTab}-lightbox`] && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black z-20">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-400 mb-2" />
                <p className="text-xs font-semibold">Loading audit view...</p>
              </div>
            )}
            {failedImages[`${activeTab}-lightbox`] && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-rose-500 bg-black z-20 p-4 text-center">
                <AlertCircle className="h-8.5 w-8.5 mb-2 text-rose-500" />
                <p className="text-xs font-semibold">Failed to Load Image</p>
                <p className="text-[10px] text-zinc-500 mt-1 max-w-[250px] break-all select-all">{currentImgUrl}</p>
              </div>
            )}
            <div
              className="transition-transform duration-200 ease-out"
              style={{
                transform: `scale(${zoom * 1.5}) rotate(${rotation}deg)`,
              }}
            >
              <Image
                src={currentImgUrl}
                alt={activeTab}
                width={1200}
                height={800}
                unoptimized
                onLoad={() => setLoadedImages((prev) => ({ ...prev, [`${activeTab}-lightbox`]: true }))}
                onError={() => setFailedImages((prev) => ({ ...prev, [`${activeTab}-lightbox`]: true }))}
                className="max-h-[80vh] max-w-[90vw] object-contain select-none rounded shadow-2xl"
                draggable={false}
              />
            </div>

            {/* Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-zinc-900/90 text-white px-4 py-2 rounded-full shadow-lg border border-zinc-700/60">
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <ZoomIn className="h-4.5 w-4.5" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <ZoomOut className="h-4.5 w-4.5" />
              </button>
              <button
                onClick={handleRotate}
                className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <RotateCw className="h-4.5 w-4.5" />
              </button>
              <button
                onClick={handleReset}
                className="px-3 py-1 text-xs font-bold hover:bg-white/10 rounded transition-colors cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
