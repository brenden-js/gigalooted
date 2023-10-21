import { useContext, useState} from 'react';
import {LootContext} from "../contexts/loot-list";
import {MapSpecificItems} from "../components/map-specific-items";
import EmptyState from "../components/empty-state";
import KeyModal from "../components/key-modal";
import {LootKey} from "./keys";


const tabs = [
  {name: 'Al Mazrah'},
  {name: 'Ashika Island'},
  {name: 'Building 21'},
  {name: 'Vondel'},
]

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ')
}

export default function Objectives() {
  const {
    items,
    currentMap,
    setCurrentMap,
    removeItem,
    keys,
    removeKey,
    stash,
    removeStashRecipe
  } = useContext(LootContext);

  const [keyModalOpen, setKeyModalOpen] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState<LootKey | null>();

  const handleOpen = (key: LootKey) => {
    setSelectedKey(key)
    setKeyModalOpen(true)
  }

  return (
    <div className={"min-h-screen my-6 mx-2 sm:mx-auto max-w-xl overflow-hidden sm:px-6 lg:px-8"}>
      <div className={"flex flex-col items-center mb-6 my-1"}>
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

      {keys.length > 0 && (
        <>
          {selectedKey && keyModalOpen && (
            <KeyModal open={keyModalOpen} setOpen={setKeyModalOpen} lootKey={selectedKey} />
          )}
          <div
            className="overflow-hidden mb-6 shadow ring-1 ring-black ring-opacity-5 rounded-lg border-gray-700 border">
            <table className="min-w-full">
              <thead className="bg-black">
              <tr>
                <th scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-heading font-semibold text-gray-200 sm:pl-6">
                  {`Keys`}
                </th>
              </tr>
              </thead>
              <tbody className="bg-black">
              {keys.map((key, idx) => {
                  return (
                    <tr
                      key={key.name}
                      className={classNames(idx === 0 ? 'border-gray-700' : 'border-gray-700', 'border-t')}
                    >
                      <td className="whitespace-nowrap flex-col py-4 pl-4 pr-3 text-sm font-medium text-gray-100 sm:pl-6">
                        {key.name}
                        <div className="mt-2">
                          <button
                            className={'items-center rounded border border-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-100 hover:bg-indigo-200/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'}
                            onClick={() => removeKey(key.id)}>
                            Remove
                          </button>
                        </div>
                      </td>
                      <td
                        className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => handleOpen(key)}
                          className="text-xs text-gray-300 bg-gray-900 py-4 rounded-md hover:bg-gray-800 px-12">
                          View
                          <span className="sr-only">, {key.id}</span>
                        </button>

                      </td>
                    </tr>
                  );
                }
              )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {items.map((item) => {
        return (
          <div key={item.id} className={"flex p-3 border-gray-700 border rounded-xl mb-6"}>
            <div className="w-1/4 ml-2 my-auto">
              <h2 className="text-white mb-2">
                {item.name}
              </h2>
              <button
                className={'inline-flex items-center rounded border border-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-100 hover:bg-indigo-200/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'}
                onClick={() => removeItem(item.id)}>
                Remove
              </button>
            </div>
            <div className={"py-2 w-3/4"}>
              <MapSpecificItems map={currentMap} item={item} type={'loot-list'} />
            </div>
          </div>
        )
      })}

      {stash.length > 0 && (
        <div
          className="overflow-hidden mb-6 shadow ring-1 ring-black ring-opacity-5 rounded-lg border-gray-700 border">
          <table className="min-w-full">
            <thead className="bg-black">
            <tr>
              <th scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold font-heading text-gray-200 sm:pl-6">
                {`Stash Upgrades`}
              </th>
            </tr>
            </thead>
            <tbody className="bg-black">
            {stash.map((stashRecipe, idx) => {
                return (
                  <tr
                    key={stashRecipe.id}
                    className={classNames(idx === 0 ? 'border-gray-700' : 'border-gray-700', 'border-t')}
                  >
                    <td className="whitespace-nowrap flex-col py-4 pl-4 pr-3 text-sm font-medium text-gray-100 sm:pl-6">
                      {stashRecipe.name}
                      <div className="mt-2">
                        <button
                          className={'items-center rounded border border-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-100 hover:bg-indigo-200/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'}
                          onClick={() => removeStashRecipe(stashRecipe.id)}>
                          Remove
                        </button>
                      </div>
                    </td>
                    <td
                      className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-lg text-white font-medium sm:pr-6">
                      {stashRecipe.items.map((item) =>
                        <div key={item.name} className={"py-2"}>
                          <h5>{item.name}</h5>
                          <p className={"ml-2"}>x{item.quantity}</p>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              }
            )}
            </tbody>
          </table>
        </div>
      )
      }
      {keys.length === 0 && (
        <EmptyState type={"key"} />
      )}
      {(items.length === 0) && (
        <EmptyState type={"gear"} />
      )}
      {stash.length === 0 && (
        <EmptyState type={"stash"} />
      )}
    </div>
  )
}