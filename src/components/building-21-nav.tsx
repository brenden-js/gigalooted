import {useEffect, useState} from "react";
import dayjs from 'dayjs'
import localFont from 'next/font/local'


const fontLato = localFont(
  {
    src: '../assets/fonts/Lato-Regular.ttf',
    variable: "--font-lato"
  }
)

export const Building21Nav = () => {
  const [itsOpen, setItsOpen] = useState(false);
  console.log();
  useEffect(() => {
    const day = dayjs().day()
    if (day > 5 || day < 1) {
      setItsOpen(true)
    } else if (day === 1 && dayjs().get("hours") < 10) {
      setItsOpen(true)
    } else if (day === 5 && dayjs().get("hours") > 10) {
      setItsOpen(true)
    } else {
      setItsOpen(false);
    }
  }, []);

  return (
    <div className="flex">
      <p className={`text-gray-300 font-subheading ${fontLato.className}`}>Building 21</p>
      {itsOpen ? (
        <span className="ml-3 inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
        <svg className="mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
          <circle cx={4} cy={4} r={3} />
        </svg>
        Open
      </span>
      ) : (
        <span className="ml-3 inline-flex items-center rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
        <svg className="mr-1.5 h-2 w-2 text-yellow-400" fill="currentColor" viewBox="0 0 8 8">
          <circle cx={4} cy={4} r={3} />
        </svg>
        Closed
      </span>
      )}
    </div>
  )
}