import "./style.css";
import { connectToServer } from "./socket-client";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
   <h3>Websocket - client</h3>

   <input id="jwtToken" placeholder="Jwt-Token"/>
   <button id="buttonConnect">Conectar</button>

   <span id="server-status">offline</span>

   <ul id="clients-ul"></ul>

    <form id="message-form">
        <input placeholder="Message" id="message-input" />
    </form>

    <h3>Mensajes</h3>
    <ul id="list-message"></ul>

  </div>
`;
//connectToServer();
//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

const buttonConnect =
  document.querySelector<HTMLButtonElement>("#buttonConnect")!;

const inputToken = document.querySelector<HTMLInputElement>("#jwtToken")!;

buttonConnect.addEventListener("click", (event) => {
  if (inputToken.value.trim().length <= 0) alert("Enter a valid JWT");
  connectToServer(inputToken.value.trim());
});
