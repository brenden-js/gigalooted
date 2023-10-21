import {Fragment, useContext, useState} from 'react'
import {LootContext} from "../contexts/loot-list";
import KeyModal from "../components/key-modal";
import toast from 'react-hot-toast';

const tabs = [
  {name: 'Al Mazrah'},
  {name: 'Ashika Island'},
  {name: 'Building 21'},
  {name: 'Vondel'},
]

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ')
}

export type LootItem =
  'GPU' | 'Gold Skull'

export type LootKey = {
  id: number
  tier?: string
  name: string
  coords: string
  description: string
  contents?: LootItem[]
  closePic: string
  farPic: string
}

type Location = {
  name: string
  allKeys: {
    tier: Tier
    keys: LootKey[]
  }[]
}


type AllLootKeys =
  Location[]


type Tier = 'God-Tier' | 'Decent-Tier'


const locations: AllLootKeys = [
  {
    name: "Al Mazrah",
    allKeys: [
      {
        tier: 'God-Tier',
        keys: [
          {
            id: 0,
            name: 'Airport Maintenance',
            coords: 'H6',
            description: 'Contains legendary chest, Under freeway east warehouse key (used), 1-2 custom weapons. ' +
              'Also possible is 3-Plate Vest, Large Backpack, money, classified docs, gold bar.',
            closePic: '/keys/airport-maintenance-close.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
            tier: 'God-Tier'
          },
          {
            id: 1,
            name: 'Al Bagra Underground',
            coords: 'G8', description: 'Contains more than 10 legendary chests.',
            closePic: '/keys/al-bagra-underground-close.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
          },
          {
            id: 2,
            name: 'Cartel Warehouse',
            coords: 'D5', description: 'Contains 4 legendary chests, 2 bags, possible gold bar.',
            closePic: '/keys/cartel-warehouse-close.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
          },
          {
            id: 3,
            name: 'Chem. Storage Warehouse',
            coords: 'B4',
            description: 'Contains legendary chest, lots of money, 2-3 custom weapons. Possibly a gold skull,' +
              'gold bar, classified documents, origami horse, encrypted hard drive, kill streak.',
            closePic: '/keys/chemical-storage-warehouse-close.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
          },
          {
            id: 4,
            name: 'Control Tower',
            coords: 'G7', description: 'Contains 10ish legendary crates.',
            closePic: '/keys/control-tower.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
          },
          {
            id: 5,
            name: 'Downtown Post Office',
            coords: 'F4', description: 'Contains 10ish legendary crates.',
            closePic: '/keys/downtown-post-office.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
          },
          {
            id: 6,
            name: 'Kushaak Const. Warehouse',
            coords: 'B4', description: 'Contains 4-5 legendary crates, many lockers, 2 boxes.',
            closePic: '/keys/kushaak-construction-warehouse.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
          },
          {
            id: 7,
            name: 'Police Academy',
            coords: 'G4', description: 'Contains 10 legendary crates, requires 3 uses of key to reach all chests.',
            closePic: '/keys/police-academy.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
          },
          {
            id: 8,
            name: 'Sniper Team Hideout',
            coords: 'F6',
            description: 'Contains comms vest, stealth vest, 2 legendary crates, 1 bag, 1-2 custom weapons.',
            closePic: '/keys/sniper-team-hideout.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
          },
          {
            id: 9,
            name: "Sunken Ship Thief's Cache",
            coords: 'E8', description: 'Contains Golden Skull of Al Bagra Minor and Control Tower key.',
            closePic: '/keys/sunken-ship-thiefs-cache.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
          },
        ],
      },
      {
        tier: 'Decent-Tier',
        keys: [
          {
            id: 10,
            name: 'A.B.F. Antiquities',
            coords: 'G8',
            description: '',
            closePic: '/keys/no-data.png',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: []
          },
          {
            id: 11,
            name: 'Al-Safwa Stone Block Office',
            coords: 'C4', description: '',
            closePic: '/keys/no-data.png',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
          },
          {
            id: 12,
            name: 'Algae Covered Toolbox',
            coords: 'F3', description: '',
            closePic: '/keys/no-data.png',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
          },
          {
            id: 13,
            name: 'B21 Secure cache',
            coords: 'D5', description: '',
            closePic: '/keys/no-data.png',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
          },
          {
            id: 14,
            name: 'Bomb Makers Supply Cache',
            coords: 'D5', description: '',
            closePic: '/keys/no-data.png',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
          },
          {
            id: 15,
            name: 'Canal Apartment 103',
            coords: 'F3', description: '',
            closePic: '/keys/no-data.png',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
          },
          {
            id: 16,
            name: 'Ch 7 Editorial Dept.',
            coords: 'F2', description: '',
            closePic: '/keys/no-data.png',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
          },
          {
            id: 17,
            name: "Deckhand's Toolbox",
            coords: 'E8', description: '',
            closePic: '/keys/no-data.png',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
          },
          {
            id: 18,
            name: 'Downtown P.O. Secure Room',
            coords: 'F4', description: '',
            closePic: '/keys/no-data.png',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
          },
          {
            id: 19,
            name: 'Longshore Duffel Bag',
            coords: 'B6', description: '',
            closePic: '/keys/no-data.png',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
          },
          {
            id: 20,
            name: 'Old Lighthouse Citadel',
            coords: 'F8', description: '',
            closePic: '/keys/no-data.png',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
          },
          {
            id: 21,
            name: 'Spec. Ops. Relay Station',
            coords: 'B6', description: '',
            closePic: '/keys/no-data.png',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
          },
          {
            id: 22,
            name: 'The Lieutenant\'s case',
            coords: 'E8', description: '',
            closePic: '/keys/no-data.png',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
          },
          {
            id: 23,
            name: 'Under Fwy E Warehouse',
            coords: 'G4', description: '',
            closePic: '/keys/no-data.png',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
          },
          {
            id: 24,
            name: 'US Embassy',
            coords: 'G3', description: '',
            closePic: '/keys/no-data.png',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
          },
          {
            id: 25,
            name: 'West Zarqwa Safe House',
            coords: 'E8', description: '',
            closePic: '/keys/no-data.png',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
          },
          {
            id: 26,
            name: 'Zaya Radar Dome',
            coords: 'E5', description: '',
            closePic: '/keys/no-data.png',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
          },
        ],
      },
    ]
  },
  {
    name: "Ashika Island",
    allKeys: [
      {
        tier: 'God-Tier',
        keys: [
          {
            id: 27,
            name: 'Beach Club Bathhouse', coords: 'E7',
            description: '',
            closePic: '/keys/beach-club-bathhouse.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: []
          },
          {
            id: 28,
            name: 'City Hall Hideout', coords: 'F6', description: '',
            closePic: '/keys/city-hall-hideout.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: []
          },
          {
            id: 29,
            name: 'Drifting Supply Bag', coords: 'D2', description: '',
            closePic: '/keys/drifting-supply-bag.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: []
          },
          {
            id: 30,
            name: 'H.M.S. Shipwreck Cache', coords: 'I5', description: '',
            closePic: '/keys/hms-shipwreck-cache.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: []
          },
          {
            id: 31,
            name: 'Lost Manager\'s Office', coords: 'G6', description: '',
            closePic: '/keys/lost-managers-office.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: []
          },
          {
            id: 32,
            name: 'Main Harbor Control', coords: 'H6', description: '',
            closePic: '/keys/main-harbor-control.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: []
          },
          {
            id: 33,
            name: 'Research Center Room', coords: 'E5', description: '',
            closePic: '/keys/research-center-room.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: []
          },
          {
            id: 34,
            name: 'Tsuki Castle', coords: 'G5', description: '',
            closePic: '/keys/tsuki-castle.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: []
          },
          {
            id: 35,
            name: 'Water Pump Control', coords: 'F3', description: '',
            closePic: '/keys/water-pump-control.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: []
          }
        ],
      },
      {
        tier: 'Decent-Tier',
        keys: [
          {
            id: 36,
            name: 'Floatsam Cargo Cache',
            coords: 'E5',
            description: '',
            closePic: '/keys/no-data.png',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: []
          },
          {
            id: 37,
            name: 'Lost Room 403', coords: 'F6', description: '',
            closePic: '/keys/no-data.png',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: []
          },
          {
            id: 38,
            name: 'Rusted Fridge', coords: 'F8', description: '',
            closePic: '/keys/no-data.png',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: []
          },
        ],
      },
    ]
  },
  {
    name: "Vondel",
    allKeys: [
      {
        tier: 'God-Tier',
        keys: [
          {
            id: 39,
            name: 'Bike Parking',
            coords: 'D6',
            description: '',
            closePic: '/keys/bike-parking.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: []
          },
          {
            id: 40,
            name: 'Central Station', coords: 'H5', description: '',
            closePic: '/keys/central-station.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: []
          },
          {
            id: 41,
            name: 'Cruise Terminal', coords: 'F8', description: '',
            closePic: '/keys/cruise-terminal.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: []
          },
          {
            id: 42,
            name: 'Fire Department', coords: 'C6', description: '',
            closePic: '/keys/fire-department.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: [],
          },
          {
            id: 43,
            name: 'Mayor\'s briefcase', coords: 'G3', description: '',
            closePic: '/keys/mayors-briefcase.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: []
          },
          {
            id: 44,
            name: 'Museum', coords: 'G6', description: '',
            closePic: '/keys/museum.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: []
          },
          {
            id: 45,
            name: 'Stadium', coords: 'F6', description: '',
            closePic: '/keys/stadium.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: []
          },
          {
            id: 46,
            name: 'Stage bag', coords: 'C5', description: '',
            closePic: '/keys/stage-bag.jpg',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: []
          }
        ],
      },
      {
        tier: 'Decent-Tier',
        keys: [
          {
            id: 47,
            name: 'Art Center Loft',
            coords: 'F3',
            description: '',
            closePic: '/keys/no-data.png',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: []
          },
          {
            id: 48,
            name: 'Bridge Stash', coords: 'E5', description: '',
            closePic: '/keys/no-data.png',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: []
          },
          {
            id: 49,
            name: 'Buoyant house', coords: 'C7', description: '',
            closePic: '/keys/no-data.png',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: []
          },
          {
            id: 50,
            name: 'City Hall', coords: 'G3', description: '',
            closePic: '/keys/no-data.png',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: []
          },
          {
            id: 51,
            name: 'Restaurant briefcase', coords: 'I6', description: '',
            closePic: '/keys/no-data.png',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: []
          },
          {
            id: 52,
            name: 'Smuggler\'s drop', coords: 'D2', description: '',
            closePic: '/keys/no-data.png',
            farPic: '/keys/airport-maintenance-far.jpg',
            contents: []
          },
        ],
      },
    ]
  },
  {
    name: "Building 21",
    allKeys: []
  },
]

const Keys = () => {
  const {currentMap, setCurrentMap, addKey, keys} = useContext(LootContext);
  const currentMapLootKeys = locations.find((location) => location.name === currentMap)?.allKeys
  const [open, setOpen] = useState(false)
  const [selectedLootKey, setSelectedLootKey] = useState<LootKey | undefined>();

  const handleOpen = (key: LootKey) => {
          setOpen(true);
          setSelectedLootKey(key);

  }

  const handleAddKey = (key: LootKey) => {
    addKey(key);
    toast.success(`Added ${key.name} to objectives.`, {
      position: 'bottom-right',
      className: 'bg-black text-white'
    })
  }

  return (
    <div className={"min-h-screen my-6 mx-2 sm:mx-auto max-w-xl overflow-hidden sm:px-6 lg:px-8 text-white"}>
      <div className="flex flex-col mb-6 my-1 items-center text-black">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setCurrentMap(tab.name)}
              className={
                currentMap === tab.name ? 'px-3 bg-gray-100 text-gray-700px-3 py-2 font-medium text-sm rounded-md font-heading' : 'px-3 py-2 font-medium text-sm rounded-md text-gray-500 hover:text-gray-700 font-heading'
              }
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      {selectedLootKey && open && (
        <KeyModal open={open} setOpen={setOpen} lootKey={selectedLootKey} />
      )}
        <div className="sm:flex sm:items-center md:px-8 px-2">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-50 font-heading">Noteable Keys</h1>
            <p className="mt-2 text-sm text-gray-300">
              Data collected from various guides, blogs, and personal experience.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div
                className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg border-gray-700 border">
                <table className="min-w-full">
                  <thead className="bg-black">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-200 sm:pl-6">
                      {`Key list for ${currentMap}`}
                    </th>
                  </tr>
                  </thead>
                  <tbody className="bg-black">
                  {currentMapLootKeys?.length === 0 && (
                    <p className="bg-black px-4 py-2 text-left text-sm font-semibold text-white">No keys here</p>)}
                  {currentMapLootKeys?.map((location) => (
                    <Fragment key={location.tier}>
                      <tr className="border-t border-gray-700">
                        <th
                          colSpan={5}
                          scope="colgroup"
                          className="bg-gray-900 px-4 py-2 text-left text-sm font-semibold text-white sm:px-6"
                        >
                          {location.tier}
                        </th>
                      </tr>
                      {location.keys?.map((key, idx: number) => (
                        <tr
                          key={key.name}
                          className={classNames(idx === 0 ? 'border-gray-700' : 'border-gray-700', 'border-t')}
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-100 sm:pl-6">
                            {key.name}
                          </td>
                          <td
                            className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button
                              onClick={() => handleOpen(key)}
                              className="text-xs text-gray-300 bg-gray-900 py-2 rounded-md hover:bg-gray-800 px-3">
                              View
                              <span className="sr-only">, {key.name}</span>
                            </button>
                            <button
                              onClick={() => handleAddKey(key)}
                              className="ml-2 text-xs text-gray-300 border border-transparent bg-indigo-900 py-2 rounded-md  disabled:bg-gray-900 hover:bg-indigo-700 focus:ring-offset-2 px-3"
                              disabled={keys.includes(key)}
                            >
                              {keys.includes(key) ? "Added" : "+ Add key"}
                              <span className="sr-only">, {key.name}</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Keys;