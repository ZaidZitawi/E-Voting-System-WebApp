import PropTypes from 'prop-types';

function List(props){

    const itemList= props.items;
    const category= props.category;

    // const fruits= [{id:1, name:"apple", calories:95},
    //                 {id:2, name:"orange", calories:45},
    //                 {id:3, name:"banana", calories:105}, 
    //                 {id:4, name:"coconut", calories:150}, 
    //                 {id:5, name:"pineapple", calories:37}
    // ];

    // fruits.sort((a,b)=>a.name.localeCompare(b.name)); // alphabetical sort
    // fruits.sort((a,b)=>b.name.localeCompare(a.name)); // reverse alphabetical sort
    // fruits.sort((a,b)=>a.calories - b.calories); // numeric sort
    // fruits.sort((a,b)=>b.calories - a.calories); // reverse numeric sort

    // const lowCalFruits = fruits.filter(
    //     fruit => fruit.calories < 100
    // );

    // const listItems = fruits.map(fruit => <li key={fruit.id}>
    //                                         {fruit.name}: &nbsp;
    //                                         {fruit.calories}</li>)
    // ;
    const listItems = itemList.map(item => <li key={item.id}>
                                                    {item.name}: &nbsp;
                                                    {item.calories}</li>)
    ;

    // const listItems1 = lowCalFruits.map(lowCalFruit => <li key={lowCalFruit.id}>
    //                                                     {lowCalFruit.name}: &nbsp;
    //                                                     {lowCalFruit.calories}</li>)
    // ;

    return(
        <>
        <h3>{category}</h3>
        <ul>{listItems}</ul>
        {/* <ul>{listItems1}</ul> */}
        </>
    );
}

List.PropTypes ={
    category: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({id: PropTypes.number,
                                              name: PropTypes.string,
                                              calories: PropTypes.number})
                            )
}

List.defaultProps ={
    category:"Category",
    items:[],
}

export default List