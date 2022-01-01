import React from "react";
import { TextField } from "@mui/material";
import { useParams} from "react-router-dom";
import { useState,useEffect } from "react";
import { FormGroup } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import { Button } from "@mui/material";
import { DatePicker } from "@mui/lab";
import { LocalizationProvider } from "@mui/lab";
import DateAdapter from '@mui/lab/AdapterMoment';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const EmployeeForm = ()=>{
    const { id } = useParams();
    const initialFormState = {firstName: '', lastName: '', isActive: false, dateOfBirth: null }
    const [employee, setEmployee] = useState(initialFormState)
    const navigate = useNavigate();
    //const [change, setChange] = useState(false)

    useEffect(() => {
        const getEmployee = async () => {
          const {data} = await axios(`http://localhost:8080/api/employee/${id}`)
          // Update state
          //setUser({user:[data.employee],loading: false})
          setEmployee({
              firstName: data.employee.first_name,
              lastName: data.employee.last_name,
              isActive: data.employee.is_active,
              dateOfBirth: data.employee.date_of_birth
          }) 
        }
    
        if(id) getEmployee()
    }, [])
    console.log(employee)
    const enableButton = employee.firstName && employee.lastName && employee.dateOfBirth;

    const handleChange = (event)=>{
        if(event && event.target){
            setEmployee({
                ...employee,
                [event.target.id]: event.target.hasOwnProperty('checked')? event.target.checked : event.target.value
            })
        }
        else{
            setEmployee({
                ...employee,
                dateOfBirth: event
            })
        }
        //setChange(employee.firstName && employee.lastName && employee.dateOfBirth)
    }


    const submitPost = async () => {
        await axios.post(`http://localhost:8080/api/employee`,employee)
    }

    const submitPut = async ()=>{
        await axios.put(`http://localhost:8080/api/employee/${id}`,employee)
    }


    return(
        <div>
            <TextField 
                required
                id = "firstName"
                label = "First Name"
                variant  = "outlined"
                value={employee.firstName}
                onChange = {handleChange}
            />
            <TextField 
                required
                id = "lastName"
                label = "LastName"
                variant = "outlined"
                value={employee.lastName}
                onChange={handleChange}
            />
            <FormGroup>
                <FormControlLabel 
                    control={
                        <Checkbox 
                            id="isActive"
                            checked={employee.isActive}
                            onChange={handleChange}
                        />} 
                    label="Active" 
                />
            </FormGroup>
            <LocalizationProvider dateAdapter ={DateAdapter}>
                <DatePicker
                    label= "DateTime picker"
                    value={employee.dateOfBirth}//? employee.dateOfBirth : "1993-02-16"}
                    onChange={handleChange}
                    maxDate={moment()}
                    inputFormat={"DD-MM-YYYY"}
                    mask={'__-__-____'}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <Button variant = "contained" 
                    size = "large" 
                    disabled = {!enableButton}
                    onClick={async (event) =>{
                        id? await submitPut() : await submitPost();
                        navigate('/employees');
                    }} 
            >{id ? 'UPDATE' : 'ADD EMPLOYEE'}</Button>
        </div>
    )
}

export default EmployeeForm;