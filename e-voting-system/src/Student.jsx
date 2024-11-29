import PropTypes from 'prop-types'

function Student (props){
    return(
        <div className="student">
            <p> welcome: {props.name}</p>
            <p>your old {props.age}</p>
            <p>your Account is Admin: {props.isAdmin ? "yes" : "no"}</p>
        </div>
    );
}
Student.propTypes ={
    name: PropTypes.string,
    age: PropTypes.number,
    isAdmin: PropTypes.bool
}
Student.defaultProps ={
    name: "user",
    age: 0,
    isAdmin: false
}

export default Student
