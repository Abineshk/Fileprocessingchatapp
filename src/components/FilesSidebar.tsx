import { useRef } from 'react';
import { Plus } from 'lucide-react';
import { FileItem as FileItemType } from '../App';
import { FileItem } from './FileItem';

interface FilesSidebarProps {
  files: FileItemType[];
  activeFileId: string | null;
  onFileSelect: (id: string) => void;
  onFileRemove: (id: string) => void;
  onUpload: (file: File) => void;
}

export function FilesSidebar({
  files,
  activeFileId,
  onFileSelect,
  onFileRemove,
  onUpload,
}: FilesSidebarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
      e.target.value = '';
    }
  };

  return (
    <aside className="w-80 bg-white/60 backdrop-blur-sm border-r border-purple-200 flex flex-col h-full shadow-lg">
      <div className="p-6 border-b border-purple-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Files</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-transparent to-purple-50/30">
        {files.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No files uploaded yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {files.map(file => (
              <FileItem
                key={file.id}
                file={file}
                isActive={file.id === activeFileId}
                onClick={() => onFileSelect(file.id)}
                onRemove={() => onFileRemove(file.id)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-purple-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.csv,.docx,.doc"
          onChange={handleFileSelect}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Upload File
        </button>
      </div>
    </aside>
  );
}