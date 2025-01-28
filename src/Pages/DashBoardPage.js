import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import styles from '../Styles/Dashboard.module.css';  // Create this CSS file
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { Button } from '@mui/material';

const paginationModel = { page: 0, pageSize: 5 };

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
    //   width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
    //   width: 160,
    //   valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

function DashBoardPage() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [taskList, setTaskList] = useState([]);



  const handleAddTask = () => {
    setEditData(null);
    setOpen(true);
  };

  const handleEditTask = (row) => {
    setEditData(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditData(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log('dddddddddd',formData);
    const formJson = Object.fromEntries(formData.entries());
    if(editData){

        
    }else{

        // console.log('Adding new task:', { ...editData, id: editData.id });
    }
  };

  const handleSearch = () => {
    console.log('Search');

  }

  const handleDeleteTask = (id) => {
    console.log('Deleting task with id:', id);
    // Add your delete logic here
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Task List</h2>
        <div className={styles.headerActions}>
          <div className={styles.searchContainer}>
            <input 
              type="text" 
              placeholder="Search by name..." 
              className={styles.searchInput}
            />
            <SearchIcon className={styles.searchIcon} />
          </div>
          <button className={styles.createButton} >
            <AddIcon className={styles.plusIcon} onClick={handleAddTask}  />
            Create
          </button>
        </div>
      </div>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.firstName}</td>
                <td>{row.lastName}</td>
                <td>{row.age}</td>
                <td>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleEditTask(row)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteTask(row.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>{editData ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={editData?.name || ''}
          />
          <TextField
            required
            margin="dense"
            name="description"
            label="Description"
            type="text"
            multiline
            rows={4}
            fullWidth
            variant="standard"
            defaultValue={editData?.description || ''}
          />
          <TextField
            required
            margin="dense"
            name="startDate"
            label="Start Date"
            type="date"
            fullWidth
            variant="standard"
            defaultValue={editData?.startDate || ''}
            />
          <TextField
            required
            margin="dense"
            name="endDate"
            label="End Date"
            type="date"
            fullWidth
            variant="standard"
            defaultValue={editData?.endDate || ''}
          />    
          <TextField
            required
            margin="dense"
            name="status"
            label="Status"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={editData?.status || ''}
          />    

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">{editData ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DashBoardPage;
