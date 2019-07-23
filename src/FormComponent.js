import React from 'react';
import { Grid, Dropdown } from 'semantic-ui-react'

class FormApp extends React.Component {
    constructor(prop){
        super(prop);
        this.state = {            
            title: 'Registro de Usuarios',
            act: 0,
            index: '',
            datas: [],
            name: '',
            lastname: '',
            username: '',
            languaje: '',        
            about: '',
            message: ''
            
        }
        
    }

componentDidMount(){
   this.refs.name.focus();
  }

onChange(e){
    if(e.target.name === 'acept'){
        this.setState({
            [e.target.name]: e.target.checked
        })
    }else{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
}

submit = (e) =>{
    e.preventDefault();
    console.log('try');

    let datas = this.state.datas;
    let name = this.refs.name.value;
    let lastname = this.refs.lastname.value;
    let username = this.refs.username.value;    
    let languaje = this.refs.languaje.value;
    let gender = this.validate2();    
    let about = this.refs.about.value;

      
    if(!this.validate()){
        return;
    }

    if(this.state.act === 0){   //new
      let data = {
        name, lastname, username, languaje, gender, about
      }
      datas.push(data);      
    }else{                      //update
      let index = this.state.index;
      datas[index].name = name;
      datas[index].lastname = lastname;
      datas[index].username = username;
      datas[index].languaje = languaje;
      datas[index].gender = gender;
      datas[index].about = about;        
    }    
    
    this.setState({
      datas: datas,
      act: 0,
      name: '',
      lastname: '',
      languaje:'',
      gender: '',
      about: '',
      username: '',
      message: 'Registro Exitso'      
    })
    
    
    this.refs.name.focus();
}

validate(){
    if(this.state.acept != true){
        this.setState({
            message: 'Acepte los Términos y Condiciones'
        })
        return false
    }
    return true       
}     
    
validate2(){   
    if(this.state.gender = "man"){
        return this.refs.gender.value ;        
    }else{
        return  this.refs.gender1.value;
    } 
}

Remove = (i) => {
    let datas = this.state.datas;
    datas.splice(i,1);
    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
}


render() {
    let datas = this.state.datas;
    return(
        <div className="App" >
            <h2>{this.state.title}</h2>
            <form onSubmit = {this.submit} ref="myForm">
                
                <input 
                    ref = "name"
                    placeholder = "Nombre"
                    value={this.state.name}
                    onChange={this.onChange.bind(this)}
                    name="name" id="name" type="text" />
                
                <input 
                    ref = "lastname"
                    placeholder = "Apellido"
                    value={this.state.lastname}
                    onChange={this.onChange.bind(this)}
                    name="lastname" id="lastname" type="text" />
                
                <input 
                    ref = "username"
                    placeholder = "Usuario"
                    value={this.state.username}
                    onChange={this.onChange.bind(this)}
                    name="username" id="username" type="text" />
                
                <select 
                    ref = "languaje"
                    id = "languaje" name = "languaje" 
                    value={this.state.languaje}           
                    onChange={this.onChange.bind(this)}>
                    <option value="" >Seleccione Idioma</option>
                    <option value="english" >Ingles</option>
                    <option value="spanish" >Español</option>
                    <option value="germany" >Alemán</option>
                    <option value="italy" >Italinano</option>
                    <option value="franch" >Francés</option>
                </select>

                <div className ="gender" >                    
                    <input 
                        ref = "gender"
                        placeholder = "Género"
                        type="radio" name="gender"
                        value ="man"
                        onChange={this.onChange.bind(this)}/>Hombre
                    <input 
                        ref = "gender1"
                        placeholder = "Género"
                        type="radio" name="gender"
                        value ="women"
                        onChange={this.onChange.bind(this)}/>Mujer
                </div>
                
                <textarea 
                    
                    ref = "about"
                    placeholder = "Descripción"
                    id="about" name="about"
                    value={this.state.about}
                    onChange={this.onChange.bind(this)} />

                <div >             
                    <input 
                        ref = "acept"
                        id="acept" name="acept" type="checkbox" 
                        value={this.state.acept} 
                        onChange={this.onChange.bind(this)}
                        /> Aceptas Términos y Condiciones 
                </div>
                <div >
                    <button onClick={(e)=>this.submit(e)} className="myButton">Guardar</button>
                    <span style={{color: 'green'}}> {this.state.message} </span>
                </div>
                <pre className="grid" >
                {datas.map((data,i) =>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column textAlign = "right" width={4}>
                                <label id="label"><h3> Usuario {i+1}</h3></label>                                    
                            </Grid.Column>
                            <Grid.Column textAlign = "left" width={12}>
                                {data.name} , {data.lastname} , {data.username} , {data.languaje} , {data.gender} , {data.about}
                                <button onClick={()=>this.Remove(i)} className="myGridButton">Remove </button>
                            </Grid.Column>             
                        </Grid.Row>
                    </Grid>
                )}                                    
                </pre>                
            </form>
        </div>        
    ) 
}

}

export default FormApp



