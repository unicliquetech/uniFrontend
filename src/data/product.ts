import footware from '@/images/footWearImg.svg'
import jew from '@/images/Jew.jpg'
import gadget from '@/images/gadget.jpg'
import skincare from '@/images/skincare.jpg'
import bags from '@/images/bags.jpg'
import food from '@/images/food.jpg'
import cloth from '@/images/cloth.jpg'
import books from '@/images/books.jpg'

interface Products  {
    id: number
    productName: string
    description: string
    desctwo:string
    image01: string
}

const Product: Products[] = [
    {
        id: 1,
        productName: "Footware",
        description: "Step into your wildest dream with our shoes Dive Deeper into Style",
        desctwo: "Message Our Distinctive Vendors for Exclusive Choices!",
        image01: footware 
    },
    {
        id: 2,
        productName: "Jewelries",
        description: "Unleash your inner radiance. Explore our exquisite jewelry collection and discover pieces designed to make your style dreams a reality.",
        desctwo: "Dive deeper into luxury: browse unique designs from our independent sellers.",
        image01: jew 
    },
    {
        id: 3,
        productName: "Gadgets",
        description: "Upgrade your world. Explore the latest and greatest gadgets designed to streamline your life and fuel your passions.", 
        desctwo: "Discover innovative tech from cutting-edge brands and unleash your full potential.",
        image01: gadget
    },
    {
        id: 4,
        productName: "Skincare",
        description: "Unveil your best skin. Explore our luxurious skincare collection and discover a routine tailored to your unique needs.",
        desctwo: "Experience the transformative power of natural ingredients and achieve a radiant, healthy glow.",
        image01: skincare
    },
    {
        id: 5,
        productName: "Bags",
        description: "Find your perfect match. Explore our diverse selection of stylish bags designed to complement your every look.",
        desctwo: "From everyday essentials to statement pieces, discover the perfect bag to carry you through life's adventures.",
        image01: bags
    },
    {
        id: 6,
        productName: "Food",
        description: "Indulge your taste buds. Explore a world of culinary delights and discover flavors that will tantalize your senses." ,
        desctwo: "From gourmet meals to international cuisine, embark on a delicious journey and savor every bite.",
        image01: food
    },
    {
        id: 7,
        productName: "Clothes",
        description: "Express yourself with style. Explore our vast collection of trendy and timeless clothing designed to flatter every figure.",
        desctwo: "Discover the perfect outfit for any occasion and unleash your unique style identity.",
        image01: cloth
    },
    {
        id: 8,
        productName: "Books",
        description: "Get lost in a world of stories. Explore our curated selection of captivating books and discover tales that will transport you to new worlds.",
        desctwo: "Dive into thrilling adventures, heartwarming narratives, and thought-provoking ideas. Let your imagination soar!",
        image01: books
    },
    
]

export default Product 