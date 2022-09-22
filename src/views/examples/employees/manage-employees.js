import React, { Component, useEffect, useState } from 'react'
import { ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import MUIDataTable from "mui-datatables";
import setAuthToken from '../validation/authAuthToken'
const axios = require('axios').default;



function ManageEmployees(){
    const columns = ["ID", "Name", "Email", "Phone", "Role", "Action"];
    let data = []
    

    const options = {
    filterType: 'checkbox',
    };

    const [employees, setEmployees] = useState([])
    const [role, setRole] = useState("")
    const [message, setMessage] = useState("");
    const [errorClass, setErrorClass] = useState("");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
        
    useEffect(() => {
        fetchEmployees()
    }, []);

    let handleView = (id, e) => {
        e.preventDefault()
        window.location.href = `/employees/employee-details/${id}`
    }

    let handleEdit = (id, e) => {
        e.preventDefault()
        window.location.href = `/employees/update-employee/${id}`
    }

    let handleDelete = (id, e) => {
        e.preventDefault()
    }



    let fetchEmployees = () => {
        let token = localStorage.getItem("token");
        setAuthToken(token);

        axios({
            method: 'get',
            url: `${process.env.REACT_APP_SERVER_URL}/api/employees`,
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
          })
            
          .then(function (response) {
            let res = response.data
            if (res.status === false && res.code === 424) {
                window.location.href = '/auth/verification-pending'
            }
    
            else if (res.status === true && res.code === 200) {
                setEmployees(res.data)
                
                res.data.forEach(index => {
                    let row = [`${index.user_id}`, `${index.name}`, `${index.email}`, `${index.phone_number}`, `${index.role}`]
                    data.push(row)

                    
                })

                setEmployees(data)
                

                // const data = [
                //     ["Joe James", "Test Corp", "Yonkers", "NY"],
                //     ["John Walsh", "Test Corp", "Hartford", "CT"],
                //     ["Bob Herm", "Test Corp", "Tampa", "FL"],
                //     ["James Houston", "Test Corp", "Dallas", "TX"],
                //     ];
            }
          })
    
          .catch(function (error) {
            console.log(error);
          });
    }



    let handleRoleChange = (param) => {
        let token = localStorage.getItem("token");

        let data = {
            user_id: param.user_id,
            role: param.role,
        }

        axios({
            method: 'post',
            url: `${process.env.REACT_APP_SERVER_URL}/api/assign-role`,
            data: data,
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
          })
            
          .then(function (response) {
            let res = response.data

            if (res.status === false && res.code === 423) {
                setMessage(res.message)
                setErrorClass('text-danger')
            }

            else if (res.status === false && res.code === 422) {
                if (res.errors.user_id[0]) {
                    setMessage(res.errors.user_id[0])
                    setErrorClass('text-danger')
                }
                if (res.errors.role[0]) {
                    setMessage(res.errors.role[0])
                    setErrorClass('text-danger')
                }
            }
            
            else if (res.status === false && res.code === 403) {
                setMessage(res.message)
                setErrorClass('text-danger')
            }
            else if (res.status === true && res.code === 200) {
                setMessage(res.message)
                setErrorClass('text-success')
            }
          })

          .catch(function (error) {
            console.log(error);
          })
    }
        
    return (
        <div>
            <div className="page-header">
            <h3 className="page-title"> Employees </h3>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Employees</a></li>
                <li className="breadcrumb-item active" aria-current="page">Manage Employees</li>
                </ol>
            </nav>
            </div>
    
            <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                <div className="card-body">
                    <h4 className="card-title">All Employees</h4>
                    <div className='d-flex justify-content-center'>
                    <div className='message-info'>
                        <h6 className={ errorClass }>
                        
                        { message }
                        </h6>
                    </div>
                </div>
                    {/* <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>ID.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => {
                                return(
                                    <tr key={employee.user_id}>
                                        <td className='text-warning'>{employee.employee_id}</td>
                                        <td>
                                            <div className="dropdown-item preview-item d-flex p-0">
                                                <div className="preview-thumbnail">
                                                    <img src={employee.photo} alt="user" className="profile-pic"/>
                                                </div>
                                                <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                                    <p className="text-gray mb-0">
                                                        {employee.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{employee.email}</td>
                                        <td>{employee.phone_number}</td>
                                        <td>
                                        <select className="form-control" onChange={(e)=> handleRoleChange({user_id: employee.user_id, role:e.target.value})}id="exampleFormControlSelect2" value={employee.role}>
                                                <option value="admin" className=''>Admin</option>
                                                <option value="receiver" className=''>Receiver</option>
                                                <option value="sender" className=''>Sender</option>
                                                <option value="receiver and sender" className=''>Receiver & Sender</option>
                                                <option value="read only" className=''>Read Only</option>
                                            </select>
                                        </td>
                                        <td>
                                            <div className='action-icons d-flex justify-content-evenly'>
                                                <Link to="#" onClick={(e) => handleView(employee.user_id,e)} className='view-button'>
                                                    <i className="mdi mdi-eye text-warning"></i>
                                                </Link>
                                                <Link to="#" onClick={(e) => handleEdit(employee.user_id,e)}  className='edit-button'>
                                                    <i className="mdi mdi-pen text-info"></i>
                                                </Link>
                                                <Link to="#" onClick={handleShow} className='delete-button'>
                                                    <i className="mdi mdi-delete-outline text-danger"></i>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )
                        })}
                        </tbody>
                    </table>
                    </div> */}

 <MUIDataTable
  title={"Employee List"}
  data={employees}
  columns={columns}
  options={options}
/> 
                </div>
                </div>
            </div>
            
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span className='text-danger'>
                            This action cannot be reversed!
                        </span> 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you want to Delete user?
                </Modal.Body>
                <Modal.Footer>
                <button className="btn btn-secondary" onClick={handleClose}>
                    Cancel
                </button>
                <button className="btn btn-danger" onClick={handleClose}>
                    Delete
                </button>
                </Modal.Footer>
            </Modal>
            </div>
        
        )   
  }


export default ManageEmployees
