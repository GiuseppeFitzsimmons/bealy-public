import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postToServer } from './serverCalls';
//import { saveAsync as saveBrand, loadBrandsAsync, createBrand } from './brandSlice'
import { logout } from './globalSlice'

const initialState = {
  tokens: undefined,
  status: 'idle',
  error:undefined,
  actionQueue:[],
  currentUser:undefined
};

export const registerAsync = createAsyncThunk(
  'login/register',
  async (user) => {
    console.log("login registerAsync user ", user);
    const response = await postToServer({
      resource:'user',
      params:{password: user.password, id: user.id}
    });
    console.log("login registerAsync response", response);
    return response;
  }
);
export const userAsync = createAsyncThunk(
    'login/user',
    async (user) => {
      console.log("login userAsync user ", user);
      const response = await postToServer({
        resource:'user',
        params:{email: user.email, brand: user.brand}
      });
      console.log("login userAsync response", response);
      // The value we return becomes the `fulfilled` action payload
      return response;
    }
  );
export const loginAsync = createAsyncThunk(
  'login/token',
  async (credentials) => {
    console.log("login loginSync user ", credentials);
    credentials.grant_type='password';
    const response = await postToServer({
      resource:'token',
      params:credentials
    });
    console.log("login loginAsync response", response);
    return response;
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userAsync.fulfilled, (state, action) => {
        if (state.error) delete state.error;
        state.status = 'idle';
        if (action.payload.responseCode<202 && action.payload.responseCode!==0) {
          let newUser= {id:action.payload.id, password: action.payload.password}
          state.newUser = newUser;
        } else {
          state.error = action.payload;
        }
      })
      .addCase(registerAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        if (state.error) delete state.error;
        state.status = 'idle';
        if (action.payload.responseCode<202) {
          let tokens= {access_token:action.payload.access_token, refreshToken: action.payload.refresh_token}
          if (tokens.access_token){
            localStorage.setItem('access_token', tokens.access_token);
            state.tokens = tokens;
          } else {
              state.error = action.payload
          };
        } else {
          state.error = action.payload;
        }
      })
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        console.log('action', action)
        if (state.error) delete state.error;
        state.status = 'idle';
        if (action.payload.responseCode<202 && action.payload.responseCode!==0) {
          let tokens={access_token:action.payload.access_token, refreshToken: action.payload.refresh_token};
          localStorage.setItem('access_token',tokens.access_token);
          state.tokens = tokens;
          state.currentUser = action.meta.arg.id
        } else {
          state.error = action.payload;
        }
      }).addCase(logout, (state, action) => {
        localStorage.clear();
        delete state.tokens;
      });
  },
});

export default loginSlice.reducer;
