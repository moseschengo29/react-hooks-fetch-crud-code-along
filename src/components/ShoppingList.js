import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch("http://localhost:4000/items");
      const data = await res.json();

      console.log(data);
      setItems(data);
    }

    fetchItems();
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleAdd(item) {
    setItems((items) => [...items, item]);
  }

  function handleAddToDb(item) {
    async function addItem() {
      fetch("http://localhost:4000/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
    }

    addItem();
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  }

  function handleDelete(selectedItem) {
    setItems((items) => items.filter((item) => item.id !== selectedItem.id));
  }

  return (
    <div className="ShoppingList">
      <ItemForm onAdd={handleAdd} onAddToDb={handleAddToDb} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdate={handleUpdateItem}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
