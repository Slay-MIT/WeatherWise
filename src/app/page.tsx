import Image from "next/image";
import { Chat_window } from "@/components/component/Chat_window";
import WeatherHeading from "@/components/WeatherHeading";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-background text-foreground">
      <WeatherHeading />
      <div className="w-full mx-auto px-4 py-8">
        <Chat_window />
      </div>
    </main> 
  );
}