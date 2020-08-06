/*global Box*/
import { useEffect, useRef, useState } from 'react'
import store from './store'

export default function use3Box() {
  const [deleteNotificationPostId, setDeleteNotificationPostId] = useState()
  const [profile, setProfile] = useState({})
  const [threeId, setThreeId] = useState()
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
  const [isNotificationThreadReady, setIsNotificationThreadReady] = useState(false)
  const [subscriptionTarget, setSubscriptionTarget] = useState()
  const [subscriptionProfile, setSubscriptionProfile] = useState({})
  const [sendSubscriptionRequest, setSendSubscriptionRequest] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [lastTimestamp, setLastTimestamp] = useState(0)
  const notificationThread = useRef()
  const myNotificationsThread = useRef()
  const box = useRef()
  const contactsSpace = useRef()
  const profilesSpace = useRef()
  const activitySpace = useRef()
  const { accountPublicKey, setAccountPublicKey } = store.useAccountPublicKey
  const {
    setIsBoxSyncing,
    isInitialSyncComplete,
    setIsInitialSyncComplete,
    setIsConnected
  } = store.useStatus
  const contactsSpaceName = 'drasil-contacts'
  const profilesSpaceName = 'drasil-profiles'
  const activitySpaceName = 'drasil-activity'
  const notificationThreadAddress =
    '/orbitdb/zdpuB2ztRAfRK9hCbjDFLkMB7he3UvsjGeiojy9AHji3dz98U/3box.thread.drasil-activity.notifications'

  useEffect(() => {
    async function setBoxAndSpace() {
      if (!box.current) {
        setIsBoxSyncing(true)
        box.current = await Box.create(window.ethereum)
        await box.current.auth([contactsSpaceName, profilesSpaceName, activitySpaceName], {
          address: accountPublicKey
        })
        const [contactsSpaceTemp, profilesSpaceTemp, activitySpaceTemp] = await Promise.all([
          box.current.openSpace(contactsSpaceName),
          box.current.openSpace(profilesSpaceName),
          box.current.openSpace(activitySpaceName)
        ])
        contactsSpace.current = contactsSpaceTemp
        profilesSpace.current = profilesSpaceTemp
        activitySpace.current = activitySpaceTemp
        await Promise.all([
          box.current.syncDone,
          contactsSpace.current.syncDone,
          profilesSpace.current.syncDone,
          activitySpace.current.syncDone
        ])

        const [contactThreads, profileThreads, activityThreads] = await Promise.all([
          contactsSpace.current.subscribedThreads(),
          profilesSpace.current.subscribedThreads(),
          activitySpace.current.subscribedThreads()
        ])
        console.log(contactThreads)
        console.log(profileThreads)
        console.log(activityThreads)

        setThreeId(box.current._3id._rootDID)
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

  async function getNotifications() {
    const posts = await notificationThread.current.getPosts()
    console.log('posts', posts.length)
    const lastTimestampString = await activitySpace.current.private.get('lastTimestamp')
    const lastTimestampInt = parseInt(lastTimestampString, 10)
    let newPosts = posts
    if (!isNaN(lastTimestampInt)) {
      newPosts = newPosts.filter(({ timestamp }) => timestamp > lastTimestampInt)
      setLastTimestamp(lastTimestampInt)
    }
    console.log('newPosts', newPosts.length)
    if (newPosts.length > 0) {
      const notifications = newPosts.map(({ message }) => JSON.parse(message))
      console.log('notifications')
      console.log(notifications)
      const otherNotifications = notifications.filter(({ src }) => src?.threeId !== threeId)
      console.log('notifications not from me')
      console.log(otherNotifications)
      // add otherNotifications to private thread
      for (const notification of otherNotifications) {
        const notificationString = JSON.stringify(notification)
        await myNotificationsThread.current.post(notificationString)
      }

      // update latestTimestamp
      const newLatestTimestamp = newPosts[newPosts.length - 1].timestamp
      await activitySpace.current.private.set('lastTimestamp', newLatestTimestamp)
    }

    // retrieve all private thread notifications
    const myNotificationPosts = await myNotificationsThread.current.getPosts()
    const myNotifications = myNotificationPosts.map(({ postId, message }) => {
      const { target: channel, src: fromProfile, timestamp } = JSON.parse(message)
      return {
        postId,
        fromProfile,
        channel,
        timestamp
      }
    })
    setNotifications(myNotifications)
  }

  useEffect(() => {
    async function subscribe() {
      notificationThread.current = await activitySpace.current.joinThreadByAddress(
        notificationThreadAddress
      )
      const myNotificationThreadAddress = await activitySpace.current.public.get(
        'myNotificationsThreadAddress'
      )
      if (myNotificationThreadAddress) {
        myNotificationsThread.current = await activitySpace.current.joinThreadByAddress(
          myNotificationThreadAddress
        )
      } else {
        myNotificationsThread.current = await activitySpace.current.createConfidentialThread(
          'myNotificationsThreadAddress'
        )
        await activitySpace.current.public.set(
          'myNotificationsThreadAddress',
          myNotificationsThread.current._address
        )
      }
      setIsNotificationThreadReady(true)
      await getNotifications()
    }

    async function getProfiles() {
      const keyVals = await profilesSpace.current.private.all()
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
        drasilProfile.threeId = threeId
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
    async function onNewNotifications() {
      console.log('setting up notification onUpdate listener')
      await notificationThread.current.onUpdate(getNotifications)
    }
    isNotificationThreadReady && onNewNotifications()
  }, [isNotificationThreadReady])

  useEffect(() => {
    async function updateNotificationThread() {
      const notification = JSON.stringify({
        target: subscriptionTarget,
        src: subscriptionProfile,
        timestamp: Date.now()
      })
      console.log('notification')
      console.log(notification)
      await notificationThread.current.post(notification)
    }

    if (isNotificationThreadReady && sendSubscriptionRequest) {
      console.log('sending subscription request')
      updateNotificationThread()
      setSendSubscriptionRequest(false)
    }
  }, [isNotificationThreadReady, sendSubscriptionRequest])

  useEffect(() => {
    async function setRemoteTimeStamp() {
      await activitySpace.current.private.set('lastTimestamp', lastTimestamp)
    }

    lastTimestamp && setRemoteTimeStamp()
  }, [lastTimestamp])

  useEffect(() => {
    async function handleDeletedNotification() {
      const remainingNotifications = notifications.filter(
        ({ postId }) => postId !== deleteNotificationPostId
      )
      setNotifications(remainingNotifications)
      await myNotificationsThread.current.deletePost(deleteNotificationPostId)
    }

    deleteNotificationPostId && handleDeletedNotification()
  }, [deleteNotificationPostId])

  return {
    box,
    profile,
    contactsSpace,
    profilesSpace,
    activitySpace,
    notifications,
    subscriptionTarget,
    setSubscriptionTarget,
    setSendSubscriptionRequest,
    drasilProfiles,
    setDrasilProfiles,
    setDeleteNotificationPostId,
    setSubscriptionProfile
  }
}
