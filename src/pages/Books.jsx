import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Books = () => {
    const [books, setBooks] = useState([])
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const resp = await axios.get("http://localhost:8800/books")
                console.log(resp)
                setBooks(resp.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchAllBooks()
    }, [])

    const handleDelete =  async (id) => {
        try {
            await axios.delete("http://localhost:8800/books/"+id)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Matkove knjige</h1>
            <button><Link to="/Add">Go to add</Link></button>

            <div className='books'>
                {
                    books.map(book => (
                        <div className="book" key={book.id}>
                            {
                                book.cover && 
                                <img src={book.cover} alt=""/>
                            } 
                            <h2>{book.title}</h2>
                            <p>{book.description}</p>
                            <h2>{book.price}</h2>
                            <button className='delete' onClick={() => handleDelete(book.id)}>delete</button>
                            <button className='update'><Link to={`/update/${book.id}`}>Update</Link></button>
                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default Books