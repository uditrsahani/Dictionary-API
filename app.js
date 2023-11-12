alert(
  "This website is made by a Siam University student. This is not the university's official website."
);
document.getElementById("fetchDataBtn").addEventListener("click", fetchData);

function fetchData() {
  // Replace 'https://api.example.com/data' with the actual URL of your API
  let word = document.getElementById("search").value;
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      // Handle the fetched data
      // console.log(data);
      console.log(data);
      const word = data[0].word;
      const phonetic = data[0].phonetic;
      const audio = data[0].phonetics[0].audio;
      // Assuming there's always at least one phonetic entry
      const origin = data[0].origin;

      //DOM Variable
      //accessing source URL

      const output = document.getElementById("dictionary-container");
      const wordOutput = document.getElementById("word");
      const phoneticOutput = document.getElementById("phonetic");
      const audioOutput = document.getElementById("audio");
      const meaningOutput = document.getElementById("meaning");
      const exampleOutput = document.getElementById("example");
      const audiorror = document.getElementById("audioerror");
      // const readmore = document.getElementById("readmore");
      //source URL
      const sourceURL = data[0].sourceUrls[0];
      console.log(sourceURL);

      //Displaying ouput
      wordOutput.innerText = "Word: " + word;

      if (phonetic) {
        phoneticOutput.innerText = "Phonetic: " + phonetic;
      }

      //displaying audio if it is available
      audio.split(".");
      if (audio.length >= 1) {
        console.log("Audio is okay");
        audioOutput.style.display = "";
        audioOutput.src = audio;
        audiorror.innerText = "";
      } else {
        //hiding audio when it is not available
        audioOutput.style.display = "none";
        audiorror.innerText = "Audio: Not available for this word.";
      }

      //displaying source URL:
      const container1 = document.getElementById("containerLink");
      container1.innerHTML = "";
      // const readat = `Read about ${word} at:`;
      const link = document.createElement("a");
      link.textContent = `Read more about ${word} at: ${sourceURL}`;
      link.setAttribute("href", sourceURL);
      container1.appendChild(link);
      console.log(link);

      //accessing definition array
      const definition = data[0].meanings[0].definitions;

      //creating defition div
      const container = document.getElementById("container2");

      //looping through the definitions
      container.innerHTML = "";
      const title = document.createElement("h4");
      title.textContent = "Meanings & Definitions";
      container.appendChild(title);
      definition.forEach((defi, index) => {
        const paragraph = document.createElement("li");
        paragraph.textContent = defi.definition;
        container.appendChild(paragraph);
      });
    })
    .catch((error) => {
      // Handle errors
      const wordOutput = document.getElementById("word");
      const phoneticOutput = document.getElementById("phonetic");
      const audioOutput = document.getElementById("audio");
      const meaningOutput = document.getElementById("meaning");

      wordOutput.innerText = "Word: " + "Please enter a correct word!";
      console.error("Error fetching data:", error);
      audioOutput.style.display = "none";
      phoneticOutput.innerText = "Phonetic: ";
      meaningOutput.innerText = "Meaning: ";
    });
}
