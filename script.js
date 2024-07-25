console.log('====================================');
console.log("Connected");
console.log('====================================');

document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('_main-products-section');
    const categoryTabs = document.querySelectorAll('.navigation-item');
    let categoriesData = [];
  
    const fetchData = async () => {
      try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        const data = await response.json();
        categoriesData = data.categories;
        renderProducts(categoriesData[0].category_products); // Render initial category products
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const renderProducts = (products) => {
      productsContainer.innerHTML = '';  
      
      products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';

      const discountPercentage = ((product.compare_at_price - product.price) / product.compare_at_price * 100).toFixed(0);
        productElement.innerHTML = `
          <div class="product-image">
            <img src="${product.image}" alt="${product.title}">
            ${product.badge_text ? `<p class="product-badge">${product.badge_text}</p>` : ''}
          </div> 
          <div class="product-info">
            <div class='product-title-section'>
               <h2 class="product-title">${product.title}</h2>
               <small style='font-weight: 500;'>${product.vendor}</small>
            </div>
            <div class='product-price-section'>
                <p class='product-price'>Rs ${product.price}</p
                <div style="display: flex; align-items: center;">
                  <p class='compare-at-price'>${product.compare_at_price} </p>
                  <p style="color : #FF3737; font-weight: 700";>${discountPercentage}% </p>
                </div>
            </div>
          </div>
          <button class='add-to-cart-btn'>Add to cart</button>`;
        productsContainer.appendChild(productElement);
      });
    };
  
    const handleTabClick = (event) => {
      const selectedTab = event.currentTarget;
      const selectedCategoryName = selectedTab.querySelector('.category-name').innerText;
  
      categoryTabs.forEach(tab => tab.classList.remove('active'));
      selectedTab.classList.add('active');
  
      const selectedCategory = categoriesData.find(category => category.category_name === selectedCategoryName);
      renderProducts(selectedCategory.category_products);
    };

    categoryTabs.forEach(tab => {
      tab.addEventListener('click', handleTabClick);
    });
  
    fetchData();
  });
  