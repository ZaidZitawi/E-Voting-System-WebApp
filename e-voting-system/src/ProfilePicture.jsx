

function ProfilePicture(){

    const imgeUrl='./src/assets/cardImage.jpg';

    const handleClick =(e) => e.target.style.display ="none";

    return(
        <img src={imgeUrl} alt="profile image" onClick={(e) =>handleClick(e)}></img>
    );
}

export default ProfilePicture
