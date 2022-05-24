import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomId: null
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

    // by entering into a room we're gonna be dispatching an action
    // we're gonna take that action here and getting the roomId
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
    },
  },
});

export const { enterRoom } = appSlice.actions;

export const selectRoomId = (state) => state.app.roomId;

export default appSlice.reducer;