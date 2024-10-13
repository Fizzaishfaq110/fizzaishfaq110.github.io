const userContainer = document.querySelector(".container");
fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(users => {
        users.forEach(user => {
            const card = document.createElement("div");
            card.classList.add("user-card");
            const userAvatar = document.createElement("img");
            userAvatar.src = `https://robohash.org/${user.id}?set=set4`;
            const info = document.createElement("div");
            info.classList.add("user-info")
            const name = document.createElement("h3");
            name.textContent = user.name;
            info.appendChild(name);

            const username = document.createElement("h5");
            username.textContent = `Username : ${user.username}`;
            info.appendChild(username);
            const email = document.createElement("h5");
            email.textContent = `Email : ${user.email}`;
            info.appendChild(email);

            card.appendChild(userAvatar);
            card.appendChild(info);
            userContainer.appendChild(card);


        })



    })
    .catch(error => console.error("Error in fetching the data : ", error));