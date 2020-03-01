import React ,{ Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import {Card,CardHeader,CardTitle,CardImg,CardBody,CardFooter,
        Button, ButtonGroup , Modal, ModalBody, ModalHeader,
        Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormInput
       } from "shards-react";
import { connect } from 'react-redux'
import NavBar from './navbar'
import { Icon } from 'react-icons-kit'
import {close} from 'react-icons-kit/fa/close'
import {shoppingCart} from 'react-icons-kit/fa/shoppingCart'
import { searchItems, loadItems } from './actions/itemsActions'





class clientHome extends Component {
  
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.modalUp = this.modalUp.bind(this);
    this.props.loadItems
    this.state = { 
        openMadal: false,
        openToggle: false,
        data: [],
        filteredItems: [],
        addedItems: [],
        search: '',
        showError: false,
        total: 0
          };
  }


  modalUp() {
    this.setState({ openMadal : !this.state.openMadal});
    console.log("clicked", this.state.openMadal)
  }
  toggle() {
    this.setState(prevState => {
      return { openToggle: !prevState.openToggle };
    });
  }

  handleSort = (sortBy) =>{
    let sortData = this.state.data;
    if( sortBy === 'htl'){
      sortData.sort((a,b)=> parseFloat(b.price) - parseFloat(a.price));
      this.setState({ data : sortData})
    } 
    if( sortBy === 'lth'){
      sortData.sort((a,b)=>  parseFloat(a.price) - parseFloat(b.price));
      this.setState({ data : sortData})
    } 
  }
  handleFilter = (filterBy) => {
    let filtered = this.state.data;
    if(filterBy === 'men'){
      filtered = filtered.filter( item=> item.gender !== 'Women')
      this.setState( { data: filtered })
    }
    if(filterBy === 'women'){
      filtered = filtered.filter( item=> item.gender !== 'Men')
      this.setState( { data: filtered })
    }
  }
  // when add to cart clicked
  handleClick = async (item)=>{
    // console.log(item)
    // const response = axios.get('/items/id', { params: { id: item.id }})
    // console.log((await response).data.quantity)
    // const q = (await response).data.quantity
    // if(q >= 1){
    //   const res = axios.put('/items/update/id', { id: item.id, quantity: q-1 }) // decrise quantity from db
      this.setState({ addedItems : [...this.state.addedItems, {item: item, sign: Math.random() }] , total : this.state.total+item.price })
      console.log(this.state.addedItems)
    //}
  }

  // remove 
  handleRemove = async (e)=>{
    // console.log(e.item.id);
    // const response = axios.get('/items/id', { params: { id: e.item.id }})
    // console.log((await response).data.quantity)
    // const q = (await response).data.quantity
    // const res = axios.put('/items/update/id', { id: e.item.id, quantity: q+1 }) // incrise quantity from db
    let new_items = this.state.addedItems.filter(prod=> e.sign !== prod.sign)
    this.setState({addedItems: new_items})
    this.setState({ total : this.state.total - e.item.price})
  } 

  handleCartClicked = () =>{
    this.setState( {open : true});
  }

  componentDidMount() {
    this.setState({data : this.props.items})
 }
  
    // Fetches our GET route from the Express server.
  callBackendAPI = async () => {
      const response = await fetch('/items', null);
      const body = await response.json();
  
      console.log("response from db:", body)
  
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body;
    };
  onSearch = (val) => {
    this.props.searchItems(val);
    this.setState({ data : this.props.items})
  }
    
  render() {
    const { open } = this.state;
    // rendering list to show on page
    let itemList = this.state.data.map(item=>{
      if(item.quantity != 0)
      return(
          <Card large key={item.id} style={{ maxWidth: "400px" , margin: "10px"}}>
            <CardHeader>{item.title}</CardHeader>
            <CardImg style={{ maxHeight: "800px", maxWidth:"300px"}} src={item.img} />
            <CardBody>
              <CardTitle>Description:</CardTitle>
              <p>{item.desc}</p>
              <Button outline pill onClick={ ()=>{this.handleClick(item);}}>Add to cart &rarr;</Button>
            </CardBody>
            <CardFooter>Price: {item.price}$</CardFooter>
          </Card>
      )
    })

    let added = this.state.addedItems.map(e=>{
        return(
          <div style={{margin:'10px'}} >
              <Card key={e.item.id} small style={{ maxWidth: "300px"}}>
              <CardHeader>{e.item.title}</CardHeader>
              <CardImg style={{ maxHeight: "100", maxWidth:"100px", marginLeft:"50px"}} src={e.item.img} />
              <CardBody> Price: {e.item.price}$ </CardBody>
              <CardFooter>
                <Button outline pill theme='danger' onClick={()=>{this.handleRemove(e);}}>Remove</Button>
              </CardFooter>
            </Card>
          </div>

        )
      })

    return(
    <div style={{ backgroundColor: "#E8E8E8"}}>
        <NavBar/>
        <div className="centered">
      {/* Cart */}  
          <Button size="sm" outline pill theme="info" style={{margin:"10px"}}
          onClick={ ()=>{ this.modalUp()}}
          >
          <Icon size={32} icon={shoppingCart} />
          </Button>
        </div>
        <div className="centered">
        <h2>Our Items</h2>
        </div>

      {/* Buttons */}
      <div style={{marginLeft: '110px'}}>
      <ButtonGroup style={{margin: '10px'}}>
      <FormInput placeholder="  Search..." onChange={(e) => this.onSearch(e.target.value)} style={{maxWidth: '150px', marginLeft: '10px', marginRight: '10px'}} />
      <Button outline theme="success" onClick={ ()=> this.handleFilter('men')} >Men</Button>
      <Button outline theme="success" onClick={ ()=> this.handleFilter('women')} >Women</Button>
      </ButtonGroup>
      <Dropdown open={this.state.openToggle} toggle={this.toggle} group>
      <Button outline theme="info">Sort</Button>
      <DropdownToggle split theme="info" />
      <DropdownMenu>
        <DropdownItem onClick={()=>this.handleSort('htl')}>Price high to low</DropdownItem>
        <DropdownItem onClick={()=>this.handleSort('lth')}>Price low to high</DropdownItem>
        <DropdownItem>Newest</DropdownItem>
      </DropdownMenu>
      </Dropdown>
      </div>
      {/* Items */}
      <div className="box"> 
        {itemList} 
      </div>
      {/* Modal */}
      <div className="centered" style={{borderStyle: "solid", borderColor : "white"}}>
      <Modal open={this.state.openMadal} toggle={this.modalUp} size="lg">
      <ModalHeader>
        <Button size="sm" outline pill theme="info" style={{margin:"10px"}}
        onClick={ ()=>{ this.modalUp()}}
        >
        <Icon size={32} icon={close} />
        </Button>
        CART
        <div>
        <h10 style={{color:'grey', marginRight: "10px"}}>Order number : #1</h10>
        <h10 style={{color:'grey', marginRight: "10px"}}>Date : {new Date().getDate()+'-'+(new Date().getMonth()+1)+'-'+new Date().getFullYear()}</h10>
        <h10 style={{color:'grey'}}>Total : {this.state.total} US$</h10>
        </div>
      </ModalHeader>
      <ModalBody >
        <div className="box" >
        { this.state.addedItems.length !=0 ? added : null}
        </div>
      </ModalBody>
      </Modal>
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
    searchItems: (search)=>{dispatch(searchItems(search))},
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(clientHome);


