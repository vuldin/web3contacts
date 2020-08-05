/*global Box*/
import { useEffect, useRef, useState } from 'react'
import store from './store'

export default function use3Box() {
  const [profile, setProfile] = useState({})
  const [isActivityThreadReady, setIsActivityThreadReady] = useState(false)
  const [subscriptionTarget, setSubscriptionTarget] = useState()
  const activityThread = useRef()
  const box = useRef()
  const space = useRef()
  const { accountPublicKey, setAccountPublicKey } = store.useAccountPublicKey
  const {
    setIsBoxSyncing,
    isInitialSyncComplete,
    setIsInitialSyncComplete,
    setIsConnected
  } = store.useStatus
  const spaceName = 'drasil-contacts'

  useEffect(() => {
    async function setBoxAndSpace() {
      if (!box.current) {
        setIsBoxSyncing(true)
        box.current = await Box.create(window.ethereum)
        await box.current.auth([spaceName], { address: accountPublicKey })
        space.current = await box.current.openSpace(spaceName)
        await box.current.syncDone
        setIsBoxSyncing(false)
        setIsInitialSyncComplete(true)
      }
    }

    async function getProfile() {
      const profile = await Box.getProfile(accountPublicKey)
      setProfile(profile)
    }

    function handleNewAccounts(newAccounts) {
      setAccountPublicKey(newAccounts[0])
    }

    if (accountPublicKey) {
      setBoxAndSpace()
      getProfile()
      setIsConnected(true)
    } else {
      setIsConnected(false)
      setProfile({})
    }

    window.ethereum.on('accountsChanged', handleNewAccounts)
    return () => {
      window.ethereum.off('accountsChanged', handleNewAccounts)
    }
  }, [accountPublicKey])

  useEffect(() => {
    async function subscribe() {
      console.log('subscribing to activityThread')
      activityThread.current = await space.current.joinThread('activity')
      //setActivityThread(thread);
      setIsActivityThreadReady(true)
      console.log('subscribed to activityThread')
    }

    isInitialSyncComplete && subscribe()

    /*
    return async function unsubscribe() {
      await space.current.unsubscribeThread(activityThread.current._address)
      activityThread.current = null
    }
    */
  }, [isInitialSyncComplete])

  useEffect(() => {
    async function updateActivityThread(activity) {
      console.log('updating activityThread')
      console.log(activity)
      await activityThread.current.post(activity)
    }

    isActivityThreadReady && subscriptionTarget && updateActivityThread(subscriptionTarget)
  }, [isActivityThreadReady, subscriptionTarget])

  useEffect(() => {
    console.log('subscriptionTarget', subscriptionTarget)
  }, [subscriptionTarget])

  return { box, profile, space, subscriptionTarget, setSubscriptionTarget }
}
