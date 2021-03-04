import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  clearComments,
  clearPosts,
  getPostComments,
  getPosts,
  setIsGetDataError,
} from "../../redux/sagaActions";
import { Link } from "react-router-dom";

import styles from "./userPostPage.module.scss";
import mainStyles from "../../app.module.scss";
import { UserLogo } from "../UserLogo/UserLogo";
import { Loader } from "../LoaderPage/Loader";

export const UserPostPage = () => {
  const { posts, isLoading } = useSelector((store) => store.rootReducer);
  const params = useParams();
  const dispatch = useDispatch();
  const userId = params.userId;
  const userName = params.userName;
  const [isOpenComments, setOpenComments] = useState({});

  useEffect(() => {
    if (userId) {
      dispatch(getPosts(userId));
    }
    return () => {
      dispatch(setIsGetDataError(false));
      dispatch(clearPosts());
      dispatch(clearComments());
    };
  }, []);

  useEffect(() => {
    if (!posts.length) return;

    posts.map(async (post) => {
      dispatch(getPostComments(post.id));
    });
  }, [posts]);

  if (!userId) {
    return (
      <>
        <div>Wrong userId...</div>
        <Link to="/">Go to Home page</Link>
      </>
    );
  }

  const openCommentsHandler = (postId) => {
    // console.log("isOpenComments", isOpenComments);
    // isOpenComments[postId]
    //   ? setOpenComments((state) => (state[postId] = !state[postId]))
    //   : setOpenComments((state) => (state[postId] = true));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={`${mainStyles.res_container}`}>
      <h3 className={styles.title}>
        <UserLogo userName={userName} />
        {userName}
      </h3>
      <div className={styles.post_container}>
        {posts.map((post) => (
          <div key={post.id} className={styles.post}>
            <h5>{post.title.toUpperCase()}</h5>
            <p>{post.body}</p>
            <div
              className={styles.comments_container}
              onClick={() => openCommentsHandler(post.id)}
            >
              <p className={styles.title_container}>
                <b>Comments:</b> see more...
              </p>
              <div
                className={
                  isOpenComments[post.id]
                    ? styles.comments_box_active
                    : styles.comments_box
                }
              >
                <p>Comment1</p>
                <p>Comment2</p>
                <p>Comment3</p>
                <p>Comment4</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/*
"userId": 2,
  "id": 11,
  "title": "et ea vero quia laudantium autem",
  "body": "i incidunt\nut animi commodi"
*/
