import React, { useEffect, useRef, useState } from "react";
import store from "../state/store";
import { ADDRESS_BOOK_TITLE } from "../constants";
import Contact from "./Contact";
import azulAvatar from "../../imgs/azul-serrano.png";
import MoodNeutral from "../../svgs/mood-neutral-outline.svg";

export default function Contacts() {
  const [thread, setThread] = useState();
  const [contacts, setContacts] = useState([
    {
      avatarUrl: azulAvatar,
      name: "Azul Serrano",
      phoneNumber: "(+1) 123-456-7890",
      email: "azul.serrano@example.com",
    },
  ]);
  const firstRender = useRef(true);
  const { setPageTitle } = store.usePageTitle;
  const threadName = "contactInfo";

  function parsePosts(posts) {
    return posts.map((post) => {
      const postJson = JSON.parse(post.message);
      postJson.id = post.postId;
      return postJson;
    });
  }

  useEffect(() => {
    setPageTitle(ADDRESS_BOOK_TITLE);
  });

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
    </div>
  );
}
