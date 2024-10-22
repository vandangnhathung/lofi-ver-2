import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

const SpotifyIframe = () => {
    const isOpenSpotify = useSelector((state: RootState) => state.spotify.isOpenSpotify);

    return (
        <div className="fixed w-[300px] h-[300px] right-5 top-5 z-20">
            <div
                className={`${isOpenSpotify ? 'open-effect h-[242px] pb-[12px]' : 'close-effect h-0'} h-full before:block before:w-full before:h-[12px] transition-all duration-700`}>
                <iframe
                    title="Spotify Playlist Embed"
                    className="rounded-xl w-full h-full"
                    src="https://open.spotify.com/embed/playlist/37i9dQZF1DWVGqd3X7g31u?utm_source=generator&theme=0"
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                />
            </div>
        </div>
    );
};

export default SpotifyIframe;