import React, {createContext, useEffect, useState} from 'react';
import {GearItem} from "../components/item-grid";
import {LootKey} from "../pages/keys";
import {StashRecipe} from "../pages/stash";

export const restoreLoot = () => {
  let loot = null;

  try {
    const storedData = window.localStorage.getItem('loot');

    if (storedData) {
      loot = JSON.parse(storedData);
      console.log('Found stored data on init', storedData)
    } else {
      console.log('Did not find stored data on init.')
      loot = {
        items: [] as GearItem[],
        keys: [] as LootKey[],
        stash: [] as StashRecipe[],
      };
    }
  } catch (err) {
    console.error(err);
    // If stored data is not a strigified JSON this will fail,
    // that's why we catch the error
  }
  return loot
}

export const storeLoot = (newItem: GearItem | StashRecipe | LootKey, category: "items" | "keys" | "stash") => {
  console.log('Storing loot...')
  let storedLoot = null;

  try {
    const storedData = window.localStorage.getItem('loot');

    if (storedData) {
      storedLoot = JSON.parse(storedData);
      console.log('Found loot...', storedData)
    } else {
      console.log('Did not find loot...')
      storedLoot = {
        items: [] as GearItem[],
        keys: [] as LootKey[],
        stash: [] as StashRecipe[],
      };
    }
  } catch (err) {
    console.error(err);
    // If stored data is not a stringified JSON this will fail,
    // that's why we catch the error
  }

  storedLoot[category] = [...storedLoot[category], newItem];

  window.localStorage.setItem('loot', JSON.stringify(storedLoot));
};

export const removeLoot = (removeItemId: number, category: "items" | "keys" | "stash") => {
  console.log('Removing loot...')
  let storedLoot = null;

  try {
    const storedData = window.localStorage.getItem('loot');

    if (storedData) {
      storedLoot = JSON.parse(storedData);
      console.log('Found loot...', storedData)
    } else {
      console.log('Did not find loot...')
      storedLoot = {
        items: [] as GearItem[],
        keys: [] as LootKey[],
        stash: [] as StashRecipe[],
      };
    }
  } catch (err) {
    console.error(err);
    // If stored data is not a stringified JSON this will fail,
    // that's why we catch the error
  }

  storedLoot[category] = storedLoot[category].filter((item: { id: number }) => item.id !== removeItemId);

  window.localStorage.setItem('loot', JSON.stringify(storedLoot));
};

export const LootContext = createContext({
  items: [] as GearItem[],
  keys: [] as LootKey[],
  stash: [] as StashRecipe[],
  currentMap: "Al Mazrah",
  addItem: (item: GearItem) => {
    return
  },
  removeItem: (itemId: number) => {
    return
  },
  setCurrentMap: (map: string) => {
    return
  },
  addKey: (key: LootKey) => {
    return
  },
  removeKey: (keyId: number) => {
    return
  },
  addStashRecipe: (recipe: StashRecipe) => {
    return
  },
  removeStashRecipe: (recipeId: number) => {
    return
  }
});

export const LootProvider = ({children}: { children: React.ReactNode }) => {
  const addItem = (item: GearItem) => {
    setState((prevState) => {
      const obj = {
        ...prevState,
        items: [...prevState.items, item]
      }
      return obj
    });
    storeLoot(item, "items");
  };

  const removeItem = (itemId: number) => {
    setState((prevState) => {
      const obj = {
        ...prevState,
        items: prevState.items.filter((item) => item.id !== itemId)
      }
      return obj
    });
    removeLoot(itemId, "items");
  };

  const addKey = (key: LootKey) => {
    setState((prevState) => {
      const obj = {
        ...prevState,
        keys: [...prevState.keys, key]
      }
      return obj
    });
    storeLoot(key, "keys");
  };

  const removeKey = (keyId: number) => {
    setState((prevState) => {
      const obj = {
        ...prevState,
        keys: prevState.keys.filter((key) => key.id !== keyId)
      }
      return obj
    });
    removeLoot(keyId, "keys");
  };

  const addStashRecipe = (recipe: StashRecipe) => {
    setState((prevState) => {
      const obj = {
        ...prevState,
        stash: [...prevState.stash, recipe]
      }
      return obj
    });
    storeLoot(recipe, "stash");
  }

  const removeStashRecipe = (recipeId: number) => {
    setState((prevState) => {
      const obj = {
        ...prevState,
        stash: prevState.stash.filter((recipe) => recipe.id !== recipeId)
      }
      return obj
    })
    removeLoot(recipeId, "stash");
  }

  const setCurrentMap = (map: string) => {
    setState((prevState) => {
      const obj = {
        ...prevState,
        currentMap: map
      }
      return obj
    });

  }

  const initState =
    {
      items: [] as GearItem[],
      keys: [] as LootKey[],
      stash: [] as StashRecipe[],
      currentMap: "Al Mazrah",
      addItem,
      removeItem,
      addKey,
      removeKey,
      addStashRecipe,
      removeStashRecipe,
      setCurrentMap
    }

  useEffect(() => {
    const storedLoot = restoreLoot();
    console.log(storedLoot)

    if (storedLoot) {
      setState({
        addItem,
        removeItem,
        addKey,
        removeKey,
        addStashRecipe,
        removeStashRecipe,
        setCurrentMap,
        currentMap: "Al Mazrah",
        ...storedLoot
      });
    }
  }, [])
  const [state, setState] = useState(initState);

  return (
    <LootContext.Provider
      value={state}
    >
      {children}
    </LootContext.Provider>
  )
}
