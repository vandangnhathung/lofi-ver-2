export interface Song {
    title: string;
    path: string;
    category: string[];
}

export interface PlayerMusicState {
    musicIndex: number;
    currentSong: Song;
    isPlay: boolean;
}