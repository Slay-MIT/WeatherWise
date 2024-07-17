'use client'

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Message } from "@/types/chat";
import { getWeatherData } from "@/app/api/weatherApi";
import { extractLocation, getGeminiResponse, getInitialMessage } from "@/app/api/GeminiService";
import { useEffect, useState, useRef } from "react";

export function Chat_window() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentWeatherData, setCurrentWeatherData] = useState<any>(null);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchInitialMessage = async () => {
      const initialMessage = await getInitialMessage();
      setMessages([{ content: initialMessage, sender: 'WeatherWise', type: 'bot' }]);
    };
    fetchInitialMessage();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      const chatContainer = chatContainerRef.current;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMessage: Message = {
      content: inputMessage,
      sender: 'You',
      type: 'user'
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');

    setTimeout(() => setIsTyping(true), 1200);

    try {
      const location = await extractLocation(inputMessage);
      let weatherData = currentWeatherData;

      if (location) {
        weatherData = await getWeatherData(location);
        setCurrentWeatherData(weatherData);
      }

      const geminiResponse = await getGeminiResponse(weatherData, inputMessage);

      setIsTyping(false);

      const botMessage: Message = {
        content: geminiResponse,
        sender: 'WeatherWise',
        type: 'bot'
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
      setIsTyping(false);
      const errorMessage: Message = {
        content: "I'm sorry, I couldn't process that request. Please try again with a valid location.",
        sender: 'WeatherWise',
        type: 'bot'
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-dark-blue-800 w-full rounded-lg shadow-lg overflow-hidden font-lekton">
      <header className="flex items-center gap-4 px-6 py-4 bg-dark-blue-700">
        <Avatar className="w-10 h-10 border-2 border-primary">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>WW</AvatarFallback>
        </Avatar>
        <div className="text-lg font-medium text-foreground">WeatherWise</div>
      </header>
      <div ref={chatContainerRef} className="flex-1 overflow-auto p-6 bg-dark-blue-800">
        <div className="grid gap-6">
          {messages.map((message, index) => (
            <div key={index} className={`flex items-start gap-4 ${message.type === 'bot' ? '' : 'flex-row-reverse'}`}>
              <Avatar className="w-8 h-8 border border-primary">
                {message.type === 'user' ? (
                  <AvatarFallback>U</AvatarFallback>
                ) : (
                  <AvatarFallback>WW</AvatarFallback>
                )}
              </Avatar>
              <div className={`grid gap-1 ${message.type === 'bot' ? 'bg-dark-blue-700' : 'bg-primary'} p-4 rounded-lg max-w-[80%]`}>
                <div className="font-medium text-foreground">{message.sender}</div>
                {message.type === 'bot' ? (
                  <TypewriterEffect text={message.content} />
                ) : (
                  <div className="text-sm text-foreground">{message.content}</div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start gap-4">
              <Avatar className="w-8 h-8 border border-primary">
                <AvatarFallback>WW</AvatarFallback>
              </Avatar>
              <div className="bg-dark-blue-700 p-4 rounded-lg">
                <div className="font-medium text-foreground">WeatherWise</div>
                <div className="text-sm text-foreground">Typing...</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 w-full bg-dark-blue-700 p-4">
        <div className="relative">
          <Textarea 
            placeholder="Type your message..." 
            className="w-full rounded-xl pr-16 resize-none bg-dark-blue-600 text-foreground border-none focus:ring-primary" 
            rows={1}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button type="submit" size="icon" className="absolute top-1/2 -translate-y-1/2 right-2 bg-primary hover:bg-primary-foreground" onClick={handleSendMessage}>
            <SendIcon className="w-5 h-5" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

function TypewriterEffect({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const startTime = performance.now();
    const typingSpeed = 20; // Adjust the speed of typing here (milliseconds per character)

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const newIndex = Math.floor(elapsedTime / typingSpeed);

      if (newIndex <= text.length) {
        setDisplayedText(text.slice(0, newIndex));
        setCurrentIndex(newIndex);

        if (newIndex < text.length) {
          animationFrameId = requestAnimationFrame(animate);
        }
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [text]);

  return <div className="text-sm text-foreground">{displayedText}</div>;
}

function SendIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}

function XIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}