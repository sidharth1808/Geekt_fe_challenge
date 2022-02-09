import React, { useEffect, useState } from 'react';
import axios from 'axios'
import EmployeeTable from "./EmployeeTable"
import "./Home.css"
import {BiSearchAlt} from 'react-icons/bi'

const Home = () =>{
  const[searchKey, setSearchKey] = useState("");
  const[employees,setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);


  const fetchEmployees = async() =>{
    try{
    const response = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
    .then((response => {
      
      setEmployees(response.data.map((row) => ({ ...row, isChecked: false })));
    })) 
    }catch(e){
      console.log(e);
    }
  }
 
  

  const handleCheck = (id) =>{
    
    let duplicateEmployees = [...employees];
    duplicateEmployees.forEach(employee=>{
      if(employee.id === id){
        employee.isChecked = !employee.isChecked;
      }
    })
    setEmployees(duplicateEmployees);
  }
  const handleEdit = (row) => {
    let duplicateEmployees = [...employees]
    duplicateEmployees = duplicateEmployees.map(employee => {
      if (employee.id === row.id) {
        return Object.assign(employee, row)
      }
      return employee;
    })
    setEmployees(duplicateEmployees)
  }

  const handleDelete = (id)=>{
    let duplicateEmployees = [...employees];
    duplicateEmployees = duplicateEmployees.filter(employee => employee.id !== id);
    setEmployees(duplicateEmployees);
  }
  const handleDeleteSelected =()=>{
   let duplicateEmployees = [...employees];
   duplicateEmployees = duplicateEmployees.filter(employee => !employee.isChecked);
   setEmployees(duplicateEmployees);
  }
  

  useEffect(()=>{
    fetchEmployees()
    
  },[]);

  useEffect(()=>{
     if(searchKey.length>0){
       setFilteredEmployees(employees.filter(employee=>{
         if(employee.name.toLowerCase().includes(searchKey.toLowerCase())
         || employee.email.toLowerCase().includes(searchKey.toLowerCase())
         || employee.role.toLowerCase().includes(searchKey.toLowerCase())
         ){
           return employee;
         }
       }))
     }else{
       setFilteredEmployees(employees);
     }
  },[searchKey,employees]);

return (
  <>
  <div className="container">
    <div className="search-box-container">
    <BiSearchAlt />
    <input className="search-box"
            name="search"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="Search by name, email or role" />
            
    </div> 
    <div>
    {filteredEmployees && <EmployeeTable
              employees={filteredEmployees}
              handleCheck={handleCheck}
              onDelete={handleDelete}
              onDeleteSelected={handleDeleteSelected}
              onEdit={handleEdit} 
              />}
    </div>
  </div>
  </>
);

};
export default Home;
