import React, { useEffect } from 'react';
import './App.css';
import Item from './models/Item'

function App() {

  useEffect(() => {

    (async () => {
      const item = new Item()

      item.name = "aaaa"

      await item.save()
      console.log(item.data())
    })()


  }, [])

  return (
    <div className="App">
      Hello!
    </div>
  );
}

export default App;
