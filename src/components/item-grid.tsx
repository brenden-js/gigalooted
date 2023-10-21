import SlideOut from "./slide-out";
import {useContext, useState} from "react";
import {PlusIcon} from "@heroicons/react/24/outline";
import {LootContext} from "../contexts/loot-list";
import toast from "react-hot-toast";
import Image from "next/image"


export type GearItem = {
  id: number
  name: string
  imageSrc: string
  imageAlt: string
  description: string
  requirements: {
    amount: number
    name: string
    link: string | null
    avatarSrc: string | null
  }[]
  locations:
    {
      city: string
      requirements:
        {
          quantity: number
          name: string
          icon: string
        }[]
    }[]
}

const gearItems: GearItem[] = [
  {
    id: 0,
    name: 'Stealth Vest',
    imageSrc: '/stealth-vest.png',
    imageAlt: 'TODO',
    description: "Remove yourself from enemy UAV's and comms vests.",
    requirements: [{amount: 1, name: "Kill the Sniper.", link: null, avatarSrc: '/sniper.png'}],
    locations: [
      {
        city: "Al Mazrah", requirements:
          [
            {quantity: 1, name: "Encrypted USB", icon: '/usb.png'},
            {quantity: 1, name: "Comic Book", icon: '/comic-book.png'},
            {quantity: 1, name: "Game Console", icon: '/game-console.png'}
          ]
      },
      {
        city: "Ashika Island", requirements:
          []
      },
      {
        city: "Vondel", requirements:
          []
      },
      {
        city: "Building 21", requirements:
          []
      },
    ]
  },
  {
    id: 1,
    name: 'Medic Vest',
    imageSrc: '/medic-vest.png',
    imageAlt: 'TODO',
    description: 'Faster revives on allies, and self-revive kits.',
    requirements: [{amount: 1, name: "Kill the Pyro.", link: null, avatarSrc: '/pyro.png'}],
    locations: [
      {
        city: "Al Mazrah", requirements:
          [{quantity: 3, name: "Bandage", icon: '/bandage.png'},
            {quantity: 1, name: "Liquor", icon: '/liquor.png'},
            {quantity: 1, name: "Watch", icon: '/watch.png'}]
      },
      {
        city: "Ashika Island", requirements:
          [{quantity: 3, name: "Bandage", icon: '/bandage.png'},
            {quantity: 1, name: "Liquor", icon: '/liquor.png'},
            {quantity: 1, name: "Watch", icon: '/watch.png'}]
      },
      {
        city: "Vondel", requirements:
          [{quantity: 3, name: "Bandage", icon: '/bandage.png'},
            {quantity: 1, name: "Liquor", icon: '/liquor.png'},
            {quantity: 1, name: "Watch", icon: '/watch.png'}]
      },
      {
        city: "Building 21", requirements:
          [{quantity: 3, name: "Bandage", icon: '/bandage.png'},
            {quantity: 1, name: "Liquor", icon: '/liquor.png'},
            {quantity: 1, name: "Watch", icon: '/watch.png'}]
      },
    ]
  },
  {
    id: 2,
    name: 'Tempered Vest',
    imageSrc: '/tempered-vest.png',
    imageAlt: 'TODO',
    description: 'Reach the HP of 3 plates, with the use of only two.',
    requirements: [{amount: 1, name: "Kill the Armored Commander.", link: null, avatarSrc: '/armored-commander.png'}],
    locations: [
      {
        city: "Al Mazrah", requirements:
          []
      },
      {
        city: "Ashika Island", requirements:
          [
            {quantity: 1, name: "Classified Documents", icon: '/sensitive-documents.png'},
            {quantity: 1, name: "Sensitive Documents", icon: '/sensitive-documents.png'},
            {quantity: 2, name: "Documents", icon: '/documents.png'}]
      },
      {
        city: "Vondel", requirements:
          []
      },
      {
        city: "Building 21", requirements:
          [
            {quantity: 1, name: "Classified Documents", icon: '/bandage.png'},
            {quantity: 1, name: "Sensitive Documents", icon: '/sensitive-documents.png'},
            {quantity: 2, name: "Documents", icon: '/documents.png'}
          ]
      },
      {
        city: "Koschei Complex", requirements:
          [
            {quantity: 1, name: "Acetic Acid", icon: '/bandage.png'},
          ]
      },
    ]
  },
  {
    id: 3,
    name: 'Comms Vest',
    imageSrc: '/comms-vest.png',
    imageAlt: 'TODO',
    description: 'Longer UAVs and announcement of nearby enemies.',
    requirements: [{amount: 1, name: "Kill the Wheelson.", link: null, avatarSrc: '/wheelson.png'}],
    locations: [
      {
        city: "Al Mazrah", requirements:
          [
            {quantity: 1, name: "Encrypted Hard Drive", icon: '/hard-drive.png'},
            {quantity: 2, name: "Battery", icon: '/battery.png'},
            {quantity: 1, name: "Soothing Hand Cream", icon: '/soothing-hand-cream.png'}
          ]
      },
      {
        city: "Ashika Island", requirements:
          [
            {quantity: 1, name: "Encrypted Hard Drive", icon: '/hard-drive.png'},
            {quantity: 2, name: "Battery", icon: '/battery.png'},
            {quantity: 1, name: "Soothing Hand Cream", icon: '/soothing-hand-cream.png'}
          ]
      },
      {
        city: "Vondel", requirements:
          [
            {quantity: 1, name: "Encrypted Hard Drive", icon: '/hard-drive.png'},
            {quantity: 2, name: "Battery", icon: '/battery.png'},
            {quantity: 1, name: "Soothing Hand Cream", icon: '/soothing-hand-cream.png'}
          ]
      },
      {
        city: "Building 21", requirements:
          [
            {quantity: 2, name: "Hard Drive", icon: '/hard-drive.png'},
            {quantity: 2, name: "Battery", icon: '/battery.png'},
            {quantity: 1, name: "Soothing Hand Cream", icon: '/soothing-hand-cream.png'}
          ]
      },
    ]
  },
  {
    id: 4,
    name: 'Secure Backpack',
    imageSrc: '/secure-backpack.png',
    imageAlt: 'TODO',
    description: 'Items stay in your inventory upon death, 4 item storage capacity.',
    requirements: [
      {amount: 1, name: "Kill the Scavenger 9 times.", link: null, avatarSrc: '/scavenger.png'},
    ],
    locations: [
      {
        city: "Al Mazrah", requirements:
          [
            {quantity: 2, name: "Electric Drill", icon: '/electric-drill.png'},
            {quantity: 2, name: "Gas Can", icon: '/gas-can.png'},
            {quantity: 1, name: "Gold Skull", icon: '/bandage.png'}
          ]
      },
      {
        city: "Ashika Island", requirements:
          [
            {quantity: 2, name: "Electric Drill", icon: '/electric-drill.png'},
            {quantity: 2, name: "Gas Can", icon: '/gas-can.png'},
            {quantity: 1, name: "Gold Skull", icon: '/bandage.png'}
          ]
      },
      {
        city: "Vondel", requirements:
          [
            {quantity: 2, name: "Electric Drill", icon: '/electric-drill.png'},
            {quantity: 2, name: "Gas Can", icon: '/gas-can.png'},
            {quantity: 1, name: "Gold Skull", icon: '/bandage.png'}
          ]
      },
      {
        city: "Building 21", requirements:
          [
            {quantity: 2, name: "Electric Drill", icon: '/electric-drill.png'},
            {quantity: 2, name: "Gas Can", icon: '/gas-can.png'},
            {quantity: 1, name: "Gold Skull", icon: '/bandage.png'}
          ]
      },
    ]
  },
  {
    id: 5,
    name: 'Scavenger Backpack',
    imageSrc: '/scavenger-backpack.png',
    imageAlt: 'TODO',
    description: 'Remove third gun slot, add two additional item slots.',
    requirements: [
      {amount: 1, name: "Kill the Scavenger.", link: null, avatarSrc: '/scavenger.png'},
    ],
    locations: [
      {
        city: "Al Mazrah", requirements:
          [
            {quantity: 1, name: "Battery", icon: '/battery.png'},
            {quantity: 1, name: "Canned Foods", icon: '/canned-foods.png'},
            {quantity: 2, name: "Gun Cleaning Oil", icon: '/gun-cleaning-oil.png'}
          ]
      },
      {
        city: "Ashika Island", requirements:
          [
            {quantity: 1, name: "Battery", icon: '/battery.png'},
            {quantity: 1, name: "Canned Foods", icon: '/canned-foods.png'},
            {quantity: 2, name: "Gun Cleaning Oil", icon: '/gun-cleaning-oil.png'}
          ]
      },
      {
        city: "Vondel", requirements:
          [
            {quantity: 1, name: "Battery", icon: '/battery.png'},
            {quantity: 1, name: "Canned Foods", icon: '/canned-foods.png'},
            {quantity: 2, name: "Gun Cleaning Oil", icon: '/gun-cleaning-oil.png'}
          ]
      },
      {
        city: "Building 21", requirements:
          [
            {quantity: 1, name: "Battery", icon: '/battery.png'},
            {quantity: 1, name: "Canned Foods", icon: '/canned-foods.png'},
            {quantity: 2, name: "Gun Cleaning Oil", icon: '/gun-cleaning-oil.png'}
          ]
      },
    ]
  }
  // More gearItems...
]

export default function ItemGrid() {
  const [productSlide, setProductSlide] = useState(false)
  const [selected, setSelected] = useState<number>(0);
  const {addItem, items} = useContext(LootContext);
  const notify = (name: string) => toast.success(`Added ${name} to objectives.`, { position: 'bottom-right'});
  const handleAdd = (name: string) => {
    const item = gearItems.find((item) => item.name === name)
    if (!item) {
      return toast.error('Error adding item.')
    }
    addItem(item);
    notify(name);
  }
  return (
    <div className="bg-bLack text-white">
      {gearItems[selected] !== undefined && (
        <SlideOut
          product={gearItems[selected]!}
          productSlide={productSlide}
          setProductSlide={setProductSlide}
        />
      )}
      <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <h2 className="sr-only">All gear</h2>

        <div className="-mx-px grid grid-cols-2 border-l border-gray-700 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {gearItems.map((product) => (
            <div
              key={product.id}
              className="group relative border-r border-b border-gray-700 p-4 sm:p-6"
            >
              <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-90">
                <Image
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center"
                  height={212}
                  width={212}
                />
              </div>
              <div className="pt-10 pb-4 text-center ">
                <div className={"h-28 md:h-24"}>
                  <h3 className="font-heading text-white">
                  {product.name}
                </h3>
                <p className="text-gray-50 mb-4 font-subheading">{product.description}</p>
                </div>
                <div className={"flex flex-col"}>
                  <button
                    type="button"
                    onClick={() => handleAdd(product.name)}
                    disabled={items.includes(product)}
                    className={`justify-center flex disabled:bg-gray-900 items-center rounded-md border border-transparent bg-indigo-900 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:ring-offset-2`}
                  >
                    {items.includes(product) ? 'Added' : <><PlusIcon className="-ml-0.5 mr-2 h-4 w-4" />Add to objectives</>}
                  </button>
                  <button
                    onClick={() => {
                      setProductSlide(true);
                      setSelected(product.id)
                    }}
                    className="mt-2 text-xs text-gray-300 bg-gray-900 py-2 rounded-md hover:bg-gray-800"
                  >
                    View details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
