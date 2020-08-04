import React, { useEffect, useState } from 'react'
import store from '../state/store'
import { ACTIVITY_TITLE } from '../constants'
import ProfileDropdown from './ProfileDropdown'
import Approve from '../../media/svgs/approve.svg'
import Reject from '../../media/svgs/reject.svg'

export default function Activity() {
  const [isLogShown, setIsLogShown] = useState(false)
  const { setPageTitle } = store.usePageTitle

  useEffect(() => {
    setPageTitle(ACTIVITY_TITLE)
  })

  return (
    <div>
      <div>
        <div className="flex items-center h-8 mt-5 mb-3 text-gray-900">
          {/*
          <div className="inline-block w-8 ">
            <IncomingRequestImage />
          </div>
          */}
          <span className="pl-6 sm:pl-0">Requests (1)</span>
        </div>
        <div className="flex flex-col">
          <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase bg-gray-100">
                      From
                    </th>
                    <th className="hidden px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase bg-gray-100 md:table-cell">
                      Channel
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase bg-gray-100">
                      Profile
                    </th>
                    <th className="py-3 pl-6 pr-10 text-xs font-medium text-right text-gray-700 uppercase bg-gray-100">
                      Allow?
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap">
                      Azul Serrano
                    </td>
                    <td className="hidden px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap md:table-cell">
                      hello@vuld.in
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
                        <div className="inline-block w-8 h-8 text-red-500">
                          <Reject />
                        </div>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/*
        <div className="flex items-center h-8 mt-5 mb-3 text-gray-900">
          <div className="inline-block w-8 ">
            <OutgoingRequestImage />
          </div>
          <span>Subscription Requests</span>
        </div>
        <div className="flex flex-col">
          <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase bg-gray-100">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase bg-gray-100">
                      When
                    </th>
                    <th className="px-6 py-3 bg-gray-100"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap">
                      jpatx@gmail.com
                    </td>
                    <td className="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                      a few moments ago
                    </td>
                    <td className="px-6 py-2 text-sm font-medium leading-5 text-right whitespace-no-wrap">
                      <a href="#" className="ml-4">
                        <div className="inline-block w-8 h-8 text-red-500">
                          <Reject />
                        </div>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
            className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-orange-600 border border-transparent rounded-md hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700"
      */}
      </div>
      <div className="mt-5">
        <span className="inline-flex pl-6 mb-3 rounded-md shadow-sm sm:pl-0">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50"
            id="user-menu"
            aria-label="User menu"
            aria-haspopup="true"
            onClick={() => setIsLogShown(!isLogShown)}
          >
            {isLogShown ? 'Hide' : 'Show'} Log
          </button>
        </span>
        {isLogShown && (
          <div className="flex flex-col">
            <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase bg-gray-100">
                        Event
                      </th>
                      <th className="hidden px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase bg-gray-100 md:table-cell">
                        When
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-right text-gray-700 uppercase bg-gray-100">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-6 py-3 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap">
                        requested subscription to jpatx@gmail.com
                      </td>
                      <td className="hidden px-6 py-3 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap md:table-cell">
                        moments ago
                      </td>
                      <td className="px-6 py-3 text-sm leading-5 text-right text-gray-900 whitespace-no-wrap">
                        <a
                          href="#"
                          className="pl-2 text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500"
                        >
                          Cancel
                        </a>
                      </td>
                    </tr>
                    <tr className="bg-gray-100">
                      <td className="px-6 py-3 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap">
                        subscribed to Azul Serrano
                      </td>
                      <td className="hidden px-6 py-3 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap md:table-cell">
                        5 minutes ago
                      </td>
                      <td className="px-6 py-3 text-sm leading-5 text-right text-gray-900 whitespace-no-wrap"></td>
                    </tr>

                    <tr className="bg-white">
                      <td className="px-6 py-3 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap">
                        javiersan@pm.me rejected subscription request
                      </td>
                      <td className="hidden px-6 py-3 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap md:table-cell">
                        yesterday
                      </td>
                      <td className="px-6 py-3 text-sm leading-5 text-right text-gray-900 whitespace-no-wrap">
                        <a
                          href="#"
                          className="pl-2 text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500"
                        >
                          Resend
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
