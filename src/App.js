import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import {
  ACTIVITY_TITLE,
  ADDRESS_BOOK_TITLE,
  DESYNCED_TEXT,
  INFO_TITLE,
  SYNCED_TEXT
} from './constants'
import store from './state/store'
import useAccountPublicKey from './state/useAccountPublicKey'
import use3Box from './state/use3Box'
import usePageTitle from './state/usePageTitle'
import useStatus from './state/useStatus'
import Activity from './components/Activity'
import Contacts from './components/Contacts'
import Connect from './components/Connect'
import Info from './components/Info'
import Status from './components/Status'
import Transition from './components/Transition'
import Welcome from './components/Welcome'
import Bell from '../svgs/bell.svg'
import Logo from '../svgs/logo.svg'
import MenuOpen from '../svgs/menu-open.svg'
import MenuClose from '../svgs/menu-close.svg'

export default function App() {
  const [isOpen, setIsOpen] = useState(false)
  store.useAccountPublicKey = useAccountPublicKey()
  store.useStatus = useStatus()
  store.use3Box = use3Box()
  store.usePageTitle = usePageTitle()

  const { profile } = store.use3Box
  const { isBoxSyncing, isConnected, showSync } = store.useStatus
  const { pageTitle } = store.usePageTitle

  function isLinkActive(title) {
    return pageTitle === title
      ? 'text-white bg-gray-900'
      : 'text-gray-300 hover:text-white hover:bg-gray-700'
  }

  useEffect(() => {
    document.activeElement.blur()
  }, [isOpen])

  useEffect(() => {
    document.activeElement.blur()
    setIsOpen(false)
  }, [pageTitle])

  return (
    <Router>
      <div>
        <div className="pb-32 bg-gray-800">
          <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="border-b border-gray-700">
                <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 text-gray-300">
                      <Link to="/">
                        <Logo className="w-8 h-8" />
                      </Link>
                    </div>
                    <div className={`hidden ${isConnected && 'md:block'}`}>
                      <div className="flex items-baseline ml-10">
                        <Link
                          to="/contacts"
                          className={`${isLinkActive(
                            ADDRESS_BOOK_TITLE
                          )} px-3 py-2 text-lg font-medium rounded-md focus:outline-none focus:text-white focus:bg-gray-700`}
                        >
                          {ADDRESS_BOOK_TITLE}
                        </Link>
                        <Link
                          to="/contacts/info"
                          className={`${isLinkActive(
                            INFO_TITLE
                          )} px-3 py-2 ml-4 text-sm font-medium rounded-md focus:outline-none focus:text-white focus:bg-gray-700`}
                        >
                          {INFO_TITLE}
                        </Link>
                        <Link
                          to="/contacts/activity"
                          className={`${isLinkActive(
                            ACTIVITY_TITLE
                          )} px-3 py-2 ml-4 text-sm font-medium rounded-md focus:outline-none focus:text-white focus:bg-gray-700`}
                        >
                          {ACTIVITY_TITLE}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="flex items-center ml-4 md:ml-6">
                      {!isConnected ? (
                        <Connect />
                      ) : (
                        <>
                          <span className="inline-block text-sm text-gray-600">
                            {showSync && (isBoxSyncing ? `${DESYNCED_TEXT}` : `${SYNCED_TEXT}`)}
                          </span>
                          <button
                            className="p-1 text-gray-400 border-2 border-transparent rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
                            aria-label="Notifications"
                          >
                            <Bell className="w-6 h-6" />
                          </button>

                          <div className="relative ml-3">
                            <div>
                              <button
                                className="flex items-center max-w-xs text-sm text-white rounded-full focus:outline-none focus:shadow-solid"
                                id="user-menu"
                                aria-label="User menu"
                                aria-haspopup="true"
                                onClick={() => setIsOpen(!isOpen)}
                              >
                                {profile?.image?.[0]?.contentUrl?.['/'] && (
                                  <img
                                    className="inline-block w-8 h-8 rounded"
                                    src={`https://ipfs.infura.io/ipfs/${profile.image[0].contentUrl['/']}`}
                                    alt="profile"
                                  />
                                )}
                              </button>
                            </div>
                            <Transition
                              show={isOpen}
                              enter="transition ease-out duration-100 transform"
                              enterFrom="opacity-0 scale-95"
                              enterTo="opacity-100 scale-100"
                              leave="transition ease-in duration-75 transform"
                              leaveFrom="opacity-100 scale-100"
                              leaveTo="opacity-0 scale-95"
                            >
                              <div className="absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg">
                                <div className="py-1 bg-white rounded-md shadow-xs">
                                  <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    Settings
                                  </a>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    Sign out
                                  </a>
                                </div>
                              </div>
                            </Transition>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex -mr-2 md:hidden">
                    <button
                      className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <MenuOpen className={`${isOpen ? 'hidden' : 'block'} w-6 h-6`} />
                      <MenuClose className={`${isOpen ? 'block' : 'hidden'} w-6 h-6`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
              <div className={`${isConnected ? 'block' : 'hidden'} px-2 py-3 sm:px-3`}>
                <Link
                  to="/contacts"
                  className={`${isLinkActive(
                    ADDRESS_BOOK_TITLE
                  )} block px-3 py-2 text-lg font-medium rounded-md focus:outline-none focus:text-white focus:bg-gray-700`}
                >
                  {ADDRESS_BOOK_TITLE}
                </Link>
                <Link
                  to="/contacts/info"
                  className={`${isLinkActive(
                    INFO_TITLE
                  )} block px-3 py-2 ml-4 text-sm font-medium rounded-md focus:outline-none focus:text-white focus:bg-gray-700`}
                >
                  {INFO_TITLE}
                </Link>
                <Link
                  to="/contacts/activity"
                  className={`${isLinkActive(
                    ACTIVITY_TITLE
                  )} block px-3 py-2 ml-4 text-sm font-medium rounded-md focus:outline-none focus:text-white focus:bg-gray-700`}
                >
                  {ACTIVITY_TITLE}
                </Link>
              </div>
              <div className="px-6 pt-4 pb-3 border-t border-gray-700">
                {!isConnected ? <Connect /> : <Status />}
              </div>
            </div>
          </nav>
        </div>

        <main className="-mt-32">
          <div className="pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <Route path="/" exact>
              <Welcome />
            </Route>
            <Route path="/contacts" exact>
              {isConnected ? (
                <div className="py-6 bg-white shadow sm:px-5 sm:rounded-lg sm:px-6">
                  <Contacts />
                </div>
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/contacts/info" exact>
              {isConnected ? (
                <div className="py-6 bg-white shadow sm:px-5 sm:rounded-lg sm:px-6">
                  <Info />
                </div>
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/contacts/activity" exact>
              {isConnected ? (
                <div className="py-6 bg-white shadow sm:px-5 sm:rounded-lg sm:px-6">
                  <Activity />
                </div>
              ) : (
                <Redirect to="/" />
              )}
            </Route>
          </div>
          {/* isConnected && (
            <span className="absolute inset-x-0 bottom-0 flex justify-center px-6 pb-6 rounded-md shadow-sm sm:justify-end sm:static sm:inline-flex">
              <button
                type="button"
                className="inline-flex items-center px-6 py-6 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-orange-700 border border-transparent rounded-full sm:py-3 sm:rounded-md hover:bg-orange-800 focus:outline-none focus:border-orange-900 focus:shadow-outline-indigo active:bg-indigo-700"
              >
                <Plus className="w-6 h-6" />
                <span className="hidden sm:inline sm:pl-2">Add Contacts</span>
              </button>
            </span>
          ) */}
        </main>
      </div>
    </Router>
  )
}
