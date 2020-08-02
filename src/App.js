import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ADDRESS_BOOK_TITLE, INFO_TITLE, ACTIVITY_TITLE } from "./constants";
import store from "./state/store";
import useAccountPublicKey from "./state/useAccountPublicKey";
import useBox from "./state/useBox";
import usePageTitle from "./state/usePageTitle";
import useProfile from "./state/useProfile";
import useSpace from "./state/useSpace";
import useStatus from "./state/useStatus";
import AddressBook from "./components/AddressBook";
import Connect from "./components/Connect";
import ContactInfo from "./components/ContactInfo";
import Transition from "./components/Transition";
import Logo from "../svgs/logo.svg";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  store.useAccountPublicKey = useAccountPublicKey();
  store.useBox = useBox();
  store.useSpace = useSpace();
  store.useStatus = useStatus();
  store.useProfile = useProfile();
  store.usePageTitle = usePageTitle();

  const { profile } = store.useProfile;
  const { isConnected } = store.useStatus;
  const { pageTitle } = store.usePageTitle;

  function isLinkActive(title) {
    return pageTitle === title
      ? `text-white bg-gray-900`
      : `text-gray-300 hover:text-white hover:bg-gray-700`;
  }

  useEffect(() => {
    document.activeElement.blur();
  }, [pageTitle, isOpen]);

  return (
    <Router>
      <div>
        <div className="pb-32 bg-gray-800">
          <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="border-b border-gray-700">
                <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Logo className="w-8 h-8" />
                    </div>
                    <div className="hidden md:block">
                      <div className="flex items-baseline ml-10">
                        <Link
                          to="/"
                          className={`${isLinkActive(
                            ADDRESS_BOOK_TITLE
                          )} px-3 py-2 text-sm font-medium rounded-md focus:outline-none focus:text-white focus:bg-gray-700`}
                        >
                          {ADDRESS_BOOK_TITLE}
                        </Link>
                        <Link
                          to="/info"
                          className={`${isLinkActive(
                            INFO_TITLE
                          )} px-3 py-2 ml-4 text-sm font-medium rounded-md focus:outline-none focus:text-white focus:bg-gray-700`}
                        >
                          {INFO_TITLE}
                        </Link>
                        <Link
                          to="/activity"
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
                          <button
                            className="p-1 text-gray-400 border-2 border-transparent rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
                            aria-label="Notifications"
                          >
                            <svg
                              className="w-6 h-6"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                              />
                            </svg>
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
                                {profile?.image?.[0]?.contentUrl?.["/"] && (
                                  <img
                                    className="inline-block w-8 h-8 rounded"
                                    src={`https://ipfs.infura.io/ipfs/${profile.image[0].contentUrl["/"]}`}
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
                                    Your Profile
                                  </a>
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
                      <svg
                        className={`${isOpen ? "hidden" : "block"} w-6 h-6`}
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                      <svg
                        className={`${isOpen ? "block" : "hidden"} w-6 h-6`}
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
              <div className="px-2 py-3 sm:px-3">
                <a
                  href="#"
                  className="block px-3 py-2 text-base font-medium text-white bg-gray-900 rounded-md focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  Address Book
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 mt-1 text-base font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  Your Info
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 mt-1 text-base font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  Activity
                </a>
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                {!isConnected ? (
                  <div className="px-5">
                    <Connect />
                  </div>
                ) : (
                  <>
                    {/*}
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img
                          className="w-10 h-10 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        ></img>
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">
                          Tom Cook
                        </div>
                        <div className="mt-1 text-sm font-medium leading-none text-gray-400">
                          tom@example.com
                        </div>
                      </div>
                    </div>
                    <div
                      className="px-2 mt-3"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <a
                        href="#"
                        className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                        role="menuitem"
                      >
                        Your Profile
                      </a>
                      <a
                        href="#"
                        className="block px-3 py-2 mt-1 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                        role="menuitem"
                      >
                        Settings
                      </a>
                      <a
                        href="#"
                        className="block px-3 py-2 mt-1 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </div>
                */}
                  </>
                )}
              </div>
            </div>
          </nav>
          {/*
          <header className="py-10">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-9 text-white">
                <span>{pageTitle}</span>
                <span className="font-normal"> (1)</span>
              </h1>
            </div>
          </header>
          */}
        </div>

        <main className="-mt-32">
          {/*
          <div className="px-4 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          */}
          <div className="pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="py-6 bg-white shadow sm:px-5 sm:rounded-lg sm:px-6">
              <Route path="/" exact component={AddressBook}></Route>
              <Route path="/info" exact component={ContactInfo}></Route>
              <Route
                path="/activity"
                exact
                component={function () {
                  return <div>activity</div>;
                }}
              ></Route>
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
}
