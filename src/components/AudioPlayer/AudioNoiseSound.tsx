import React, {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

interface AudioNoiseSoundProps {
    soundId: string;
    soundSrc: string;
}

const AudioNoiseSound: React.FC<AudioNoiseSoundProps> = ({
                                                           soundId,
                                                           soundSrc,
                                                         }) => {
  const noiseAudioRef = useRef<HTMLAudioElement>(null);
  const allBackgroundSounds = useSelector(
      (state: RootState) => state.backgroundSound.allBackgroundSounds
  );

  useEffect(() => {
    if (noiseAudioRef.current && soundSrc) {
      const fullSrcPath = `/assets/sounds/${soundSrc}`;
      noiseAudioRef.current.src = ""; // Clear the src first
      noiseAudioRef.current.load(); // Reset the audio element
      noiseAudioRef.current.src = fullSrcPath;
      noiseAudioRef.current.load(); // Load the new source
    }
  }, [soundSrc]);

  const currentVolume = useSelector(
      (state: RootState) =>
          state.backgroundSound.allBackgroundSounds.find(
              (sound) => sound.name === soundId
          )?.volume
  );

  useEffect(() => {
    if (noiseAudioRef.current) {
      noiseAudioRef.current.volume = currentVolume ?? 0; // Update audio element volume
    }
  }, [noiseAudioRef.current, currentVolume]); // Only re-run the effect if volume changes

  useEffect(() => {
    // Add an event listener to play the audio once it's loaded
    const audioElement = noiseAudioRef.current;
    const handleCanPlay = () => {
      const soundItem = allBackgroundSounds.find(
          (item) => item.name === soundId
      );
      if ((soundItem?.volume ?? 0) > 0) {
        audioElement?.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    };

    audioElement?.addEventListener("canplay", handleCanPlay);

    // Cleanup event listener on component unmount or when soundSrc changes
    return () => {
      audioElement?.removeEventListener("canplay", handleCanPlay);
    };
  }, [allBackgroundSounds, soundId, soundSrc]);

  return (
      <audio controls ref={noiseAudioRef} loop>
        <source src={`/assets/sounds/${soundSrc}`} type="audio/mpeg"/>
      </audio>
  );
};

export default AudioNoiseSound;