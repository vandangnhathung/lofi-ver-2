import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {Loader, Music, Pause, Play} from 'lucide-react';
import {RootState} from "@/redux/store";
import {useSelector} from "react-redux";

interface Track {
    id: string;
    name: string;
    uri: string;
    artists: { name: string }[];
    album?: {
        name: string;
        images?: { url: string }[];
    };
}

interface Playlist {
    id: string;
    name: string;
    tracks: {
        items: { track: Track }[];
    };
}

declare global {
    interface Window {
        onSpotifyWebPlaybackSDKReady: () => void;
        Spotify: any;
    }
}

const SpotifyMenu: React.FC = () => {
    const [token, setToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
    const [isPaused, setIsPaused] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [player, setPlayer] = useState<any>(null);
    const [deviceId, setDeviceId] = useState<string | null>(null);
    const [isPlayerReady, setIsPlayerReady] = useState(false);

    const isOpenSpotify = useSelector((state: RootState) => state.spotify.isOpenSpotify);

    const playlistId = import.meta.env.VITE_PLAYLIST_ID || '37i9dQZF1DXcBWIGoYBM5M';

    const refreshAccessToken = useCallback(async () => {
        if (!refreshToken) return null;

        try {
            const response = await axios.get(`http://localhost:3002/refresh_token?refresh_token=${refreshToken}`);
            const newAccessToken = response.data.access_token;
            setToken(newAccessToken);
            localStorage.setItem('spotifyAccessToken', newAccessToken);
            return newAccessToken;
        } catch (err) {
            console.error('Failed to refresh token', err);
            setError('Failed to refresh access token. Please log in again.');
            setToken(null);
            setRefreshToken(null);
            localStorage.removeItem('spotifyAccessToken');
            localStorage.removeItem('spotifyRefreshToken');
            return null;
        }
    }, [refreshToken]);

    const initializePlayer = useCallback(() => {
        if (!token) return;

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => {
                    cb(token);
                },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({device_id}) => {
                console.log('Ready with Device ID', device_id);
                setDeviceId(device_id);
                setIsPlayerReady(true);
            });

            player.addListener('not_ready', ({device_id}) => {
                console.log('Device ID has gone offline', device_id);
                setDeviceId(null);
                setIsPlayerReady(false);
            });

            player.addListener('player_state_changed', (state) => {
                if (!state) {
                    return;
                }
                setPlayingTrackId(state.track_window.current_track.id);
                setIsPaused(state.paused);
            });

            player.connect();
        };
    }, [token]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('access_token');
        const refreshTokenParam = params.get('refresh_token');

        if (accessToken && refreshTokenParam) {
            setToken(accessToken);
            setRefreshToken(refreshTokenParam);
            localStorage.setItem('spotifyAccessToken', accessToken);
            localStorage.setItem('spotifyRefreshToken', refreshTokenParam);
            window.history.replaceState({}, document.title, window.location.pathname);
        } else {
            const storedToken = localStorage.getItem('spotifyAccessToken');
            const storedRefreshToken = localStorage.getItem('spotifyRefreshToken');
            if (storedToken && storedRefreshToken) {
                setToken(storedToken);
                setRefreshToken(storedRefreshToken);
            }
        }
    }, []);

    useEffect(() => {
        if (token) {
            initializePlayer();
            fetchPlaylist();
        }
    }, [token, initializePlayer]);

    const fetchPlaylist = async () => {
        if (!token) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
                headers: {'Authorization': `Bearer ${token}`}
            });
            setPlaylist(response.data);
        } catch (err) {
            console.error('Failed to fetch playlist', err);
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 401) {
                    const newToken = await refreshAccessToken();
                    if (newToken) {
                        return fetchPlaylist();
                    }
                } else if (err.response) {
                    setError(`Failed to fetch playlist: ${err.response.data.error?.message || 'Unknown error'}`);
                } else if (err.request) {
                    setError('No response received from Spotify. Please check your internet connection.');
                } else {
                    setError(`Error setting up request: ${err.message}`);
                }
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const playTrack = async (trackUri: string, trackId: string) => {
        if (!token || !player || !deviceId || !isPlayerReady) {
            console.error('Unable to play track: missing token, player, device ID, or player not ready');
            return;
        }

        try {
            await axios({
                method: 'PUT',
                url: `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({uris: [trackUri]})
            });

            setPlayingTrackId(trackId);
            setIsPaused(false);
        } catch (err) {
            console.error('Failed to play track', err);
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                const newToken = await refreshAccessToken();
                if (newToken) {
                    return playTrack(trackUri, trackId);
                }
            }
            setError('Failed to play track. Please try again.');
        }
    };

    const togglePlayPause = async () => {
        if (!player) return;

        try {
            await player.togglePlay();
            setIsPaused(!isPaused);
        } catch (err) {
            console.error('Failed to toggle play/pause', err);
            setError('Failed to toggle play/pause. Please try again.');
        }
    };

    if (isOpenSpotify && isLoading) {
        return (
            <div className="flex items-center justify-center pt-3">
                <Loader className="animate-spin" size={24}/>
            </div>
        );
    }

    if (!token) {
        return (
            <div className="flex items-center justify-center">
                <button
                    onClick={() => window.location.href = 'http://localhost:3002/login'}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Login with Spotify
                </button>
            </div>
        );
    }

    return (
        <div
            className={`${isOpenSpotify ? 'open-effect h-[242px] pb-[12px]' : 'close-effect h-0'} before:block before:w-full before:h-[12px] transition-all duration-700`}>
            <div
                className={`p-4 bg-gray-800 text-white rounded-xl max-w-3xl mx-auto h-full`}>
                <div className="  flex flex-col h-full">
                    {error ? (
                        <p className="text-red-500 p-2 bg-red-500/10 rounded">{error}</p>
                    ) : (
                        <>
                            <ul className="flex-1 overflow-y-auto custom-scroll-bar">
                                {playlist?.tracks.items.map(({track}) => (
                                    <li key={track.id} className="mb-2 flex items-center p-2 hover:bg-gray-700 rounded">
                                        {track.album && track.album.images && track.album.images.length > 0 ? (
                                            <img
                                                src={track.album.images[0].url}
                                                alt={`${track.album.name} cover`}
                                                className="w-12 h-12 mr-3 rounded object-cover"
                                            />
                                        ) : (
                                            <div
                                                className="w-12 h-12 mr-3 rounded bg-gray-600 flex items-center justify-center">
                                                <Music size={24}/>
                                            </div>
                                        )}
                                        <div className="flex-grow">
                                            <div className="font-semibold">{track.name}</div>
                                            <div className="text-sm text-gray-400">
                                                {track.artists.map(artist => artist.name).join(', ')}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => playTrack(track.uri, track.id)}
                                            className="ml-2 p-2 rounded-full bg-green-500 transition-all hover:bg-green-600"
                                            disabled={!isPlayerReady}
                                        >
                                            {playingTrackId === track.id && !isPaused ? (
                                                <Pause size={20}/>
                                            ) : (
                                                <Play size={20}/>
                                            )}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            {playingTrackId && (
                                <div className="mt-4 py-2 px-3 bg-gray-700 rounded-lg flex items-center">
                                    <div className="flex-grow">
                                        <div className="font-semibold">Now Playing</div>
                                        <div className="text-sm text-gray-400">
                                            {playlist?.tracks.items.find(item => item.track.id === playingTrackId)?.track.name || 'Unknown Track'}
                                        </div>
                                    </div>
                                    <button
                                        onClick={togglePlayPause}
                                        className="p-2 rounded-full bg-green-500 hover:bg-green-600"
                                        disabled={!isPlayerReady}
                                    >
                                        {isPaused ? <Play size={20}/> : <Pause size={20}/>}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SpotifyMenu;