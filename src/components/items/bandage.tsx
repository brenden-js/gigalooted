import bandage from '../../../public/bandage.png'
import Image from 'next/image'

export default function Bandage({ quantity }: {quantity: number}) {
  return (
    <span className="relative inline-block">
    <Image
      src={bandage}
      alt={"bandage"}
      placeholder="blur"
    />
      <span className="absolute bottom-0 right-0 block h-4 w-4 rounded-full bg-gray-400 ring-2 ring-white">
        <p className="text-xs text-white ml-1">{quantity}</p>
      </span>
    </span>
  )
}