let clients = {}

io.on("connection", socket => {
    socket.on("add-user", (data) => {
        client[data.userId] = {
            socket: socket.id
        }
    })

    socket.on("disconnect", () => {
        for (const userId in clients) {
            if (clients[userId].socket == socket.id) {
                delete clients[userId];
                break;
            }
        }
    })
})

function getConnectedClients = async (req, res, next) => {
    if (!clients) {
        return res.status(404).json({ success: false, msg: "No connected clients" });
    }

    return res.status(200).json({ success: true, data: clients });
}


// Dealing with chat rooms
//
