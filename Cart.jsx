import React, { createContext,useReducer,useEffect } from 'react'
import './Cart.css'
import Products from './Products';
import Cartitems from './Cartitems';

//we can also export it on the top
export const contextData=createContext();
function Cart() {

    const initialval={
        items:Products,//storing products data inside items variable in object
        totalItems:0,
        totalPrice:0
    }
    const reducer=(state,action)=>{
        //to remove any items particularly
        if(action.type==="REMOVE_ITEM"){
            return {...state,items:state.items.filter((currele)=>{
                return currele.id!==action.itemid;
                })
            };
        }
        //to empty the card
         else if(action.type==="REMOVE_ALL"){
             return {...state,items:[]};
         }
         //for increment quantity
         else if(action.type==="INCR"){
             let updated=state.items.map((currele)=>{
                 if(currele.id===action.itemid){
                     return {...currele,quantity:currele.quantity+1};
                 }
                 return currele;
             });
             return {...state,items:updated};
         }
         //for decrement quantity
         else if(action.type==="DECR"){
            let updated=state.items.map((currele)=>{
                if(currele.id===action.itemid){
                    return {...currele,quantity:currele.quantity-1};
                }
                return currele;
            }).filter((currele)=>{
                return currele.quantity!==0
            });//if quantity reduces to 0 then remove from list
            //or single line code without return
            //.filter(currele=>currele.quantity!==0);
            return {...state,items:updated};
        }
        //count and show total items in cart
        else if(action.type==="GET_TOTAL"){
            let {totalItems,totalPrice}=state.items.reduce(
              (accum,curval)=>{
                  let {quantity,price}=curval;//quantity and price is the name matching same with json data name here we are destructuring curval which contain json data stored in usestate
                  let totalcost=price*quantity;//calculating price 
                  accum.totalItems+=quantity;//adding items 
                  accum.totalPrice+=totalcost;//adding price
                  return accum;//returning modified/updated data
              },
              { totalItems:0,totalPrice:0 }//initial value  
            );
            return {...state,totalItems,totalPrice};
        }
        return state;//lastly return current state value
    }
    const[state,dispatch]=useReducer(reducer,initialval);//initialval is an object
    
    function removeItem(id){
        return dispatch({
            type:"REMOVE_ITEM",
            itemid:id,
        });
    };
    function emptyCart(){
        return dispatch({
            type:"REMOVE_ALL"
        });
    };
    function increment(id){
        return dispatch({
            type:"INCR",
            itemid:id
        });
    };
    function decrement(id){
        dispatch({
            type:"DECR",
            itemid:id
        });
    };

    useEffect(() => {
       dispatch({
           type:"GET_TOTAL"
       })
    }, [state.items])
    if(state.totalItems===0){
        return (
            <>
               <div className="container mt-3">
                   <div className="row" >
                       <div className="col  border-bottom pb-3  text-dark">
                        <p className="h5 text-dark" style={{position:"relative",top:"30px"}}>Shopping Cart</p>
                            <label htmlFor="" className="carticon"><span>0</span><i className="fa fa-shopping-cart" style={{fontSize:"24px"}}></i></label>
                       </div>
                   </div>
                   <div className="row">
                        <small className="text-muted">You have 0 items in the shopping cart</small>
                   </div>
               </div> 
            </>
        )
    }
    else{
        return (
            <>
               <div className="container mt-3" style={{background:"transparent"}}>
                   <div className="row" >
                       <div className="col  border-bottom pb-3">
                        <p className="h5 text-dark" style={{position:"relative",top:"30px"}}>Shopping Cart</p>
                            <label htmlFor="" className="carticon text-dark"><span>{state.totalItems}</span><i className="fa fa-shopping-cart" style={{fontSize:"24px"}}></i></label>
                       </div>
                   </div>
                   <div className="row">
                        <small className="text-muted d-block">You have {state.totalItems} items in the shopping cart</small>
                        <div className="itemdiv">
                            <div className="itemblock">
                                <contextData.Provider value={{...state,removeItem,increment,decrement}}>{/*passing complete data in object form*/}
                                    <Cartitems/>
                                </contextData.Provider>
                            </div>
                        </div>
                        <div className="bill">
                            <div className="amount">
                                <p className="text-muted" style={{fontWeight:"bold"}}>Cart Total: <span style={{color:"black"}}>₹{state.totalPrice}</span></p>
                                <button className="btn btn-danger btn-sm mx-2" onClick={emptyCart}>REMOVE ALL</button>
                                <button className="btn btn-primary btn-sm">CHECKOUT</button>
                            </div>
                        </div>
                   </div>
               </div> 
            </>
        )
    }
    
}

export default Cart;
