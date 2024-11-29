// import Button from './Button/Button.jsx'
// import Student from './Student.jsx';
// import UserGreeting from './UserGreeting.jsx';
// // import List from './List.jsx';
// import ProfilePicture from './ProfilePicture.jsx';
// import MyCompononet from './MyComponent.jsx';
// import Counter from './Counter.jsx';
import Login from "./login/login.jsx";
import Register from "./Regester/Regester.jsx";
import Home from "./Home/Home.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import Profile from "./Profile/Profile.jsx";
import UpdatePassword from "./UpdatePassword/UpdatePassword.jsx";
import ElectionPage from "./ElectionPage/ElectionPage.jsx";
function App() {
    // const fruits= [{id:1, name:"apple", calories:95},
    //   {id:2, name:"orange", calories:45},
    //   {id:3, name:"banana", calories:105}, 
    //   {id:4, name:"coconut", calories:150}, 
    //   {id:5, name:"pineapple", calories:37}
    // ];
    // const vegetables= [{id:6, name:"potatoes", calories:110},
    //   {id:7, name:"celery", calories:15},
    //   {id:8, name:"carrots", calories:25}, 
    //   {id:9, name:"corn", calories:63}, 
    //   {id:10, name:"broccoli", calories:50}
    // ];
    return(
      <>
      {/* <Login/> */}
      {/* <Register/> */}
      {/* <Home/> */}
      {/* <Dashboard/> */}
      {/* <Profile /> */}
      {/* <UpdatePassword /> */}
      <ElectionPage />
        {/* <Student name="Mohammad" age={22} isAdmin={true}/>
        <Student name="Obeid" age={23} isAdmin={false}/>
        <Student/>
        <UserGreeting isLoggedIn={false} username="Mo_Obeid"/>
        <Button/>
        <ProfilePicture/>
        <MyCompononet/> */}
        {/* <Counter/> */}
        {/* {fruits.length > 0 && <List items={fruits} category="Fruits"/>}
        {vegetables.length > 0 && <List items={vegetables} category="Vegetables"/>} */}
      </>
    );
}

export default App
