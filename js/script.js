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
            if (!basketInner.contains(event.target) && !basketOpen.contains(event.target)) {
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
});
