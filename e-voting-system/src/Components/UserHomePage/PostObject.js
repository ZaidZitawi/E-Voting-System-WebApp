import logo from "../../assets/file.ico";
import Media1 from "../../assets/zz.jpg"; 
import Media2 from "../../assets/sampleuser1.png";
import Media3 from "../../assets/PostMedia.png";
import VotingImage from "../../assets/Voting.jpg";

const posts = [
  {
    type: "full-post",
    data: {
      userEntity: { name: "VoteChain Official", profile: { profilePictureUrl: logo } },
      date: "2h ago",
      text: "🚀 Join the discussion and cast your vote today!",
      media: [{ mediaUrl: Media3 }],
      likes: Array(142).fill({}),
      comments: [{ user: "Sarah", text: "Great initiative!" }],
      postId: 123,
    },
  }
  
  
  ,



  {
    type: "header",
    data: {
      profilePic: Media2,
      username: "Mohammad Obied",
      date: "1h ago",
    },
  }
  
  ,


  {
    type: "image",
    data: {
      imageUrl: VotingImage,
    },
  }

  ,

  {
    type: "animated",
    data: {},
  },
];

export default posts;
