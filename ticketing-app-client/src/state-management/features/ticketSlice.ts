import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { ITicket } from '../../types/types'

export const tickets: ITicket[] = [];
export const ticketRecord: ITicket = {
    id: "",
    name: "",
    subject: "",
    assignedTo: "",
    priority: "",
    status: "",
    createDate: "",
    dueDate: "",
}


const initialState = {
  tickets: [],
  ticketRecord,
  status: "idle",
};

export const getAllTickets = createAsyncThunk('tickets/index', async () => {
  const response = await axios.get(`/tickets`);
  return await response.data; 
})

export const getTicketById = createAsyncThunk('tickets/id', async (id: string, { rejectWithValue }) => {
    try{
      const response = await axios.get(`/tickets/${id}`)
      return await response.data; 
    }catch (err:any){
      return rejectWithValue(err.response.data) 
    }
})

export const store = createAsyncThunk('tickets/store', async (values: any, { rejectWithValue }) => {       
    try {
      const storeResponse = await axios.post(`/tickets/create`, values);
    return await storeResponse.data;  
    }catch (err:any){
      return rejectWithValue(err.response.data) 
    }  
})



export const update = createAsyncThunk('tickets/update', async (values: any, { rejectWithValue } ) => {  
    try { 
      const storeResponse = await axios.patch(`/tickets/${values.id}`, values);
      return await storeResponse.data; 
    }catch (err:any){
      return rejectWithValue(err.response.data) 
    }     
})
export const destroy = createAsyncThunk('tickets/destroy', async (id: any ) => {  
  await axios.delete(`/tickets/${id}`);
  return id;     
})
  

// export const deleteExistingTicket = createAsyncThunk('tickets/deleteExistingTicket', async (id: string) => {
//   await ticketService.deleteTicket(id);
//   return id;
// });

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTickets.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getAllTickets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tickets = action.payload;
      })
      .addCase(getAllTickets.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(store.pending, (state) => {
        state.status = "pending";
      })
      .addCase(store.fulfilled, (state, action) => {
        if(action.payload.hasOwnProperty('success') && action.payload.success === true  ){
            state.status = 'idle'; 
          }else {
            state.status = 'failed';
        }
      })
        .addCase(store.rejected, (state) => {
        state.status = "failed";
        })
        .addCase(getTicketById.pending, (state) => {
        state.status = 'pending'})
        .addCase(getTicketById.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.ticketRecord = action.payload;
        })
        .addCase(getTicketById.rejected, (state, action) => {
            state.status = 'failed';
            state.ticketRecord = ticketRecord;
        })
        .addCase(update.pending, (state) => {
        state.status = 'pending'
            }).addCase(update.fulfilled, (state, action) => {
            state.status = 'idle';
            state.ticketRecord = action.payload;
        })
        .addCase(update.rejected, (state) => {
            state.status = 'failed';
        })
        .addCase(destroy.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(destroy.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.tickets = action.payload;
        })
        .addCase(destroy.rejected, (state, action) => {
            state.status = 'failed';
        });
  },
});

export const selectAllTickets = (state: RootState) => state.tickets.tickets;
export const selectTicketRecord = (state: RootState) => state.tickets.ticketRecord
export const selectTicketStatus = (state: RootState) => state.tickets.status;


export default ticketsSlice.reducer; 