import { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import '../index.css'
import axios from 'axios';

export function Message({name}) {
    Message.propTypes={
        name:PropTypes.string,
    }

    const [album, setAlbum] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/albums')
            .then(response => {
                setAlbum(response.data);
            })
    },[]);

    const [count, setCount] = useState(0);

    return (
        <>
            <h1>Vite + React {name}</h1>
            <button value=""
                    onClick={
                        () => {
                            setCount(count+1);
                        }
                    }>{count} {album.title}</button>
           <ul>
                {album.map((item, id) => {
                    console.log(item.title);
                    return <li> {item.title}  {item.artist}</li>
                    
                })}
            </ul>
        </>
    )
}

