import { useState, useRef } from 'react'
import '../styles/music-player.css'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60)
    const seconds = Math.floor(secs % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = Number(e.target.value)
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
    setCurrentTime(0)
  }

  return (
    <div className="music-player">
      <div className="player-disk-wrapper">
        <div className={`player-disk ${isPlaying ? 'playing' : ''}`}>
          <div className="player-disk-center" />
        </div>
      </div>

      <div className="track-info">
        <div className="track-name">Music Tack 1</div>
      </div>

      <div className="progress-container">
        <input
          type="range"
          className="progress-bar"
          value={currentTime}
          min={0}
          max={duration || 100}
          onChange={handleProgressChange}
        />
        <div className="time-stamps">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player-controls">
        <button className="control-btn">⏮</button>
        <button className="control-btn play-btn" onClick={togglePlay}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className="control-btn">⏭</button>
      </div>

      <audio
        ref={audioRef}
        src="/audio/lofi-track.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
      />
    </div>
  )
}