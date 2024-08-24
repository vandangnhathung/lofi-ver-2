export interface Song {
    title: string;
    path: string;
    category: string[];
}

export interface PlayerMusicState {
    musics: Song[];
    categorizedMusics: { [key: string]: Song[] };
    musicIndex: number;
    currentSong: Song;
    isPlay: boolean;
}
