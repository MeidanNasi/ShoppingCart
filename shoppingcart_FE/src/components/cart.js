import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Card,CardHeader,CardImg,CardBody,CardFooter,Button,Collapse} from "shards-react";
import NavBar from './navbar'
import { Icon } from 'react-icons-kit'
import {angleUp} from 'react-icons-kit/fa/angleUp'
import {angleDown} from 'react-icons-kit/fa/angleDown'
import { removeItem,addQuantity,subtractQuantity} from './actions/cartActions'
import { Link } from 'react-router-dom'




class Cart extends Component{
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false 
    };
  }
    // showing recipe or not..
      toggle() {
    this.setState({ collapse: !this.state.collapse });
    }
      //to remove the item completely
      handleRemove = (id)=>{
        this.props.removeItem(id);
    }
    //to add the quantity
    handleAddQuantity = (id)=>{
        this.props.addQuantity(id);
    }
    //to substruct from the quantity
    handleSubtractQuantity = (id)=>{
        this.props.subtractQuantity(id);
    }

    render(){ 
        let total = this.props.total;
        let addedItems = this.props.items.length ? 
        (
            this.props.items.map(item=>{
            return(
              <div style={{margin:'10px'}} >
                  <Card key={item.id} small style={{ maxWidth: "300px"}}>
                  <CardHeader>{item.title}</CardHeader>
                  <CardImg style={{ maxHeight: "100", maxWidth:"100px", marginLeft:"50px"}} src={item.img} />
                  <CardBody> Price: {item.price}$ | Quantity: {item.quantity} </CardBody>
                  <CardFooter>
                    <Link to="/cart"><Button outline pill theme='danger' onClick={()=>this.handleRemove(item.id)}>Remove</Button></Link>
                    <Link to="/cart"><Icon size={32} icon={angleUp} onClick={()=>{this.handleAddQuantity(item.id)}} /></Link>
                    <Link to="/cart"><Icon size={32} icon={angleDown} onClick={()=>{this.handleSubtractQuantity(item.id)}} /></Link>
                  </CardFooter>
                </Card>
              </div>

            )
          })
        )
        : 
        (
        <p> Nothing </p>
        )

          return(
          <div style={{backgroundColor:'#0f0f11'}}>
              <div className="App-Background">
                  <NavBar/>
                  <div className="centered"><h2 style={{textDecoration:"underline",color:"white"}}>What youve ordered</h2></div>
                  <div className="cart-containter"> 
                  {addedItems}
                  </div>
                  <div className="recipe">
                <Button onClick={this.toggle}>Recipe</Button>
                <Collapse open={this.state.collapse}>
                  <div style={{margin:'10px'}}>
                    <h4>Order Summary ({this.props.items.length} items)</h4> 
                    <h5 style={{color:'white'}}>Order number : #1</h5>
                    <h5 style={{color:'white'}}>Date : {new Date().getDate()+'-'+(new Date().getMonth()+1)+'-'+new Date().getFullYear()}</h5>
                    <h5 style={{color:'white'}}>Total : {this.props.total} US$</h5>
                  </div>
                </Collapse>
              </div>
              </div>
          </div>

          )
    }
}

const mapStateToProps = (state) =>{
  return{
    items: state.addedItems,
    total: state.total
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
      removeItem: (id)=>{dispatch(removeItem(id))},
      addQuantity: (id)=>{dispatch(addQuantity(id))},
      subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart)