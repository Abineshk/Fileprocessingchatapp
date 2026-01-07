import { Loader2 } from 'lucide-react';

export function ProcessingOverlay() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-cyan-900/50 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 border border-purple-200">
        <Loader2 className="w-16 h-16 text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text animate-spin" style={{ 
          stroke: 'url(#gradient)',
          strokeWidth: 2
        }} />
        <svg width="0" height="0">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#9333EA" />
            </linearGradient>
          </defs>
        </svg>
        <div className="flex items-center gap-2">
          <Loader2 className="w-12 h-12 animate-spin" style={{ stroke: 'url(#gradient)' }} />
        </div>
        <p className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Processing your file…</p>
      </div>
    </div>
  );
}