import React,{Fragment,useState} from 'react'
import "./Search.css";
import JSONDATA from './products.json';
function Search() {
    const [searchTerm, setSearchTerm]=useState('')
    return( <div className="Search">
        <input type = "text" placeholder="Search..." onChange={event=>{setSearchTerm(event.target.value)}}/>
        {JSONDATA.filter((val)=>{
            if (searchTerm == ""){
                return val
            }else if (val.tiltle.toLowerCase().includes(searchTerm.toLowerCase())){
             return val   
            }
        }
        ).map((val,key)=>{
            return(
                 <div className='user' key={key}>

                <p>{val.tiltle}</p></div>
                );
        })}
    </div>
    );
}
export default Search;