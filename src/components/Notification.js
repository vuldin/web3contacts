import React, { useEffect } from 'react'
import store from '../state/store'
import ProfileDropdown from './ProfileDropdown'
import Approve from '../../media/svgs/approve.svg'
import Reject from '../../media/svgs/reject.svg'

export default function Notification({ notification }) {
  const { setDeleteNotificationPostId } = store.use3Box
  const { postId, fromProfile, channel, timestamp } = notification

  function generateName(fromProfile) {
    let name = 'anonymous'
    if (fromProfile) {
      name = `${fromProfile.firstName} ${fromProfile.lastName}`.trim()
      if (!name) {
        name = fromProfile.profileName
      }
    }
    return name
  }

  function handleRemoveClick(e) {
    e.preventDefault()
    setDeleteNotificationPostId(postId)
  }

  return (
    <tr>
      <td className="px-6 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap">
        {generateName(fromProfile)}
      </td>
      <td className="hidden px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap md:table-cell">
        {channel}
      </td>
      <td className="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
        <ProfileDropdown />
      </td>
      <td className="px-6 py-2 text-sm font-medium leading-5 text-right whitespace-no-wrap">
        <a href="#">
          <div className="inline-block w-8 h-8 text-green-500">
            <Approve />
          </div>
        </a>
        <a href="#" className="ml-4">
          <button
            className="inline-block w-8 h-8 text-red-500"
            value={postId}
            onClick={handleRemoveClick}
          >
            <Reject />
          </button>
        </a>
      </td>
    </tr>
  )
}
