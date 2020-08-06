import React, { useEffect, useState } from 'react'
import store from '../state/store'
import { INFO_TITLE } from '../constants'
import Transition from './Transition'
import EditProfile from './EditProfile'
import MoodNeutral from '../../media/svgs/mood-neutral-outline.svg'

export default function Info() {
  const [isAddProfileShown, setIsAddProfileShown] = useState(false)
  const { setPageTitle } = store.usePageTitle
  const { drasilProfiles } = store.use3Box

  useEffect(() => {
    setPageTitle(INFO_TITLE)
  })

  return (
    <div className="flex flex-col">
      {drasilProfiles.length > 0 ? (
        drasilProfiles.map(drasilProfile => (
          <div key={drasilProfile.index} className="p-6 bg-white shadow sm:rounded-lg sm:p-0">
            <EditProfile profile={drasilProfile} />
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-10 text-gray-900">
          <span className="text-xl">No profiles</span>
          <MoodNeutral className="inline-block w-6 h-6 ml-2" />
        </div>
      )}
      <div className="mt-5">
        <span className="inline-flex pl-6 mb-3 rounded-md shadow-sm sm:pl-0">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-orange-600 border border-transparent rounded-md hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700"
            id="add-contact"
            aria-label="Add Contact"
            aria-haspopup="true"
            onClick={() => setIsAddProfileShown(true)}
          >
            Add Profile
          </button>
        </span>
      </div>
      <Transition
        show={isAddProfileShown}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-200 transform"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-x-0 bottom-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div
            className="overflow-hidden transition-all transform bg-white rounded-lg shadow-xl sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-contact-info-modal"
          >
            <EditProfile setIsAddProfileShown={setIsAddProfileShown} />
          </div>
        </div>
      </Transition>
    </div>
  )
}
