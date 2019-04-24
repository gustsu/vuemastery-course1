var app = new Vue({
    el: '#app',
    data: {
        product: 'Sherbert Socks',
        inStock: true,
        image: './assets/img/socks1.jpg',
        link: 'https://www.gabrielbrand.com/collections/accesories',
        details: ['One size fits most', '100% Cotton'],
        variants: [
            {
                id: 1,
                color: 'White'
            },
            {
                id: 2,
                color: 'Blue'
            }
        ],
        cart: 0
    } 
})