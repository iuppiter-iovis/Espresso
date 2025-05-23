// 🔁 Dizionario dei puzzle giornalieri
const dailyPuzzles = {
  "2025-05-23": {
    groups: [
      { category: "Animali", words: ["cane", "gatto", "criceto", "pesce"] },
      { category: "Colori", words: ["rosso", "verde", "giallo", "blu"] },
      { category: "Cibi italiani", words: ["pizza", "pasta", "lasagna", "raviolo"] },
      { category: "Capitali europee", words: ["roma", "parigi", "madrid", "berlino"] }
    ]
  },
  "2025-05-24": {
    groups: [
      { category: "Strumenti musicali", words: ["piano", "violino", "chitarra", "flauto"] },
      { category: "Mesi", words: ["gennaio", "marzo", "luglio", "ottobre"] },
      { category: "Elementi chimici", words: ["oro", "ferro", "rame", "piombo"] },
      { category: "Animali marini", words: ["delfino", "balena", "squalo", "polpo"] }
    ]
  }
  // Aggiungi nuove date e gruppi qui
};

// 📅 Ottieni la data di oggi
const today = new Date().toISOString().split("T")[0];
const puzzle = dailyPuzzles[today];

if (!puzzle) {
  document.body.innerHTML = "<h2>Nessun puzzle disponibile per oggi!</h2>";
  throw new Error("Nessun puzzle per la data odierna.");
}

const groups = puzzle.groups.map(g => g.words);
const allWords = groups.flat().sort(() => Math.random() - 0.5);
let selected = [];
let found = 0;
let errors = 0;

function createBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  for (let word of allWords) {
    const div = document.createElement("div");
    div.className = "word";
    div.textContent = word;
    div.onclick = () => toggleSelect(div);
    board.appendChild(div);
  }
}

function toggleSelect(element) {
  if (element.classList.contains("correct-group")) return;

  element.classList.toggle("selected");

  const word = element.textContent;
  if (element.classList.contains("selected")) {
    selected.push(word);
  } else {
    selected = selected.filter(w => w !== word);
  }
}

function checkGroup() {
  if (selected.length !== 4) {
    alert("Seleziona esattamente 4 parole.");
    return;
  }

  const isCorrect = groups.some(group =>
    group.every(w => selected.includes(w))
  );

  if (isCorrect) {
    document.querySelectorAll(".selected").forEach(el => {
      el.classList.remove("selected");
      el.classList.add("correct-group");
    });
    found++;
    if (found === 4) {
      document.getElementById("message").textContent = "🎉 Hai trovato tutti i gruppi!";
    }
  } else {
    errors++;
    document.getElementById("errors").textContent = `Errori: ${errors} / 4`;
    document.querySelectorAll(".selected").forEach(el => el.classList.remove("selected"));
    if (errors >= 4) {
      document.getElementById("message").textContent = "❌ Hai esaurito i tentativi. Ecco i gruppi corretti:";
      revealSolutions();
    }
  }

  selected = [];
}

function revealSolutions() {
  document.querySelectorAll(".word").forEach(el => {
    for (let g of groups) {
      if (g.includes(el.textContent)) {
        el.className = "word correct-group";
      }
    }
  });
}

createBoard();
