// Audio Player Class for Bhajans & Aarti
class AudioPlayer {
    constructor() {
        this.audioElement = document.getElementById('audioElement');
        this.currentTrackTitle = document.getElementById('currentTrackTitle');
        this.currentTrackType = document.getElementById('currentTrackType');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.progressSlider = document.getElementById('progressSlider');
        this.progressFill = document.getElementById('progressFill');
        this.currentTime = document.getElementById('currentTime');
        this.totalTime = document.getElementById('totalTime');
        this.volumeSlider = document.getElementById('volumeSlider');
        
        this.playlist = [];
        this.currentIndex = 0;
        this.isPlaying = false;
        
        this.initializeEventListeners();
        this.setVolume(0.7); // Default volume 70%
    }
    
    initializeEventListeners() {
        // Play/Pause button
        this.playPauseBtn.addEventListener('click', () => {
            this.togglePlayPause();
        });
        
        // Previous/Next buttons
        this.prevBtn.addEventListener('click', () => {
            this.previousTrack();
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.nextTrack();
        });
        
        // Progress slider
        this.progressSlider.addEventListener('input', () => {
            this.seekTo(this.progressSlider.value);
        });
        
        // Volume slider
        this.volumeSlider.addEventListener('input', () => {
            this.setVolume(this.volumeSlider.value / 100);
        });
        
        // Audio element events
        this.audioElement.addEventListener('loadedmetadata', () => {
            this.updateDuration();
        });
        
        this.audioElement.addEventListener('timeupdate', () => {
            this.updateProgress();
        });
        
        this.audioElement.addEventListener('ended', () => {
            this.nextTrack();
        });
        
        this.audioElement.addEventListener('error', (e) => {
            console.error('Audio error:', e);
            this.showError('Unable to play this audio file');
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName.toLowerCase() !== 'input') {
                switch(e.code) {
                    case 'Space':
                        e.preventDefault();
                        this.togglePlayPause();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.previousTrack();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.nextTrack();
                        break;
                }
            }
        });
    }
    
    loadPlaylist(playlist, startIndex = 0) {
        this.playlist = playlist;
        this.currentIndex = startIndex;
        this.loadCurrentTrack();
    }
    
    loadCurrentTrack() {
        if (this.playlist.length === 0) return;
        
        const currentTrack = this.playlist[this.currentIndex];
        
        // Update UI
        this.currentTrackTitle.textContent = currentTrack.title;
        this.currentTrackType.textContent = currentTrack.type.charAt(0).toUpperCase() + currentTrack.type.slice(1);
        
        // In a real application, you would load the actual audio file here
        // For demo purposes, we'll create a sample audio URL
        // this.audioElement.src = currentTrack.audioUrl;
        
        // Since we can't actually play uploaded files in this demo,
        // we'll simulate audio playback with a sample audio
        this.simulateAudioPlayback(currentTrack);
        
        // Update navigation buttons
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex === this.playlist.length - 1;
    }
    
    simulateAudioPlayback(track) {
        // Create a demo audio experience
        // In production, you would use: this.audioElement.src = track.actualAudioUrl;
        
        // For demo, we'll use a data URL or show a message
        this.showMessage(`Playing: ${track.title}`, 'info');
        
        // Simulate duration (3-5 minutes for bhajans/aartis)
        const simulatedDuration = Math.floor(Math.random() * 120) + 180; // 3-5 minutes
        this.simulatedDuration = simulatedDuration;
        this.simulatedCurrentTime = 0;
        
        // Update duration display
        this.totalTime.textContent = this.formatTime(simulatedDuration);
        
        // Start simulation if playing
        if (this.isPlaying) {
            this.startSimulation();
        }
    }
    
    startSimulation() {
        if (this.simulationInterval) {
            clearInterval(this.simulationInterval);
        }
        
        this.simulationInterval = setInterval(() => {
            if (this.isPlaying && this.simulatedCurrentTime < this.simulatedDuration) {
                this.simulatedCurrentTime++;
                this.updateSimulatedProgress();
            } else if (this.simulatedCurrentTime >= this.simulatedDuration) {
                this.nextTrack();
            }
        }, 1000);
    }
    
    updateSimulatedProgress() {
        const progress = (this.simulatedCurrentTime / this.simulatedDuration) * 100;
        this.progressFill.style.width = `${progress}%`;
        this.progressSlider.value = progress;
        this.currentTime.textContent = this.formatTime(this.simulatedCurrentTime);
    }
    
    togglePlayPause() {
        if (this.playlist.length === 0) {
            this.showMessage('No tracks loaded', 'error');
            return;
        }
        
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    play() {
        this.isPlaying = true;
        this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        
        // In production: this.audioElement.play();
        this.startSimulation();
        
        // Update playing state in main app
        if (window.sindhiTipnoApp) {
            const currentTrack = this.playlist[this.currentIndex];
            window.sindhiTipnoApp.updatePlayingState(currentTrack.id);
        }
        
        this.showMessage(`Playing: ${this.playlist[this.currentIndex].title}`, 'success');
    }
    
    pause() {
        this.isPlaying = false;
        this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        
        // In production: this.audioElement.pause();
        if (this.simulationInterval) {
            clearInterval(this.simulationInterval);
        }
        
        // Update playing state in main app
        if (window.sindhiTipnoApp) {
            window.sindhiTipnoApp.updatePlayingState(null);
        }
    }
    
    previousTrack() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.loadCurrentTrack();
            if (this.isPlaying) {
                this.play();
            }
        }
    }
    
    nextTrack() {
        if (this.currentIndex < this.playlist.length - 1) {
            this.currentIndex++;
            this.loadCurrentTrack();
            if (this.isPlaying) {
                this.play();
            }
        } else {
            // End of playlist
            this.pause();
            this.currentIndex = 0;
            this.loadCurrentTrack();
        }
    }
    
    seekTo(percentage) {
        if (this.simulatedDuration) {
            this.simulatedCurrentTime = (percentage / 100) * this.simulatedDuration;
            this.updateSimulatedProgress();
        }
        
        // In production: this.audioElement.currentTime = (percentage / 100) * this.audioElement.duration;
    }
    
    setVolume(volume) {
        // In production: this.audioElement.volume = volume;
        this.volumeSlider.value = volume * 100;
    }
    
    updateDuration() {
        // In production: this.totalTime.textContent = this.formatTime(this.audioElement.duration);
    }
    
    updateProgress() {
        // In production implementation:
        // const progress = (this.audioElement.currentTime / this.audioElement.duration) * 100;
        // this.progressFill.style.width = `${progress}%`;
        // this.progressSlider.value = progress;
        // this.currentTime.textContent = this.formatTime(this.audioElement.currentTime);
    }
    
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    showMessage(message, type = 'info') {
        if (window.authSystem && window.authSystem.showMessage) {
            window.authSystem.showMessage(message, type);
        }
    }
    
    showError(message) {
        this.showMessage(message, 'error');
        this.pause();
    }
    
    cleanup() {
        if (this.simulationInterval) {
            clearInterval(this.simulationInterval);
        }
        
        // In production: this.audioElement.pause();
        this.isPlaying = false;
    }
}