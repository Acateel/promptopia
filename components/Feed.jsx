"use client";

import { useState, useEffect } from "react";

import PromptCart from "./PromptCart";

const PromptCartList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCart
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  // fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setAllPosts(data);
    };

    fetchPosts();
  }, []);

  // search posts with delay
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchText === "") {
        setFilteredPosts(allPosts);
      } else {
        setFilteredPosts(
          allPosts.filter(
            (post) =>
              post.prompt.includes(searchText) ||
              post.tag.includes(searchText) ||
              post.creator.username.includes(searchText)
          )
        );
      }
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchText, allPosts]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search_input peer"
        />
      </form>

      <PromptCartList data={filteredPosts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
