import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';

interface Track {
    id: string;
    name: string;
    uri: string;
    album: {
        images: { url: string }[];
    };
    artists: { name: string }[];
}

interface SpotifyMusicListProps {
    tracks: Track[];
    onTrackSelect: (trackUri: string) => void;
}

const SpotifyMusicList: React.FC<SpotifyMusicListProps> = ({tracks, onTrackSelect}) => {
    const {currentTrack} = useSelector((state: RootState) => state.spotify);

    if (!tracks || tracks.length === 0) {
        return <div>No tracks available</div>;
    }

    return (
        <div className="spotify-music-list">
            <ul className="track-list">
                {tracks.map((track: Track) => (
                    <li
                        key={track.id}
                        className={`track-item ${currentTrack?.id === track.id ? 'current-track' : ''}`}
                        onClick={() => onTrackSelect(track.uri)}
                    >
                        <img
                            src={track.album.images[2]?.url || '/path/to/default-album-art.jpg'}
                            alt={`${track.name} cover`}
                            className="track-image"
                        />
                        <div className="track-info">
                            <span className="track-name">{track.name}</span>
                            <span className="track-artist">
                {track.artists && track.artists.length > 0
                    ? track.artists.map(artist => artist.name).join(', ')
                    : 'Unknown Artist'}
              </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SpotifyMusicList;