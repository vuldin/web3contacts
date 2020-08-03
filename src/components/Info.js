import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import store from "../state/store";
import { INFO_TITLE } from "../constants";
import DefaultProfileImage from "../../svgs/default-profile.svg";

export default function Info() {
  const { isConnected } = store.useStatus;
  const { setPageTitle } = store.usePageTitle;

  useEffect(() => {
    setPageTitle(INFO_TITLE);
  });

  return (
    //isInitialSyncComplete && (
    true && (
      <>
        <div className="px-4 py-5 bg-white shadow sm:rounded-lg sm:p-6">
          {isConnected ? (
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Default
                </h3>
                <div className="mt-1 text-sm leading-5 text-gray-500">
                  <div>Subscriber count: 31</div>
                  <Link to="/activity" className="hover:underline">
                    View details
                  </Link>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form action="#" method="POST">
                  <div>
                    <label className="block text-sm font-medium leading-5 text-gray-700">
                      Photo
                    </label>
                    <div className="flex items-center mt-2">
                      <span className="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
                        <DefaultProfileImage className="w-full h-full text-gray-300" />
                      </span>
                      <span className="ml-5 rounded-md shadow-sm">
                        <button
                          type="button"
                          className="px-3 py-2 text-sm font-medium leading-4 text-gray-700 transition duration-150 ease-in-out border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                        >
                          Change
                        </button>
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-6 mt-5">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        First name
                      </label>
                      <input
                        id="first_name"
                        className="block w-full px-3 py-2 mt-1 text-gray-900 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                      ></input>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Last name
                      </label>
                      <input
                        id="last_name"
                        className="block w-full px-3 py-2 mt-1 text-gray-900 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                      ></input>
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="email_address"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        id="email_address"
                        className="block w-full px-3 py-2 mt-1 text-gray-900 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                      ></input>
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="phone_number"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Phone number
                      </label>
                      <input
                        id="phone_number"
                        className="block w-full px-3 py-2 mt-1 text-gray-900 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                      ></input>
                    </div>
                    <div className="bg-gray-50">
                      <span className="inline-flex rounded-md shadow-sm">
                        <button
                          type="submit"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
                        >
                          Save
                        </button>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex items-center text-gray-900">
              <span>Login to see your Info</span>
            </div>
          )}
        </div>
      </>
    )
  );
}
