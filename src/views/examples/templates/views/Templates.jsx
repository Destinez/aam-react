import React, { Component, useEffect, useState } from 'react'
import { ProgressBar, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import MUIDataTable from "mui-datatables";
import setAuthToken from '../../validation/authAuthToken'
const axios = require('axios').default;

function Templates(){

    const [field, setField] = useState([])

    const [message, setMessage] = useState("");
    const [errorClass, setErrorClass] = useState("");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
        

    useEffect(() => {
        
    }, []);

  
    let handleView = (id, e) => {
        e.preventDefault()
        window.location.href = `/fields/field-details/${id}`
    }

    let handleEdit = (id, e) => {
        e.preventDefault()
        window.location.href = `/fields/update-field/${id}`
    }

    let handleDelete = (id, e) => {
        e.preventDefault()
    }

        
    return (
            <div>
                <div className="page-header">
                    <Link onClick={handleShow} to="#" className="page-action text-success">
                        <i className="mdi mdi-plus-circle "></i>
                    New Template
                    </Link>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>
                        Templates</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Manage Templates</li>
                        </ol>
                    </nav>
                </div>
        
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">All fields</h4>

                                <div className='d-flex justify-content-center'>
                                    <div className='message-info'>
                                        <h6 className={ errorClass }>
                                            { message }
                                        </h6>
                                    </div>
                                </div>

                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Slots</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1.</td>
                                                <td>Account Template</td>
                                                <td>
                                                    <Link to="#" onClick={handleShow} className='edit-button'>
                                                    <span className="text-info">[ Slots ]</span>
                                                    </Link></td>
                                                <td>
                                                    <Link to="#" onClick={handleShow} className='delete-button'>
                                                        <i className="mdi mdi-delete-outline text-danger"></i>
                                                    </Link>
                                                    <Link to="#" onClick={handleShow} className='edit-button'>
                                                        <i className="mdi mdi-pen text-info"></i>
                                                    </Link>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <span className='text-info text-center'>
                                Create a New Template
                            </span> 
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <label htmlFor="exampleFormControlSelect2">Template Name</label>
                            <div className="input-group">
                                <Form.Control type="text" className="form-control" placeholder="" aria-label="DefaultValue" aria-describedby="basic-addon1" />
                            </div>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={handleClose}>
                            Cancel
                        </button>
                        <button className="btn btn-info" onClick={handleClose}>
                            Save
                        </button>
                    </Modal.Footer>
                </Modal>
            </div> 

            
        )   
    }
  
export default Templates
