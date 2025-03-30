import { WebSocketServer, WebSocket } from "ws";
import { v4 as uuidv4 } from "uuid";

interface ClientData {
    socket: WebSocket;
    username: string;
    roomId: string;
}

const clients = new Map<string, ClientData>();
const wss = new WebSocketServer({ port: 8080 });

function broadcastUsers() {
    const userList = Array.from(clients.values()).map(({ username, roomId }) => ({ username, roomId }));
    const payload = JSON.stringify({ type: "users", payload: userList });

    console.log("Broadcasting Users:", payload);

    clients.forEach(({ socket }) => {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(payload);
        }
    });
}

wss.on("connection", (socket) => {
    const userId = uuidv4(); // Generate unique ID for this client
    console.log(`New client connected: ${userId}`);

    socket.on("message", (message) => {
        try {
            const parseMessage = JSON.parse(message.toString());
            console.log("request reached");
            if (parseMessage.type === "join") {
                console.log("request under verification");
                const { roomId, username } = parseMessage.payload;

                clients.set(userId, { socket, username, roomId });
                console.log("request verified");

                console.log(`${username} joined room: ${roomId} with userId: ${userId}`);

                broadcastUsers(); // Update all clients with the new user list
            }

            if (parseMessage.type === "chat") {
                const sender = clients.get(userId);
                if (!sender) return;

                const { message } = parseMessage.payload;

                // Broadcast message to room members
                clients.forEach((user) => {
                    if (user.roomId === sender.roomId) {
                        user.socket.send(
                            JSON.stringify({
                                type: "chat",
                                payload: {
                                    message,
                                    sender: sender.username,
                                    roomId: sender.roomId
                                },
                            })
                        );
                    }
                });
            }
        } catch (error) {
            console.error("Error parsing message:", error);
        }
    });

    socket.on("close", () => {
        // Remove user from clients
        const user = clients.get(userId);
        if (user) {
            console.log(`${user.username} disconnected`);
            clients.delete(userId);
            broadcastUsers(); // Notify other users about the disconnection
        }
    });
});

console.log("WebSocket server running on ws://localhost:8080");
