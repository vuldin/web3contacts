import React, { useEffect, useState } from 'react'
import store from '../state/store'
import { ADDRESS_BOOK_TITLE } from '../constants'
import Contact from './Contact'
import Transition from './Transition'
import azulAvatar from '../../media/imgs/azul-serrano.png'
import MoodNeutral from '../../media/svgs/mood-neutral-outline.svg'

export default function Contacts() {
  const [isRequestContactInfoShown, setIsRequestContactInfoShown] = useState(false)
  const [contacts, setContacts] = useState([
    {
      avatarUrl: azulAvatar,
      name: 'Azul Serrano',
      phoneNumber: '(+1) 123-456-7890',
      email: 'azul.serrano@example.com'
    }
  ])
  const [input, setInput] = useState({ value: '' })
  const { setPageTitle } = store.usePageTitle
  const { profile, setSubscriptionTarget, setSendSubscriptionRequest } = store.use3Box

  const handleInputChange = event => {
    event.persist()
    setInput({ value: event.target.value })
  }

  const handleSubmit = event => {
    event && event.preventDefault()
    console.log('handleSubmit')
    console.log(profile)
    setIsRequestContactInfoShown(false)
    setSubscriptionTarget(input.value)
    setSendSubscriptionRequest(true)
  }

  /*
  const [thread, setThread] = useState()
  const firstRender = useRef(true)
  const threadName = 'contactInfo'

  function parsePosts(posts) {
    return posts.map(post => {
      const postJson = JSON.parse(post.message)
      postJson.id = post.postId
      return postJson
    })
  }
  */

  useEffect(() => {
    setPageTitle(ADDRESS_BOOK_TITLE)
  })

  /*
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    async function getThread() {
      const threadAddress = await space.current.private.get(threadName);

      let thread;
      if (threadAddress) {
        thread = await space.current.joinThreadByAddress(threadAddress);
      } else {
        thread = await space.current.createConfidentialThread(threadAddress);
        await space.current.private.set(threadName, thread._address);
      }
      setThread(thread);
      await getPosts();
    }

    getThread();
  }, [space]);

  useEffect(() => {
    async function getPosts() {
      const posts = await thread.getPosts();
      setPosts(parsePosts(posts));
    }

    if (thread) {
      getPosts();
    }
  }, [thread]);

  return (
    <>
      {posts.length > 0 && (
        <>
          <div>Your contact info</div>
          {posts.map((post) => (
            <div>{post.text}</div>
          ))}
        </>
      )}
    </>
  );
  */
  return (
    <div className="flex flex-col">
      <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          {contacts.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    {contacts.length} (0 selected)
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Phone Number
                  </th>
                  <th className="hidden px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 md:table-cell bg-gray-50">
                    Email
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.map((contact, i) => (
                  <Contact key={i} {...contact} />
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex items-center justify-center h-10 text-gray-900">
              <span className="text-xl">No contacts</span>
              <MoodNeutral className="inline-block w-6 h-6 ml-2" />
            </div>
          )}
        </div>
      </div>
      <div className="mt-5">
        <span className="inline-flex pl-6 mb-3 rounded-md shadow-sm sm:pl-0">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-orange-600 border border-transparent rounded-md hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700"
            id="add-contact"
            aria-label="Add Contact"
            aria-haspopup="true"
            onClick={() => setIsRequestContactInfoShown(true)}
          >
            Add Contact
          </button>
        </span>
      </div>
      <Transition
        show={isRequestContactInfoShown}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-200 transform"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-x-0 bottom-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div
            className="overflow-hidden transition-all transform bg-white rounded-lg shadow-xl sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-contact-info-modal"
          >
            <form onSubmit={handleSubmit}>
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Request Contact Info
                </h3>
                <div className="grid grid-cols-6 gap-6 mt-5">
                  <div className="col-span-6">
                    <label
                      htmlFor="contact_detail"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Enter a contact detail to request access to their contact details.
                    </label>
                    <input
                      id="contact_detail"
                      type="text"
                      className="block w-full px-3 py-2 mt-1 text-gray-900 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                      value={input.value}
                      onChange={handleInputChange}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                  <button
                    type="submit"
                    className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-orange-600 border border-transparent rounded-md shadow-sm hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange sm:text-sm sm:leading-5"
                  >
                    Request
                  </button>
                </span>
                <span className="flex w-full mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue sm:text-sm sm:leading-5"
                    onClick={() => setIsRequestContactInfoShown(false)}
                  >
                    Cancel
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </div>
  )
}
