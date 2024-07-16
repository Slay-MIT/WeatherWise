
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function Chat_window() {
  return (
    <div className="flex flex-col h-full bg-background">
      <header className="flex items-center gap-4 px-4 py-3 border-b bg-background">
        <Avatar className="w-8 h-8 border">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>CG</AvatarFallback>
        </Avatar>
        <div className="text-sm font-medium">WeatherWise</div>
      </header>
      <div className="flex-1 overflow-auto p-4">
        <div className="grid gap-4">
          <div className="flex items-start gap-4 justify-end">
            <div className="grid gap-1 bg-primary text-primary-foreground p-3 rounded-lg max-w-[80%]">
              <div className="font-medium">WeatherWise</div>
              <div className="text-sm">
                Airplane turbulence happens when the plane encounters pockets of air that are moving differently. It's
                like sailing a boat on choppy water - the air pockets can make the plane feel like it's bouncing or
                shaking a bit. It's completely normal and usually not dangerous at all.
              </div>
            </div>
            <Avatar className="w-8 h-8 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>WW</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex items-start gap-4">
            <Avatar className="w-8 h-8 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="grid gap-1 bg-muted p-3 rounded-lg max-w-[80%]">
              <div className="font-medium">You</div>
              <div className="text-sm">Hi there! Can you explain what causes airplane turbulence?</div>
            </div>
          </div>
          <div className="flex items-start gap-4 justify-end">
            <div className="grid gap-1 bg-primary text-primary-foreground p-3 rounded-lg max-w-[80%]">
              <div className="font-medium">WeatherWise</div>
              <div className="text-sm">
                Here are a few more things to know about airplane turbulence: - It's caused by changes in air pressure,
                temperature, and wind speed, often near weather systems like thunderstorms. - Turbulence can range from
                mild, where it just feels a bit bumpy, to severe, where the plane may drop suddenly. - Modern planes are
                built to withstand even severe turbulence, so it's very unlikely to cause any structural damage. - The
                seatbelt sign is turned on when turbulence is expected, so it's important to keep your seatbelt fastened
                for safety.
              </div>
            </div>
            <Avatar className="w-8 h-8 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>CG</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex items-start gap-4">
            <Avatar className="w-8 h-8 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="grid gap-1 bg-muted p-3 rounded-lg max-w-[80%]">
              <div className="font-medium">You</div>
              <div className="text-sm">
                That makes sense, thanks for the explanation! Is there anything else I should know about turbulence?
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 w-full bg-background border-t p-2">
        <div className="relative">
          <Textarea placeholder="Type your message..." className="w-full rounded-xl pr-16 resize-none" rows={1} />
          <Button type="submit" size="icon" className="absolute top-1/2 -translate-y-1/2 right-2">
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
