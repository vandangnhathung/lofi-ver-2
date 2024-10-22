import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

interface SpotifyState {
    token: string | null;
    isLoggedIn: boolean;
    userPlaylists: any[];
    currentTrack: any | null;
    isPlaying: boolean;
    error: string | null;
    isOpenSpotify: boolean,
}

const initialState: SpotifyState = {
    token: null,
    isLoggedIn: false,
    userPlaylists: [],
    currentTrack: null,
    isPlaying: false,
    error: null,
    isOpenSpotify: true,
};

export const fetchUserPlaylists = createAsyncThunk(
    'spotify/fetchUserPlaylists',
    async (_, {getState, rejectWithValue}) => {
        const {token} = (getState() as any).spotify;
        try {
            const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
                headers: {'Authorization': `Bearer ${token}`}
            });
            return response.data.items;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getCurrentPlayback = createAsyncThunk(
    'spotify/getCurrentPlayback',
    async (_, {getState, rejectWithValue}) => {
        const {token} = (getState() as any).spotify;
        try {
            const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
                headers: {'Authorization': `Bearer ${token}`}
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const spotifySlice = createSlice({
    name: 'spotify',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
        setIsPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.isLoggedIn = false;
            state.userPlaylists = [];
            state.currentTrack = null;
            state.isPlaying = false;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setOpenSpotify: (state) => {
            state.isOpenSpotify = !state.isOpenSpotify;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserPlaylists.fulfilled, (state, action) => {
                state.userPlaylists = action.payload;
            })
            .addCase(fetchUserPlaylists.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(getCurrentPlayback.fulfilled, (state, action) => {
                state.currentTrack = action.payload.item;
                state.isPlaying = action.payload.is_playing;
            })
            .addCase(getCurrentPlayback.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const {
    setToken,
    setIsLoggedIn,
    setIsPlaying,
    logout,
    setError,
    setOpenSpotify
} = spotifySlice.actions;

export default spotifySlice.reducer;