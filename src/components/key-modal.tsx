import {Fragment, SetStateAction} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {LootKey} from "../pages/keys";
import Image from 'next/image'
import localFont from 'next/font/local'


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

export default function KeyModal({ open, setOpen, lootKey }: { open: boolean, setOpen: SetStateAction<any>, lootKey: LootKey}) {

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className={`${fontCrimson.className} fixed inset-0 z-10 overflow-y-auto`}>
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#1B120B] text-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div className={"flex flex-col "}>
                  <div className="flex flex-col align-center justify-center items-center rounded-full">
                    <Image
                      src={lootKey.closePic}
                      height={360}
                      width={640}
                      alt={'Picture of key location'}
                      placeholder={'blur'}
                      blurDataURL={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAARCAYAAADKZhx3AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAVcSURBVHgBJVVbb+NEGD22xx7fck9Kk3ZRKi1IoH3gDSQkXtl/wV/hvyHeeOBpl0WwLUsvaeM2ie+X8Zhj08pK4vHMd75z+Wy8ffvdNkrV9sc3r1GqEs9HhakrMFlOcYoiRAoA7yuluA4cU66HAq5w+TnFsUz7BwD+7v//im7x/fYS1XB/WMFkOsWvv/2Bb1kj5NmhEL+Lm6P6aRO6PxetwcM8rBcd9nGGw+0OvucjdEwkSiPKiuH+1XyKDhVMO4D0bFzONmjqGh8f/sV9EWE7m0K6Ngw4gGli95Jibph48/oCT4cTvLMxoi7fCkFEZ6MQ6AykVY2bXYQ0z6A6hdViDZtlHpIYz3GO81GArtNY+SE62yIzFkyhcXtIsRnPkKs9/tzvsQocltUIQwezkYfHxwiWCXw2cVE1CgvpkiBW3p0aXjfIy6oHiaxpCafD6fEBvi2x9F2sNmcsJHGKE8wJ1JYeVFOhzBPMfBsxQX+xHCEuXLxnoa/P5izSUroMFk9bLycD9YXqcOCnyCmC7mKibSENIJAS33y+QRSfYAsHRXbCZrVCXebQbY1J6OGQ8XuRYOyOuNdE2Zb45e+P+GH7CoGwcTLolbQYGpHCBHtBSRDC7OAHE1x//AShtQYsC8tAkg4Dl4sV5pMRPD704e4Oge+ha2pkWQLpuAjZXU5NDd2hIJC0KAYZLl2f6wFsSnZBhT88RJCUZR54kJTF8S1ow0D0EuNqPYXYLn1MiDyQgl2m+ER6r+9v0bQam9kMnmOhqDMqZuBY5yjoU6cH6lFntKRbwbS6oSvpByjrFrrMsJmPcHfImISOfmlhZynC3iN0+xEhxPl4DIdIQHRLareeTaBVQ/pa0DtQLWPUAHnTQOkGvmlh7I9IYwPNrgMR0gc+QWjEcQzDEuxQolE1As/BlMADeqSqG0gCHfN7mh8hyrSGRYf1LvZpmCIvYNs2nevikJewLckucpj028V8xb4MPD6fBu0CR8ASVo8ZrhfANBSOScY9Jq6jA55yjYrFX3FXwIhVbcfkFGSN5lK6hud6aBoxmAmOJtqW7uRhjqSWLSY0XKssJGnOGIQ4Xy3R0tEdh4rJjNZkQnGPH/jwJOknEM924Ysai5HPcwUETWfSQyc2lhcawifqlrQWlaJZ1LDYu/FUlzgPw0G7jGv7Y4L1xSVCz0XLNWUw4ezWNjXMjp1wT0OjLhczHI4vQ7Evly4W43AoGicnaGZ1FI6HPIuS6GQP0dDw2WE/rdYLiYQaFvEBD4dkGAKex9wys7f7RwTjKfzRCK7RkqmKwKkwwXetyVFJJjqgpjkrmx6QjGTFZwiqo+Mt1kFTwtxwBD5TZ80OwtmKC5x01Ei0FWzHGeLQEtjcdzBi5BaLOV2bw9KKRnJgkGqXBnJZwJOMWpGhYPz6mN5xeNhcU/wu3YCdC3bMxq6uYNa1YowNoqWuh5chRodTwkOJvq7gUIp+zPWHFnmFmuPUcR1kSYI9x2PH7GruUbya4Wr/jyD3nIoa9yw+DgMo+qc16BOmo/8zTbpzMZbgu4BdNNQiQ12kaDgCXd/vZwuRcvowcjb1L2iintZjmmFE59sqG0ajRaBWbyJuKNqG8eoDYOHd7ROKshwMBxpOaxvvrh9g7qIj4qxG/7bg+bxIC2mD0cFgnvuXgGL+Gl4uh0xPe0x3twRQM2q9ifw+q2TGtQWZkTC1SYlcBg+YexL3cYOcBs2SdCj+freDmMwXxzLPb/p85TTJYnEOabGY5VJrgTy6x+Uq6KlhXhtslsA/jwdS2RAbQZD+kCNRkYWABuxz3vWU5k9DnldjssaBEtK0eU2N6ZWvzs/xH6Ox0zMiKVI1AAAAAElFTkSuQmCC'}
                    />
                    <div className={`mt-2 ${fontCrimson.className}`}>{`Coords: ${lootKey.coords}`}</div>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className={`text-lg ${fontLato.className} font-medium leading-6`}>
                      {lootKey.name + ' Key'}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm">
                        {lootKey.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
