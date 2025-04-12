let playerName = ""; // 儲存使用者輸入的名字

const storyData = {
  welcome: {
    get text() {
      return `Welcome, ${playerName}! I'm so glad you made it here.\nThis city is full of opportunities for those who know how to stand out.\nEveryone here finds their place eventually :)`;
    },
    choices: [
      { text: "Start your adventure", next: "noSSN" }
    ]
  },
  noSSN: {
    text: "You don’t have a SSN and the rent here is ridiculously expensive.\nHere are two options that might suit you:",
    choices: [
      { text: "Share an old 3-bedroom, 1-bath apartment near the city with strangers", next: "nameless" },
      { text: "Share a newer 3-bedroom, 2-bath apartment farther out with strangers", next: "nameless" }
    ]
  },
  nameless: {
    text: "You’ve made up your mind to be here. You want to grow, to improve yourself in every way possible.\nEven though everything here feels unfamiliar, language, culture, people...\n You tell yourself: if I work hard enough, I can earn my place and shine.\nWhat will you do now?",
    choices: [
      { text: "Pull an all-nighter studying at home", next: "noRecord" },
      { text: "Pull an all-nighter at the library", next: "disappear" }
    ]
  },
  adjusting: {
    text: "You're adjusting to life and found a job.\nOne day, you receive a letter: 'Please prove your legal identity.'",
    choices: [
      { text: "Upload documents", next: "reviewing" },
      { text: "Ignore it", next: "illegal" }
    ]
  },
  stillSearching: {
    text: "You still can't find housing.\nThe city no longer replies to your messages.",
    choices: [
      { text: "Keep waiting", next: "reviewing" },
      { text: "Disappear into the crowd", next: "disappear" }
    ]
  },
  noRecord: {
    text: "We don't recall any resident by that name.",
    choices: [
      { text: "Continue waiting for review", next: "reviewing" },
      { text: "I’m not a resident, just a traveler", next: "disappear" }
    ]
  },
  reviewing: {
    text: "System reviewing…\nYou’re still working, still paying rent, still commuting, still being watched.",
    choices: [
      { text: "Keep waiting", next: "disappear" },
      { text: "Try to contact them", next: "disappear" }
    ]
  },
  illegal: {
    text: "Your presence is now unauthorized. Please leave immediately.",
    choices: [
      { text: "Try entering your name again", next: "noRecord" },
      { text: "Do nothing", next: "disappear" }
    ]
  },
  disappear: {
    text: "You disappeared, but no one was notified. No one asked where you went.\nPerhaps you were never meant to belong here.",
    choices: []
  }
};

let currentScene = "start";

function renderScene(sceneId) {
  const storyEl = document.getElementById("story");
  const choicesEl = document.getElementById("choices");
  storyEl.textContent = "";
  choicesEl.innerHTML = "";
  currentScene = sceneId;

  // 第一段：名字輸入區（start）
  if (sceneId === "start") {
    storyEl.textContent = "Hi there, little bird!\nPlease enter your name:";

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Your name here...");
    input.id = "nameInput";

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    submitBtn.onclick = () => {
      const nameValue = document.getElementById("nameInput").value.trim();
      if (nameValue !== "") {
        playerName = nameValue;
        renderScene("welcome");
      } else {
        alert("Please enter your name.");
      }
    };

    choicesEl.appendChild(input);
    choicesEl.appendChild(submitBtn);
    return;
  }

  // 後續場景（包括 welcome）
  const scene = storyData[sceneId];
  storyEl.textContent = scene.text;

  scene.choices.forEach(choice => {
    const button = document.createElement("button");
    button.textContent = choice.text;
    button.onclick = () => renderScene(choice.next);
    choicesEl.appendChild(button);
  });
}

// 起始畫面
renderScene("start");

  