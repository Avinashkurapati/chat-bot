const textarea = document.getElementById("user-input");
const chatbox = document.getElementById("chatbox");
textarea.addEventListener("input", () => {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
});

async function sendMessage() {

  const input = document.getElementById("user-input");
  const chatbox = document.getElementById("chatbox");
  const userMsg = input.value.trim();
  if (userMsg == "") return;
  const wel = document.getElementById("wel");
  if (userMsg !== "")
    wel.style.display = "none";


  chatbox.innerHTML += `<div class="msg user">${userMsg}</div>`;

  input.value = "";
  chatbox.scrollTop = chatbox.scrollHeight;


  const response = await fetch("http://127.0.0.1:5000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMsg })
  });
  const data = await response.json();
  chatbox.innerHTML += `<div class="msg bot">${data.reply}</div>`;
  chatbox.scrollTop = chatbox.scrollHeight;
}

const clearchat = document.getElementById("clearchat");

clearchat.addEventListener("click", () => {
  location.reload();
  
});
