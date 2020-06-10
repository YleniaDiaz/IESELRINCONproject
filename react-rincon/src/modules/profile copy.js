import React from 'react';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min';

import ProfessionalService from '../services/professional.service';
import DepartmentService from '../services/department.service';
import TutorService from '../services/tutor.service';
import RoleService from '../services/role.service';

import Swal from 'sweetalert2';
import $ from 'jquery';

class profileComponent extends React.Component {

    formatImage = (value) => {
        console.log(value.target.files[0]);
    }

    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            roles: [],
            tutors: [],
            name: "",
            departmentId: -1,
            roleId: -1,
            email: "",
            tutorId: -1,
            comment: "",
            image: {
                name: "",
                type: "",
                data: ""
            }
        };
    }

    componentDidMount() {
        this.queryDepartments();
        this.queryRoles();
        this.queryTutors();
    }

    queryDepartments() {
        DepartmentService.getAll()
            .then(res => {
                
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ departments: data });
                } else {
                    alert('Error web service');
                }
            })
            .catch(err => {
                alert('ERROR server' + err);
            });
    }

    queryRoles() {
        RoleService.getAll()
            .then(res => {
        
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ roles: data });
                } else {
                    alert('Error web service');
                }
            })
            .catch(err => {
                alert('ERROR server' + err);
            });
    }

    queryTutors(){
        TutorService.getAll()
            .then(res => {
        
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ tutors: data });
                } else {
                    alert('Error web service');
                }
            })
            .catch(err => {
                alert('ERROR server' + err);
            });
    }

    render() {
        return (
            <div class="container p-4">
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
                <div class="row">
                    <div class="col-lg-9">
                        <div class="card">
                            <div class="card-body">
                                <div class="form-group ">
                                    <input type="text"
                                        value={this.state.name}
                                        onChange={(value) => this.setState({ name: value.target.value })}
                                        class="form-control" name="nombre" placeholder="nombre" autofocus
                                    />
                                </div>

                                <div class="row">
                                    <div class="col-lg-3">
                                        <div class="form-group">
                                            <select class="form-control" 
                                            onChange={(value) => this.setState({ departmentId: value.target.value })} >
                                                <option selected disabled>Departamento</option>
                                                {this.loadDepartments()}
                                        
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-lg-2">
                                        <div class="form-group">
                                        <select class="form-control" 
                                            onChange={(value) => this.setState({ roleId: value.target.value })} >
                                                <option selected disabled >Rol</option>
                                                {this.loadRoles()}
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-lg-3">
                                        <div class="form-group">
                                        <select class="form-control" 
                                            onChange={(value) => this.setState({ tutorId: value.target.value })} >
                                                <option selected disabled >Tutoría</option>
                                                {this.loadTutors()}
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                <div class="form-group">
                                    <button type="submit" class="btn btn-success" onClick={()=>this.addProfessional()}>Añadir</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3">
                        <div class="card">
                            <div class="card-body text-center">
                                <form class="md-form">
                                    <div class="file-field">
                                        <div class="md-4">
                                            <img src="https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg"
                                                ref={profilePicture => this.myProfilePicture = profilePicture}
                                                id="blah"
                                                class="rounded-circle z-depth-1-half avatar-pic img-fluid img-thumbnail" alt="avatar"
                                            />
                                        </div>
                                        <div class="d-flex">
                                            <div class="btn btn-mdb-color btn-rounded float-left">
                                                <input ref={(myElement) => this.myFileElement = myElement}
                                                    //style={{display:'none'}}
                                                    type="file" 
                                                    id="imgInput"
                                                    onChange={(value)=> {this.readURL(value.target)}} 
                                                />
                                                {/*}
                                                <button onClick={()=> this.myFileElement.click()}
                                                    class="btn btn-primary">Seleccionar Imagen
                                                </button>
                                                */}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    loadDepartments() {
        return this.state.departments.map(data => {
            if (data) {
                return (
                    <option value={data.id}>{data.name}</option>                
                );
            }else{
                return <div></div>;
            }
        });
    }

    loadRoles() {
        return this.state.roles.map(data => {
            if (data) {
                return (
                    <option value={data.id}>{data.name}</option>                
                );
            }else{
                return <div></div>;
            }
        });
    }

    loadTutors() {
        return this.state.tutors.map(data => {
            if (data) {
                return (
                    <option value={data.id}>{data.name}</option>               
                );
            }else{
                return <div></div>;
            }
        });
    }

    readURL(input) {
        alert("entro");
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            if(input.files[0].type.includes("image")){
                reader.onload = function(e) {
                    $('#blah').attr('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]); // convert to base64 string
                
                this.loadImage(input.files[0]);
            }else{
            }
          
            
        }
    }
    

    loadImage(myValue){
        alert('XD');
        //https://www.youtube.com/watch?v=XeiOnkEI7XI
        this.myProfilePicture = myValue;
        this.state.image = {
            name: myValue.name,
            type: myValue.type,
            data: myValue
        }
        console.log(myValue);
    }

    addProfessional(){
        // parametros de datos post
        const datapost = {
        name : this.state.name,
            departmentId: this.state.departmentId,
            roleId: this.state.roleId,
            email: "kkk",
            tutorId: this.state.tutorId,
            comment: null,
            image: this.state.image
        }
        alert(JSON.stringify(datapost));
        
        ProfessionalService.create(datapost)
        .then(res=>{
        if (res.data.success) {
            //alert(res.data.message);
            Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'Profesional añadido correctamente!',
                showConfirmButton: false,
                timer: 2000
              })
            //this.props.history.push('/list'); 
        }
        else {
            alert("Error");
        }
        }).catch(error=>{
        alert("Error 34 "+error);
        }); 
    }
}



export default profileComponent;