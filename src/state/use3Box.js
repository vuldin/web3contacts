/*global Box*/
import { useEffect, useRef, useState } from 'react'
import store from './store'

export default function use3Box() {
  const [profile, setProfile] = useState({})
  const [drasilProfiles, setDrasilProfiles] = useState([
    /*
    {
      index: 0,
      profileName: 'default',
      firstName: 'Josh',
      lastName: 'Purcell',
      email: 'hello@vuld.in',
      phoneNumber: '1-203-429-5208'
    }
    */
  ])
  const [isActivityThreadReady, setIsActivityThreadReady] = useState(false)
  const [subscriptionTarget, setSubscriptionTarget] = useState()
  const [posts, setPosts] = useState([])
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
  const threadAddress =
    '/orbitdb/zdpuB135YEs7oHgc6qa5hWvdeJqT68RuEoi4WoimVSBPeP28b/3box.thread.drasil-contacts.activity'

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
      activityThread.current = await space.current.joinThreadByAddress(threadAddress)
      setIsActivityThreadReady(true)
    }

    async function getProfiles() {
      const keyVals = await space.current.private.all()
      const keys = Object.keys(keyVals)
      const profileKeys = keys.filter(key => key.slice(1).startsWith('_'))
      const indices = new Set()
      profileKeys.forEach(key => {
        const [indexString] = key.split('_')
        const index = parseInt(indexString, 10)
        !isNaN(index) && indices.add(index)
      })
      const profiles = [...Array(indices.size).keys()].map(index => {
        const thisProfileKeys = profileKeys.filter(profileKey =>
          profileKey.startsWith(index.toString())
        )
        const profile = Object.entries(keyVals)
          .filter(entry => thisProfileKeys.includes(entry[0]))
          .map(entry => ({ [entry[0]]: entry[1] }))
        const drasilProfile = profile.reduce(function (obj, item) {
          const [itemArr] = Object.entries(item)
          obj[itemArr[0].split('_')[1]] = itemArr[1]
          return obj
        }, {})
        drasilProfile.index = index
        return drasilProfile
      })
      setDrasilProfiles(profiles)
    }

    if (isInitialSyncComplete) {
      subscribe()
      getProfiles()
    }
  }, [isInitialSyncComplete])

  useEffect(() => {
    async function updateActivityThread(activity) {
      console.log('updating activityThread')
      console.log(activity)
      await activityThread.current.post(activity)
    }

    async function onNewActivity() {
      await activityThread.current.onUpdate(async () => {
        const posts = await activityThread.current.getPosts()
        setPosts(posts)
      })
    }

    if (isActivityThreadReady && subscriptionTarget) {
      updateActivityThread(subscriptionTarget)
      onNewActivity()
    }
  }, [isActivityThreadReady, subscriptionTarget])

  useEffect(() => {
    posts.length > 0 && console.log('posts', posts)
  }, [posts])

  return {
    box,
    profile,
    space,
    posts,
    subscriptionTarget,
    setSubscriptionTarget,
    drasilProfiles,
    setDrasilProfiles
  }
}
