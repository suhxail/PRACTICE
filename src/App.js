import React, { useRef, useState } from 'react'

function App() {

  const list = [
    {
      id: 1,
      name: "HP",
      price: "1111"
    },
    {
      id: 2,
      name: "Dell",
      price: "2222"
    }
  ]

  const [lists, setList] = useState(list)
  const [updateState, setUpdateState] = useState(-1)

  function handleEdit(id) {
    setUpdateState(id)
  }

  function handleDelete(id) {
    const consoleList = lists.filter((li) => console.log(li.id,id) )
    const newList = lists.filter((li) => li.id !== id)
    setList(newList)
  }

  function handleUpdate(event) {
    event.preventDefault();
    const name = event.target.elements.name.value
    const price = event.target.elements.name.value

    const newList = lists.map((li) => (
      li.id === updateState.id ? { ...li, name:name, price:price  } : li
    ))
    setList(newList)
    setUpdateState(-1)
  }

  return (
    <div>
      <AddList setList={setList} lists={lists} />
      <form onSubmit={handleUpdate}>
        <table>
          {
            lists.map((element) => (
              updateState === element.id ? <EditList element={element} lists={lists} setList={setList} /> :
                <tr>
                  <td>{element.name}</td>
                  <td>{element.price}</td>
                  <td>
                    <button onClick={() => handleEdit(element.id)}>Edit</button>
                  </td>
                  <td>
                    <button type='button' onClick={() => handleDelete(element.id)}  >Delete</button>
                  </td>
                </tr>
            )
            )
          }
        </table>
      </form>
    </div>
  )
}

function EditList({ element, lists, setList }) {
  function handleInput(event) {
    const name = event.target.name
    const nameValue = event.target.value 
    const newList = lists.map((li) => (
      li.id === element.id ? { ...li, name: nameValue } : li
    ))
    setList(newList)
    // const price = event.target.price.value
  }

  function handlePrice(e) {
    const price = e.target.price 
    const priceValue = e.target.value 
    const newPrice = lists.map((li) => (
      li.id === element.id ? {...li, price: priceValue} : li
    )) 
    setList(newPrice)
  }

  return (
    <tr>
      <td>
        <input type='text' onChange={handleInput} name='name' value={element.name} />
        <input type='text' onChange={handlePrice} name='price' value={element.price} />
        <button type='submit'>Update</button>
      </td>
    </tr>
  )
}

function AddList({ setList, lists }) {

  const nameRef = useRef()
  const priceRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()
    const name = e.target.elements.name.value
    console.log(name, e.target.value)
    const price = e.target.elements.price.value
    console.log(price)
    const newList = {
      id: lists.length + 1,
      name,
      price
    }
    setList((prevList) => {
      return prevList.concat(newList)
    })
    nameRef.current.value = ""
    priceRef.current.value = ""
  }
  return (
    <form onSubmit={handleSubmit} >
      <input type='text' name='name' ref={nameRef} />
      <input type='number' name='price' ref={priceRef} />
      <button type='submit'>Add</button>
    </form>
  )
}

export default App