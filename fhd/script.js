document.addEventListener('DOMContentLoaded', () => {
    // Determine path prefix based on current location
    const isInServices = window.location.pathname.includes('/services/');
    const pathPrefix = isInServices ? '../' : '';

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('button.md\\:hidden');
    
    if (mobileMenuBtn) {
        // Create mobile menu container
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'md:hidden bg-white shadow-lg absolute top-16 left-0 w-full overflow-hidden transition-all duration-300 max-h-0 z-40';
        mobileMenu.innerHTML = `
            <div class="flex flex-col p-4 gap-4">
                <a href="${pathPrefix}index.html" class="hover:text-primary font-semibold">Home</a>
                <a href="${pathPrefix}index.html#services" class="hover:text-primary font-semibold">Services</a>
                <a href="${pathPrefix}index.html#about" class="hover:text-primary font-semibold">About Us</a>
                <a href="${pathPrefix}index.html#contact" class="hover:text-primary font-semibold">Contact</a>
                <a href="tel:+971556428126" class="bg-primary text-white px-5 py-2 rounded-full font-bold text-center">Call Now</a>
            </div>
        `;
        document.querySelector('header').appendChild(mobileMenu);

        mobileMenuBtn.addEventListener('click', () => {
            if (mobileMenu.style.maxHeight === '0px' || !mobileMenu.style.maxHeight) {
                mobileMenu.style.maxHeight = '300px';
            } else {
                mobileMenu.style.maxHeight = '0px';
            }
        });
    }

    // Chat Bot Logic
    const botToggle = document.getElementById('bot-toggle');
    
    if (botToggle) {
        const chatWindow = document.getElementById('chat-window');
        const closeChat = document.getElementById('close-chat');
        const sendMsg = document.getElementById('send-msg');
        const userInput = document.getElementById('user-input');
        const chatMessages = document.getElementById('chat-messages');

        function toggleChat() {
            chatWindow.classList.toggle('hidden');
            setTimeout(() => {
                chatWindow.classList.toggle('scale-0');
            }, 10);
        }

        botToggle.addEventListener('click', toggleChat);
        closeChat.addEventListener('click', toggleChat);

        function addMessage(msg, isUser = false) {
            const div = document.createElement('div');
            div.className = `flex items-start gap-2 mb-4 ${isUser ? 'flex-row-reverse' : ''}`;
            
            const avatar = isUser ? 
                `<div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs flex-shrink-0"><i class="fas fa-user"></i></div>` :
                `<div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs flex-shrink-0"><i class="fas fa-robot"></i></div>`;
                
            const bubble = `<div class="${isUser ? 'bg-primary text-white rounded-tr-none' : 'bg-white border border-gray-100 rounded-tl-none'} p-3 rounded-lg shadow-sm text-sm ${isUser ? '' : 'text-gray-700'} max-w-[80%]">
                ${msg}
            </div>`;

            div.innerHTML = avatar + bubble;
            chatMessages.appendChild(div);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function getBotResponse(input) {
            input = input.toLowerCase();
            if (input.includes('price') || input.includes('cost') || input.includes('quote')) {
                return "For a precise quote, please call us at +971 55 642 8126 or share your project details via WhatsApp.";
            } else if (input.includes('location') || input.includes('where')) {
                return "We are based in Sharjah but provide services across all of UAE including Dubai, Abu Dhabi, and Ajman.";
            } else if (input.includes('service') || input.includes('cutting')) {
                return "We offer Core Cutting, Concrete Cutting, Wall Sawing, Floor Sawing, and Demolition services. Which one are you interested in?";
            } else if (input.includes('contact') || input.includes('number')) {
                return "You can reach us at +971 55 642 8126.";
            } else {
                return "Thank you for your message. Our team will assist you shortly. For urgent inquiries, please call +971 55 642 8126.";
            }
        }

        function handleSend() {
            const text = userInput.value.trim();
            if (!text) return;

            addMessage(text, true);
            userInput.value = '';

            // Simulate typing delay
            setTimeout(() => {
                const response = getBotResponse(text);
                addMessage(response, false);
            }, 1000);
        }

        sendMsg.addEventListener('click', handleSend);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }
});
