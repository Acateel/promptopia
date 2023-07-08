"use client";

import { useState, useEffect } from "react";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${params.id}`);
      const data = await response.json();
      setUser(data);
    };

    fetchPosts();
    fetchUser();
  }, []);

  return (
    <Profile
      name={user?.username}
      desc={`Welcome to ${user?.username} profile page`}
      data={posts}
    />
  );
};

export default UserProfile;
