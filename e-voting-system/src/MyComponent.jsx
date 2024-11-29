// import React, {useState} from "react"

// function MyCompononet(){
//     const [name, setName]= useState("guest");
//     const [age, setAge]= useState(0);
//     const [isEmployed, setEmployed]= useState(false);

//     const updateName =() =>{
//         setName ("Mohammad");
        
//     }
//     const incrementAge =() =>{
//         setAge (age +1);
        
//     }
//     const toggleEmployedStatus =() =>{
//         setEmployed (!isEmployed);
        
//     }
//     return(
//         <div>
//             <p>Name: {name}</p>
//             <button onClick={updateName}>set Name</button>

//             <p>Age: {age}</p>
//             <button onClick={incrementAge}>increment Age</button>

//             <p>Is Employed :{isEmployed ? "Yes" : "No"}</p>
//             <button onClick={toggleEmployedStatus}>Toggle Employed Status</button>
//         </div>
//     );
// }

// export default MyCompononet
// import React, {useState} from "react";
// function myComponent (){
//     const [name, setName] = useState("Guest");
//     const [quantity, setQuantity] = useState(1);
//     const [comment, setComment] = useState("");
//     const [payment, setPayment] = useState("");
//     const [shipping, setShipping] = useState("Delivery");

//     function handleNameChange(event){
//         setName(event.target.value);
//     }

//     function handleQuantityChange(event){
//         setQuantity(event.target.value);
//     }

//     function handleCommentChange(event){
//         setComment(event.target.value);
//     }

//     function handlePaymentChange(event){
//         setPayment(event.target.value);
//     }

//     function handleShippingChange(event){
//         setShipping(event.target.value);
//     }

//     return(
//         <div>
//             <input value={name} onChange={handleNameChange} type="text" />
//             <p>Name: {name}</p>

//             <input value={quantity} onChange={handleQuantityChange} type="number" />
//             <p>Quantity: {quantity}</p>

//             <textarea value={comment} onChange={handleCommentChange}
//              placeholder="please leave your comment" name="comment"/>
//             <p>Comment: {comment}</p>

//             <select name="payment" value={payment} onChange={handlePaymentChange}>
//                 <option value="">select an option</option>
//                 <option value="visa">Visa</option>
//                 <option value="mastercard">MasterCard</option>
//                 <option value="giftcard">GiftCard</option>
//             </select>
//             <p>Payment: {payment}</p>

//             <label >
//                 <input type="radio" value="Pick Up"
//                  checked={shipping === "Pick Up"}
//                  onChange={handleShippingChange}
//                 />
//                 Pic Up</label><br/>
//             <label >
//                 <input type="radio" value="Delivery"
//                 checked={shipping === "Delivery"}
//                 onChange={handleShippingChange} 
//                 />
//                 Delivery</label>
//                 <p>Shipping: {shipping}</p>
//         </div>
//     );
// }

// export default myComponent

//----------------------------------
// import React, {useState} from "react";
// function myComponent (){

//     const [car, setCar] = useState({year:2024,make:"ford", model:"Mustang"});

//     function handleYearChange(event){
//         setCar( c => ({...c,year: event.target.value}));
//     }
//     function handleMakeChange(event){
//         setCar( c => ({...c,make: event.target.value}));
//     }
//     function handleModelChange(event){
//         setCar( c => ({...c,model: event.target.value}));
//     }

//     return(
//         <div>
//             <p>your favorite car is:{car.year} {car.make} {car.model} </p>
//             <input type="Number" value={car.year} onChange={handleYearChange}/><br />
//             <input type="text" value={car.make} onChange={handleMakeChange}/><br />
//             <input type="text" value={car.model} onChange={handleModelChange}/><br />
//         </div>
//     );

// }
// export default myComponent

//--------------------------------
import React, {useState} from "react";
function myComponent (){

    const [foods, setFoods] = useState(["Apple","orange","Banana"]);

    function handleAddFood(){
        const newFood = document.getElementById("foodInput").value;
        document.getElementById("foodInput").value = "";

        setFoods(f => [...f,newFood]);
    }

    function handleRemoveFood(index){

        setFoods(foods.filter((_, i) => i !== index));
    }
    
    return(
       <div>
        <h2>list of food</h2>
        <ul>
            {foods.map((food, index) => <li key={index} onClick={() =>handleRemoveFood(index)}>
                {food}</li>)
            }
        </ul>
        <input type="text" id="foodInput" placeholder="enter food name"/>
        <button onClick={handleAddFood}>Add Food</button>
       </div>
    );

}
export default myComponent