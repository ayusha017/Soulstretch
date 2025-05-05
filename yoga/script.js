document.getElementById("userForm").addEventListener("submit" , function(event){
    event.preventDefault();
});

document.getElementById("generate-btn").addEventListener('click', 
    async function generateYoga() {
    const age = document.getElementById("age").value;
    const condition = document.getElementById("disease").value;
    const yogaResults = document.getElementById("yoga-results");

    let cardContainer = document.querySelector(".card-container");
    if (!cardContainer) {
        cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container");
        yogaResults.appendChild(cardContainer);
    }

    // Clear previous results
    cardContainer.innerHTML = "";

    if (!age || !condition) {
        alert("Please enter age and select a condition.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/yoga?age=${age}&condition=${condition}`);
        const yogaData = await response.json();

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        
        const filteredYoga = yogaData.filter(yoga => yoga.condition === condition);

        if(filteredYoga.length <= 0){
            yogaResults.innerHTML = "<p>No yoga poses found for this diseases</p>";
            return;
        }
        
        // Populate Yoga Cards
        filteredYoga.forEach(yoga => {
            const card = document.createElement("div");
            card.classList.add("card");

            const imageUrl = yoga.imageUrl && yoga.imageUrl.trim() !== "" ? yoga.imageUrl : "../bg.jpeg";
            const pageUrl = yoga.pageUrl && yoga.pageUrl.trim() !== "" ? yoga.pageUrl : "../bg.jpeg";
            console.log(imageUrl);
            
            card.innerHTML = `
                <article class="card-article">
                    <img src="${imageUrl}" alt="${yoga.title}" class="card-img">
                    <div class="card-data">
                        <h2 class="card-title">${yoga.title}</h2>
                        <p class="card-description">${yoga.description}</p>
                        <a href="${pageUrl}" class="card-button">Read More</a>
                    </div>
                </article>
            `;

            
            cardContainer.appendChild(card);

        });

        // Show Yoga Section
    } catch (error) {
        console.error("Error fetching yoga recommendations:", error);
    }
});
