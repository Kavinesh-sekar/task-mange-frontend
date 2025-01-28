import api from './axiosInstance';

const taskService = {
    async getTaskList(){
        const response = await api.get('/api/task/list');
        return response.data;
    },
    async addTask(task){
        const response = await api.post('/api/task/add', task);
        return response.data;
    },
    async updateTask(task){
        const response = await api.put('/api/task/update', task);
        return response.data;
    },
    async deleteTask(taskId){
        const response = await api.delete(`/api/task/delete/${taskId}`);
        return response.data;
    }
}   

export default taskService;
