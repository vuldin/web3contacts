import React, { useEffect } from "react";
import store from "../state/store";
import useBox from "../state/useBox";
import { INFO_TITLE } from "../constants";

export default function ContactInfo() {
  /*
  const {
    box: { current: box },
  } = store.useBox;
  */
  const { box } = store.useBox;
  const { space } = store.useSpace;
  const { accountPublicKey } = store.useAccountPublicKey;
  const { profile } = store.useProfile;
  const { isInitialSyncComplete } = store.useStatus;
  const { setPageTitle } = store.usePageTitle;

  useEffect(() => {
    async function getProfile() {
      //const profile = await Box.getProfile(accountPublicKey);
      //const verified = await Box.getVerifiedAccounts(profile);
      /*
{
  "did": "did:3:bafyreidvfvlmvavg7xp7zkjnlazg56zjk4ky2evlily7g6k4r2drzoo7uu",
  "github": {
    "username": "vuldin",
    "proof": "https://gist.githubusercontent.com/vuldin/79a606536a3f78b335088fc271bfab19/raw/9912552a74457426064fe182e015095818c7f454/gistfile1.txt"
  }
}
      */

      const result = await box.current.public.all();
      console.log(result);
    }

    isInitialSyncComplete && getProfile();
  }, [isInitialSyncComplete]);

  useEffect(() => {
    setPageTitle(INFO_TITLE);
  });

  return (
    //isInitialSyncComplete && (
    true && (
      <>
        <div className="px-4 py-5 bg-white shadow sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Profile
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      for="company_website"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Website
                    </label>
                    <div className="flex mt-1 rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 text-sm text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">
                        http://
                      </span>
                      <input
                        id="company_website"
                        className="flex-1 block w-full transition duration-150 ease-in-out rounded-none form-input rounded-r-md sm:text-sm sm:leading-5"
                        placeholder="www.example.com"
                      ></input>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    for="about"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    About
                  </label>
                  <div className="rounded-md shadow-sm">
                    <textarea
                      id="about"
                      rows="3"
                      className="block w-full mt-1 transition duration-150 ease-in-out form-textarea sm:text-sm sm:leading-5"
                      placeholder="you@example.com"
                    ></textarea>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Brief description for your profile. URLs are hyperlinked.
                  </p>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium leading-5 text-gray-700">
                    Photo
                  </label>
                  <div className="flex items-center mt-2">
                    <span className="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
                      <svg
                        className="w-full h-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
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

                <div className="mt-6">
                  <label className="block text-sm font-medium leading-5 text-gray-700">
                    Cover photo
                  </label>
                  <div className="flex justify-center px-6 pt-5 pb-6 mt-2 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="text-center">
                      <svg
                        className="w-12 h-12 mx-auto text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <p className="mt-1 text-sm text-gray-600">
                        <button className="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline">
                          Upload a file
                        </button>
                        or drag and drop
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="px-4 py-5 mt-6 bg-white shadow sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Contact Information
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-500">
                Use a permanent address where you can receive mail.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="first_name"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      First name
                    </label>
                    <input
                      id="first_name"
                      className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                    ></input>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="last_name"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Last name
                    </label>
                    <input
                      id="last_name"
                      className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                    ></input>
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      for="email_address"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Email address
                    </label>
                    <input
                      id="email_address"
                      className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                    ></input>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="country"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Country / Region
                    </label>
                    <select
                      id="country"
                      className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm form-select focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>

                  <div className="col-span-6">
                    <label
                      for="street_address"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Street address
                    </label>
                    <input
                      id="street_address"
                      className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                    ></input>
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      for="city"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      City
                    </label>
                    <input
                      id="city"
                      className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                    ></input>
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      for="state"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      State / Province
                    </label>
                    <input
                      id="state"
                      className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                    ></input>
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      for="postal_code"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      ZIP / Postal
                    </label>
                    <input
                      id="postal_code"
                      className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                    ></input>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="px-4 py-5 mt-6 bg-white shadow sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Notifications
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-500">
                Decide which communications you'd like to receive and how.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <fieldset>
                  <legend className="text-base font-medium leading-6 text-gray-900">
                    By Email
                  </legend>
                  <div className="mt-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="comments"
                          type="checkbox"
                          className="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
                        ></input>
                      </div>
                      <div className="ml-3 text-sm leading-5">
                        <label
                          for="comments"
                          className="font-medium text-gray-700"
                        >
                          Comments
                        </label>
                        <p className="text-gray-500">
                          Get notified when someones posts a comment on a
                          posting.
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="candidates"
                            type="checkbox"
                            className="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
                          ></input>
                        </div>
                        <div className="ml-3 text-sm leading-5">
                          <label
                            for="candidates"
                            className="font-medium text-gray-700"
                          >
                            Candidates
                          </label>
                          <p className="text-gray-500">
                            Get notified when a candidate applies for a job.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="offers"
                            type="checkbox"
                            className="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
                          ></input>
                        </div>
                        <div className="ml-3 text-sm leading-5">
                          <label
                            for="offers"
                            className="font-medium text-gray-700"
                          >
                            Offers
                          </label>
                          <p className="text-gray-500">
                            Get notified when a candidate accepts or rejects an
                            offer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset className="mt-6">
                  <legend className="text-base font-medium leading-6 text-gray-900">
                    Push Notifications
                  </legend>
                  <p className="text-sm leading-5 text-gray-500">
                    These are delivered via SMS to your mobile phone.
                  </p>
                  <div className="mt-4">
                    <div className="flex items-center">
                      <input
                        id="push_everything"
                        name="form-input push_notifications"
                        type="radio"
                        className="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-radio"
                      ></input>
                      <label for="push_everything" className="ml-3">
                        <span className="block text-sm font-medium leading-5 text-gray-700">
                          Everything
                        </span>
                      </label>
                    </div>
                    <div className="flex items-center mt-4">
                      <input
                        id="push_email"
                        name="form-input push_notifications"
                        type="radio"
                        className="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-radio"
                      ></input>
                      <label for="push_email" className="ml-3">
                        <span className="block text-sm font-medium leading-5 text-gray-700">
                          Same as email
                        </span>
                      </label>
                    </div>
                    <div className="flex items-center mt-4">
                      <input
                        id="push_nothing"
                        name="form-input push_notifications"
                        type="radio"
                        className="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-radio"
                      ></input>
                      <label for="push_nothing" className="ml-3">
                        <span className="block text-sm font-medium leading-5 text-gray-700">
                          No push notifications
                        </span>
                      </label>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  );
}
