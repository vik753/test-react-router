import axios from "axios";
import { User } from "../models/userModel";
import { Post } from "../models/postModel";

export const getUsersApi = async () => {
  try {
    const users = await axios.get(
      "http://jsonplaceholder.typicode.com/users?_limit=15"
    );
    if (!users.data.length) {
      throw new Error("No users in users.data...");
    }
    return users.data.map((user) => new User(user));
  } catch (err) {
    console.log("getUsersApi Error: ", err);
    return null;
  }
};

export const getPostsApi = async (userId) => {
  try {
    const postsResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    if (!postsResponse.data.length) {
      throw new Error("No posts in posts Response.");
    }
    return postsResponse.data.map((post) => new Post(post));
  } catch (err) {
    console.log("getUserPosts Error: ", err);
    return null;
  }
};

export const getPostCommentsApi = async (postId) => {
  try {
    const commentsResponse = await axios.get(
      `http://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    if (!commentsResponse.data.length) {
      throw new Error("No comments in comments Response.");
    }
    return commentsResponse.data;
  } catch (err) {
    console.log("getUserPosts Error: ", err);
    return null;
  }
};

export const getAuthCreds = async () => {
  try {
    const credsResponse = await axios.get("http://localhost:3004/auth");
    return credsResponse.data;
  } catch (e) {
    console.log("getAuthCreds api Error: ", e);
  }
};
