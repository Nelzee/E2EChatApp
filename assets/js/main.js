const messagebox = document.querySelector(".message-box");
const encrypt_mssge = document.querySelector(".encrypted_message");
const encryptKey = document.querySelectorAll(".encryptKey input");
const decryptKey = document.querySelectorAll(".decryptKey input");
const phone1 = document.querySelector(".chats__phone1");
const phone2 = document.querySelector(".chats__phone2");
const phone3 = document.querySelector(".chats__phone3");

let letters = [" ",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G", 
  "H", 
  "I", 
  "J", 
  "K", 
  "L", 
  "M", 
  "N", 
  "O", 
  "P", 
  "Q", 
  "R", 
  "S", 
  "T", 
  "U", 
  "V", 
  "W", 
  "X", 
  "Y", 
  "Z",
  "z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
]

let encryptionKey = [0,0,0];
let decryptionKey = [0,0,0];
let messageText = [];

let cnt = 0;
let cnt1 = 0;

encryptKey.forEach(input => {input.addEventListener('click', function() {
  encryptionKey[input.id] = input.valueAsNumber; 
})});
encryptKey.forEach(input => {input.addEventListener('keyup', function() {
  encryptionKey[input.id] = input.valueAsNumber;
})});
decryptKey.forEach(input => {input.addEventListener('click', function() {
  decryptionKey[input.id] = input.valueAsNumber;
})});
decryptKey.forEach(input => {input.addEventListener('keyup', function() {
  decryptionKey[input.id] = input.valueAsNumber;
})});

const bobSend = mssge => {
  let BobCht = document.createElement("div");
  let BobMssg = document.createElement("div");
  BobCht.classList.add("Bob", "chat", "chat-sent");
  BobMssg.classList.add("Bob", "message-sent");
  BobMssg.innerText = mssge;
  BobCht.appendChild(BobMssg);
  phone1.appendChild(BobCht);
}

const hckrReceive = mssge => {
  let text = '';
   mssge.map(letter => {
    text += letter;
  });
  let hckrCht = document.createElement("div");
  let hckrMssg = document.createElement("div");
  hckrCht.classList.add("Bob", "chat", "chat-sent");
  hckrMssg.classList.add("Bob", "message-sent");
  hckrMssg.innerText = text;
  hckrCht.appendChild(hckrMssg);
  phone2.appendChild(hckrCht);
  console.log(text);
}

const AshlyReceive = mssge => {
  let AshCht = document.createElement("div"); 
  let AshMssg = document.createElement("div");
  AshCht.classList.add("Ashley","chat", "chat-received")
  AshMssg.classList.add("Ashley", "message-received");
  AshMssg.innerText = mssge;
  AshCht.appendChild(AshMssg);
  phone3.appendChild(AshCht);
}

function encrypt (messge = [], lock) {
  let encryptedText = [];
  let hold = 0;
  messge.map(letter => {
    hold = lock[cnt] + letters.indexOf(letter);
    while(hold > letters.length - 1){
      hold -= letters.length  - 1;
    }
    encryptedText.push(letters[hold]);
    cnt++;
    if(cnt === lock.length - 1){
      cnt = 0;
    } 
  });
  return encryptedText;
}

function decrypt(messages = [], unlockKey){
  let chr = "";
  let hold = 0;
  messages.map(message => {
    hold = letters.indexOf(message) - unlockKey[cnt1];
    console.log(letters.indexOf(message), unlockKey[cnt1]);
    while(hold < 0){
      hold += letters.length - 1;
      console.log(hold);
    }
   chr += letters[hold];
   cnt1++;
    if(cnt1 === unlockKey.length - 1){
      cnt1 = 0;
    } 
  });
  return chr;
}
const send = (mssge) => {
  let enkeys = [];
  messageToSend = encrypt(messageText, encryptionKey);
  enkeys = decrypt(messageToSend, decryptionKey);
  bobSend(enkeys);
  hckrReceive(messageToSend);
  AshlyReceive(enkeys);
  messagebox.value = "";
}

messagebox.addEventListener('keydown', function(e) {
  if(e.keyCode === 8){
    messageText.pop()
}
  else if(e.keyCode === 13){
    send(messageText);
    messageText = [];
  }
  else{
    messageText.push(e.key);
  }
});


