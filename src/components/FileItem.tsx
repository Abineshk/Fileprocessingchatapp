import { FileText, Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { FileItem as FileItemType } from '../App';

interface FileItemProps {
  file: FileItemType;
  isActive: boolean;
  onClick: () => void;
  onRemove: () => void;
}

export function FileItem({ file, isActive, onClick, onRemove }: FileItemProps) {
  const getStatusIcon = () => {
    switch (file.status) {
      case 'processing':
        return <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'ready':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusText = () => {
    switch (file.status) {
      case 'processing':
        return 'Processing...';
      case 'ready':
        return 'Ready';
      case 'error':
        return 'Error';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div
      onClick={onClick}
      className={`group relative p-3 rounded-xl border cursor-pointer transition-all ${
        isActive
          ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-300 shadow-md'
          : 'bg-white/80 backdrop-blur-sm border-gray-200 hover:border-blue-300 hover:shadow-lg'
      }`}
      title={`${file.name}\n${file.type}\n${formatFileSize(file.size)}\nUploaded at ${formatTime(file.uploadTime)}`}
    >
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 p-2 rounded-lg ${isActive ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gray-100'}`}>
          <FileText className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
        </div>

        <div className="flex-1 min-w-0">
          <p className="truncate text-gray-900">{file.name}</p>
          <div className="flex items-center gap-2 mt-1">
            {getStatusIcon()}
            <span className="text-xs text-gray-500">{getStatusText()}</span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all"
          aria-label="Remove file"
        >
          <X className="w-4 h-4 text-red-600" />
        </button>
      </div>
    </div>
  );
}