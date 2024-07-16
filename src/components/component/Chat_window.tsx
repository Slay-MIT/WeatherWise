'use client'

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Message } from "@/types/chat";
import { getWeatherData } from "@/app/api/weatherApi";
import { extractLocation, getGeminiResponse, getInitialMessage } from "@/app/api/GeminiService";
import { useEffect, useState } from "react";

export function Chat_window() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentWeatherData, setCurrentWeatherData] = useState<any>(null);

  useEffect(() => {
    const fetchInitialMessage = async () => {
      const initialMessage = await getInitialMessage();
      setMessages([{ content: initialMessage, sender: 'WeatherWise', type: 'bot' }]);
    };
    fetchInitialMessage();
  }, []);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMessage: Message = {
      content: inputMessage,
      sender: 'You',
      type: 'user'
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      const location = await extractLocation(inputMessage);
      let weatherData = currentWeatherData;

      if (location) {
        weatherData = await getWeatherData(location);
        setCurrentWeatherData(weatherData);
      }

      const geminiResponse = await getGeminiResponse(weatherData, inputMessage);

      const botMessage: Message = {
        content: geminiResponse,
        sender: 'WeatherWise',
        type: 'bot'
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: Message = {
        content: "I'm sorry, I couldn't process that request. Please try again with a valid location.",
        sender: 'WeatherWise',
        type: 'bot'
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }

    setInputMessage('');
  };

  
  return (
    <div className="flex flex-col h-full bg-background w-full">
      <header className="flex items-center gap-4 px-4 py-3 border-b bg-background">
        <Avatar className="w-8 h-8 border">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>CG</AvatarFallback>
        </Avatar>
        <div className="text-sm font-medium">WeatherWise</div>
      </header>
      <div className="flex-1 overflow-auto p-4">
        <div className="grid gap-4">
        {messages.map((message, index) => (
            <div key={index} className={`flex items-start gap-4 ${message.type === 'bot' ? 'justify-end' : ''}`}>
              {message.type === 'user' && (
                <Avatar className="w-8 h-8 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
              <div className={`grid gap-1 ${message.type === 'bot' ? 'bg-primary text-primary-foreground' : 'bg-muted'} p-3 rounded-lg max-w-[80%]`}>
                <div className="font-medium">{message.sender}</div>
                <div className="text-sm">{message.content}</div>
              </div>
              {message.type === 'bot' && (
                <Avatar className="w-8 h-8 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>WW</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </div>



      <div className="sticky bottom-0 w-full bg-background border-t p-2">
        <div className="relative">
          <Textarea 
            placeholder="Type your message..." 
            className="w-full rounded-xl pr-16 resize-none" 
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
          <Button type="submit" size="icon" className="absolute top-1/2 -translate-y-1/2 right-2" onClick={handleSendMessage}>
            <SendIcon className="w-5 h-5" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>


    </div>
  )
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
