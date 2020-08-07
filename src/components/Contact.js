import React from 'react'
import DefaultProfile from '../../media/svgs/default-profile.svg'

export default function Contact({ avatarUrl, name, phoneNumber, email }) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <DefaultProfile />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium leading-5 text-gray-900">{name}</div>
            <div className="text-sm leading-5 text-gray-500">{/*jane.cooper@example.com*/}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900 select-all">{phoneNumber}</div>
        <div className="text-sm leading-5 text-gray-500">{/*Optimization*/}</div>
      </td>
      <td className="hidden px-6 py-4 whitespace-no-wrap border-b border-gray-200 md:table-cell">
        <span className="text-sm leading-5 text-gray-900 select-all">{email}</span>
      </td>
      <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
        <a href="#" className="text-indigo-600 hover:text-indigo-900">
          {/*Edit*/}
        </a>
      </td>
    </tr>
  )
}
