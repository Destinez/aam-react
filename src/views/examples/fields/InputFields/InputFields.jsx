import { React, useState } from 'react';
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

export function Text() {

    const [readOnly, setReadOnly] = useState("")
    const [defaultValue, setDefaultValue] = useState("")

    return (
        <div>
            <FormGroup>
                <label htmlFor="exampleFormControlSelect2">Default Value</label>
                <div className="input-group">
                    <Input type="text" className="form-control" placeholder="Default Value" aria-label="DefaultValue" aria-describedby="basic-addon1" onChange={e => setDefaultValue(e.target.value)} />
                </div>
            </FormGroup>
            <FormGroup className='ml-3'>
                
                <div className="input-group">
                <label htmlFor="exampleFormControlSelect2">Read Only</label>
                    <Input type="checkbox" onChange={e => setReadOnly(e.target.value)} />
                </div>
            </FormGroup>
        </div>
    )
}


export function TextField() {

    const [readOnly, setReadOnly] = useState("")
    const [defaultValue, setDefaultValue] = useState("")

    return (
        <div>
            <FormGroup>
                <label htmlFor="exampleFormControlSelect2">Default Value</label>
                <div className="input-group">
                    <textarea type="text" className="form-control" placeholder="Default Value" aria-label="DefaultValue" aria-describedby="basic-addon1" onChange={e => setDefaultValue(e.target.value)} ></textarea>
                </div>
            </FormGroup>
            <FormGroup className='ml-3'>
                
                <div className="input-group">
                <label htmlFor="exampleFormControlSelect2">Read Only</label>
                    <Input type="checkbox" onChange={e => setReadOnly(e.target.value)} />
                </div>
            </FormGroup>
        </div>

    )
}

export function Boolean() {

    const [readOnly, setReadOnly] = useState("")
    const [defaultValue, setDefaultValue] = useState("")

    return (
        <div>
            <FormGroup className='ml-3'>
                
                <div className="input-group">
                <label htmlFor="exampleFormControlSelect2">Read Only</label>
                    <Input type="checkbox" onChange={e => setReadOnly(e.target.value)} />
                </div>
            </FormGroup>
        </div>

    )
}
export function Number() {

    const [readOnly, setReadOnly] = useState("")
    const [defaultValue, setDefaultValue] = useState("")

    return (
        <div>
            <FormGroup>
                <label htmlFor="exampleFormControlSelect2">Default Value</label>
                <div className="input-group">
                    <textarea type="text" className="form-control" placeholder="Default Value" aria-label="DefaultValue" aria-describedby="basic-addon1" onChange={e => setDefaultValue(e.target.value)} ></textarea>
                </div>
            </FormGroup>
            <FormGroup className='ml-3'>
                <div className="input-group">
                    <Input type="radio" name="fieldTypeNumber" onChange={e => setReadOnly(e.target.value)} />No Restrictions
                </div>
                <div className="input-group">
                    <Input type="radio" name="fieldTypeNumber" onChange={e => setReadOnly(e.target.value)} />Only Positive Numbers
                </div>
                <div className="input-group">
                    <Input type="radio" name="fieldTypeNumber" onChange={e => setReadOnly(e.target.value)} />Only Negative Numbers
                </div>
            </FormGroup>
            <FormGroup className='ml-3'>

                <div className="input-group">
                    <label htmlFor="exampleFormControlSelect2">Read Only</label>
                    <Input type="checkbox" onChange={e => setReadOnly(e.target.value)} />
                </div>
            </FormGroup>
        </div>

    )
}
export function Date() {

    const [readOnly, setReadOnly] = useState("")
    const [defaultValue, setDefaultValue] = useState("")

    const handleFieldType = (e) => {
        return true
    }

    return (
        <div>
            <FormGroup>
                <label htmlFor="exampleFormControlSelect2">Default Value</label>
                <div className="input-group">
                    <textarea type="text" className="form-control" placeholder="Default Value" aria-label="DefaultValue" aria-describedby="basic-addon1" onChange={e => setDefaultValue(e.target.value)} ></textarea>
                </div>
            </FormGroup>
            <FormGroup>
                <label htmlFor="exampleFormControlSelect2">Format</label>
                <div className="input-group">
                    <select className="form-control" onChange={e => handleFieldType(e)}>
                        <option value="dd/mm/yyyy">dd/mm/yyyy</option>
                        <option value="mm/dd/yyyy">mm/dd/yyyy</option>
                        <option value="yyyy/mm/dd">yyyy/mm/dd</option>
                    </select>
                </div>
            </FormGroup>
            <FormGroup className='ml-3'>
                
                <div className="input-group">
                <label htmlFor="exampleFormControlSelect2">Read Only</label>
                    <Input type="checkbox" onChange={e => setReadOnly(e.target.value)} />
                </div>
            </FormGroup>
        </div>

    )
}
export function RadioGroup() {

    const [readOnly, setReadOnly] = useState("")
    const [defaultValue, setDefaultValue] = useState("")

    return (
        <div>
            <FormGroup>
                <label htmlFor="exampleFormControlSelect2">Default Value</label>
                <div className="input-group">
                    <textarea type="text" className="form-control" placeholder="Default Value" aria-label="DefaultValue" aria-describedby="basic-addon1" onChange={e => setDefaultValue(e.target.value)} ></textarea>
                </div>
            </FormGroup>
            <FormGroup className='ml-3'>
                
                <div className="input-group">
                <label htmlFor="exampleFormControlSelect2">Read Only</label>
                    <Input type="checkbox" onChange={e => setReadOnly(e.target.value)} />
                </div>
            </FormGroup>
        </div>

    )
}
export function CheckBoxGroup() {

    const [readOnly, setReadOnly] = useState("")
    const [defaultValue, setDefaultValue] = useState("")

    return (
        <div>
            <FormGroup>
                <label htmlFor="exampleFormControlSelect2">Default Value</label>
                <div className="input-group">
                    <textarea type="text" className="form-control" placeholder="Default Value" aria-label="DefaultValue" aria-describedby="basic-addon1" onChange={e => setDefaultValue(e.target.value)} ></textarea>
                </div>
            </FormGroup>
            <FormGroup className='ml-3'>
                
                <div className="input-group">
                <label htmlFor="exampleFormControlSelect2">Read Only</label>
                    <Input type="checkbox" onChange={e => setReadOnly(e.target.value)} />
                </div>
            </FormGroup>
        </div>

    )
}
export function RadioBox() {

    const [readOnly, setReadOnly] = useState("")
    const [defaultValue, setDefaultValue] = useState("")

    return (
        <div>
            <FormGroup>
                <label htmlFor="exampleFormControlSelect2">Default Value</label>
                <div className="input-group">
                    <textarea type="text" className="form-control" placeholder="Default Value" aria-label="DefaultValue" aria-describedby="basic-addon1" onChange={e => setDefaultValue(e.target.value)} ></textarea>
                </div>
            </FormGroup>
            <FormGroup className='ml-3'>
                
                <div className="input-group">
                <label htmlFor="exampleFormControlSelect2">Read Only</label>
                    <Input type="checkbox" onChange={e => setReadOnly(e.target.value)} />
                </div>
            </FormGroup>
        </div>

    )
}
export function File() {

    const [readOnly, setReadOnly] = useState("")
    const [defaultValue, setDefaultValue] = useState("")

    return (
        <div>
            <FormGroup>
                <label htmlFor="exampleFormControlSelect2">Default Value</label>
                <div className="input-group">
                    <textarea type="text" className="form-control" placeholder="Default Value" aria-label="DefaultValue" aria-describedby="basic-addon1" onChange={e => setDefaultValue(e.target.value)} ></textarea>
                </div>
            </FormGroup>
            <FormGroup className='ml-3'>
                
                <div className="input-group">
                <label htmlFor="exampleFormControlSelect2">Read Only</label>
                    <Input type="checkbox" onChange={e => setReadOnly(e.target.value)} />
                </div>
            </FormGroup>
        </div>

    )
}


