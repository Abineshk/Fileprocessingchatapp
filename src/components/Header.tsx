import { FileText, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white shadow-lg">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="flex items-center gap-2">
              AI File Assistant
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </h1>
            <p className="text-sm text-white/80">Upload, Process & Chat with Your Documents</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Ready</span>
          </div>
        </div>
      </div>
    </header>
  );
}
