'use client';

import { motion } from 'framer-motion';

export default function ClientWeatherHeading() {
    return (
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-dark-blue-800 to-background overflow-hidden">
        <div className="px-4 md:px-6 text-center">
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary font-['Montserrat', 'sans-serif'] flex items-center justify-center"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{y: -100}}
              animate={{ y:0 }}
              transition={{ duration: 0.8, ease: "easeIn" }}
            >
              <CloudIcon className="w-12 h-12 inline-block mr-4 text-primary" />
            </motion.div>
            WeatherWise
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl text-foreground font-['Lato', 'sans-serif'] mt-4"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Get accurate weather forecasts at your fingertips.
          </motion.p>
          <motion.div
            className="mt-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <RainAnimation />
          </motion.div>
        </div>
      </section>
    )
  }

function CloudIcon(props: any) {
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

function RainAnimation() {
    return (
      <div className="relative w-full h-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-4 bg-primary rounded"
            style={{
              left: `${Math.random() * 100}%`,
              top: -20,
            }}
            animate={{
              y: [0, 100],
              opacity: [1, 0],
            }}
            transition={{
              duration: 1 + Math.random(),
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    )
  }