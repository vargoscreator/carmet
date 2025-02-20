document.addEventListener("DOMContentLoaded", () => {
    const langSelected = document.querySelector(".header__lang-selected");
    const langBlock = document.querySelector(".header__lang");

    langSelected.addEventListener("click", () => {
        langBlock.classList.toggle("active");
    });

    document.addEventListener("click", (event) => {
        if (!langSelected.contains(event.target) && !langBlock.contains(event.target)) {
            langBlock.classList.remove("active");
        }
    });

    const headerBurger = document.querySelector(".header__burger");
    const headerMenu = document.querySelector(".header__menu");
    const headerMenuClose = document.querySelector(".header__menu-close");
    
    headerBurger.addEventListener("click", function () {
      if (window.innerWidth < 999) {
        headerMenu.classList.toggle("active");
      }
    });
    document.addEventListener("click", function (e) {
        if (window.innerWidth < 999) {
          if (window.innerWidth < 999 && !headerMenu.contains(e.target) && e.target !== headerBurger && e.target !== headerMenuClose && !headerMenu.contains(e.target) || (e.target === headerMenu && !headerMenu.querySelector('ul').contains(e.target))) {
            headerMenu.classList.remove("active");
          }
        }
      });
    headerMenuClose.addEventListener("click", function () {
      headerMenu.classList.remove("active");
    });
    

    const basketSteps = document.querySelectorAll(".basket-step");
    const basketOrderBtns = document.querySelectorAll(".basket__order");
    const orderNextBtn = document.querySelector(".basket__order-next");
    orderNextBtn.addEventListener("click", function () {
        basketSteps[0].classList.remove("active");
        basketSteps[1].classList.add("active");
        basketOrderBtns[0].style.display = "none";
        basketOrderBtns[1].style.display = "block";
    });

    const basket = document.querySelector(".basket");
    const basketOpen = document.querySelector(".header__basket");
    const basketInner = document.querySelector(".basket__inner");
    const basketClose = document.querySelectorAll(".basket__close");
    const form = document.querySelector(".basket-form");
    const orderSendBtn = document.querySelector(".basket__order-send");
    const thanksBlock = document.querySelector(".basket__thanks");

    if (basket && basketOpen && basketInner) {
        basketOpen.addEventListener("click", function (event) {
            event.stopPropagation();
            basket.classList.toggle("show");
            basketOpen.classList.toggle("active");
        });

        basketClose.forEach(element => {
            element.addEventListener("click", function () {
                basket.classList.remove("show");
                basketOpen.classList.remove("active");
                setTimeout(() => {
                    resetBasket();
                }, 200);
            });
        });

        document.addEventListener("click", function (event) {
            if (!basketInner.contains(event.target) && !basketOpen.contains(event.target) && !event.target.classList.contains("basket__item-dell") && !event.target.classList.contains("price__table-sell")) {
                basket.classList.remove("show");
                basketOpen.classList.remove("active");
                setTimeout(() => {
                    resetBasket();
                }, 200);
            }
        });

        function resetBasket(){
            basketSteps[0].classList.add("active");
            basketSteps[1].classList.remove("active");
            thanksBlock.classList.remove("active");
            document.querySelector(".basket__bottom").classList.add("active");
            basketOrderBtns[0].style.display = "block";
            basketOrderBtns[1].style.display = "none";
        }
    }


    if (form && orderSendBtn && thanksBlock) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            // тест
            thanksBlock.classList.add("active");
            basketSteps[1].classList.remove("active");
            document.querySelector(".basket__bottom").classList.remove("active");
            form.reset();
            // тест
            
            
            // const formData = new FormData(form);
            // fetch(form.action, {
            //     method: form.method,
            //     body: formData,
            // })
            // .then(response => response.json())
            // .then(data => {
            //     if (data.success) {
            //         thanksBlock.classList.add("active");
            //         basketSteps[1].classList.remove("active");
            //         document.querySelector(".basket__bottom").classList.remove("active");
            //         form.reset();
            //     } else {
            //         alert("Ошибка при отправке данных");
            //     }
            // })
            // .catch(error => {
            //     console.error("Ошибка:", error);
            //     alert("Ошибка при отправке данных");
            // });
        });
    }


    const scrollUp = document.querySelector(".scroll-up");
    const toggleScrollUp = () => {
        if (window.scrollY > 50) {
            scrollUp.classList.add("show");
            document.querySelector(".header").classList.add("scrolled");
        } else {
            scrollUp.classList.remove("show");
            document.querySelector(".header").classList.remove("scrolled");
        }
    };
    window.addEventListener("scroll", toggleScrollUp);
    window.addEventListener("load", toggleScrollUp);
    window.addEventListener("resize", toggleScrollUp);
    scrollUp.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const cart = document.querySelector(".basket__block");
    const totalPriceEl = document.querySelector(".basket__bottom-price");
    const buttonsSell = document.querySelectorAll(".price__table-sell");
    const basketCount = document.querySelector(".header__basket span");
    const basketFormContent = document.querySelector(".basket-form--content");
    
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }
    
    function updateTotalPrice() {
        let total = cartItems.reduce((sum, item) => sum + (item.price * item.amount), 0);
        totalPriceEl.textContent = `${total.toLocaleString()} ₴`;
    }
    
    function updateBasketForm() {
        if (cartItems.length === 0) {
            basketFormContent.classList.remove("active");
        } else {
            basketFormContent.classList.add("active");
        }
        basketCount.textContent = cartItems.length;
    }
    
    function renderCart() {
        cart.innerHTML = "";
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("basket__item");
            cartItem.innerHTML = `
                <div class="basket__item-top">
                    <div class="basket__item-left">
                        <div class="basket__item-icon">
                            <img src="${item.img}" alt="">
                        </div>
                        <p class="basket__item-name">${item.name} <br><span>(${item.contamination})</span></p>
                    </div>
                    <button class="basket__item-dell" data-index="${index}" type="button"></button>
                </div>
                <div class="basket__item-amount">
                    <p class="basket__item-amount--name">кількість</p>
                    <div class="basket__item-count">
                        <input type="number" class="basket__input" step="0.01" min="0.01" value="${item.amount}" data-index="${index}">
                        <p class="basket__item-measuring">тн</p>
                    </div>
                </div>
            `;
            cart.appendChild(cartItem);
        });
        updateTotalPrice();
        updateBasketForm();
    }
    
    buttonsSell.forEach(button => {
        button.addEventListener("click", (e) => {
            document.querySelector(".basket").classList.add('show')
            document.querySelector(".header__basket").classList.add('show')

            
            const itemElement = e.target.closest(".price__table-item");
            const nameEl = itemElement.querySelector(".price__table-name");
            const priceEl = itemElement.querySelector(".price__table-price");
            const imgEl = itemElement.querySelector(".price__table-icon img");
            
            
            const newItem = {
                name: nameEl.childNodes[0].textContent.trim(),
                contamination: nameEl.querySelector("span").textContent.trim(),
                price: parseFloat(priceEl.textContent.replace(/\D/g, "")),
                img: imgEl.src,
                amount: 1
            };
            
            cartItems.push(newItem);
            saveCart();
            renderCart();
        });
    });
    
    cart.addEventListener("input", (e) => {
        if (e.target.classList.contains("basket__input")) {
            let index = e.target.dataset.index;
            let newAmount = parseFloat(e.target.value);
            cartItems[index].amount = newAmount;
            saveCart();
            updateTotalPrice();
        }
    });
    
    cart.addEventListener("click", (e) => {
        if (e.target.classList.contains("basket__item-dell")) {
            let index = e.target.dataset.index;
            cartItems.splice(index, 1);
            saveCart();
            renderCart();
        }
    });
    
    renderCart();

    function clearCart() {
        cartItems = [];
        saveCart();
        renderCart();
    }
    
});
