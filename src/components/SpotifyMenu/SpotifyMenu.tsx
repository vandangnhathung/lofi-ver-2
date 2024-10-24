import React, {useCallback, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {Loader, Music, Pause, Play} from 'lucide-react';
import {RootState} from "@/redux/store";
import {useDispatch, useSelector} from "react-redux";
import {setIsPlaying} from "@/redux/reducers/SpotifySlice";
import TrackProgressBar from "@/components/ControlBar/kits/TrackProgressBar";

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

interface SpotifySDK {
    Player: new (options: SpotifyPlayerOptions) => SpotifyPlayer;
}

interface SpotifyPlayerOptions {
    name: string;
    getOAuthToken: (cb: (token: string) => void) => void;
    volume: number;
}

interface SpotifyPlayer {
    addListener: (eventName: string, callback: (state: any) => void) => void;
    connect: () => Promise<boolean>;
    togglePlay: () => Promise<void>;
    seek: (positionMs: number) => Promise<void>;
}

declare global {
    interface Window {
        onSpotifyWebPlaybackSDKReady: () => void;
        Spotify: SpotifySDK;
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
    const [player, setPlayer] = useState<SpotifyPlayer | null>(null);
    const [deviceId, setDeviceId] = useState<string | null>(null);
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
    const [trackDuration, setTrackDuration] = useState<number>(0);
    const [trackPosition, setTrackPosition] = useState<number>(0);

    const playerStateRef = useRef<any>(null);
    const lastUpdateTimeRef = useRef<number>(Date.now());

    const isOpenSpotify = useSelector((state: RootState) => state.spotify.isOpenSpotify);
    const dispatch = useDispatch();

    const playlistId = import.meta.env.VITE_PLAYLIST_ID || '37i9dQZF1DXcBWIGoYBM5M';

    const refreshAccessToken = useCallback(async () => {
        if (!refreshToken) return null;

        try {
            const response = await axios.get<{
                access_token: string
            }>(`http://localhost:3002/refresh_token?refresh_token=${refreshToken}`);
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

            player.addListener('ready', ({device_id}: { device_id: string }) => {
                console.log('Ready with Device ID', device_id);
                setDeviceId(device_id);
                setIsPlayerReady(true);
            });

            player.addListener('not_ready', ({device_id}: { device_id: string }) => {
                console.log('Device ID has gone offline', device_id);
                setDeviceId(null);
                setIsPlayerReady(false);
            });

            player.addListener('player_state_changed', (state: any) => {
                if (!state) {
                    console.log('Received empty state, ignoring...');
                    return;
                }

                playerStateRef.current = state;
                lastUpdateTimeRef.current = Date.now();

                // Check if the current track exists before accessing its properties
                if (state.track_window?.current_track) {
                    setPlayingTrackId(state.track_window.current_track.id);
                } else {
                    console.log('No current track in player state');
                    setPlayingTrackId(null);
                }

                setIsPaused(state.paused);
                dispatch(setIsPlaying(!state.paused));
                setTrackDuration(state.duration || 0);
                setTrackPosition(state.position || 0);

                // Check if the track has ended
                if (state.position === 0 && state.paused) {
                    console.log("Track has ended")
                    playNextTrack();
                }
            });

            player.connect();
        };
    }, [token, dispatch]);

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
            const response = await axios.get<Playlist>(`https://api.spotify.com/v1/playlists/${playlistId}`, {
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

    const playNextTrack = useCallback(async () => {
        console.log("work", playlist, token, deviceId, currentTrackIndex);
        if (!playlist || !playlist.tracks.items.length || !token || !deviceId) return;

        console.log("passed")

        const nextIndex = (currentTrackIndex + 1) % playlist.tracks.items.length;
        const nextTrack = playlist.tracks.items[nextIndex].track;

        console.log("Playing next track:", nextTrack.name);

        try {
            await axios({
                method: 'PUT',
                url: `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({uris: [nextTrack.uri]})
            });

            setPlayingTrackId(nextTrack.id);
            setIsPaused(false);
            setCurrentTrackIndex(nextIndex);
            dispatch(setIsPlaying(true));
        } catch (err) {
            console.error('Failed to play next track', err);
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                const newToken = await refreshAccessToken();
                if (newToken) {
                    setToken(newToken);
                    return playNextTrack();
                }
            }
            setError('Failed to play next track. Please try again.');
        }
    }, [currentTrackIndex, playlist, token, deviceId, dispatch, refreshAccessToken]);

    const playTrack = async (trackUri: string, trackId: string) => {
        if (!token || !deviceId || !isPlayerReady) {
            console.error('Unable to play track: missing token, device ID, or player not ready');
            return;
        }

        try {
            if (playingTrackId === trackId && !isPaused) {
                await axios({
                    method: 'PUT',
                    url: `https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                setPlayingTrackId("");
                setIsPaused(true);
                dispatch(setIsPlaying(false));
            } else {
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
                dispatch(setIsPlaying(true));
                setCurrentTrackIndex(playlist?.tracks.items.findIndex(item => item.track.id === trackId) ?? 0);
            }
        } catch (err) {
            console.error('Failed to play/pause track', err);
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                const newToken = await refreshAccessToken();
                if (newToken) {
                    setToken(newToken);
                    return playTrack(trackUri, trackId);
                }
            }
            setError('Failed to play/pause track. Please try again.');
        }
    }
    const togglePlayPause = async () => {
        if (!player) return;

        try {
            await player.togglePlay();
            setIsPaused(!isPaused);
            dispatch(setIsPlaying(isPaused));
        } catch (err) {
            console.error('Failed to toggle play/pause', err);
            setError('Failed to toggle play/pause. Please try again.');
        }
    };

    const handleSeek = async (position: number) => {
        if (!player) return;

        try {
            await player.seek(position);
            setTrackPosition(position);
            lastUpdateTimeRef.current = Date.now();
        } catch (err) {
            console.error('Failed to seek', err);
            setError('Failed to seek. Please try again.');
        }
    };

    useEffect(() => {
        const updatePosition = () => {
            if (playerStateRef.current && !playerStateRef.current.paused) {
                const now = Date.now();
                const timePassed = now - lastUpdateTimeRef.current;
                const newPosition = Math.min(
                    playerStateRef.current.position + timePassed,
                    playerStateRef.current.duration
                );
                setTrackPosition(newPosition);
            }
            requestAnimationFrame(updatePosition);
        };

        const animationId = requestAnimationFrame(updatePosition);

        return () => cancelAnimationFrame(animationId);
    }, []);

    useEffect(() => {
        const updateInterval = setInterval(() => {
            if (playerStateRef.current && !playerStateRef.current.paused) {
                const now = Date.now();
                const timePassed = now - playerStateRef.current.timestamp;
                const newPosition = Math.min(playerStateRef.current.position + timePassed, playerStateRef.current.duration);
                setTrackPosition(newPosition);
            }
        }, 1000);

        return () => clearInterval(updateInterval);
    }, []);

    if (isLoading) {
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
                <div className="flex flex-col h-full">
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
                                <div className="mt-4 py-2 px-3 bg-gray-700 rounded-lg">
                                    <div className="flex items-center mb-2">
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
                                    <TrackProgressBar
                                        duration={trackDuration}
                                        position={trackPosition}
                                        isPlaying={!isPaused}
                                        onSeek={handleSeek}
                                    />
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
