import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import {Card,CardHeader,CardTitle,CardImg,CardBody,CardFooter,Button, FormInput} from "shards-react";
import { connect } from 'react-redux';
import { addItem, deleteItem } from './actions/itemsActions'

class adminHome extends React.Component {

  constructor(props) {
    super(props);

     this.state = {
          id: 0,
          title: " ",
          desc: " ", 
          price: 0, 
          url: " ",
          quantity: 0,
          data: []
    };
}

  onId = (val)=>{
    this.setState({ id : val })
  }
  onTitle = (val)=>{
    this.setState({ title : val })
  }
  onDesc = (val)=>{
    this.setState({ desc : val })
  }
  onPrice = (val)=>{
    this.setState({ price : val })
  }
  onUrl = (val)=>{
    this.setState({ url : val })
  }

  onQuantity = (val)=>{
    this.setState({ quantity : val })
  }

  handleAdd = () => {
    this.props.addItem(this.state);
  };

  handleRemove = (id) => {
    this.props.deleteItem(id);
  }

  // // check this
  // handleRemove = async (id) => {
  //   const response = axios.delete('/items/delete', { params: { id: id }});
  //   return response.message;
  // };

  // //check this
  // handleAdd = async () => {
  //   const response = axios.post('/items/create', this.state);
  //   return response.message;
  // };


  // componentDidMount() {
  // // Call our fetch function below once the component mounts
  //   this.callBackendAPI()
  //     .then(res => this.setState({ data: res }))
  //     .catch(err => console.log(err));   
  // }

  // // Fetches our GET route from the Express server.
  // callBackendAPI = async () => {
  //   const response = await fetch('/items', null);
  //   const body = await response.json();

  //   console.log("response from db:", body)

  //   if (response.status !== 200) {
  //     throw Error(body.message) 
  //   }
  //   return body;
  // }


  render() {
    let itemList = this.props.items.map(item=>{
     if(item.quantity != 0)
    return(
        <Card large key={item.id} style={{ maxWidth: "400px" , margin: "10px"}}>
          <CardHeader>{item.title}</CardHeader>
          <CardImg style={{ maxHeight: "800px", maxWidth:"300px"}} src={item.img} />
          <CardBody>
            <CardTitle>Description:</CardTitle>
            <p>{item.desc}</p>
            <Button outline pill onClick={ ()=>{this.handleRemove(item.id); window.location.reload();} }>Mark to remove</Button>
          </CardBody>
          <CardFooter>Price: {item.price}$  || Quantity: {item.quantity} || ID: {item.id} </CardFooter>
          </Card>
    )
  })
    return(
      <div className="Admin">
          <div className="centered">
          <h1 style={{margin: "30px"}}>Hey Admin</h1>
          </div>

          <div className="centered">
          <h4 style={{color: "grey"}}>Here you can add/remove an item</h4>
          </div>
          {/* InputForms.. */}
          <div className="inputs">
            <FormInput style={{margin:"5px"}} placeholder="id..." onChange={(e) => this.onId(e.target.value)} />
            <FormInput style={{margin:"5px"}} placeholder="title..." onChange={(e) => this.onTitle(e.target.value)} />
            <FormInput style={{margin:"5px"}} placeholder="desc..." onChange={(e) => this.onDesc(e.target.value)} />
            <FormInput style={{margin:"5px"}} placeholder="price..." onChange={(e) => this.onPrice(e.target.value)} />
            <FormInput style={{margin:"5px"}} placeholder="quantity..." onChange={(e) => this.onQuantity(e.target.value)} />
            <FormInput style={{margin:"5px"}} placeholder="url..." onChange={(e) => this.onUrl(e.target.value)} />
          </div>
          <div className="centered">
          <Button style={{margin: "10px"}} outline squared>
          List
          </Button>
          <Button style={{margin: "10px"}} outline squared theme="success"
          >
          Remove
          </Button>
          <Button style={{margin: "10px"}} outline squared theme="danger"
          onClick={ ()=>{ this.handleAdd(); }}
          >
          Add
          </Button>
          </div>
          <div className="centered" style={{marginTop: "40px"}}>
          <h3> All items in the store: </h3>
          </div>
          {/* items.. */}
          <div className="box"> 
            {itemList}
            <img src={this.state.img} />
          </div>
      </div>
    )
  }
}

// store manipulatings ..
const mapStateToProps = (state)=>{
  return {
    items: state.items,
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    addItem: (item)=>{dispatch(addItem(item))},
    deleteItem: (id)=>{dispatch(deleteItem(id))},
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(adminHome);


//window.location.reload();