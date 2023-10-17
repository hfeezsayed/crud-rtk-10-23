import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Create action
export const createUser = createAsyncThunk(
  "createdUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://643fd7a6b9e6d064be0047a9.mockapi.io/CRUD-10-23",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//Read action
export const showUser = createAsyncThunk(
  "showUser",
  async (args, { rejectWithValue }) => {
    const response = await fetch(
      "https://643fd7a6b9e6d064be0047a9.mockapi.io/CRUD-10-23"
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//Update action
export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    console.log("UpdatedData", data);
    const response = await fetch(
      `https://643fd7a6b9e6d064be0047a9.mockapi.io/CRUD-10-23/${data.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//Delete action
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://643fd7a6b9e6d064be0047a9.mockapi.io/CRUD-10-23/${id}`,
      {
        method: "DELETE",
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData: [],
  },

  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
  },

  extraReducers: {
    [createUser.pending]: (state) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [showUser.pending]: (state) => {
      state.loading = true;
    },
    [showUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [showUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.users = state.users.filter((user) => user.id !== id);
      }
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default userDetail.reducer;

export const { searchUser } = userDetail.actions;
