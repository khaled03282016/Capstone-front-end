import React, {Component} from 'react';
import axios from 'axios';
import DropzoneComponent from "react-dropzone-component";
import {API_URL} from '../../helpers/api';


import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";




export default class ProductForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      Id: "",
      Title :"",
      Category : "",
      QuantityS: "",
      QuantityM: "",
      QuantityL: "",
      QuantityXl: "",
      QuantityXxl: "",
      kids1: "",
      kids2: "",
      kids3: "",
      kids4: "",
      kids5: "",
      kids6: "",
      kids7: "",
      kids8: "",
      kids9: "",
      kids10: "",
      kids11: "",
      kids12: "",
      kids13: "",
      kids1y: "",
      kids2y: "",
      kids3y: "",
      kids4y: "",
      kids5y: "",
      kids6y: "",
      Quantity7: "",
      Quantity7_5: "",
      Quantity8: "",
      Quantity8_5: "",
      Quantity9: "",
      Quantity9_5: "",
      Quantity10: "",
      Quantity10_5: "",
      Quantity11: "",
      Quantity11_5: "",
      Quantity12: "",
      Color: "",
      Price: "",
      image : "",
      image_1 : "",
      image_2 : "",
      image_3 : "",
      editMode: false,
      apiUrl: `${API_URL}/test`,
      apiAction:'post',

           
    }

    this.build_input = this.build_input.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.buildForm = this.buildForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleImageDrop = this.handleImageDrop.bind(this);
    this.handleImage_1Drop = this.handleImage_1Drop.bind(this);
    this.handleImage_2Drop = this.handleImage_2Drop.bind(this);
    this.handleImage_3Drop = this.handleImage_3Drop.bind(this);
    this.handleDeleteImage= this.handleDeleteImage.bind(this)


    this.imgRef = React.createRef();
    this.img_1Ref = React.createRef();
    this.img_2Ref = React.createRef();
    this.img_3Ref = React.createRef();

   
};
handleImageDrop() {
  return {   
    addedfile: file => this.setState({ image: file })
  
  };

}

handleImage_1Drop() {

  return {
    addedfile: file => this.setState({ image_1: file })
  };
}

handleImage_2Drop() {

  return {
    addedfile: file => this.setState({ image_2: file })
  };
}

handleImage_3Drop() {

  return {
    addedfile: file => this.setState({ image_3: file })
  };
}


componentConfig() {
  return {
    iconFiletypes: [".jpg", ".png"],
    showFiletypeIcon: true,
    postUrl: "https://httpbin.org/post"
  };
}

djsConfig() {
  return {
    addRemoveLinks: true,
    maxFiles: 1
  };
}
 
  buildForm() {
  let formData = new FormData();

  formData.append("Title", this.state.Title);
  formData.append("Category", this.state.Category);
  formData.append("Price", this.state.Price);
  formData.append("Color", this.state.Color);
  formData.append("QuantityS", this.state.QuantityS);
  formData.append("QuantityM", this.state.QuantityM);
  formData.append("QuantityL", this.state.QuantityL);
  formData.append("QuantityXl", this.state.QuantityXl);
  formData.append("QuantityXxl", this.state.QuantityXxl);
  formData.append("kids1", this.state.kids1);
  formData.append("kids2", this.state.kids2);
  formData.append("kids3", this.state.kids3);
  formData.append("kids4", this.state.kids4);
  formData.append("kids5", this.state.kids5);
  formData.append("kids6", this.state.kids6);
  formData.append("kids7", this.state.kids7);
  formData.append("kids8", this.state.kids8);
  formData.append("kids9", this.state.kids9);
  formData.append("kids10", this.state.kids10);
  formData.append("kids11", this.state.kids11);
  formData.append("kids12", this.state.kids12);
  formData.append("kids13", this.state.kids13);
  formData.append("kids1y", this.state.kids1y);
  formData.append("kids2y", this.state.kids2y);
  formData.append("kids3y", this.state.kids3y);
  formData.append("kids4y", this.state.kids4y);
  formData.append("kids5y", this.state.kids5y);
  formData.append("kids6y", this.state.kids6y);
  formData.append("Quantity7", this.state.Quantity7);
  formData.append("Quantity7_5", this.state.Quantity7_5);
  formData.append("Quantity8", this.state.Quantity8);
  formData.append("Quantity8_5", this.state.Quantity8_5);
  formData.append("Quantity9", this.state.Quantity9);
  formData.append("Quantity9_5", this.state.Quantity9_5);
  formData.append("Quantity10", this.state.Quantity10);
  formData.append("Quantity10_5", this.state.Quantity10_5);
  formData.append("Quantity11", this.state.Quantity11);
  formData.append("Quantity11_5", this.state.Quantity11_5);
  formData.append("Quantity12", this.state.Quantity12);

  formData.append("price", this.state.Price);

   if (this.state.image) {
  formData.append("image", this.state.image);
      }
   
   if (this.state.image_1) {
  formData.append("image_1", this.state.image_1);
      }
  if (this.state.image_2) {
  formData.append("image_2", this.state.image_2);
      }

  if (this.state.image_3) {
    formData.append("image_3", this.state.image_3);
  }

  return formData;
  
}


handleChange(event) {
  this.setState({
    [event.target.name]: event.target.value
  });
}


build_input( name, value){
  return (<input type="number"  className="input-wrapper"
  value = {value} name ={name} placeholder='Quantity of product' onChange={(e)=>{this.setState({[e.target.name]: e.target.value})}}></input>)
}


handleDeleteImage(image_order){
  axios.patch(`${API_URL}/delete_image/${this.state.Id}/${image_order}`, 
  { withCredentials: true })
    .then(response=>{
      this.setState({
        [`${image_order}_url`]:""
      });
    })

    .catch(error =>{
      console.log('error deleteImage', Error)
    });

  }



handleSubmit(event) {
  event.preventDefault()
  axios({
    method: this.state.apiAction,
    url: this.state.apiUrl,
    data: this.buildForm(),
    withCredentials: true 
  })
   
    .then( response => {
      if(this.state.editMode){
        this.props.handleEditSubmition();
      }else{
      this.props.handleAddForm(response.data.result);
    };
      this.setState ( {
            Id: "",
            Title :"",
            Category : "",
            QuantityS: "",
            QuantityM: "",
            QuantityL: "",
            QuantityXl: "",
            QuantityXxl: "",
            kids1: "",
            kids2: "",
            kids3: "",
            kids4: "",
            kids5: "",
            kids6: "",
            kids7: "",
            kids8: "",
            kids9: "",
            kids10: "",
            kids11: "",
            kids12: "",
            kids13: "",
            kids1y: "",
            kids2y: "",
            kids3y: "",
            kids4y: "",
            kids5y: "",
            kids6y: "",
            Quantity7: "",
            Quantity7_5: "",
            Quantity8: "",
            Quantity8_5: "",
            Quantity9: "",
            Quantity9_5: "",
            Quantity10: "",
            Quantity10_5: "",
            Quantity11: "",
            Quantity11_5: "",
            Quantity12: "",
            Color: "",
            Price:"",
            image : "",
            image_1 : "",
            image_2 : "",
            image_3 : "",
            image_url: "",
            image_1_url: "",
            image_2_url: "",
            image_3_url: ""

      });
       
      [this.imgRef, this.img_1Ref, this.img_2Ref, this.img_3Ref].forEach(ref =>{
         ref.current.dropzone.removeAllFiles();
      })
     

      })

    .catch(error => {
      console.log("product form handleSubmit error", error);
    }) 
}

componentDidUpdate() {
  if (Object.keys(this.props.productToEdit).length > 0) {
    const {
    id,
    Title ,
    Category ,
    Size,
    Color,
    Price,
    image ,
    image_1 ,
    image_2 ,
    image_3 } = this.props.productToEdit;
    this.props.clearProductEdit();
    this.setState({
            Id: id || "",
            Title : Title || "",
            Category : Category || "",
            QuantityS: Size['Small'] || "",
            QuantityM: Size['Medium'] || "",
            QuantityL: Size['Large'] || "",
            QuantityXl: Size['X_large'] || "",
            QuantityXxl: Size['XX_large']|| "",
            kids1: Size['kids1'] || "",
            kids2: Size['kids2'] || "",
            kids3: Size['kids3'] || "",
            kids4: Size['kids4'] || "",
            kids5: Size['kids5'] || "",
            kids6: Size['kids6'] || "",
            kids7: Size['kids7'] || "",
            kids8: Size['kids8'] || "",
            kids9: Size['kids9'] || "",
            kids10: Size['kids10'] || "",
            kids11: Size['kids11'] || "",
            kids11: Size['kids11'] || "",
            kids12: Size['kids12'] || "",
            kids13: Size['kids13'] || "",
            kids1y: Size['kids1y'] || "",
            kids2y: Size['kids2y'] || "",
            kids3y: Size['kids3y'] || "",
            kids4y: Size['kids4y'] || "",
            kids5y: Size['kids5y'] || "",
            kids6y: Size['kids6y'] || "",
            Quantity7: Size['size_7'] || "",
            Quantity7_5: Size['size_7_5'] || "",
            Quantity8: Size['size_8'] || "",
            Quantity8_5: Size['size_8_5'] || "",
            Quantity9: Size['size_9'] || "",
            Quantity9_5: Size['size_9_5'] || "",
            Quantity10: Size['size_10'] || "",
            Quantity10_5: Size['size_10_5'] || "",
            Quantity11: Size['size_11'] || "",
            Quantity11_5: Size['size_11_5'] || "",
            Quantity12: Size['size_12 '] || "",
            Color: Color || "",
            Price: Price || "",
            image_url : image || "",
            image_1_url :  image_1 || "",
            image_2_url : image_2 || "",
            image_3_url : image_3 || "",
            editMode: true,
            apiUrl: `${API_URL}/update_product/${id}`,
            apiAction: 'patch'
    })
  }

}

render(){
  return(
    <form onSubmit = {this.handleSubmit} className="form-wrapper">
      <div className="selects-wrapper">
        <div className="select-wrapper">
          <label>Title</label>
          <select name="Title" value={this.state.Title} onChange={this.handleChange} className="select-option">
            <option value="">Select title</option>
            <option value="T-shirt">T-shirt</option>
            <option value="Shoes">Shoes</option>
            <option value="Dress">Dress</option>
            <option value="Pant">Pant</option>
            <option value="Short">Short</option>
            <option value="shirt">shirt</option>
            <option value="Sweater">Sweater</option>
            <option value="Jacket">Jacket</option>
          </select>            
        </div>
        <div className="select-wrapper">
          <label> Category</label>
          <select name="Category" value= {this.state.Category} onChange={this.handleChange} className="select-option">
            <option value="">Category's liste</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>

        </div>
        <div className="selected-wrapper">
          <input type="number" 
          name="Price" 
          placeholder={`${this.state.Title} Price`} 
          value= {this.state.Price} 
          onChange={this.handleChange}
          className="input-price">
          </input>
        </div>
        <div className="selected-wrapper">
          <input type="text" name="Color" 
          placeholder={`${this.state.Title} color`} 
          value= {this.state.Color} 
          onChange={this.handleChange}
          className="input-color">
          </input>
        </div>
      </div>
      {(this.state.Category == "Men" || this.state.Category == "Women") && this.state.Title == "Shoes"?
      (
      <div className="size-wrapper">
        <div className="size-selected">
         <label>Men/Women 7</label>
         {this.build_input( name="Quantity7", this.state.Quantity7)}
        </div>
        <div className="size-selected">
         <label>Men/Women 7.5</label>
         {this.build_input( name="Quantity7_5", this.state.Quantity7_5)}
        </div>
        <div className="size-selected">
         <label>Men/Women 8</label>
         {this.build_input( name="Quantity8", this.state.Quantity8)}
        </div>
        <div className="size-selected">
          <label>Men/Women 8.5</label>
          {this.build_input( name="Quantity8_5", this.state.Quantity8_5)}
        </div>
        <div className="size-selected">
          <label>Men/Women 9</label>
          {this.build_input( name="Quantity9", this.state.Quantity9)}
        </div>
        <div className="size-selected">
          <label>Men 9.5</label>
          {this.build_input( name="Quantity9_5", this.state.Quantity9_5)}
        </div>
        <div className="size-selected">
          <label>Men 10</label>
          {this.build_input( name="Quantity10", this.state.Quantity10)}
        </div>
        <div className="size-selected">
          <label>Men 10_5</label>
          {this.build_input( name="Quantity10_5", this.state.Quantity10_5)}
        </div>
        <div className="size-selected">
          <label>Men 11</label>
          {this.build_input( name="Quantity11", this.state.Quantity11)}
        </div>
        <div className="size-selected">
          <label>Men 11.5</label>
          {this.build_input( name="Quantity11_5", this.state.Quantity11_5)}
        </div>
        <div className="size-selected">
          <label>Men 12</label>
          {this.build_input( name="Quantity12", this.state.Quantity12)}
        </div>
       
      </div>
      ):null}
      {this.state.Category == "Kids" && this.state.Title == "Shoes"?
      (
      <div className="size-wrapper">
        <div className="size-selected">
          <label>Kids 1</label>
          {this.build_input( name="kids1", this.state.kids1)}
        </div>
        <div className="size-selected">
          <label>Kids 2</label>
          {this.build_input( name="kids2", this.state.kids2)}
        </div>
        <div className="size-selected">
          <label>Kids 3</label>
          {this.build_input( name="kids3", this.state.kids3)}
        </div>
        <div className="size-selected">
          <label>Kids 4</label>
          {this.build_input( name="kids4", this.state.kids4)}
        </div>
        <div className="size-selected">
          <label>Kids 5</label>
          {this.build_input( name="kids5", this.state.kids5)}
        </div>
        <div className="size-selected">
          <label>Kids 6</label>
          {this.build_input( name="kids6", this.state.kids6)}
        </div>
        <div className="size-selected">
          <label>Kids 7</label>
          {this.build_input( name="kids7", this.state.kids7)}
        </div>
        <div className="size-selected">
          <label>Kids 8</label>
          {this.build_input( name="kids8", this.state.kids8)}
        </div>
        <div className="size-selected">
          <label>Kids 9</label>
          {this.build_input( name="kids9", this.state.kids9)}
        </div>
        <div className="size-selected">
          <label>Kids 10</label>
          {this.build_input( name="kids10", this.state.kids10)}
        </div>
        <div className="size-selected">
          <label>Kids 11</label>
          {this.build_input( name="kids11", this.state.kids11)}
        </div>
        <div className="size-selected">
          <label>Kids 12</label>
          {this.build_input( name="kids12", this.state.kids12)}
        </div>
        <div className="size-selected">
          <label>Kids 13</label>
          {this.build_input( name="kids13", this.state.kids13)}
        </div>
        <div className="size-selected">
          <label>Kids 1y</label>
          {this.build_input( name="kids1y", this.state.kids1y)}
        </div>
        <div className="size-selected">
          <label>Kids 2y</label>
          {this.build_input( name="kids2y", this.state.kids2y)}
        </div>
        <div className="size-selected">
          <label>Kids 3y</label>
          {this.build_input( name="kids3y", this.state.kids3y)}
        </div>
        <div className="size-selected">
          <label>Kids 4y</label>
          {this.build_input( name="kids4y", this.state.kids4y)}
        </div>
        <div className="size-selected">
          <label>Kids 5y</label>
          {this.build_input( name="kids5y", this.state.kids5y)}
        </div>
        <div className="size-selected">
          <label>Kids 6y</label>
          {this.build_input( name="kids6y", this.state.kids6y)}
        </div>
      </div>
      ):null}

      {this.state.Title != "Shoes" && this.state.Title && this.state.Category ?
      (
        <div className="size-wrapper">
          <div className="size-selected">
            <label>Small</label>
            {this.build_input( name="QuantityS", this.state.QuantityS)}
          </div>
          <div className="size-selected">
            <label>Meduim</label>
            {this.build_input( name="QuantityM", this.state.QuantityM)}
          </div>
          <div className="size-selected">
            <label>Large</label>
            {this.build_input( name="QuantityL", this.state.QuantityL)}
          </div>
          <div className="size-selected">
            <label>X-large</label>
            {this.build_input( name="QuantityXl", this.state.QuantityXl)}
          </div>
          <div className="size-selected">
            <label>XX-large</label>
            {this.build_input( name="QuantityXxl", this.state.QuantityXxl)}
          </div>

        </div>
      ):null}
      <div className="images-wrapper">
        {this.state.editMode && this.state.image_url ?(
          <div className = 'image-wrapper'>
            <img src={this.state.image_url}></img>
            <div className="image-remove-delete">
              <a onClick={()=>this.handleDeleteImage('image')}>Remove</a>
            </div>
        </div>
        ):(<DropzoneComponent
          ref= {this.imgRef}
          config={this.componentConfig()}
          djsConfig={this.djsConfig()}
          eventHandlers={this.handleImageDrop()}> First image </DropzoneComponent>)}
          {this.state.editMode && this.state.image_1_url?(
          <div className = 'image-wrapper'>
            <img src={this.state.image_1_url}></img>
            <div className="image-remove-delete">
              <a onClick={()=>this.handleDeleteImage('image_1')}>Remove</a>
            </div>
        </div>):(

        <DropzoneComponent
          ref= {this.img_1Ref}
          config={this.componentConfig()}
          djsConfig={this.djsConfig()}
          eventHandlers={this.handleImage_1Drop()}> Second image  </DropzoneComponent>)}

        {this.state.editMode && this.state.image_2_url?(
          <div className = 'image-wrapper'>
            <img src={this.state.image_2_url}></img>
            <div className="image-remove-delete">
              <a onClick={()=>this.handleDeleteImage('image_2')}>Remove</a>
            </div>
        </div>):(
        <DropzoneComponent
          ref= {this.img_2Ref}
          config={this.componentConfig()}
          djsConfig={this.djsConfig()}
          eventHandlers={this.handleImage_2Drop()}> third image </DropzoneComponent>)}

        {this.state.editMode && this.state.image_3_url?(
          <div className = 'image-wrapper'>
            <img src={this.state.image_3_url}></img>
            <div className="image-remove-delete">
              <a onClick={()=>this.handleDeleteImage('image_3')}>Remove</a>
            </div>
        </div>):(

        <DropzoneComponent
          ref= {this.img_3Ref}
          config={this.componentConfig()}
          djsConfig={this.djsConfig()}
          eventHandlers={this.handleImage_3Drop()}> foorth image </DropzoneComponent>)}
      </div>

      <button className="btn" type="submit">
                Save
      </button>


    </form>
  )
}
}