import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import styles from '../Styles/Dashboard.module.css';  
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, MenuItem } from '@mui/material';
import { Button } from '@mui/material';
import taskService from '../services/API/taskAPI';



function DashBoardPage() {

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [taskList, setTaskList] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');

const datas = localStorage.getItem('user'); 
const idparsed = JSON.parse(datas);
const userId = idparsed._id;


useEffect(()=>{
  const fetchTaskList = async () => {
    try{
      const data = await taskService.getTaskList(userId);

      setTaskList(data);
      console.log('taskList',taskList);
    }catch(error){
      console.log('Error fetching task list:', error);
    }

  };
  fetchTaskList();
},[]);

console.log('taskListeeeeeeeeeeee',taskList.tasks);



  const handleAddTask = () => {
    setEditData(null);
    setOpen(true);
  };

  const handleEditTask = (row) => {
   
    const formattedTask = {
      ...row,
      startDate: row.startDate ? new Date(row.startDate).toISOString().split('T')[0] : '',
      endDate: row.endDate ? new Date(row.endDate).toISOString().split('T')[0] : ''
    };
    setEditData(formattedTask);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditData(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    
  
    if(editData){
  
        try{
            const updatedTaskListdata = await taskService.updateTask({ ...formJson, taskId: editData._id });
            const updatedTaskList = await taskService.getTaskList(userId);
            console.log('updatedTaskList',updatedTaskListdata);
            setOpen(false);
            setEditData(null);  
            setTaskList(updatedTaskList);
        }catch(error){
            console.log('Error updating task:', error);
        }
        
    }else{

      try{
       const data = await taskService.addTask({ ...formJson, userId }); 
       const updatedTaskList = await taskService.getTaskList(userId);
       console.log('updatedTaskList',updatedTaskList);
       console.log('post task data',data);
        setOpen(false);
        setEditData(null);  
        setTaskList(updatedTaskList);

      }catch(error){
        console.log('Error adding task:', error);
      }


    }
  };

  const handleSearch = (event) => {
    setStatusFilter(event.target.value);
  };
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/'; 
  };

  const filteredTasks = taskList.tasks?.filter(task => {
    if (statusFilter === 'all') return true;
    return task.status === statusFilter;
  });

  const handleDeleteTask = async (id) => {
    console.log('id',id._id);
    try{
      const data = await taskService.deleteTask(id._id);
      console.log('deleted task data',data);
      const updatedTaskList = await taskService.getTaskList(userId);
      console.log('updatedTaskList',updatedTaskList);
      setTaskList(updatedTaskList);
    }catch(error){
      console.log('Error deleting task:', error);
    }
    console.log('Deleting task with id:', id);
  
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Task List</h2>
        <div className={styles.headerActions}>
          <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button>
          <div className={styles.searchContainer}>
            <select 
              className={styles.searchInput}
              value={statusFilter}
              onChange={handleSearch}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button className={styles.createButton} onClick={handleAddTask}>
            <AddIcon className={styles.plusIcon}  />
            Create
          </button>
        </div>
      </div>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks?.map((row,index) => (
              <tr key={row.id}>
                <td>{index+1}</td>
                <td>{row.title}</td>
                <td>{row.description}</td>
                <td>{row.startDate.split('T')[0]}</td>
                <td>{row.endDate.split('T')[0]}</td>
                <td>{row.status}</td>
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
                    onClick={() => handleDeleteTask(row)}
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
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={editData?.title || ''}

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
            InputLabelProps={{
              shrink: true,
            }}
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
            InputLabelProps={{
              shrink: true,
            }}
          />    
          <TextField
            required
            select
            margin="dense"
            name="status"
            label="Status"
            fullWidth
            variant="standard"
            defaultValue={editData?.status || 'pending'}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>    

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
