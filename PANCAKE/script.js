const pancakeType = document.getElementById("type");
const toppings = document.querySelectorAll('input[type="checkbox"]');
const delivery = document.querySelectorAll('input[name = "delivery"]');
const nameInput = document.getElementById("customerName");
const totalPriceElement = document.getElementById("totalPrice");
const orderButton = document.getElementById("seeOrder");
const summaryDiv = document.getElementById("orderSummary");
const summaryDetails = document.getElementById("summaryDetails");

let order = [];

function calculateTotalPrice() {
    let totalPrice = parseInt(pancakeType.value);

    toppings.forEach(topping => {
        if (topping.checked) {
            totalPrice += parseInt(topping.value);
        }
    });

    delivery.forEach(option => {
        if (option.checked) {
            totalPrice += parseInt(option.value);
        }
    });

    totalPriceElement.textContent = `$${totalPrice}`;
    animatePriceChange();
    return totalPrice;
}

function animatePriceChange() {
    totalPriceElement.parentElement.classList.add('animate');
    setTimeout(() => {
        totalPriceElement.parentElement.classList.remove('animate');
    }, 300);
}

pancakeType.addEventListener('change', calculateTotalPrice);
toppings.forEach(topping => topping.addEventListener('change', calculateTotalPrice));
delivery.forEach(option => option.addEventListener('change', calculateTotalPrice));

nameInput.addEventListener('input', () => {
    const customerName = nameInput.value;
    if (customerName) {
        order[0] = customerName;
    }
});

orderButton.addEventListener('click', () => {
    const customerName = nameInput.value;
    const selectedType = pancakeType.options[pancakeType.selectedIndex].text;
    const selectedToppings = Array.from(toppings)
        .filter(topping => topping.checked)
        .map(topping => topping.id)
        .join(', ');
    const deliveryMethod = Array.from(delivery).find(option => option.checked).nextSibling.nodeValue.trim();

    const totalPrice = totalPriceElement.textContent;

    summaryDetails.innerHTML = `
        <strong>Customer Name:</strong> ${customerName}<br>
        <strong>Selected Pancake Type:</strong> ${selectedType}<br>
        <strong>Toppings:</strong> ${selectedToppings || 'None'}<br>
        <strong>Delivery Method:</strong> ${deliveryMethod}<br>
        <strong>Total Price:</strong> ${totalPrice}
    `;

    summaryDiv.style.display = 'block';
    order.push({
        customerName,
        pancakeType: selectedType,
        toppings: selectedToppings,
        deliveryMethod,
        totalPrice
    });
});


calculateTotalPrice();
