import React, { useEffect, useState } from 'react'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Select,
    Option,
    Row,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,

} from "reactstrap";
import { Link } from 'react-router-dom';
// import Modal from 'react-bootstrap/Modal';
import MUIDataTable from "mui-datatables";
import setAuthToken from '../validation/authAuthToken'
import { Text, Boolean, RadioBox, RadioGroup, Date, Number, CheckBoxGroup, File, TextField } from './InputFields/InputFields'
import Header from "components/Headers/Header.js";
const axios = require('axios').default;

function Fields() {
    const [fieldName, setFieldName] = useState("")
    const [fieldType, setFieldType] = useState("")
    const [defaultValue, setDefaultValue] = useState("")
    const [readOnly, setReadOnly] = useState("")

    const [field, setField] = useState([])

    const [message, setMessage] = useState("");
    const [errorClass, setErrorClass] = useState("");

    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    let handleFieldType = (e) => {
        setFieldType(e.target.value)

        const { name, value } = e.target;

    }

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

        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1" xl="12">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">New Field</h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Button
                                            color="primary"
                                            href="#"
                                            onClick={handleShow}
                                            size="sm"
                                        >
                                            Add Field
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>

                            <CardBody>

                                <h4 className="card-title">All fields</h4>
                                <div className='d-flex justify-content-center'>
                                    <div className='message-info'>
                                        <h6 className={errorClass}>

                                            {message}
                                        </h6>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Field Type</th>
                                                <th>Default</th>
                                                <th>Read-Only</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>File</td>
                                                <td>Text</td>
                                                <td>-</td>
                                                <td>
                                                    <input type="radio" checked readOnly></input>
                                                </td>
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

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>



            <Modal isOpen={showDelete} onExit={handleClose}>
                <ModalHeader closeButton>
                    <h4>
                        <span className='text-danger'>
                            This action cannot be reversed!
                        </span>
                    </h4>
                </ModalHeader>
                <ModalBody>
                    Do you want to Delete Field?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Cancel
                    </button>
                    <button className="btn btn-danger" onClick={handleClose}>
                        Delete
                    </button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={show} onExit={handleClose}>
                <ModalHeader closeButton>
                    <h4>
                        <span className='text-info'>
                            Add Field
                        </span>
                    </h4>
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        <label htmlFor="exampleFormControlSelect2">Name</label>
                        <div className="input-group">
                            <Input type="text" className="form-control" placeholder="Field Name" aria-label="Name" aria-describedby="basic-addon1" onChange={e => setFieldName(e.target.value)} />
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="exampleFormControlSelect2">Field Type</label>
                        <div className="input-group">
                            <select className="form-control" onChange={e => handleFieldType(e)}>
                                <option value="text">Text</option>
                                <option value="boolean">True/False</option>
                                <option value="number">Number</option>
                                <option value="date">Date</option>
                                <option value="textfield">TextField</option>
                                <option value="radio_group">RadioGroup</option>
                                <option value="check_box_group">CheckboxGroup</option>
                                <option value="radio_box">Radiobox</option>
                                <option value="file">File</option>
                            </select>
                        </div>
                    </FormGroup>

                    {fieldType === "text" && <Text />}
                    {fieldType === "boolean" && <Boolean />}
                    {fieldType === "number" && <Number />}
                    {fieldType === "date" && <Date />}
                    {fieldType === "textfield" && <TextField />}
                    {fieldType === "radio_group" && <RadioGroup />}
                    {fieldType === "radio_box" && <RadioBox />}
                    {fieldType === "file" && <File />}
                    {fieldType === "check_box_group" && <CheckBoxGroup />}


                </ModalBody>

                <ModalFooter>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Cancel
                    </button>
                    <button className="btn btn-success" onClick={handleClose}>
                        Update
                    </button>
                </ModalFooter>
            </Modal>
        </>

    )
}



export default Fields
