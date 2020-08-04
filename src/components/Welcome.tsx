import * as React from 'react'
import { useEffect } from 'react'
import Connect from './Connect'
import store from '../state/store'

const Welcome: React.FC = (): JSX.Element => {
  const { setPageTitle } = store.usePageTitle
  const { isConnected } = store.useStatus

  useEffect(() => {
    setPageTitle('Welcome')
  })

  /*
      //{!isConnected && <Connect />}
    <div className="px-6 mt-4 sm:px-0">
      <div className="text-gray-300">
        <div>Drasil Contacts</div>
        <div>Control your information.</div>
        <div>Never update your contacts again.</div>
        <div>Your contacts keep their info updated for you.</div>
        <div>Future-proof, portable, data.</div>
        <div>Auto-updates and empowers users.</div>
        <div>Secure and privacy respecting.</div>
      </div>
    </div>
  */
  return (
    <div className="py-12 bg-white">
      <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h3 className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
            A better way to manage contacts
          </h3>
          <p className="max-w-2xl mt-4 text-xl leading-7 text-gray-500 lg:mx-auto">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum
            cupiditate veritatis in accusamus quisquam.
          </p>
        </div>

        <div className="mt-10">
          <ul className="md:grid md:grid-cols-2 md:col-gap-8 md:row-gap-10">
            <li>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 text-white bg-orange-500 rounded-md">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leading-6 text-gray-900">
                    Never update your contacts again
                  </h4>
                  <p className="mt-2 text-base leading-6 text-gray-500">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit
                    perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                  </p>
                </div>
              </div>
            </li>
            <li className="mt-10 md:mt-0">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 text-white bg-orange-500 rounded-md">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leading-6 text-gray-900">
                    Secure and private
                  </h4>
                  <p className="mt-2 text-base leading-6 text-gray-500">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit
                    perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                  </p>
                </div>
              </div>
            </li>
            <li className="mt-10 md:mt-0">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 text-white bg-orange-500 rounded-md">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leading-6 text-gray-900">
                    Future-proof and portable data
                  </h4>
                  <p className="mt-2 text-base leading-6 text-gray-500">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit
                    perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                  </p>
                </div>
              </div>
            </li>
            <li className="mt-10 md:mt-0">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 text-white bg-orange-500 rounded-md">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leading-6 text-gray-900">Something else</h4>
                  <p className="mt-2 text-base leading-6 text-gray-500">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit
                    perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Welcome
