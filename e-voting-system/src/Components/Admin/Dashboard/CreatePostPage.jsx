import React, { useState } from "react";
import "./CreatePostPage.css";
import AdminHeader from "../AdminHeader/AdminHeader";
import Footer from "../../Footer/Footer";

const CreatePostPage = ({ userRole }) => {
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);

  const handleContentChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleImageChange = (e) => {
    setPostImage(e.target.files[0]);
  };

  const handleShare = () => {
    if (!postContent && !postImage) {
      alert("Please add content or an image to share a post.");
      return;
    }

    const formData = new FormData();
    formData.append("content", postContent);
    if (postImage) {
      formData.append("image", postImage);
    }

    // Example API call (replace with actual API endpoint)
    fetch("/api/posts", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Post shared successfully!");
          setPostContent("");
          setPostImage(null);
        } else {
          alert("Failed to share post. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error sharing post:", error);
      });
  };

//   if (userRole !== "ROLE_CANDIDATE" && userRole !== "ROLE_ADMIN") {
//     return <p className="access-denied">Access Denied: Only candidates and admins can create posts.</p>;
//   }

  return (
    <div className="create-post-page">
      <header>
        <AdminHeader />
      </header>
      <h2>Create Post</h2>
      <div className="form-group">
        <textarea
          placeholder="Write something..."
          value={postContent}
          onChange={handleContentChange}
        />
      </div>
      <div className="form-group">
        <label className="upload-label">
          Upload Image
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        {postImage && <p className="uploaded-file">{postImage.name}</p>}
      </div>
      <button className="share-button" onClick={handleShare}>
        Share
      </button>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default CreatePostPage;
