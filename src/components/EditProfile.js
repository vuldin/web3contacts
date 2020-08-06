import React, { useState } from 'react'
import store from '../state/store'
import DefaultProfileImage from '../../media/svgs/default-profile.svg'

export default function EditProfile({ profile, setIsAddProfileShown }) {
  const { space, drasilProfiles, setDrasilProfiles } = store.use3Box
  const [inputs, setInputs] = profile
    ? useState(profile)
    : useState({
        index: drasilProfiles.length,
        profileName: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      })

  const handleInputChange = event => {
    const name = event.target.name
    setInputs({ ...inputs, [name]: event.target.value })
  }

  async function handleSubmit(event) {
    event && event.preventDefault()
    setIsAddProfileShown(false)
    const { index, ...profile } = inputs
    const profileKeys = Object.keys(profile).map(key => `${index}_${key}`)
    const profileValues = Object.values(profile)
    await space.current.private.setMultiple(profileKeys, profileValues)
    setDrasilProfiles([...drasilProfiles, inputs])
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-6 gap-6 px-4 pb-4 bg-white sm:p-6 sm:pb-4">
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="profile_name"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Profile Name
          </label>
          <input
            id="profile_name"
            name="profileName"
            type="text"
            value={inputs.profileName}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 mt-1 text-gray-900 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
          ></input>
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label className="block text-sm font-medium leading-5 text-gray-700">Photo</label>
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
        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="first_name" className="block text-sm font-medium leading-5 text-gray-700">
            First name
          </label>
          <input
            id="first_name"
            name="firstName"
            type="text"
            value={inputs.firstName}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 mt-1 text-gray-900 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
          ></input>
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="last_name" className="block text-sm font-medium leading-5 text-gray-700">
            Last name
          </label>
          <input
            id="last_name"
            name="lastName"
            type="text"
            value={inputs.lastName}
            onChange={handleInputChange}
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
            name="email"
            type="text"
            value={inputs.email}
            onChange={handleInputChange}
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
            name="phoneNumber"
            type="text"
            value={inputs.phoneNumber}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 mt-1 text-gray-900 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
          ></input>
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
          <button
            type="submit"
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-orange-600 border border-transparent rounded-md shadow-sm hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange sm:text-sm sm:leading-5"
          >
            Save
          </button>
        </span>
        {setIsAddProfileShown && (
          <span className="flex w-full mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button
              type="button"
              className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue sm:text-sm sm:leading-5"
              onClick={() => setIsAddProfileShown(false)}
            >
              Cancel
            </button>
          </span>
        )}
      </div>
    </form>
  )
}
