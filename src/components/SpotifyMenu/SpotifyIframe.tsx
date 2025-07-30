import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

const SpotifyIframe = () => {
    const isOpenSpotify = useSelector((state: RootState) => state.spotify.isOpenSpotify);

    return (
        <div className="fixed max-w-[300px] h-[200px] right-5 top-5 z-20">
            <div
                className={`${isOpenSpotify ? 'open-effect pb-[12px]' : 'close-effect h-0'} h-full before:block before:w-full before:h-[12px] transition-all duration-700`}>
                <iframe
                    title="Spotify Playlist Embed"
                    className="rounded-xl w-full h-full"
                    src="https://open.spotify.com/embed/playlist/10M75TUt3X1qbBhpuEw6el?utm_source=generator"
                    width="100%" height="352" frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy">
                </iframe>
            </div>
        </div>
    );
};

export default SpotifyIframe;