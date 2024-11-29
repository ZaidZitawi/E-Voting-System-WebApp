import cardImage from './assets/cardImage.jpg'
function CandidateCard(){
    return(
        <div className="candidateCard">
            <img src={cardImage} alt="candidate picture" />
            <h2>Mohammad Obeid</h2>
            <p>Computer Science Club Candidate</p>
        </div>
    );

}

export default CandidateCard