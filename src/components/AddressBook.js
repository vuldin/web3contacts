import React, { useEffect, useRef, useState } from "react";
import store from "../state/store";

export default function AddressBook() {
  const [thread, setThread] = useState();
  const [posts, setPosts] = useState([]);
  const firstRender = useRef(true);
  const { space } = store.useSpace;
  const threadName = "contactInfo";

  function parsePosts(posts) {
    return posts.map((post) => {
      const postJson = JSON.parse(post.message);
      postJson.id = post.postId;
      return postJson;
    });
  }

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
}
