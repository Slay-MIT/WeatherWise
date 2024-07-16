/**
 * v0 by Vercel.
 * @see https://v0.dev/t/YX1pz5NVOYB
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function WeatherHeading() {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary">
        <div className="px-4 md:px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground font-['Montserrat', 'sans-serif']">
            <CloudIcon className="w-8 h-8 inline-block mr-2 fill-primary-foreground" />
            WeatherWise
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-primary-foreground font-['Lato', 'sans-serif'] mt-4">
            Get accurate weather forecasts at your fingertips.
          </p>
        </div>
      </section>
    )
  }
  
  function CloudIcon(props:any) {
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
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
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