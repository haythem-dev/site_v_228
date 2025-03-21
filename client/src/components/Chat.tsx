
import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { chatMessageSchema, type ChatMessage } from '@shared/schema';

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState('');
  const [username] = useState(`User${Math.floor(Math.random() * 1000)}`);
  const [isMinimized, setIsMinimized] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://${window.location.hostname}:5000/ws`);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const message = chatMessageSchema.parse(data);
        setMessages(prev => [...prev, message]);
        
        // Auto scroll to bottom
        if (scrollRef.current) {
          setTimeout(() => {
            scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      } catch (error) {
        console.error('Invalid message:', error);
      }
    };

    return () => ws.close();
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const chatMessage: ChatMessage = {
      sender: username,
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    wsRef.current?.send(JSON.stringify(chatMessage));
    setMessage('');
  };

  return (
    <Card className={`fixed bottom-4 right-4 shadow-lg transition-all duration-300 ${isMinimized ? 'w-[200px]' : 'w-[350px]'}`}>
      <CardHeader className="pb-2 cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
        <CardTitle className="text-lg flex justify-between items-center">
          Live Chat
          <span className="text-sm text-muted-foreground">
            {isMinimized ? '▼' : '▲'}
          </span>
        </CardTitle>
      </CardHeader>
      {!isMinimized && (
        <CardContent>
          <ScrollArea className="h-[300px] mb-4">
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.sender === username ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-2 ${
                    msg.sender === username ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    <p className="text-sm font-semibold">{msg.sender}</p>
                    <p className="text-sm break-words">{msg.message}</p>
                  </div>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>
          <form onSubmit={sendMessage} className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button type="submit" size="sm">Send</Button>
          </form>
        </CardContent>
      )}
    </Card>
  );
}
