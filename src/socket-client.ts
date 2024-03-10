import { Manager, Socket } from "socket.io-client";
let socket: Socket;
export const connectToServer = (token: string) => {
  const manager = new Manager("http://localhost:5001/socket.io/socket.io.js", {
    extraHeaders: {
      authorization: token,
    },
  });
  socket?.removeAllListeners()
  socket = manager.socket("/");

  addListeners();
};

const addListeners = () => {
  const serverStatusLabel = document.querySelector("#server-status")!;
  const listClientsConnected = document.querySelector("#clients-ul")!;
  const listMessageClients =
    document.querySelector<HTMLUListElement>("#list-message")!;

  const messageForm = document.querySelector<HTMLFormElement>("#message-form")!;
  const messageInput =
    document.querySelector<HTMLInputElement>("#message-input")!;

  // TODO: #clients-ul

  socket.on("connect", () => {
    serverStatusLabel.innerHTML = "connected";
  });

  socket.on("disconnect", () => {
    serverStatusLabel.innerHTML = "disconnected";
  });

  socket.on("clients-updated", (clients: string[]) => {
    let listClient = "";
    clients.forEach((item) => {
      listClient += `
    <li>${item}</li>
    `;
    });

    listClientsConnected.innerHTML = listClient;
  });

  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (messageInput.value.trim().length <= 0) return;

    socket.emit("message-from-client", {
      id: "yo",
      message: messageInput.value,
    });

    messageInput.value = "";
  });

  socket.on(
    "message-from-server",
    (payload: { fullName: string; message: string }) => {
      const newMessage = `
       <li>
          <strong>${payload.fullName}</strong>
          <span>${payload.message}</span>
       </li>
      `;

      const li = document.createElement("li");
      li.innerHTML = newMessage;

      listMessageClients.append(li);
    }
  );
};
