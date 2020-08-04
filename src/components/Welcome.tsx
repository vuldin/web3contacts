import * as React from 'react'
import { useEffect } from 'react'
import store from '../state/store'

const Welcome: React.FC = (): JSX.Element => {
  const { setPageTitle } = store.usePageTitle

  useEffect(() => {
    setPageTitle('Welcome')
  })

  return (
    <div className="text-gray-300">
      <div>Drasil Contacts</div>
      <div>Control your information.</div>
      <div>Never update your contacts again.</div>
      <div>Your contacts keep their info updated for you.</div>
      <div>Future-proof, portable, data.</div>
      <div>Auto-updates and empowers users.</div>
      <div>Secure and privacy respecting.</div>
    </div>
  )
}

export default Welcome
