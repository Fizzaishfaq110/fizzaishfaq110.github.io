class car {
    constructor(licensePlate, maker, model, owner, price, color, year) {
        this.licensePlate = licensePlate;
        this.maker = maker;
        this.model = model;
        this.owner = owner;
        this.price = parseFloat(price);
        this.color = color;
        this.year = parseInt(year);
    }
    discount() {
        const currentYear = new Date().getFullYear();
        const diff = currentYear - this.year;
        if (diff > 10) {
            return (this.price * 0.85).toFixed(2);
        }
        return null;
    }

    displayPrice() {
        const discountedPrice = this.discount();
        if (discountedPrice) {
            return `Original Price: ${this.price.toFixed(2)}€ and Discounted Price: ${discountedPrice}€`;
        }
        return `${this.price.toFixed(2)}€`;
    }
}
let cars = []; //array

// window.onload = function () {
//     const storedCars = localStorage.getItem("cars");
//     if (storedCars) {
//         cars = JSON.parse(storedCars);
//     } else {
//         cars = [];
//     }
//     updateCarTable();
// };

const formSubmit = document.getElementById("form")
formSubmit.addEventListener("submit", function (e) {
    e.preventDefault();


    const licensePlate = document.getElementById("licensePlate").value;
    const maker = document.getElementById("maker").value;
    const model = document.getElementById("model").value;
    const owner = document.getElementById("owner").value;
    const price = document.getElementById("price").value;
    const color = document.getElementById("color").value;
    const year = document.getElementById("year").value;

    const errorDiv = document.getElementById("error");
    errorDiv.innerHTML = '';

    if (isNaN(price) || price <= 0) {
        errorDiv.innerHTML = "Price can not be negative or zero";
        return;
    }

    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 1886 || year > currentYear) {
        errorDiv.innerHTML = `Enter a valid year between 1886 and ${currentYear}`;
        return;
    }

    let newCar = new car(licensePlate, maker, model, owner, price, color, year);
    cars.push(newCar);
    // saveCarsToLocalStorage();
    updateCarTable();
    document.getElementById("form").reset();



});


function searchCar() {
    let searchPlate = document.getElementById("searchLicensePlate").value;
    searchLicensePlate.innerHTML = '';
    let searchResultDiv = document.getElementById("searchResult");
    searchResultDiv.innerHTML = '';
    let carFound = cars.find(car => car.licensePlate.toLowerCase() === searchPlate.toLowerCase());

    if (carFound) {
        const discountedPrice = carFound.discount();
        searchResultDiv.innerHTML = `Car Details<br> Maker: ${carFound.maker}<br> Model: ${carFound.model}<br> Owner:${carFound.owner}<br> Year: ${carFound.year}<br> Price: ${discountedPrice ? `Original: ${carFound.price.toFixed(2)}€, Discounted: ${discountedPrice}€` : `${carFound.price.toFixed(2)}€`}`;
    } else {
        searchResultDiv.innerHTML = "No car found with this license plate";
    }
}


function updateCarTable() {
    let carTableBody = document.getElementById("table").getElementsByTagName("tbody")[0];

    let rows = '';
    cars.forEach((car, index) => {
        rows += `
        <tr>
            <td>${car.licensePlate}</td>
            <td>${car.maker}</td>
            <td>${car.model}</td>
            <td>${car.owner}</td>
            <td>${car.displayPrice()}</td>
            <td>${car.year}</td>
            <td>${car.color}</td>
            <td> <button onclick="deleteCar(${index})">Delete</button> </td>
        </tr>
        `;
    });

    carTableBody.innerHTML = rows;
}

function deleteCar(index) {
    cars.splice(index, 1);
    // saveCarsToLocalStorage();
    updateCarTable();
    alert("The car's data will be deleted");
}

// function saveCarsToLocalStorage() {
//     localStorage.setItem("cars", JSON.stringify(cars));
// }
