let playerName = ""; // 儲存使用者輸入的名字
let playerHistory = null; // 記錄玩家選過的特定行動

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
    text: "You need somewhere to land.\n But you don’t have a SSN and the rent here is ridiculously expensive.\nHere are two options that might suit you:",
    choices: [
      { text: "Share an old 3-bedroom, 1-bath apartment near the city with strangers", next: "workhard" },
      { text: "Share a newer 3-bedroom, 2-bath apartment farther out with strangers", next: "workhard" }
    ]
  },
  workhard: {
    text: "Everything here feels unfamiliar, language, culture, people...\n You always tell yourself: If I work hard enough, I can earn my place and shine. \nWhat will you do now?",
    choices: [
      { text: "Pull an all-nighter studying at home", next: "call" },
      { text: "Pull an all-nighter at the library", next: "call" }
    ]
  },
  call: {
    text: "It is the night before the exam. You’re sitting at the desk, exhausted.\nBut more than tired, you feel lonely.\nYou miss your family and friends so much.\nShould you call them?",
    choices: [
      { text: "Call", next: "callAttemp" },
      { text: "No, I don’t want to worry them", next: "Next" }
    ]
  },
  callAttemp: {
    text: "Beep... Beep... Beep...\nNo one picks up.\nYou suddenly remember that they are probably still asleep.",
    choices: [
      { text: "Maybe next time…", next: "Next" }
    ]
  },
  Next: {
    text: "How do you usually cope with your emotions?",
    choices: [
      {
        text: "Open social media and post something to let it out",
        next: "job",
        action: () => { playerHistory = "socialPost"; }
      },
      {
        text: "Go out for a walk",
        next: "direction"
      }
    ]
  },
  direction: {
    text: "You step outside. The air is cold, but something in you says keep walking.\nWhich direction do you take?",
    choices: [
      { text: "North", next: "walkNorth" },
      { text: "West", next: "walkWest" }
    ]
  },
  walkNorth: {
    text: "You head north, passing quiet buildings and dimly lit windows. \nDelivery workers weave between traffic lights, someone’s dog barks at a passing bike. \nA man sells roasted nuts on a corner, shouting prices over traffic noise. \nTeenagers laugh under flickering signs, a jogger weaves through the crowd without stopping. \nFar ahead, you notice a crowd beginning to form.",
    choices: [
      {
        text: "Walk past them",
        next: "job",
        action: () => { playerHistory = "protestObserve"; }
      },
      {
        text: "Change your route",
        next: "job"
      }
    ]
  },
  walkWest: {
    text: "You walk west, through intersections lined with food carts and flickering neon. \nA couple dances to music from a speaker, someone argues over slices at a pizza stand. \nCameras flash as friends take photos beneath glowing signs. \nVendors call out greetings in different languages, while taxis honk and swerve. \nFar ahead, you notice a crowd beginning to form.",
    choices: [
      {
        text: "Walk past them",
        next: "job",
        action: () => { playerHistory = "protestObserve"; }
      },
      {
        text: "Change your route",
        next: "job"
      }
    ]
  },
  job: {
    text: "Lately, you've been buried in resumes and interviews, juggling every hour to chase a job.\nToday, while checking your inbox, you see it—a job offer from a company you’ve dreamed of joining.\nI’m truly happy for you!\nSuddenly... there's a knock at the door.",
    choices: [
      { text: "Open the door", next: "door" }
    ]
  },
  door: {
    get text() {
      if (playerHistory === "socialPost") {
        return "You open the door. A group of people in police uniforms is waiting outside.\nThey tell you your presence here is no longer legal—because of what you posted on social media.\nThey’re not asking. They’re here to take you.";
      } else if (playerHistory === "protestObserve") {
        return "You open the door. A group of people in police uniforms is waiting outside.\nThey tell you your presence here is no longer legal—because you were seen at a recent protest.\nThey’re not asking. They’re here to take you.";
      } else {
        return "You open the door. A group of people in police uniforms is waiting outside.\nThey say nothing at all. No reason. Just that your presence is no longer legal.\nThey’re not asking. They’re here to take you.";
      }
    },
    choices: [
      { text: "Prove your identity", next: "proveIdentity" }
    ]
  },
  proveIdentity: {
    text: "Please enter your name to verify your identity:",
    choices: []
  },
  reviewing: {
    text: "System is reviewing your identity...",
    choices: [
      { text: "Continue waiting", next: "reviewing" },
      { text: "Give up", next: "leave" }
    ]
  },
  protestRoute: {
    text: "You walk further. Somewhere nearby, a crowd begins to form. Signs are lifted. Voices rise. The city does not sleep.",
    choices: [
      { text: "Keep walking", next: "job" }
    ]
  },
  leave: {
    text: "You were forced to leave. No one was notified. No one asked where you went.\nPerhaps you were never meant to belong here.",
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

  if (sceneId === "proveIdentity") {
    storyEl.textContent = storyData[sceneId].text;

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Enter name...");
    input.id = "verifyNameInput";

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    submitBtn.onclick = () => {
      const nameValue = document.getElementById("verifyNameInput").value.trim();
      if (nameValue !== "") {
        renderScene("reviewing");
      } else {
        alert("Please enter a name.");
      }
    };

    choicesEl.appendChild(input);
    choicesEl.appendChild(submitBtn);
    return;
  }

  const scene = storyData[sceneId];
  storyEl.textContent = scene.text;

  scene.choices.forEach(choice => {
    const button = document.createElement("button");
    button.textContent = choice.text;
    button.onclick = () => {
      if (choice.action) choice.action();
      renderScene(choice.next);
    };
    choicesEl.appendChild(button);
  });
}

renderScene("start");

  