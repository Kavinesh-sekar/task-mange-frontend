import api from './axiosInstance';

const taskService = {
    async getTaskList(userId){
        try{    
            console.log('userId',userId);

            const response = await api.get(`/api/task/get/${userId}`);
            console.log('response',response);
            return response.data;

        }catch(error){
            throw error;
        }

    },

    async addTask(task){
        try{
            const response = await api.post('/api/task/create', task);
            return response.data;
        }catch(error){
            throw error;
        }
    },

    async updateTask(task){
        try{
            console.log('task',task);
            const response = await api.put('/api/task/update', task);
            return response.data;
        }catch(error){
            throw error;
        }
    },
    async deleteTask(taskId){
        try{
            const response = await api.delete(`/api/task/delete/${taskId}`);
            return response.data;
        }catch(error){
            throw error;
        }
    }
}   

export default taskService;
