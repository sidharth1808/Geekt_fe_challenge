import React, { useEffect, useState } from 'react'
import "./EmployeeDetails.css";


const EmployeeDetails = ({row,handleCheck,onDelete,onEdit,onEditClick,flag}) =>{
  const orgValue = {...row};
  const [editMode, setEditMode] = useState(false);
  const [newValues, setNewValues] = useState(orgValue);


 const  onCheck = () =>{
   handleCheck(row.id);
   
 }
 const handleEdit = (e) =>{
   if(editMode){
    const name = e.target.name;
    const value = e.target.value;
     setNewValues({...newValues,[name]:value});
   }
 }
 const handleSave = () =>{
   onEdit(newValues);
   setEditMode(false);
   onEditClick(null);
 }
 const handleCancel =() =>{
   setNewValues(orgValue);
   setEditMode(false);
   onEditClick(null);
 }
 const handleEditClick =()=>{
   onEditClick(row.id);
 }
 const handleDelete = ()=>{
   onDelete(row.id);
 }

 useEffect(() => {
    flag === row.id ? setEditMode(true) : setEditMode(false);
  }, [flag, row.id])
 return(
   <>
   <tr className={row.isChecked ? "checked" : ""}>
     <td><input type="checkbox" onChange={onCheck} checked={row.isChecked ? "checked" : ""} /></td>
     <td>
        <div className="employee-row">
          <input className={`data${row.isChecked ? " checked" : ""}${editMode ? " editable" : " normal"}`}
            name="name"
            value={newValues.name}
            onChange={handleEdit} />
        </div>
      </td>
      <td>
        <div className="employee-row">
          <input className={`data${row.isChecked ? " checked" : ""}${editMode ? " editable" : " normal"}`}
            name="email"
            value={newValues.email}
            onChange={handleEdit} />
        </div>
      </td>
      <td>
        <div className="employee-row">
          <input className={`data${row.isChecked ? " checked" : ""}${editMode ? " editable" : " normal"}`}
            name="role"
            value={newValues.role}
            onChange={handleEdit} />
        </div>
      </td>
      <td>
        <div className="actions">
          {editMode ?
            <>
              <span className="icon" onClick={handleSave} >
                Save
              </span>
              <span className="icon" onClick={handleCancel} >
                Close
              </span>
            </>
            : <>
              <span className="icon" onClick={handleEditClick} >
                Edit
              </span>
              <span className="icon" onClick={handleDelete} >
                Delete
              </span>
            </>}
        </div>
      </td>
   </tr>
   </>
 );
}
export default EmployeeDetails;