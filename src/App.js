import { useState } from "react";

const initialItems = [
  { id: 1, description: "get passports", complete: false },
  { id: 2, description: "play guitar", complete: false },
  { id: 3, description: "speak to one person", complete: true },
];

function App() {
  //State of items list
  const [items, setItems] = useState([])

  function handleAddItems(item){
    //Add new item
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id){
    setItems(items => items.filter(item => item.id !== id))
  }

  return (
    <div className="App">
      <Logo />
      <AddItemForm onAddItem={handleAddItems} />
      <SortItemsForm />
      <ItemList items={items} onDelete={handleDeleteItem}/>
    </div>
  );
}

function Logo(){
  return(
    <h1>TODO List</h1>
  )
}

function AddItemForm({onAddItem}){
  //State of input
  const [description, setDescription] = useState("")

  //Create new item
  function handleSubmit(e){
    e.preventDefault()

    if (!description) return;

    //Generate random id for each item
    const id = crypto.randomUUID();

    const newItem ={
      description,
      id, 
      complete: false,
    }

    onAddItem(newItem);

    setDescription("")
  }

  return(
    <form onSubmit={handleSubmit}>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}></input>
      <button>Add</button>
    </form>
    
  )
}

function ItemList({items, onDelete}){
  return(
    <ul>
      {items.map((item) => (
        <Item item={item} 
        id={item.id} 
        onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

function Item({item, id, onDelete}){
  return(
    <li>
      <h2>{item.description} <button onClick={() => onDelete(item.id)}>❌</button></h2>
      
    </li>
  )
}

function SortItemsForm(){
  const [sortBy, setSortBy] = useState("input")

  let sortedItems;

  if(sortBy ==="input")

  return(
    <div>
      <select value={sortBy} onChange={(e)=> setSortBy(e.target.value)}>
        <option value="input">
          Sort by input order
        </option>
        <option value="alphabet">
          Sort alphabetically
        </option>
        <option value="complete">
          Sort by completed status
        </option>
      </select>
    </div>
  )
}


export default App;
