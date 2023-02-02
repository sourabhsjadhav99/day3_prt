import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Pagination from './pagination';
import "./product.css"
import Modal from 'react-bootstrap/Modal';
const Products = () => {
    const showperpage = 10;
    const [pagenation , setpagenation] = useState({
        start : 0,
        end : showperpage
    })
    const [alldata,setalldata]=useState([])
    const [data,setdata] = useState([])
    const [get,setget] = useState(true)
    const [show, setshow] = useState(false)
    const [pop,setpop] = useState({})
    const handleShow = () => setshow(true);
  const handleClose = () => setshow(false);
    useEffect(()=>{
     axios.get("https://fakestoreapi.com/products").then((data)=>{
      console.log(data.data)
      setdata(data.data)
      setalldata(data.data)
     })
    },[get])
    const onPaginationChange = (start,end)=>{
        setpagenation({start : start,end : end})
    }
    const selecthandler = (e)=>{
      if(e.target.value==="all"){
         setget(!get)
      }else{
        const newdata = alldata.filter((item)=>{
          return item.category.includes(e.target.value)
         })
         setdata(newdata)
      }
    }
    const popuphandle = (item)=>{
      setpop(item)
      handleShow()
    }
    const popupclose = ()=>{
      handleClose()
    }
  return (
    <div>
      <div className='header'>
        <h1>Available Products</h1>
      </div>
      <div className='select'>
              <select onChange={(e)=>selecthandler(e)}>
              <option value="all">All</option>
                <option value="electronics">Electronics</option>
                <option value="men" >men's clothing</option>
                <option value="jewelery" >jewelery</option>
                <option value="women">women's clothing</option>
              </select>
      </div>
      <div className='main-body'>
        {data.slice(pagenation.start , pagenation.end).map((item,index)=>{
            return (
              <div key={index} className="imagesection" onClick={()=>popuphandle(item)}>
                <img src={item.image}/>
              </div>
            )
        })}
      </div>
      <div className='pagenation'>
        <Pagination showPerPage ={showperpage} total = {data.length} onPaginationChange = {onPaginationChange}/>
      </div>
      <Modal show={show} onHide={handleClose} animation={false} centered
          style={{ marginLeft: "40%", marginTop: "10%", width: "500px", height: "400px", lineHeight: "25px", textAlign: "center" }}>
          <Modal.Body>
             <div>
               <div className='heading'>
                <span>{pop.category}</span>
                <button onClick={()=>popupclose()}>Close</button>
               </div>
               <div className='modalbody'>
                <img src={pop.image}/>
                <span style={{"textAlign":"left","marginLeft":"20px"}}> <span style={{"fontWeight":"bold"}}>Desricption :</span> {pop.description}</span>
               </div>
             </div>
          </Modal.Body>
        </Modal>
    </div>
  )
}

export default Products