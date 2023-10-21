import {GearItem} from "./item-grid";
import Image from "next/image"

export const MapSpecificItems = ({map, item, type}: { map: string, item: GearItem, type: string }) => {
  const locationSpecItems = item.locations.find((element) => element.city === map)
  return (
    <div
      className={`flex flex-col items-center text-white rounded ${type === 'loot-list' ? (
        ''
      ) : (
        'mt-6 border-gray-700 border'
      )}`}
    >
      {type === 'loot-list' ? (<></>) : (<p className="font-semibold -mt-3 px-2 bg-[#1B120B]">{map}</p>)}
      <div className="flex items-center w-full">
        {locationSpecItems?.requirements.length == 0 && <p className={'mb-8 mx-auto'}>Unavailable</p>}
        {locationSpecItems?.requirements.map((req) => {
          return (
            <div key={req.name}
                 className={`flex flex-col items-center mx-auto w-1/3 ${locationSpecItems.requirements.length == 1 && 'p-6'}`}>
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
              <p className={"text-sm text-center mt-2.5 h-8"} key={req.name}>
                {req.name}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}