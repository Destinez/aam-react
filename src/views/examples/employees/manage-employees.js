import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import setAuthToken from '../validation/authAuthToken'
import Header from "components/Headers/Header.js";
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

const axios = require('axios').default;



function ManageEmployees() {
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
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1" xl="12">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Manage Employees</h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            size="sm"
                                        >
                                            Settings
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <div>
                                    <h6 className="heading-small text-muted mb-4">
                                        All Employees information
                                    </h6>
                                    <div className="">
                                        <MUIDataTable
                                            data={employees}
                                            columns={columns}
                                            options={options}
                                        />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>




            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    <div>
                        <span className='text-danger'>
                            This action cannot be reversed!
                        </span>
                    </div>
                </ModalHeader>
                <ModalBody>
                    Do you want to Delete user?
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
        </>

    )
}


export default ManageEmployees
