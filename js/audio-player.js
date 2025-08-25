// Enhanced Audio Player Class for Real Audio Playback
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
        this.audioContext = null;
        this.hasUserInteracted = false;
        this.audioOutputInfo = null;
        
        this.initializeAudioSystem();
        this.initializeEventListeners();
        this.setVolume(0.8); // Default volume 80%
        this.detectAudioOutput();
    }
    
    async initializeAudioSystem() {
        try {
            // Initialize Web Audio API for better control
            if (window.AudioContext || window.webkitAudioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            
            // Configure audio element for optimal playback
            if (this.audioElement) {
                this.audioElement.preload = 'metadata';
                this.audioElement.crossOrigin = 'anonymous';
                
                // Set audio element properties for better device compatibility
                this.audioElement.setAttribute('playsinline', 'true');
                this.audioElement.setAttribute('webkit-playsinline', 'true');
                
                // Request audio permissions early
                await this.requestAudioPermissions();
            }
            
            console.log('Audio system initialized successfully');
        } catch (error) {
            console.warn('Audio system initialization warning:', error);
        }
    }
    
    async requestAudioPermissions() {
        try {
            // Request microphone permission to ensure audio system access
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                // Immediately stop the stream as we only needed permission
                stream.getTracks().forEach(track => track.stop());
                console.log('Audio permissions granted');
            }
        } catch (error) {
            console.log('Audio permissions not required or denied:', error.message);
        }
    }
    
    async detectAudioOutput() {
        try {
            if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const audioOutputs = devices.filter(device => device.kind === 'audiooutput');
                
                if (audioOutputs.length > 0) {
                    this.audioOutputInfo = {
                        available: audioOutputs.length,
                        default: audioOutputs.find(device => device.deviceId === 'default') || audioOutputs[0]
                    };
                    console.log('Audio outputs detected:', audioOutputs.length);
                    this.updateAudioOutputDisplay();
                }
            }
        } catch (error) {
            console.log('Audio output detection not supported:', error.message);
        }
    }
    
    updateAudioOutputDisplay() {
        // Add audio output indicator if available
        const playerInfo = document.querySelector('.player-info');
        if (playerInfo && this.audioOutputInfo) {
            let outputIndicator = document.getElementById('audioOutputIndicator');
            if (!outputIndicator) {
                outputIndicator = document.createElement('div');
                outputIndicator.id = 'audioOutputIndicator';
                outputIndicator.className = 'audio-output-indicator';
                playerInfo.appendChild(outputIndicator);
            }
            
            const outputText = this.audioOutputInfo.available > 1 ? 
                `${this.audioOutputInfo.available} audio outputs available` : 
                'Audio output ready';
            outputIndicator.innerHTML = `<i class="fas fa-volume-up"></i> ${outputText}`;
        }
    }
    
    initializeEventListeners() {
        // Play/Pause button
        this.playPauseBtn.addEventListener('click', () => {
            this.handleUserInteraction();
            this.togglePlayPause();
        });
        
        // Previous/Next buttons
        this.prevBtn.addEventListener('click', () => {
            this.handleUserInteraction();
            this.previousTrack();
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.handleUserInteraction();
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
            this.handleAudioError(e);
        });
        
        this.audioElement.addEventListener('canplay', () => {
            console.log('Audio can play - ready for playback');
        });
        
        this.audioElement.addEventListener('loadstart', () => {
            console.log('Audio loading started');
        });
        
        // Handle audio context resume for autoplay policies
        this.audioElement.addEventListener('play', async () => {
            if (this.audioContext && this.audioContext.state === 'suspended') {
                try {
                    await this.audioContext.resume();
                    console.log('Audio context resumed');
                } catch (error) {
                    console.warn('Could not resume audio context:', error);
                }
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName.toLowerCase() !== 'input' && this.hasUserInteracted) {
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
        
        // Handle visibility change to pause/resume appropriately
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.isPlaying) {
                // Don't auto-pause - let user control playback
                console.log('Page hidden, continuing playback');
            }
        });
    }
    
    handleUserInteraction() {
        this.hasUserInteracted = true;
        
        // Resume audio context if needed
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume().catch(error => {
                console.warn('Could not resume audio context:', error);
            });
        }
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
        
        // Load actual audio file
        this.loadAudioFile(currentTrack);
        
        // Update navigation buttons
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex === this.playlist.length - 1;
    }
    
    loadAudioFile(track) {
        try {
            // Create audio URL from uploaded file
            const audioUrl = this.createAudioUrl(track);
            
            if (audioUrl) {
                this.audioElement.src = audioUrl;
                this.audioElement.load();
                console.log('Loading audio file:', track.title);
                this.showMessage(`Loading: ${track.title}`, 'info');
            } else {
                // Fallback for demo purposes
                this.simulateAudioPlayback(track);
            }
        } catch (error) {
            console.error('Error loading audio file:', error);
            this.showError('Unable to load audio file');
        }
    }
    
    createAudioUrl(track) {
        // In a real application, this would return the actual file URL
        // For now, we'll try to create a blob URL if file data is available
        
        if (track.fileData) {
            // If we have actual file data, create a blob URL
            try {
                const blob = new Blob([track.fileData], { type: 'audio/mpeg' });
                return URL.createObjectURL(blob);
            } catch (error) {
                console.warn('Could not create blob URL:', error);
            }
        }
        
        // For demo purposes, return null to trigger simulation
        return null;
    }
    
    simulateAudioPlayback(track) {
        console.log('Simulating audio playback for:', track.title);
        
        // Simulate duration (3-5 minutes for bhajans/aartis)
        const simulatedDuration = Math.floor(Math.random() * 120) + 180;
        this.simulatedDuration = simulatedDuration;
        this.simulatedCurrentTime = 0;
        
        // Update duration display
        this.totalTime.textContent = this.formatTime(simulatedDuration);
        
        this.showMessage(`Simulating playback: ${track.title}`, 'info');
    }
    
    async togglePlayPause() {
        if (this.playlist.length === 0) {
            this.showMessage('No tracks loaded', 'error');
            return;
        }
        
        if (this.isPlaying) {
            await this.pause();
        } else {
            await this.play();
        }
    }
    
    async play() {
        try {
            this.handleUserInteraction();
            
            if (this.audioElement.src && this.audioElement.src !== window.location.href) {
                // Real audio playback
                await this.audioElement.play();
                this.isPlaying = true;
                this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                
                console.log('Real audio playback started');
                this.showMessage(`Playing: ${this.playlist[this.currentIndex].title}`, 'success');
            } else {
                // Simulated playback
                this.isPlaying = true;
                this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                this.startSimulation();
                
                console.log('Simulated audio playback started');
                this.showMessage(`Simulating: ${this.playlist[this.currentIndex].title}`, 'info');
            }
            
            // Update playing state in main app
            if (window.sindhiTipnoApp) {
                const currentTrack = this.playlist[this.currentIndex];
                window.sindhiTipnoApp.updatePlayingState(currentTrack.id);
            }
            
        } catch (error) {
            console.error('Playback error:', error);
            this.handlePlaybackError(error);
        }
    }
    
    async pause() {
        this.isPlaying = false;
        this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        
        if (this.audioElement.src && this.audioElement.src !== window.location.href) {
            this.audioElement.pause();
        }
        
        if (this.simulationInterval) {
            clearInterval(this.simulationInterval);
        }
        
        // Update playing state in main app
        if (window.sindhiTipnoApp) {
            window.sindhiTipnoApp.updatePlayingState(null);
        }
        
        console.log('Playback paused');
    }
    
    handlePlaybackError(error) {
        let errorMessage = 'Playback failed';
        
        if (error.name === 'NotAllowedError') {
            errorMessage = 'Playback blocked - please interact with the page first';
            this.showUserInteractionPrompt();
        } else if (error.name === 'NotSupportedError') {
            errorMessage = 'Audio format not supported';
        } else if (error.name === 'AbortError') {
            errorMessage = 'Playback was interrupted';
        }
        
        this.showError(errorMessage);
        this.isPlaying = false;
        this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
    
    showUserInteractionPrompt() {
        const prompt = document.createElement('div');
        prompt.className = 'user-interaction-prompt';
        prompt.innerHTML = `
            <div class="prompt-content">
                <i class="fas fa-play-circle"></i>
                <h3>Enable Audio Playback</h3>
                <p>Click anywhere to enable audio playback on this device</p>
                <button class="enable-audio-btn">Enable Audio</button>
            </div>
        `;
        
        document.body.appendChild(prompt);
        
        const enableBtn = prompt.querySelector('.enable-audio-btn');
        const enableAudio = async () => {
            this.handleUserInteraction();
            document.body.removeChild(prompt);
            await this.play();
        };
        
        enableBtn.addEventListener('click', enableAudio);
        prompt.addEventListener('click', (e) => {
            if (e.target === prompt) enableAudio();
        });
    }
    
    handleAudioError(error) {
        console.error('Audio element error:', error);
        
        const audioError = this.audioElement.error;
        if (audioError) {
            let errorMessage = 'Audio error occurred';
            
            switch (audioError.code) {
                case MediaError.MEDIA_ERR_ABORTED:
                    errorMessage = 'Audio loading was aborted';
                    break;
                case MediaError.MEDIA_ERR_NETWORK:
                    errorMessage = 'Network error while loading audio';
                    break;
                case MediaError.MEDIA_ERR_DECODE:
                    errorMessage = 'Audio file is corrupted or unsupported';
                    break;
                case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    errorMessage = 'Audio format not supported';
                    break;
            }
            
            this.showError(errorMessage);
        }
        
        // Fallback to simulation
        if (this.playlist[this.currentIndex]) {
            this.simulateAudioPlayback(this.playlist[this.currentIndex]);
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
        if (this.audioElement.src && this.audioElement.duration) {
            this.audioElement.currentTime = (percentage / 100) * this.audioElement.duration;
        } else if (this.simulatedDuration) {
            this.simulatedCurrentTime = (percentage / 100) * this.simulatedDuration;
            this.updateSimulatedProgress();
        }
    }
    
    setVolume(volume) {
        this.audioElement.volume = Math.max(0, Math.min(1, volume));
        this.volumeSlider.value = volume * 100;
        
        // Update volume display
        const volumeIcon = document.querySelector('.volume-control i');
        if (volumeIcon) {
            if (volume === 0) {
                volumeIcon.className = 'fas fa-volume-mute';
            } else if (volume < 0.5) {
                volumeIcon.className = 'fas fa-volume-down';
            } else {
                volumeIcon.className = 'fas fa-volume-up';
            }
        }
    }
    
    updateDuration() {
        if (this.audioElement.duration) {
            this.totalTime.textContent = this.formatTime(this.audioElement.duration);
        }
    }
    
    updateProgress() {
        if (this.audioElement.duration) {
            const progress = (this.audioElement.currentTime / this.audioElement.duration) * 100;
            this.progressFill.style.width = `${progress}%`;
            this.progressSlider.value = progress;
            this.currentTime.textContent = this.formatTime(this.audioElement.currentTime);
        }
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
        console.log(`[Audio Player] ${message}`);
    }
    
    showError(message) {
        this.showMessage(message, 'error');
        this.pause();
    }
    
    cleanup() {
        if (this.simulationInterval) {
            clearInterval(this.simulationInterval);
        }
        
        this.audioElement.pause();
        this.audioElement.src = '';
        this.isPlaying = false;
        
        // Clean up any blob URLs
        if (this.audioElement.src && this.audioElement.src.startsWith('blob:')) {
            URL.revokeObjectURL(this.audioElement.src);
        }
    }
}