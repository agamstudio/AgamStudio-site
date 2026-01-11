import React, { createContext, useContext, useState, useRef, useEffect } from "react";

interface Track {
    title: string;
    url: string;
}

interface AudioContextType {
    isPlaying: boolean;
    volume: number;
    currentTime: number;
    duration: number;
    togglePlay: () => void;
    setVolume: (volume: number) => void;
    setCurrentTime: (time: number) => void;
    nextTrack: () => void;
    prevTrack: () => void;
    currentTrackTitle: string;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const TRACKS: Track[] = [
    { title: "Off My Skin", url: `${import.meta.env.BASE_URL}music/Off My Skin.mp3` },
    { title: "Shadow in My Veins", url: `${import.meta.env.BASE_URL}music/Shadow in My Veins.mp3` },
    { title: "Agam Lofi #1", url: "https://stream.zeno.fm/0r0xa792kwzuv" },
    { title: "Cyber Dreams", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
];

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolumeState] = useState(0.5);
    const [trackIndex, setTrackIndex] = useState(0);
    const [currentTime, setCurrentTimeState] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize audio element only once
    useEffect(() => {
        const audio = new Audio(TRACKS[0].url);
        audio.loop = true;
        audio.volume = volume;
        audioRef.current = audio;

        // Set up event listeners
        const handleTimeUpdate = () => setCurrentTimeState(audio.currentTime);
        const handleLoadedMetadata = () => setDuration(audio.duration);
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handleEnded);
            audio.pause();
            audio.src = '';
        };
    }, []);

    // Handle track changes
    useEffect(() => {
        if (audioRef.current && trackIndex > 0) {
            const wasPlaying = !audioRef.current.paused;
            audioRef.current.src = TRACKS[trackIndex].url;
            if (wasPlaying) {
                audioRef.current.play().catch(console.error);
            }
        }
    }, [trackIndex]);

    // Handle volume changes separately - don't reset the track!
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play().catch(console.error);
            } else {
                audioRef.current.pause();
            }
        }
    };

    const setVolume = (newVolume: number) => {
        setVolumeState(newVolume);
    };

    const setCurrentTime = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTimeState(time);
        }
    };

    const nextTrack = () => {
        setTrackIndex((prev) => (prev + 1) % TRACKS.length);
    };

    const prevTrack = () => {
        setTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    };

    return (
        <AudioContext.Provider value={{
            isPlaying,
            volume,
            currentTime,
            duration,
            togglePlay,
            setVolume,
            setCurrentTime,
            nextTrack,
            prevTrack,
            currentTrackTitle: TRACKS[trackIndex].title
        }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) throw new Error("useAudio must be used within AudioProvider");
    return context;
};
