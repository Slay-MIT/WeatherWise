import Image from "next/image";
import { Chat_window } from "@/components/component/Chat_window";
import WeatherHeading from "@/components/WeatherHeading";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <WeatherHeading/>
      <Chat_window/>
    </main> 
  );
}
