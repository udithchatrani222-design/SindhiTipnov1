class SindhiTipnoChat {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        
        this.initializeEventListeners();
        this.loadSindhiPhrases();
    }
    
    initializeEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }
    
    loadSindhiPhrases() {
        this.sindhiPhrases = {
            'hello': {
                sindhi: 'آداب',
                pronunciation: 'Aadaab',
                meaning: 'Hello/Greetings'
            },
            'how are you': {
                sindhi: 'توهان ڪيئن آهيو؟',
                pronunciation: 'Tawhan kyan aahyo?',
                meaning: 'How are you?'
            },
            'thank you': {
                sindhi: 'مهرباني',
                pronunciation: 'Mehrbani',
                meaning: 'Thank you'
            },
            'good morning': {
                sindhi: 'صبح جو سلام',
                pronunciation: 'Subah jo salaam',
                meaning: 'Good morning'
            },
            'good evening': {
                sindhi: 'شام جو سلام',
                pronunciation: 'Shaam jo salaam',
                meaning: 'Good evening'
            },
            'yes': {
                sindhi: 'ها',
                pronunciation: 'Haa',
                meaning: 'Yes'
            },
            'no': {
                sindhi: 'نه',
                pronunciation: 'Na',
                meaning: 'No'
            },
            'please': {
                sindhi: 'مهرباني ڪري',
                pronunciation: 'Mehrbani kari',
                meaning: 'Please'
            },
            'sorry': {
                sindhi: 'معاف ڪجو',
                pronunciation: 'Maaf kajo',
                meaning: 'Sorry'
            },
            'goodbye': {
                sindhi: 'الوداع',
                pronunciation: 'Alwida',
                meaning: 'Goodbye'
            }
        };
        
        this.responses = [
            "That's a great question about Sindhi!",
            "Let me help you with that Sindhi phrase.",
            "Sindhi is such a beautiful language!",
            "Here's what that means in Sindhi context.",
            "That's an interesting aspect of Sindhi culture!"
        ];
    }
    
    sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        this.messageInput.value = '';
        
        setTimeout(() => {
            this.generateResponse(message);
        }, 1000);
    }
    
    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        if (typeof content === 'string') {
            messageContent.innerHTML = `<p>${content}</p>`;
        } else {
            messageContent.appendChild(content);
        }
        
        messageDiv.appendChild(messageContent);
        this.chatMessages.appendChild(messageDiv);
        
        this.scrollToBottom();
    }
    
    generateResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Check for specific Sindhi phrases
        for (const [key, phrase] of Object.entries(this.sindhiPhrases)) {
            if (lowerMessage.includes(key)) {
                const responseContent = document.createElement('div');
                responseContent.innerHTML = `
                    <p><strong>Sindhi:</strong> ${phrase.sindhi}</p>
                    <p><strong>Pronunciation:</strong> ${phrase.pronunciation}</p>
                    <p><strong>Meaning:</strong> ${phrase.meaning}</p>
                `;
                this.addMessage(responseContent, 'bot');
                return;
            }
        }
        
        // Check if message contains Sindhi text
        if (this.containsSindhiText(userMessage)) {
            const response = "I can see you're writing in Sindhi! That's wonderful. Keep practicing!";
            this.addMessage(response, 'bot');
            return;
        }
        
        // General responses
        if (lowerMessage.includes('learn') || lowerMessage.includes('teach')) {
            const response = `
                <p>I'd love to help you learn Sindhi! Here are some ways I can assist:</p>
                <p>• Ask me about common Sindhi phrases</p>
                <p>• Practice basic greetings</p>
                <p>• Learn about Sindhi culture</p>
                <p>Try asking: "How do you say hello in Sindhi?"</p>
            `;
            this.addMessage(response, 'bot');
        } else if (lowerMessage.includes('culture') || lowerMessage.includes('tradition')) {
            const response = `
                <p>Sindhi culture is rich and diverse! Some highlights:</p>
                <p>• Sindhi people are known for their hospitality</p>
                <p>• Traditional festivals like Cheti Chand</p>
                <p>• Beautiful folk music and dance</p>
                <p>• Delicious cuisine like Sindhi curry and dal pakwan</p>
            `;
            this.addMessage(response, 'bot');
        } else {
            const randomResponse = this.responses[Math.floor(Math.random() * this.responses.length)];
            const response = `${randomResponse} Try asking me about Sindhi phrases, culture, or how to say something in Sindhi!`;
            this.addMessage(response, 'bot');
        }
    }
    
    containsSindhiText(text) {
        // Simple check for Arabic/Sindhi script characters
        const sindhiRegex = /[\u0600-\u06FF]/;
        return sindhiRegex.test(text);
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

// Initialize the chat when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SindhiTipnoChat();
});