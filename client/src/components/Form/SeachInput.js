import React from 'react'
import {useSearch} from "../../context/Search"
import { useNavigate } from 'react-router-dom'
import axios  from 'axios'

const SeachInput = () => {
    const [values, setValues] = useSearch();    
    const navigate = useNavigate()
    
    const handelSubmit = async (e) => {
        e.preventDefault()
        try{
            const{data} = await axios.get(`/api/v1/product/search/${values.keyword}`)
            setValues({...values, results: data})
            navigate("/search")
        }catch(error){
            console.log(error)
        }
    }
  return (
    <div>
    <form className="d-flex" role="search" onSubmit={handelSubmit}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={values.keyword} onChange={(e) => setValues({...values, keyword:e.target.value})} />
        <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
    </div>
  )
}

export default SeachInput