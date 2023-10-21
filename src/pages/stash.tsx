import {Fragment, useContext} from "react";
import toast from "react-hot-toast";
import {LootContext} from "../contexts/loot-list";

type LootItem = {
  name: string
  quantity: number
}

export type StashRecipe = {
  id: number
  type: string
  name: string
  level: number
  items: LootItem[]
  benefit: string
}

const recipes: StashRecipe[] = [
  {
    id: 0,
    type: "Wallet",
    name: "Wallet Unlock",
    level: 0,
    items: [{
      name: "Cash",
      quantity: 100000
    }],
    benefit: 'Allows you to store money between missions.'
  },
  {
    id: 1,
    type: "Wallet",
    name: "Wallet Expansion 1",
    level: 1,
    items: [
      {
        name: "Liquor",
        quantity: 10
      },
      {
        name: "Aged or Vintage Wine Bottle",
        quantity: 2
      },
      {
        name: "Wine Bottle",
        quantity: 6
      },
    ],
    benefit: 'Increases size of stash by 150k.'
  },
  {
    id: 2,
    type: "Wallet",
    name: "Wallet Expansion 2",
    level: 2,
    items: [
      {
        name: "Thumb Drive",
        quantity: 4
      },
      {
        name: "Hard Drive",
        quantity: 8
      },
      {
        name: "Laptop",
        quantity: 4
      },
      {
        name: "Encrypted Hard Drive",
        quantity: 0
      },
    ],
    benefit: 'Increases size of stash by 150k.'
  },
  {
    id: 3,
    type: "Wallet",
    name: "Wallet Expansion 3",
    level: 3,
    items: [
      {
        name: "GPU",
        quantity: 2
      },
    ],
    benefit: 'Increases size of stash by 100k.'
  },
  {
    id: 4,
    type: "Wallet",
    name: "Wallet Expansion 4",
    level: 4,
    items: [
      {
        name: "Vintage Wine Bottle",
        quantity: 6
      },

      {
        name: "Japanese Liquor",
        quantity: 16
      },
    ],
    benefit: 'Increases size of stash by 100k.'
  },
  {
    id: 5,
    type: "Wallet",
    name: "Wallet Expansion 5",
    level: 5,
    items: [
      {
        name: "Gold Skull",
        quantity: 6
      },
      {
        name: "Gold Bar",
        quantity: 10
      },
    ],
    benefit: 'Increases size of stash by 100k.'
  },
  {
    id: 6,
    type: "Wallet",
    name: "Crown Wallet Expansion 1",
    level: 6,
    items: [
      {
        name: "Gun Oil",
        quantity: 3
      },
      {
        name: "Electric Drill",
        quantity: 2
      },
      {
        name: "Battery",
        quantity: 5
      },
    ],
    benefit: 'Increases size of stash by 100k.'
  },
  {
    id: 7,
    type: "Wallet",
    name: "Crown Wallet Expansion 2",
    level: 7,
    items: [
      {
        name: "Electric Tape",
        quantity: 8
      },
      {
        name: "Jumper Cables",
        quantity: 6
      },
      {
        name: "Car Battery",
        quantity: 3
      },],
    benefit: 'Increases size of stash by 50k.'
  },
  {
    id: 8,
    type: "Wallet",
    name: "Crown Wallet Expansion 3",
    level: 8,
    items: [
      {
        name: "Screwdriver",
        quantity: 10
      },
      {
        name: "Encrypted Hard Drive",
        quantity: 4
      },
      {
        name: "Cash",
        quantity: 500000
      },
      {
        name: "AQ Laptop",
        quantity: 5
      },],
    benefit: 'Increases size of stash by 50k.'
  },
  {
    id: 9,
    type: "Wallet",
    name: "Crown Wallet Expansion 4",
    level: 9,
    items: [
      {
        name: "VCR",
        quantity: 10
      },
      {
        name: "GPU",
        quantity: 4
      },
      {
        name: "Encrypted USB Stick",
        quantity: 6
      },
      {
        name: "Game Console",
        quantity: 10
      },],
    benefit: 'Increases size of stash by 50k.'
  },
  {
    id: 10,
    type: "Wallet",
    name: "Crown Wallet Expansion 5",
    level: 10,
    items: [
      {
        name: "Lighter",
        quantity: 30
      },
      {
        name: "Electrical Components",
        quantity: 40
      },
      {
        name: "Ashika Old Film Canister",
        quantity: 20
      },],
    benefit: 'Increases size of stash by 50k.'
  },
  {
    id: 11,
    type: "Stash",
    name: "Stash Expansion 1",
    level: 0,
    items: [
      {
        name: "Nuclear Fuel Rod",
        quantity: 10
      },
      {
        name: "Radiation Blocker",
        quantity: 2
      },],
    benefit: "Increase item slots in mission and key stash by 5."
  },
  {
    id: 12,
    type: "Stash",
    name: "Stash Expansion 2",
    level: 1,
    items: [
      {
        name: "Comic Book",
        quantity: 5
      },
      {
        name: "Cigar Box",
        quantity: 9
      },
      {
        name: "Aspirin",
        quantity: 3
      },],
    benefit: "Increase item slots in mission and key stash by 5."
  },
  {
    id: 13,
    type: "Stash",
    name: "Stash Expansion 3",
    level: 2,
    items: [
      {
        name: "IFAK",
        quantity: 15
      },
      {
        name: "AFAK",
        quantity: 10
      },
      {
        name: "Large Medical Bag",
        quantity: 0
      },
    ],
    benefit: "Increase item slots in mission and key stash by 4."
  },
  {
    id: 14,
    type: "Stash",
    name: "Stash Expansion 4",
    level: 3,
    items: [
      {
        name: "RGL-80",
        quantity: 1
      },
      {
        name: "Wrench",
        quantity: 5
      },
      {
        name: "Dog Tag",
        quantity: 3
      },
      {
        name: "Screwdriver",
        quantity: 5
      },],
    benefit: "Increase item slots in mission and key stash by 3."
  },
  {
    id: 15,
    type: "Stash",
    name: "Stash Expansion 5",
    level: 4,
    items: [
      {
        name: "Classified Documents",
        quantity: 8
      },
      {
        name: "Documents",
        quantity: 40
      },
      {
        name: "Sensitive Documents",
        quantity: 16
      },],
    benefit: "Increase item slots in mission and key stash by 3."
  },
  {
    id: 16,
    type: "Stash",
    name: "Crown Stash Expansion 1",
    level: 5,
    items: [
      {
        name: "Bandage",
        quantity: 8
      },
      {
        name: "IFAK",
        quantity: 4
      },
      {
        name: "Radiation Blocker",
        quantity: 1
      },],
    benefit: "Increase item slots in mission and key stash by 3."
  },
  {
    id: 17,
    type: "Stash",
    name: "Crown Stash Expansion 2",
    level: 6,
    items: [
      {
        name: "Vase",
        quantity: 6
      },
      {
        name: "Japanese Liquor Bottle",
        quantity: 3
      },],
    benefit: "Increase item slots in mission and key stash by 3."
  },
  {
    id: 18,
    type: "Stash",
    name: "Crown Stash Expansion 3",
    level: 7,
    items: [
      {
        name: "Food Ration",
        quantity: 7
      },
      {
        name: "Bottle of Water",
        quantity: 8
      },
      {
        name: "Gas Can",
        quantity: 3
      },
      {
        name: "Cans of Food",
        quantity: 8
      },],
    benefit: "Increase item slots in mission and key stash by 2."
  },
  {
    id: 19,
    type: "Stash",
    name: "Crown Stash Expansion 4",
    level: 8,
    items: [
      {
        name: "Large Medical Bag",
        quantity: 8
      },
      {
        name: "Aspirin",
        quantity: 8
      },],
    benefit: "Increase item slots in mission and key stash by 1."
  },
  {
    id: 20,
    type: "Stash",
    name: "Crown Stash Expansion 5",
    level: 9,
    items: [
      {
        name: "Gun Oil",
        quantity: 7
      },
      {
        name: "Blow Torch",
        quantity: 0
      },
      {
        name: "Liquid Nitrogen",
        quantity: 2
      },
      {
        name: "Nuclear Rods",
        quantity: 14
      },],
    benefit: "Increase item slots in mission and key stash by 1."
  },
  {
    id: 21,
    type: "1st Insured Slot",
    name: "1st Insured Slot Cooldown Reduction 1",
    level: 0,
    items: [
      {
        name: "Clasified Documents",
        quantity: 3
      },
      {
        name: "Cash",
        quantity: 400000
      },
      {
        name: "Gun Oil",
        quantity: 4
      },],
    benefit: "Reduce cooldown of 1st insured slot by 25%."
  },
  {
    id: 22,
    type: "1st Insured Slot",
    name: "1st Insured Slot Cooldown Reduction 2",
    level: 1,
    items: [
      {
        name: "Enemy Operator Weapons",
        quantity: 5
      },
      {
        name: "Lightbulb",
        quantity: 7
      },
      {
        name: "Toothpaste",
        quantity: 12
      },
      {
        name: "Bottle of Water",
        quantity: 15
      },],
    benefit: "Reduce cooldown of 1st insured slot by another 25%. (Total 50%)"
  },
  {
    id: 23,
    type: "2nd Insured Slot",
    name: "2nd Insured Slot Unlock",
    level: 0,
    items: [
      {
        name: "AFAK or Large Medical Bag",
        quantity: 1
      },
      {
        name: "IFAK",
        quantity: 3
      },
      {
        name: "Enemy Operator Weapon",
        quantity: 1
      },],
    benefit: "Unlock 2nd insured weapon slot."
  },
  {
    id: 24,
    type: "2nd Insured Slot",
    name: "2nd Insured Slot Cooldown Reduction 1",
    level: 1,
    items: [
      {
        name: "Imported Tea",
        quantity: 8
      },
      {
        name: "Aged or Vintage Wine",
        quantity: 4
      },
      {
        name: "Soothing Hand Cream",
        quantity: 8
      },],
    benefit: "Reduce cooldown of 2nd insured slot by 25%."
  },
  {
    id: 25,
    type: "2nd Insured Slot",
    name: "2nd Insured Slot Cooldown Reduction 2",
    level: 2,
    items: [
      {
        name: "Hydrochloride",
        quantity: 4
      },
      {
        name: "Acetone",
        quantity: 4
      },
      {
        name: "Cephalexin",
        quantity: 4
      },
      {
        name: "Chlorine",
        quantity: 4
      },
      {
        name: "Hydrogen Peroxide",
        quantity: 4
      },
      {
        name: "Formaldehyde",
        quantity: 4
      },],
    benefit: "Reduce cooldown of 2nd insured slot by another 25%. (Total 50%)"
  },
  {
    id: 26,
    type: "3rd Insured Slot",
    name: "3rd Insured Slot Unlock",
    level: 0,
    items: [
      {
        name: "GPU",
        quantity: 5
      },
      {
        name: "Enemy Operator Weapon",
        quantity: 10
      },
      {
        name: "Gold Bar",
        quantity: 10
      },
      {
        name: "Gold Skull",
        quantity: 8
      },],
    benefit: "Unlock 3rd insured weapon slot."
  },
  {
    id: 27,
    type: "3rd Insured Slot",
    name: "3rd Insured Slot Cooldown Reduction 1",
    level: 1,
    items: [
      {
        name: "Lighter",
        quantity: 20
      }, {
        name: "Cigar Box",
        quantity: 35
      },],
    benefit: "Reduce cooldown of 3rd insured slot by 25%."
  },
  {
    id: 28,
    type: "3rd Insured Slot",
    name: "3rd Insured Slot Cooldown Reduction 2",
    level: 2,
    items: [
      {
        name: "Dog Tag",
        quantity: 10
      },
      {
        name: "Silver Dog Tag",
        quantity: 3
      },
      {
        name: "Gold Dog Tag",
        quantity: 2
      },
      {
        name: "Damascus Dog Tag",
        quantity: 1
      },
      {
        name: "Weapon Case",
        quantity: 3
      },],
    benefit: "Reduce cooldown of 3rd insured slot by another 25%. (Total 50%)"
  },
  {
    id: 29,
    type: "Contraband Stash",
    name: "Contraband Stash Expansion 1",
    level: 0,
    items: [
      {
        name: "Hard Drive",
        quantity: 5
      },
      {
        name: "Thumb Drive",
        quantity: 4
      },],
    benefit: "Expand contraband stash by 5 slots."
  },
  {
    id: 30,
    type: "Contraband Stash",
    name: "Contraband Stash Expansion 2",
    level: 1,
    items: [
      {
        name: "Black Mous Intel",
        quantity: 4
      },
      {
        name: "Dog Tag",
        quantity: 4
      },],
    benefit: "Expand contraband stash by 5 slots."
  },
  {
    id: 31,
    type: "Contraband Stash",
    name: "Contraband Stash Expansion 3",
    level: 2,
    items: [
      {
        name: "Original Ashika Island Mask",
        quantity: 1
      },
      {
        name: "Ashika Island Mask",
        quantity: 6
      },],
    benefit: "Expand contraband stash by 4 slots."
  },
  {
    id: 32,
    type: "Contraband Stash",
    name: "Contraband Stash Expansion 4",
    level: 3,
    items: [
      {
        name: "Armor Plate Box",
        quantity: 3
      },
      {
        name: "Armor Plate",
        quantity: 15
      },
      {
        name: "3-Plate Vest",
        quantity: 5
      },],
    benefit: "Expand contraband stash by 3 slots."
  },
  {
    id: 33,
    type: "Contraband Stash",
    name: "Contraband Stash Expansion 5",
    level: 4,
    items: [
      {
        name: "UAV or Advanced UAV",
        quantity: 10
      },
      {
        name: "Hard Drive",
        quantity: 20
      },
      {
        name: "Anti-Armor Round Box",
        quantity: 12
      },],
    benefit: "Expand contraband stash by 3 slots."
  },
  {
    id: 34,
    type: "Contraband Stash",
    name: "Crown Contraband Stash Expansion 1",
    level: 5,
    items: [
      {
        name: "Stim",
        quantity: 9
      },
      {
        name: "Bandage",
        quantity: 6
      },],
    benefit: "Expand the contraband stash by an additional 3 slots."
  },
  {
    id: 35,
    type: "Contraband Stash",
    name: "Crown Contraband Stash Expansion 2",
    level: 6,
    items: [
      {
        name: "Lighter or Comic Book or Cigar Box or Documents",
        quantity: 15
      },
      {
        name: "Gas Can",
        quantity: 5
      },],
    benefit: "Expand the contraband stash by an additional 3 slots."
  },
  {
    id: 36,
    type: "Contraband Stash",
    name: "Crown Contraband Stash Expansion 3",
    level: 7,
    items: [
      {
        name: "Blow Torch",
        quantity: 16
      },
      {
        name: "Car Battery",
        quantity: 8
      },
      {
        name: "Jumper Cables",
        quantity: 12
      },],
    benefit: "Expand the contraband stash by an additional 3 slots."
  },
  {
    id: 37,
    type: "Contraband Stash",
    name: "Crown Contraband Stash Expansion 4",
    level: 8,
    items: [],
    benefit: "Expand the contraband stash by an additional 3 slots."
  },
  {
    id: 38,
    type: "Contraband Stash",
    name: "Crown Contraband Stash Expansion 5",
    level: 9,
    items: [
      {
        name: "AR/LMG Ammo",
        quantity: 6500
      },
      {
        name: "Launcher Ammo",
        quantity: 120
      },
      {
        name: "Shotgun Ammo",
        quantity: 1200
      },
      {
        name: "Sniper Ammo",
        quantity: 800
      },
      {
        name: "Pistol/SMG Ammo",
        quantity: 3500
      },],
    benefit: "Expand the contraband stash by an additional 3 slots."
  }
]

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ')
}

export const Stash = () => {
  const walletUpgrades = recipes.filter((recipe) => recipe.type === "Wallet")
  const contrabandUpgrades = recipes.filter((recipe) => recipe.type === "Contraband Stash")
  const firstInsuredSlot = recipes.filter((recipe) => recipe.type === '1st Insured Slot')
  const secondInsuredSlot = recipes.filter((recipe) => recipe.type === '2nd Insured Slot')
  const thirdInsuredSlot = recipes.filter((recipe) => recipe.type === '3rd Insured Slot')
  const stashUpgrades = recipes.filter((recipe) => recipe.type === 'Stash')

  const allUpgrades = [walletUpgrades, stashUpgrades, contrabandUpgrades, firstInsuredSlot, secondInsuredSlot, thirdInsuredSlot]

  const { addStashRecipe, stash } = useContext(LootContext)

  const handleAdd = (recipe: StashRecipe) => {
    addStashRecipe(recipe)
    toast.success(`Added ${recipe.name} to objectives.`, {
      position: 'bottom-right',
      className: 'bg-black text-white'
    })
  }

  return (
    <div className={"min-h-screen my-6 mx-2 sm:mx-auto max-w-xl overflow-hidden sm:px-6 lg:px-8 text-white"}>
      <div className="mt-8 flex flex-col px-2 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center mb-6">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-50 font-heading">Stash Upgrades</h1>
            <p className="mt-2 text-sm text-gray-300">
              Earn a stash upgrade by extracting the listed items.
            </p>
          </div>
        </div>
        <div className="inline-block min-w-full py-2 align-middle">
          <div
            className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg border-gray-700 border">
            <table className="min-w-full">
              <thead className="bg-black">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-200 sm:pl-6">
                  {`Stash upgrades`}
                </th>
              </tr>
              </thead>
              <tbody className="bg-black">
              {allUpgrades.map((upgradeTypeList) => (
                <Fragment key={upgradeTypeList[0]?.type}>
                  <tr className="border-t border-gray-700">
                    <th
                      colSpan={5}
                      scope="colgroup"
                      className="bg-gray-900 px-4 py-2 text-left text-sm font-semibold text-white sm:px-6"
                    >
                      {upgradeTypeList[0]?.type}
                    </th>
                  </tr>
                  {upgradeTypeList.map((stashRecipe, idx: number) => (
                    <tr
                      key={stashRecipe.name}
                      className={classNames(idx === 0 ? 'border-gray-700' : 'border-gray-700', 'border-t')}
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-100 sm:pl-6">
                        {stashRecipe.name}
                      </td>
                      <td
                        className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => handleAdd(stashRecipe)}
                          className="ml-2 text-xs text-gray-300 border border-transparent bg-indigo-900 py-2 rounded-md  disabled:bg-gray-900 hover:bg-indigo-700 focus:ring-offset-2 px-3"
                          disabled={stash.includes(stashRecipe)}
                        >
                          {stash.includes(stashRecipe) ? "Added" : "+ Add items"}
                          <span className="sr-only">, {stashRecipe.name}</span>
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

export default Stash;