import React from "react";
import { Button} from "@mui/material";
import { Link } from "react-router-dom";


export default function HomePage(){
    return(
         <div>
        <h1>ZYGOURIS CRUD PROJECT</h1>
        <Button component = {Link} variant = "contained" to = "/employees">VIEW EMPLOYEES</Button>
        </div>
    )  
}