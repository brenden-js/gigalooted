import "../styles/globals.css"
import type {AppType} from "next/app"
import React from "react"
import {LootProvider} from "../contexts/loot-list"
import {Toaster} from 'react-hot-toast'
import Header from "../components/header"
import localFont from 'next/font/local'
import {ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"


function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const fontCrimson = localFont(
  {
    src: '../assets/fonts/CrimsonText-Regular.ttf',
    variable: "--font-crimson"
  }
)

const fontLato = localFont(
  {
    src: '../assets/fonts/Lato-Regular.ttf',
    variable: "--font-lato"
  }
)


const MyApp: AppType = ({Component, pageProps: {...pageProps}}) => {
  return (
      <LootProvider>
        <Toaster />
        <div className="min-h-full bg-black">
          <Header />
          <main className={cn(
            "min-h-screen bg-background antialiased font-subheading",
            fontCrimson.variable,
            fontLato.variable
          )}>
            <div className="mx-auto max-w-7xl bg-black">
              <Component {...pageProps} />
            </div>
          </main>
        </div>
      </LootProvider>
  );
};

export default MyApp;
