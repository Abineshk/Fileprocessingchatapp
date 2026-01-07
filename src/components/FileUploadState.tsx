import { useState, useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';

interface FileUploadStateProps {
  onUpload: (file: File) => void;
}

export function FileUploadState({ onUpload }: FileUploadStateProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supportedFormats = ['PDF', 'CSV', 'DOCX'];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      setSelectedFile(null);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="flex items-center justify-center h-full p-8">
      <div className="w-full max-w-4xl">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-200 overflow-hidden">
          {/* Card Body - Upload Area */}
          <div className="p-8">
            <div
              className={`rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
                isDragging
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl scale-105'
                  : 'border-gray-300 hover:border-blue-400 bg-gray-50/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Upload className="w-8 h-8 text-white" />
                </div>

                <div className="space-y-1">
                  <p className="text-gray-600">
                    Drag and drop your file here, or click to browse
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.csv,.docx,.doc"
                  onChange={handleFileSelect}
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-lg transition-all shadow-sm hover:shadow-md text-sm"
                >
                  Choose File
                </button>

                {/* Selected File Display */}
                {selectedFile && (
                  <div className="w-full max-w-md mt-2">
                    <div className="bg-white rounded-xl p-4 border border-green-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-gray-900">{selectedFile.name}</p>
                          <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFile(null);
                          }}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-gray-200 w-full max-w-md">
                  <p className="text-gray-400 text-xs">
                    Supported formats: {supportedFormats.join(', ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Analyze Button Below Upload Area */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleAnalyze}
                disabled={!selectedFile}
                className="px-12 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
              >
                Analyze
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}