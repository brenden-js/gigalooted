import {Fragment, SetStateAction, useContext} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import {GearItem} from "./item-grid";
import Image from "next/image"
import {PlusIcon} from '@heroicons/react/20/solid'
import {LootContext} from "../contexts/loot-list";
import toast from 'react-hot-toast';

export default function SlideOut(
  {product, setProductSlide, productSlide}:
    { product: GearItem, productSlide: boolean, setProductSlide: SetStateAction<any> }) {
  const {addItem} = useContext(LootContext);

  const notify = (name: string) => toast.success(`Added ${name} to objectives.`);
  const handleAdd = (name: string) => {
    addItem(product);
    notify(name);
  }

  return (
    <Transition.Root show={productSlide} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setProductSlide(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-350"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-350"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-350 sm:duration-250"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-350 sm:duration-250"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-[#1B120B] py-6 shadow-xl">
                    <div className="px-4 sm:px-6 text-white">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg flex flex-col font-medium text-white">
                          {product?.name}
                          <button
                            type="button"
                            onClick={() => handleAdd(product.name)}
                            className="inline-flex mt-3 items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" />
                            Add to objectives
                          </button>
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-[#1B120B] text-gray-100 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setProductSlide(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <div className="absolute inset-0 px-4 sm:px-6">
                        {product?.locations.map((location) => {
                          return (
                            <div
                              className="mt-6 flex flex-col items-center text-white border rounded border-gray-700 my-16"
                              key={location.city}>
                              <p className="font-semibold -mt-3 px-2 bg-[#1B120B]">{location.city}</p>
                              <div className="flex items-center w-full">
                                {location.requirements.length == 0 && <p className={'mb-8 mt-2 mx-auto'}>Unavailable</p>}
                                {location.requirements.map((req) => {
                                  return (
                                    <div key={req.name}
                                         className={`p-3 flex flex-col items-center mx-auto w-1/3 ${location.requirements.length == 1 && 'p-6'}`}>
                                      <span className={`relative inline-block`}>
                                        <div className={'relative object-cover h-[72px] w-[72px] overflow-hidden'}>
                                          <Image
                                            src={req.icon}
                                            alt={"item-icon"}
                                            width={96}
                                            height={96}
                                            blurDataURL={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAVCAYAAACkCdXRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOBSURBVHgBvZTdTltHEMdnds+XfQwmJYY0tCI0RIpwWynqdaVI3FbijtfBPI/fIQqqxHVbyb5p0wYpQFKCP8A+5+zHzHQNFkpSouQqK41WqzP7OzOz/xmAL7xwbp/l+L8lIogYtr2Oeg4Hwa5Xu9+S3lZXOh2Q2ffPhnW7u6rx6yQ6rcWJx0LBEMBHnlqtloV+l3a7QB/eU7fBoIM47eXxSTHK8bJaqka4MiDdOpmY5uHvf9Zf39uM9m65G93Geg5PlT19lU65vlRMy7tIsFAyiRgZaYvnr45W6R/4y38yslmK5eAH/ZY5GztZmpSydjZxG+eX/rs31q4NPSydvr2s/f3TJyKbgXZ3d9WCMUleg4aytFw6uG8s33NEYkgiyzQ13lwsux+nAH/M6iZzAw3vFb2rTgFSBcWimbqVS88PKgMPS+K10sNiMK4oqhiTaZHWq+3tbb+zs8MHBwfvw9rttu71eimNRgvKY8uyWi+df2gZNgyF6AgXPGtk0BaixHiOS+die3Fx5vv9Pt/ARACfPfs5Zubce3+3cvLAkHvkCB5Z4g1iXPWCOQPGojQpndgkTaokIWNMbp88eTwDyjyyPaW1Tsth2TRk1qwNIOMfuwD0BN8Qy53wvzooFekoxuBsa0lapFk+iaKq+F4pexCiU/MUMZ1Mgh/VtMiSAlpl9veZYFWEvyKQRUFYRNTLQeWrEcIaoqxEvmw2oii7mGc4f94uBNFEGXOM4jNyJmdydSKbeSLNxEpANCLHCqGuFNZjkDxkXUsAEp1lKjzgtTRavS18kRnBSsSVoUrWVtaZwlt/4Z2PhKkMaaKgmNCAUw1sFQpnSJJCDfKFCjudDl7Bnrbb8tvhoZxTUTnjxqY0//rKHnnvQrY0CtpPcdb6CAHGQ9TqTQAOE/Blor0PGweYXMGCvmC0dcdOXhSFK8tz66ojZ60n5iEJN4KIMoBZfUMzCU6E6DVEeIJxOoqJquawJjcd0NvaksFgQPX6sJgUclbYkizJOMj7OEAyEBVKo1Q4Ox0uo5IxOzXwtjivN3SR59/6EPh1ZJ39fekEx36ATtbXBabOUByPQ3RpKGwcCh9pHaEiz8Y7l6S5gdgV1taKvm1UsPn11Tj6cJ7NztHm5qZqNpt6PB5HjUZDBbvyC2cIepQ8zyk+PnaXL1/SLwC0P+/Pj43jd0f1bT43zf3ODv8BzKQ4f+Qag2MAAAAASUVORK5CYII='}
                                          />
                                        </div>
                                        <span
                                          className="absolute -bottom-1 -right-1.5 block h-6 w-6 rounded-full bg-gray-800 ring-2 ring-white">
                                          <p className=" text-white font-bold ml-2">
                                            {req.quantity}
                                          </p>
                                        </span>
                                      </span>
                                      <p className={"text-sm text-center mt-2.5 h-12"} key={req.name}>
                                        {req.name}
                                      </p>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          );
                        })}
                        <div className="mt-6 flex flex-col items-center text-white">
                          <p className="mb-3 font-semibold">Unlock Trade Bounty</p>
                          {product?.requirements.length === 0 && <p>No requirements</p>}
                          {product?.requirements.map((req) => {
                            return (
                              <div key={req.name}>
                                {req.avatarSrc && (
                                  <Image
                                    className="inline-block rounded-sm"
                                    width={128}
                                    height={156}
                                    src={req.avatarSrc}
                                    alt="avatar"
                                    placeholder={"blur"}
                                    blurDataURL={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAVCAYAAACkCdXRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOBSURBVHgBvZTdTltHEMdnds+XfQwmJYY0tCI0RIpwWynqdaVI3FbijtfBPI/fIQqqxHVbyb5p0wYpQFKCP8A+5+zHzHQNFkpSouQqK41WqzP7OzOz/xmAL7xwbp/l+L8lIogYtr2Oeg4Hwa5Xu9+S3lZXOh2Q2ffPhnW7u6rx6yQ6rcWJx0LBEMBHnlqtloV+l3a7QB/eU7fBoIM47eXxSTHK8bJaqka4MiDdOpmY5uHvf9Zf39uM9m65G93Geg5PlT19lU65vlRMy7tIsFAyiRgZaYvnr45W6R/4y38yslmK5eAH/ZY5GztZmpSydjZxG+eX/rs31q4NPSydvr2s/f3TJyKbgXZ3d9WCMUleg4aytFw6uG8s33NEYkgiyzQ13lwsux+nAH/M6iZzAw3vFb2rTgFSBcWimbqVS88PKgMPS+K10sNiMK4oqhiTaZHWq+3tbb+zs8MHBwfvw9rttu71eimNRgvKY8uyWi+df2gZNgyF6AgXPGtk0BaixHiOS+die3Fx5vv9Pt/ARACfPfs5Zubce3+3cvLAkHvkCB5Z4g1iXPWCOQPGojQpndgkTaokIWNMbp88eTwDyjyyPaW1Tsth2TRk1qwNIOMfuwD0BN8Qy53wvzooFekoxuBsa0lapFk+iaKq+F4pexCiU/MUMZ1Mgh/VtMiSAlpl9veZYFWEvyKQRUFYRNTLQeWrEcIaoqxEvmw2oii7mGc4f94uBNFEGXOM4jNyJmdydSKbeSLNxEpANCLHCqGuFNZjkDxkXUsAEp1lKjzgtTRavS18kRnBSsSVoUrWVtaZwlt/4Z2PhKkMaaKgmNCAUw1sFQpnSJJCDfKFCjudDl7Bnrbb8tvhoZxTUTnjxqY0//rKHnnvQrY0CtpPcdb6CAHGQ9TqTQAOE/Blor0PGweYXMGCvmC0dcdOXhSFK8tz66ojZ60n5iEJN4KIMoBZfUMzCU6E6DVEeIJxOoqJquawJjcd0NvaksFgQPX6sJgUclbYkizJOMj7OEAyEBVKo1Q4Ox0uo5IxOzXwtjivN3SR59/6EPh1ZJ39fekEx36ATtbXBabOUByPQ3RpKGwcCh9pHaEiz8Y7l6S5gdgV1taKvm1UsPn11Tj6cJ7NztHm5qZqNpt6PB5HjUZDBbvyC2cIepQ8zyk+PnaXL1/SLwC0P+/Pj43jd0f1bT43zf3ODv8BzKQ4f+Qag2MAAAAASUVORK5CYII='}
                                  />
                                )}
                                <p key={req.name} className="mb-12">{req.name}</p>
                              </div>

                            )
                          })}
                        </div>
                      </div>
                      {/* /End replace */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
