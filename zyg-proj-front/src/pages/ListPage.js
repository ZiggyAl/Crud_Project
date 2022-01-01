import React from "react"
import { DataGrid } from "@mui/x-data-grid"
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment";

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'first_name', headerName: 'First name', flex:1 },
    { field: 'last_name', headerName: 'Last name', flex:1},
    { field: 'is_active', headerName:'Active', type: 'boolean', flex:1},
    { field: 'date_of_birth', headerName:'Birth Date', flex:1},
  ];



export default function ListPage() {

    const initialListState = {
        employees: [],
        loading: true,
      }

    const [employees, setEmployees] = useState(initialListState)
    
  
    
    useEffect(() => {
        const getEmployees = async () => {
          const { data } = await axios(`http://localhost:8080/api/employee`)
          // Update state
          //setUser({user:[data.employee],loading: false})
          setEmployees({employees:data.employees, loading:false}) 
        }
    
        // Invoke the async function
        getEmployees()
      }, []) 


    const deleteEmployee = async (id) => {
      await axios.delete(`http://localhost:8080/api/employee/${id}`)
      setEmployees({employees:employees.employees.filter((employees) => employees.id!==id), loading:false})
    } 
    
    

    const [selectionModel, setSelectionModel] = useState([]);
   
    return employees.loading ? (
        <div>loading..</div>
    ) : (
        <div style={{ height: 400, width:'100%' }}>
      <DataGrid
        rows={employees.employees.map((employee) => ({ ...employee, date_of_birth: moment(employee.date_of_birth, 'YYYY-MM-DD').format('DD-MM-YYYY')})  )}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}      
      />
      <Stack spacing={3} direction="row"> 
        <Button variant = "contained" component = {Link} to="/add-employee">Add Employee</Button>
        <Button variant = "contained" disabled={selectionModel.length!==1} component = {Link} to={{pathname : `/edit-employee/${selectionModel[0]}`}}>Edit</Button>
        <Button variant = "contained" disabled={!selectionModel.length} onClick={() => deleteEmployee(selectionModel[0])}>Delete</Button>                                                                                      
      </Stack>  
    </div>
    )

   
}