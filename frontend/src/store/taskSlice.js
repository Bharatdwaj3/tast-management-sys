import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  filterStatus: 'all', 
  filterPriority: 'all', 
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    setFilterPriority: (state, action) => {
      state.filterPriority = action.payload;
    },
    clearFilters: (state) => {
      state.filterStatus = 'all';
      state.filterPriority = 'all';
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setTasks,
  setFilterStatus,
  setFilterPriority,
  clearFilters,
  setLoading,
  setError,
  clearError,
} = taskSlice.actions;

export const selectAllTasks = (state) => state.task.tasks;

export const selectRecentTasks = (state, limit = 6) => {
  const tasks = state.task.tasks;
  return [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
};

export const selectTaskStats = createSelector(
  [selectAllTasks],
  (tasks) => ({
    totalTasks: tasks.length,
    todo: tasks.filter(t => t.status === 'Todo').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    done: tasks.filter(t => t.status === 'Done').length
  })
);

export const selectFilteredTasks = createSelector(
  [selectAllTasks, (state) => state.task.filterStatus, (state) => state.task.filterPriority],
  (tasks, filterStatus, filterPriority) => {
    return tasks.filter(task => {
      const statusMatch = filterStatus === 'all' || task.status === filterStatus;
      const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
      return statusMatch && priorityMatch;
    });
  }
);

export default taskSlice.reducer;