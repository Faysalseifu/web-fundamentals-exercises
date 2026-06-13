import { useState } from "react";

function LikeButton() {

  const [likes, setLikes] =
  useState(0);

  function addLike() {
    setLikes(likes + 1);
  }

  return (
    <>
      <h2>Likes: {likes}</h2>

      <button onClick={addLike}>
        Like
      </button>
    </>
  );
}
export default LikeButton;