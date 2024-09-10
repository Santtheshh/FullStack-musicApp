import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const url = 'http://localhost:4000';

  const [songsData, setSongData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [volume, setVolume] = useState(0.5);

  const [track, setTrack] = useState(songsData[3]);
  const [playerStatus, setPlayerStatus] = useState(false); 
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play = () => {
    audioRef.current.play();
    setPlayerStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayerStatus(false);
  };

  const playWithID = async (id) => {
    await songsData.map((item) => {
      if (id === item._id) {
        setTrack(item);
      }
    });
    await audioRef.current.play();
    setPlayerStatus(true);
  };

  const previous = async () => {
    songsData.map(async (item, index) => {
      if (track._id === item._id && index > 0) {
        await setTrack(songsData[index - 1]);
        await audioRef.current.play();
        setPlayerStatus(true);
      }
    });
  };

  const next = async () => {
    for (let index = 0; index < songsData.length; index++) {
      if (track._id === songsData[index]._id && index < songsData.length - 1) {
        await setTrack(songsData[index + 1]);
        if (audioRef.current) {
          await audioRef.current.play();
          setPlayerStatus(true);
        }
        break;
      }
    }
  };

  const seekSong = async (e) => {
    audioRef.current.currentTime = 
      ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
  };

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      setSongData(response.data.songs);
      setTrack(response.data.songs[0]);
    } catch (error) {
      console.error("Error fetching songs data:", error);
    }
  };

  const getAlbumsData = async () => {
    const response = await axios.get(`${url}/api/album/list`);
    setAlbumsData(response.data.albums);
  };

  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          ) + "%";
        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });
      };
    }, 1000);
  });

  const setVolumeLevel = (e) => {
    const newVolume = e.target.value / 100;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  useEffect(() => {
    audioRef.current.volume = volume; // Set initial volume
  }, [volume]);

  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  const handleKeyDown = (e) => {
    if (e.code === "Space") {
      e.preventDefault(); // Prevent default space bar action (e.g., page scrolling)
      if (playerStatus) {
        pause();
      } else {
        play();
      }
    } else if (e.code === "ArrowRight") {
      next(); // Skip to the next track when the right arrow key is pressed
    } else if (e.code === "ArrowLeft") {
      previous(); // Skip to the previous track when the left arrow key is pressed
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [playerStatus]);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playerStatus,
    setPlayerStatus,
    time,
    setTime,
    play,
    pause,
    playWithID,
    previous,
    next,
    setVolumeLevel, 
    volume,
    seekSong,
    songsData,
    albumsData,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
