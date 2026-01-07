import { Bot, User } from 'lucide-react';
import { Message } from '../App';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  if (message.type === 'status') {
    return (
      <div className="flex justify-center">
        <div className="px-4 py-2 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-600 rounded-full text-sm shadow-sm">
          {message.content}
        </div>
      </div>
    );
  }

  const isUser = message.type === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}

      <div
        className={`max-w-2xl px-4 py-3 rounded-xl shadow-md ${
          isUser
            ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
            : 'bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-900'
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center flex-shrink-0 shadow-lg">
          <User className="w-5 h-5 text-gray-700" />
        </div>
      )}
    </div>
  );
}