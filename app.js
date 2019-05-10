Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image flex-item">
            <img v-bind:src="image" />
        </div>
        <div class="product-info flex-item">
            <h1>{{title}}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else class="out-of-stock">Out of Stock</p>
            <p>Shipping: {{shipping}}</p>
            <ul>
            <li v-for="detail in details">{{ detail }}</li>
            </ul>
            <div v-for="(variant, index) in variants" 
                v-bind:key="variant.id"
                class="color-box"
                v-bind:style="{ backgroundColor: variant.color}"
                @mouseover="updateProduct(index)">
            </div>
            <button v-bind:disabled="!inStock"  v-bind:class="{ disabledButton: !inStock }" v-on:click="addToCart">Add to Cart</button>
        </div>
        <div class="reviews flex-item">
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul>
            <li v-for="review in reviews">
            <p>{{ review.name }}</p>
            <p>Rating: {{ review.rating }}</p>
            <p>{{ review.review }}</p>
            </li>
            </ul>
        </div>

        <product-review @review-submitted="addReview"></product-review>
    </div>
    `,
    data: function(){
        return {
            brand: 'Gabriel',
            product: 'Socks',
            selectedVariant: 0,
            link: 'https://www.gabrielbrand.com/collections/accesories',
            details: ['One size fits most', '100% Cotton'],
            variants: [
                {
                    id: 1,
                    color: '#ffffff',
                    image: './assets/img/socks1.jpg',
                    quantity: 10
                },
                {
                    id: 2,
                    color: '#0000ff',
                    image: './assets/img/socks2.jpg',
                    quantity: 0
                },
                {
                    id: 3,
                    color: '#fb7f00',
                    image: './assets/img/socks3.jpg',
                    quantity: 20
                }
            ],
            reviews: []
        }
    }, 
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        updateProduct(i) {
            this.selectedVariant = i
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        }

    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        shipping() {
            return this.premium ? 'Free' : '$2.99'
        }
    }
})

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

        <p v-if="errors.length">
            <strong>Please correct:</strong>
            <ul>
                <li v-for="error in errors">
                    {{error}}
                </li>
            </ul>
        </p>

        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name" placeholder="name">
        </p>
        
        <p>
            <label for="review">Review:</label>      
            <textarea id="review" v-model="review"></textarea>
        </p>
        
        <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
        </p>
            
        <p>
        <input type="submit" value="Submit">  
        </p>    
    
    </form>
    `,
    methods: {
        onSubmit() {
            this.errors = [] //empty out the errors
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            }
            else {
                if (!this.name) { this.errors.push('Name is Required') }
                if (!this.review) { this.errors.push('Review is Required') }
                if (!this.rating) { this.errors.push('Rating is Required') }
            }
        }
    },
    data() {
      return {
        name: null,
        review: null,
        rating: null,  
        errors: []
      }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        }
    }
})