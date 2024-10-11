import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {fetchUserPlaylists, logout, setIsLoggedIn, setToken} from '@/redux/reducers/SpotifySlice';
import axios from 'axios';
import {Pause, Play, Loader} from 'lucide-react';

declare global {
    interface Window {
        onSpotifyWebPlaybackSDKReady: () => void;
        Spotify: any;
    }
}

interface Track {
    id: string;
    name: string;
    uri: string;
    artists: { name: string }[];
    album: {
        name: string;
        images: { url: string }[];
    };
}

interface Playlist {
    id: string;
    name: string;
    tracks: {
        href: string;
        total: number;
    };
}

const SpotifyMenu: React.FC = () => {
    const dispatch = useDispatch();
    const {token, isLoggedIn, userPlaylists} = useSelector((state: RootState) => state.spotify);

    const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);
    const [currentPlaylistTracks, setCurrentPlaylistTracks] = useState<Track[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
    const [player, setPlayer] = useState<Spotify.Player | null>(null);
    const [isPaused, setIsPaused] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [deviceId, setDeviceId] = useState<string | null>(null);
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const clientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = 'http://localhost:5173/callback';

    const scope = [
        "streaming",
        "user-read-email",
        "user-read-private",
        "user-library-read",
        "user-library-modify",
        "user-read-playback-state",
        "user-modify-playback-state"
    ];

    const initializePlayer = useCallback(() => {
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
            setIsPlayerReady(false);
        });

        player.addListener('player_state_changed', (state) => {
            if (!state) {
                setIsActive(false);
                return;
            }

            setPlayingTrackId(state.track_window.current_track.id);
            setIsPaused(state.paused);
            setIsActive(true);
        });

        player.connect();
    }, [token]);

    useEffect(() => {
        if (token) {
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;

            document.body.appendChild(script);

            window.onSpotifyWebPlaybackSDKReady = initializePlayer;
        }
    }, [token, initializePlayer]);

    useEffect(() => {
        const hash = window.location.hash
            .substring(1)
            .split('&')
            .reduce((initial: { [key: string]: string }, item) => {
                const parts = item.split('=');
                initial[parts[0]] = decodeURIComponent(parts[1]);
                return initial;
            }, {});

        if (hash.access_token) {
            dispatch(setToken(hash.access_token));
            dispatch(setIsLoggedIn(true));
            window.location.hash = '';
        }
    }, [dispatch]);

    useEffect(() => {
        if (isLoggedIn && token) {
            dispatch(fetchUserPlaylists());
        }
    }, [dispatch, isLoggedIn, token]);

    useEffect(() => {
        if (userPlaylists && userPlaylists.length > 0) {
            fetchPlaylistTracks(userPlaylists[currentPlaylistIndex].tracks.href);
        }
    }, [userPlaylists, currentPlaylistIndex, token]);

    const login = () => {
        const authUrl = new URL('https://accounts.spotify.com/authorize');

        authUrl.searchParams.append('client_id', clientId);
        authUrl.searchParams.append('response_type', 'token');
        authUrl.searchParams.append('redirect_uri', redirectUri);
        authUrl.searchParams.append('scope', scope.join(' '));
        authUrl.searchParams.append('show_dialog', 'true');

        window.location.href = authUrl.toString();
    };

    const fetchPlaylistTracks = async (tracksHref: string) => {
        if (!token) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(tracksHref, {
                headers: {'Authorization': `Bearer ${token}`}
            });
            setCurrentPlaylistTracks(response.data.items.map((item: any) => item.track));
        } catch (err) {
            console.error('Failed to fetch playlist tracks', err);
            setError('Failed to fetch playlist tracks. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const playTrack = async (trackUri: string, trackId: string) => {
        if (!isPlayerReady) {
            setError('Web Playback SDK is not ready. Please wait a moment and try again.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await axios({
                method: 'PUT',
                url: 'https://api.spotify.com/v1/me/player',
                headers: {'Authorization': `Bearer ${token}`},
                data: {
                    device_ids: [deviceId],
                    play: true,
                }
            });

            await axios({
                method: 'PUT',
                url: `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
                headers: {'Authorization': `Bearer ${token}`},
                data: {uris: [trackUri]}
            });

            setPlayingTrackId(trackId);
            setIsPaused(false);
            setIsActive(true);
        } catch (err: any) {
            console.error('Failed to play track', err);
            setError('Failed to play track. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const togglePlayPause = async () => {
        if (!isPlayerReady) {
            setError('Web Playback SDK is not ready. Please wait a moment and try again.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            if (isPaused) {
                await player?.resume();
            } else {
                await player?.pause();
            }
            setIsPaused(!isPaused);
        } catch (err) {
            console.error('Failed to toggle play/pause', err);
            setError('Failed to toggle play/pause. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="flex items-center justify-center">
                <button
                    onClick={login}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                    Login with Spotify
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 bg-gray-800 text-white rounded-xl flex flex-col h-[400px] max-w-3xl mx-auto">
            <div className="flex flex-1 gap-4 overflow-hidden">
                <div className="w-1/3 pr-2 overflow-y-auto custom-scrollbar">
                    <h3 className="text-xl font-semibold mb-2">Playlists</h3>
                    <ul>
                        {userPlaylists.map((playlist: Playlist, index: number) => (
                            <li
                                key={playlist.id}
                                className={`cursor-pointer p-2 rounded ${index === currentPlaylistIndex ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'}`}
                                onClick={() => setCurrentPlaylistIndex(index)}
                            >
                                {playlist.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-2/3 flex flex-col overflow-hidden">
                    <h3 className="text-xl font-semibold mb-2">{userPlaylists[currentPlaylistIndex]?.name}</h3>
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <Loader className="animate-spin" size={24}/>
                        </div>
                    ) : (
                        <ul className="flex-1 overflow-y-auto custom-scrollbar">
                            {currentPlaylistTracks.map((track: Track) => (
                                <li key={track.id} className="mb-2 flex items-center p-2 hover:bg-gray-700 rounded">
                                    <img
                                        src={track.album.images[2]?.url || '/path/to/default-album-art.jpg'}
                                        alt={`${track.album.name} cover`}
                                        className="w-12 h-12 mr-3 rounded"
                                    />
                                    <div className="flex-grow">
                                        <div className="font-semibold">{track.name}</div>
                                        <div className="text-sm text-gray-400">
                                            {track.artists.map(artist => artist.name).join(', ')}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => playTrack(track.uri, track.id)}
                                        className="ml-2 p-2 rounded-full bg-green-500 hover:bg-green-600"
                                        disabled={isLoading}
                                    >
                                        {isLoading && playingTrackId === track.id ? (
                                            <Loader className="animate-spin" size={20}/>
                                        ) : playingTrackId === track.id && !isPaused ? (
                                            <Pause size={20}/>
                                        ) : (
                                            <Play size={20}/>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            {isActive && (
                <div className="mt-4 p-3 bg-gray-700 rounded-lg flex items-center">
                    <div className="flex-grow">
                        <div className="font-semibold">Now Playing</div>
                        <div className="text-sm text-gray-400">
                            {currentPlaylistTracks.find(track => track.id === playingTrackId)?.name || 'No track selected'}
                        </div>
                    </div>
                    <button
                        onClick={togglePlayPause}
                        className="p-2 rounded-full bg-green-500 hover:bg-green-600"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader className="animate-spin" size={20}/>
                        ) : isPaused ? (
                            <Play size={20}/>
                        ) : (
                            <Pause size={20}/>
                        )}
                    </button>
                </div>
            )}
            {error && <p className="text-red-500 mt-2 p-2 bg-red-500/10 rounded">{error}</p>}
            <button
                onClick={() => dispatch(logout())}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>
        </div>
    );
};

export default SpotifyMenu;