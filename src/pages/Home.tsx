import { useState } from 'react';
import { ChatInput } from '../components/ChatInput';
import { ChatWorkspace } from '../components/ChatWorkspace';
import { FilesSidebar } from '../components/FilesSidebar';
import { FileUploadState } from '../components/FileUploadState';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { ProcessingOverlay } from '../components/ProcessingOverlay';

export interface FileItem {
    id: string;
    name: string;
    type: string;
    size: number;
    uploadTime: Date;
    status: 'processing' | 'ready' | 'error';
}

export interface Message {
    id: string;
    type: 'user' | 'system' | 'status';
    content: string;
    timestamp: Date;
}

export default function Home() {
    const [files, setFiles] = useState<FileItem[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [activeFileId, setActiveFileId] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const hasReadyFiles = files.some(f => f.status === 'ready');
    const appState = files.length === 0 ? 'upload' : 'chat';

    const handleFileUpload = async (file: File) => {
        const newFile: FileItem = {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            type: file.type,
            size: file.size,
            uploadTime: new Date(),
            status: 'processing',
        };

        setFiles(prev => [...prev, newFile]);
        setIsProcessing(true);

        // Add status message
        const statusMsg: Message = {
            id: Math.random().toString(36).substr(2, 9),
            type: 'status',
            content: `Processing ${file.name}...`,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, statusMsg]);

        // Simulate processing
        setTimeout(() => {
            setFiles(prev =>
                prev.map(f =>
                    f.id === newFile.id ? { ...f, status: 'ready' } : f
                )
            );
            setIsProcessing(false);
            setActiveFileId(newFile.id);

            // Add ready message
            const readyMsg: Message = {
                id: Math.random().toString(36).substr(2, 9),
                type: 'status',
                content: `${file.name} is ready. You can now ask questions!`,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, readyMsg]);
        }, 2500);
    };

    const handleRemoveFile = (fileId: string) => {
        const file = files.find(f => f.id === fileId);
        if (file) {
            setFiles(prev => prev.filter(f => f.id !== fileId));

            if (activeFileId === fileId) {
                const remainingFiles = files.filter(f => f.id !== fileId);
                setActiveFileId(remainingFiles.length > 0 ? remainingFiles[0].id : null);
            }

            const removeMsg: Message = {
                id: Math.random().toString(36).substr(2, 9),
                type: 'status',
                content: `Removed ${file.name}`,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, removeMsg]);
        }
    };

    const handleSendMessage = async (content: string) => {
        const userMsg: Message = {
            id: Math.random().toString(36).substr(2, 9),
            type: 'user',
            content,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const activeFile = files.find(f => f.id === activeFileId);
            const responses = [
                `Based on the content in ${activeFile?.name || 'your files'}, here's what I found...`,
                `I've analyzed ${activeFile?.name || 'the file'} and can help with that. The document contains relevant information about your query.`,
                `Looking at the data in ${activeFile?.name || 'your uploaded file'}, I can provide insights on this topic.`,
                `From ${activeFile?.name || 'the file'}: This is an interesting question. Let me break down what I found...`,
            ];

            const systemMsg: Message = {
                id: Math.random().toString(36).substr(2, 9),
                type: 'system',
                content: responses[Math.floor(Math.random() * responses.length)],
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, systemMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
            <Header />

            <div className="flex-1 flex flex-col overflow-hidden">
                {appState === 'upload' ? (
                    <FileUploadState onUpload={handleFileUpload} />
                ) : (
                    <div className="flex h-full">
                        <FilesSidebar
                            files={files}
                            activeFileId={activeFileId}
                            onFileSelect={setActiveFileId}
                            onFileRemove={handleRemoveFile}
                            onUpload={handleFileUpload}
                        />
                        <main className="flex-1 flex flex-col">
                            <ChatWorkspace messages={messages} isTyping={isTyping} />
                            <ChatInput
                                onSend={handleSendMessage}
                                disabled={!hasReadyFiles || isProcessing}
                            />
                        </main>
                    </div>
                )}
            </div>

            <Footer />

            {isProcessing && <ProcessingOverlay />}
        </div>
    );
}