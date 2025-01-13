new Swiper('.card-wrapper', {
    loop : true,

    pagination:{
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },

    navigation:{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints:{
        0: {
            slidePerView : 1
        },
        768: {
            slidePerView : 2
        },
        1024: {
            slidePerView : 3
        },
    }
});