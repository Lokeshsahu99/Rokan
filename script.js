document.addEventListener("DOMContentLoaded", function () {
    const shopContainer = document.getElementById("shop-container");
    const filterSelect = document.getElementById("air-filter");

    function loadProducts(filter = "all") {
        fetch("products.json") // Assuming the product data is stored in products.json
            .then(response => response.json())
            .then(products => {
                shopContainer.innerHTML = "";
                products.filter(product => filter === "all" || product.airQuality === filter)
                    .forEach(product => {
                        const productCard = `
                            <div class="col-md-4">
                                <div class="card">
                                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                                    <div class="card-body">
                                        <h5 class="card-title">${product.name}</h5>
                                        <p class="card-text">${product.description}</p>
                                        <p class="card-text"><strong>$${product.price.toFixed(2)}</strong></p>
                                        <a href="#" class="btn btn-primary">Add to Cart</a>
                                    </div>
                                </div>
                            </div>
                        `;
                        shopContainer.innerHTML += productCard;
                    });
            })
            .catch(error => console.error("Error loading products:", error));
    }

    filterSelect.addEventListener("change", function () {
        loadProducts(this.value);
    });

    loadProducts(); // Load all products on page load
});
