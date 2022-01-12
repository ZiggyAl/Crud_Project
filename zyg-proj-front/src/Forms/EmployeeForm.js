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
import { LoadingButton } from "@mui/lab";


const EmployeeForm = ()=>{
    const { id } = useParams();
    const initialFormState = {firstName: '', lastName: '', isActive: false, dateOfBirth: null }
    const [employee, setEmployee] = useState(initialFormState)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        const getEmployee = async () => {
          const {data} = await axios(`http://localhost:8080/api/employee/${id}`)
          // Update state
          setEmployee({
              firstName: data.employee.first_name,
              lastName: data.employee.last_name,
              isActive: data.employee.is_active,
              dateOfBirth: moment(data.employee.date_of_birth).format("YYYY-MM-DD")
          }) 
        }
    
        if(id) getEmployee()
    }, [])
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
                dateOfBirth: event.format("YYYY-MM-DD")
            })
        }
    }


    const submitPost = async () => {
        await axios.post(`http://localhost:8080/api/employee`,employee)
    }

    const submitPut = async ()=>{
        await axios.put(`http://localhost:8080/api/employee/${id}`,employee)
    }


    return loading ? (
        <div>loading..</div>
    ):(
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
                    value={employee.dateOfBirth}
                    onChange={handleChange}
                    maxDate={moment()}
                    inputFormat={"DD-MM-YYYY"}
                    mask={'__-__-____'}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <LoadingButton 
                    variant = "contained" 
                    size = "large" 
                    disabled = {!enableButton}
                    loading = {loading}
                    onClick={async (event) =>{
                        setLoading(true)
                        id? await submitPut() : await submitPost();
                        navigate('/employees');
                    }} 
            >{id ? 'UPDATE' : 'ADD EMPLOYEE'}</LoadingButton>
        </div>
    )
}

export default EmployeeForm;