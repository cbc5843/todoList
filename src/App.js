import { useState } from "react";

const initialItems = [
  { id: 1, description: "get passports", complete: false },
  { id: 2, description: "play guitar", complete: false },
  { id: 3, description: "speak to one person", complete: true },
];

function App() {
  //State of items list
  const [items, setItems] = useState([])
  //State of sort
  const [sortBy, setSortBy] = useState("input")

  function handleAddItems(item){
    //Add new item
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id){
    setItems(items => items.filter(item => item.id !== id))
  }

  function handleToggleItem(id){
    setItems(items => items.map(item => item.id === id ? 
      {...item, complete: !item.complete} : item))
  }

  return (
    <div className="App">
      <Logo />
      <AddItemForm onAddItem={handleAddItems} />
      <SortItemsForm sortBy={sortBy} onSortSelection={setSortBy}/>
      <ItemList 
        items={items} 
        onDelete={handleDeleteItem} 
        sortBy={sortBy} 
        onToggle={handleToggleItem}
      />
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

function ItemList({items, onDelete, sortBy, onToggle}){
  let sortedItems;

  if(sortBy === "input") sortedItems = items;

  if(sortBy === "alphabet") 
    sortedItems = items
      .slice()
      .sort((a,b) => a.description.localeCompare(b.description));

  if(sortBy === "complete") 
    sortedItems = items
      .slice()
      .sort((a,b) => Number(a.complete) - Number(b.complete));

  return(
    <ul>
      {sortedItems.map((item) => (
        <Item item={item} 
        id={item.id} 
        onDelete={onDelete}
        onToggle={onToggle}
        />
      ))}
    </ul>
  )
}

function Item({item, id, onDelete, onToggle}){
  return(
    <li key={id}>
      <input
          type="checkbox"
          checked={item.complete}
          onChange={() => onToggle(item.id)}
      />
      <span style={{ textDecoration: item.complete ? 'line-through' : 'none' }}>
        {item.description}
        <button onClick={() => onDelete(item.id)}>❌</button>
      </span>
      
    </li>
  )
}

function SortItemsForm({sortBy, onSortSelection}){
  
  return(
    <div>
      <select value={sortBy} onChange={(e)=> onSortSelection(e.target.value)}>
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
