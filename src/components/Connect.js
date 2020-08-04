import React from 'react'
import { useHistory } from 'react-router-dom'
import store from '../state/store'
import { CONNECT_TEXT } from '../constants'

export default function Connect() {
  let history = useHistory()
  const { setAccountPublicKey } = store.useAccountPublicKey

  return (
    <>
      <button
        className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-orange-600 border border-transparent rounded-md hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700"
        onClick={() =>
          window.ethereum?.request({ method: 'eth_requestAccounts' }).then(newAccounts => {
            setAccountPublicKey(newAccounts[0])
            history.push('/contacts')
          })
        }
      >
        {CONNECT_TEXT}
      </button>
    </>
  )
}
