import React, { Component, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import MUIDataTable from "mui-datatables";
import setAuthToken from '../validation/authAuthToken'
import ProgressBar from './components/ProgressBar';
import AssignFieldsToSlot  from './views/AssignFieldsToSlot'
import Slots  from './views/Slots'
import Templates  from './views/Templates'
const axios = require('axios').default;

function ManageTemplates(){

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
            <ProgressBar />
            
        </div>
     
        )   
    }
  
export default ManageTemplates
