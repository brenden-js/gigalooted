import {KeyIcon, SparklesIcon, SquaresPlusIcon} from "@heroicons/react/24/outline";
import Link from "next/link";


export default function EmptyState({type}: { type: string }) {
  const getLink = (type: string) => {
    if (type === "gear") {
      return "/"
    } else if (type === "key") {
      return "/keys"
    } else if (type === "stash") {
      return "/stash"
    } else {
      return "/"
    }
  }

  return (
    <Link
      href={getLink(type)}
      className="relative mb-6 block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      {type === 'key' && (
        <div className={"mx-auto h-12 w-12 text-gray-400"}>
          <KeyIcon />
        </div>
      )}
      {type === 'gear' && (
        <div className={"mx-auto h-12 w-12 text-gray-400"}>
          <SparklesIcon />
        </div>
      )}
      {type === 'stash' && (
        <div className={"mx-auto h-12 w-12 text-gray-400"}>
          <SquaresPlusIcon />
        </div>
      )}
      <div
        className="mt-2 block text-sm font-medium text-gray-200"
      >
        {type === 'key' && (
          <p>Add keys you&apos;re bringing in.</p>
        )}
        {type === 'gear' && (
          <p>Add gear you want to barter for.</p>
        )}
        {type === 'stash' && (
          <p>Add stash upgrades you are trying to get.</p>
        )}
      </div>
    </Link>
  )
}