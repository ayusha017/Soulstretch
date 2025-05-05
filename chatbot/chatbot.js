const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendButton = document.querySelector("#send-message");
const chatbotToggler = document.querySelector("#chatbot-toggler");
const userData = {
    message: null
};

const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
};

const handleOutgoingMessage = (e) => {
    e.preventDefault();
    userData.message = messageInput.value.trim();

    if (!userData.message) return;

    // Display user message
    const messageContent = `<div class="message-text"></div>`;
    const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
    outgoingMessageDiv.querySelector(".message-text").textContent = userData.message;
    chatBody.appendChild(outgoingMessageDiv);

    // Thinking delay indicator
    const thinkingContent = `<div class="message-text">
        <div class="thinking-indicator">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    </div>`;
    const incomingMessageDiv = createMessageElement(thinkingContent, "bot-message");
    chatBody.appendChild(incomingMessageDiv);

    sendMessage(userData.message, incomingMessageDiv);
    messageInput.value = "";
};

// Enter key event
messageInput.addEventListener("keydown", (e) => {
    const userMessage = e.target.value.trim();
    if (e.key === "Enter" && userMessage) {
        handleOutgoingMessage(e);
    }
});

// Button click event
sendButton.addEventListener("click", (e) => handleOutgoingMessage(e));

async function sendMessage(msg, placeholderElement) {
    try {
        const response = await fetch("http://localhost:4000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: msg })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.reply) {
            throw new Error("Invalid response format.");
        }

        // Replace thinking indicator with actual response
        placeholderElement.innerHTML = `<div class="message-text">${data.reply}</div>`;

    } catch (error) {
        console.error("Fetch Error:", error);
        placeholderElement.innerHTML = `<div class="message-text">Error: ${error.message}</div>`;
    }
}
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

