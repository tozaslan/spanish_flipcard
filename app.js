const apiKey = "AIzaSyCBaH3sj_WT0u9ISgg9kkrSgopml8frIME"; // Replace with your Google Sheets API key
const spreadsheetId = "1fWComR-IhpMiLuikks3WifmwKHGO0dc6Vz4bUfzQLeI"; // Replace with your Spreadsheet ID
const range = "use_this"; // Adjust if your sheet has a different name or range

async function loadFlashcards() {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`
    );
    const data = await response.json();

    if (!data.values) {
      document.getElementById('flashcards-container').innerText = "No data found.";
      return;
    }

    const flashcardsContainer = document.getElementById("flashcards-container");
    flashcardsContainer.innerHTML = ""; // Clear the loading text

    // Each row contains a Spanish word in the first column and its English translation in the second column
    data.values.forEach(row => {
      const spanish = row[0];
      const english = row[1];

      const flashcard = document.createElement("div");
      flashcard.className = "flashcard";

      const front = document.createElement("div");
      front.className = "front";
      front.textContent = spanish;

      const back = document.createElement("div");
      back.className = "back";
      back.textContent = english;

      flashcard.appendChild(front);
      flashcard.appendChild(back);

      flashcard.addEventListener("click", () => {
        // Toggle visibility of front and back on click
        front.style.display = front.style.display === "none" ? "block" : "none";
        back.style.display = back.style.display === "none" ? "block" : "none";
      });

      flashcardsContainer.appendChild(flashcard);
    });
  } catch (error) {
    console.error("Error loading flashcards:", error);
    document.getElementById("flashcards-container").innerText = "Failed to load flashcards.";
  }
}

loadFlashcards();