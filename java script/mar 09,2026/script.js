

// Function to generate an image based on user prompt using OpenAI's DALL-E API
async function generateImage() {
  // Get the prompt text from the input field
  let prompt = document.getElementById("prompt").value;

  // Check if prompt is empty, show alert if so
  if (prompt === "") {
    alert("Enter prompt");
    return;
  }

  // API key for OpenAI (replace with your own valid key from https://platform.openai.com/)
  const API_KEY = "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"; // Replace with your actual key

  try {
    // Send request to OpenAI's image generation API
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`  // Authenticate with API key
      },
      body: JSON.stringify({
        model: "dall-e-3",   // Use DALL-E 3 model for high-quality images
        prompt: prompt,      // The text description for the image
        size: "1024x1024"    // Image size (options: 1024x1024, 1024x1792, 1792x1024)
      })
    });

    // Parse the JSON response
    const data = await response.json();

    // Check for API errors and alert user
    if (data.error) {
      alert("Error: " + data.error.message);
      return;
    }

    // Get the generated image URL from the response
    const imageURL = data.data[0].url;

    // Create an image element and set its source
    let img = document.createElement("img");
    img.src = imageURL;
    img.alt = "Generated Image";

    // Add the image to the frame div
    document.getElementById("frame").appendChild(img);

  } catch (error) {
    // Log error to console and show alert
    console.error("Image generation failed:", error);
    alert("Failed to generate image. Check console for details.");
  }
}

// Variable to keep track of the current square element
let currentSquare = null;

// Function to add a square div to the frame
function addSquare() {
  // Create a new div element for the square
  let square = document.createElement("div");
  square.className = "square";  // Assign CSS class for styling

  // Add the square to the frame
  document.getElementById("frame").appendChild(square);

  // Set as current square for adding circles inside
  currentSquare = square;
}

// Function to add a circle inside the current square
function addCircle() {
  // Check if a square exists
  if (!currentSquare) {
    alert("Please add square first");
    return;
  }

  // Create a new div element for the circle
  let circle = document.createElement("div");
  circle.className = "circle";  // Assign CSS class for styling

  // Add the circle inside the current square
  currentSquare.appendChild(circle);
}

function addHexagon() {
  // Check if a hexagon exists
  if (!currentHexagon) {
    alert("Please add hexagon first");
    return;
  }

  // Create a new div element for the hexagon
  let hexagon = document.createElement("div");
  hexagon.className = "hexagon";  // Assign CSS class for styling

  // Add the hexagon inside the current square
  currentSquare.appendChild(hexagon);
}

function addOctagon() {
  // Check if a octagon exists
  if (!currentOctagon) {
    alert("Please add octagon first");
    return;
  }

  // Create a new div element for the octagon
  let octagon = document.createElement("div");
  octagon.className = "octagon";  // Assign CSS class for styling

  // Add the octagon inside the current square
  currentSquare.appendChild(octagon);
}

// Function to change the background color of the frame
function changeBackground() {
  // Get the color value from the input
  let color = document.getElementById("bgColor").value;

  // Apply the color to the frame's background
  document.getElementById("frame").style.background = color;
}

// Function to change the border radius (roundness) of the frame
function changeRoundness() {
  // Get the roundness value from the input
  let value = document.getElementById("roundness").value;

  // Apply the border radius to the frame
  document.getElementById("frame").style.borderRadius = value + "px";
}

// Function to clear all content from the frame
function clearCanvas() {
  // Remove all child elements from the frame
  document.getElementById("frame").innerHTML = "";
  // Reset current square
  currentSquare = null;
}

// Function to download the frame as an image (requires html2canvas library)
function downloadFrame() {
  // Use html2canvas to capture the frame as a canvas
  html2canvas(document.getElementById("frame")).then(canvas => {
    // Create a download link
    let link = document.createElement("a");
    link.download = "designframe.png";  // File name
    link.href = canvas.toDataURL();     // Convert canvas to data URL

    // Trigger the download
    link.click();
  });
}