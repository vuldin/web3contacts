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

  return (
    <div className="px-6 sm:px-0 mt-4">
      {!isConnected && <Connect />}
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
  )
}

export default Welcome
