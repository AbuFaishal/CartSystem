import React,{useContext} from 'react'
import {contextData} from './Cart' 

function Cartitems() {
    const {items,removeItem,increment,decrement}=useContext(contextData);{/*data comming in form of object we must store in with same name variable like here items data comming into items variable*/}
    
    return (
        <>
            {
                items.map((data)=>{
                    return(
                        <>
                        <div className="row border-bottom mt-5 text-dark">
                            <div className="col-md-3 col-sm-12 flx">
                                <div className="image">
                                    <img src={data.img} alt="" />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-12 flx flxcol">
                                <p>{data.title}</p>
                                <small className="text-muted">{data.description}</small>
                            </div>
                            <div className="col-md-3 col-sm-12 flx">
                                <button className="btt" onClick={()=>decrement(data.id)}><i class="fa fa-minus" style={{fontSize:"14px"}}></i></button>
                                <input type="text" id="input" placeholder={data.quantity} readOnly/>
                                <button className="btt" onClick={()=>increment(data.id)}><i class="fa fa-plus" style={{fontSize:"14px"}}></i></button>
                            </div>
                            <div className="col-md-2 col-sm-12 flx">
                                Rs {data.price}
                            </div>
                            <div className="col-md-1 col-sm-12 flx">
                                <label htmlFor="" onClick={()=>{removeItem(data.id)}}>
                                <img src="https://img-premium.flaticon.com/png/512/4442/premium/4442016.png?token=exp=1633153690~hmac=7ba5a812a721f780b848ba2ed60d42f7" alt="Delete" style={{width:"30px",color:"red",cursor:"pointer"}}/>
                                </label>
                            </div>
                            <hr />
                        </div>
                        </>
                    )
                })
            }
        </>
    )
}

export default Cartitems
