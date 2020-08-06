import React from 'react'
import Tree from '../media/svgs/tree.svg'

export default function Logo() {
  return (
    <div className="flex-shrink-0 p-20 text-gray-300">
      <div className="flex items-center">
        <Tree className="w-16 h-16" />
        <div className="w-1 h-16 bg-orange-700"></div>
        <div className="ml-2 font-mono text-6xl">Drasil</div>
      </div>
    </div>
  )
}
