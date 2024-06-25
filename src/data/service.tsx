import photography from '@/images/photo-graphy.jpg'
import barber from '@/images/barber.jpg'
import makeup from '@/images/makeuparrtist.jpg'
import fashion from '@/images/Fashiondesigning.jpg'
import hairStylist from '@/images/Hairstylist.jpg'
import delivery from '@/images/Deliveryservice.jpg'
import laundary from '@/images/Laundaryservice.jpg'

interface ServiceType {
    id: number
    productName: string
    description: string
    desctwo:string
    image01: any
}

const Service: ServiceType[] = [
    {
        "id": 1,
        "productName": "Photograph",
        "description": "Capturing Memories That Last Forever",
        "desctwo": "Let our photographer turn your moments into timeless treasures",
        "image01": photography
    },
    {
        "id": 2,
        "productName": "Barber",
        "description": "Sharp Look for Every Occasion",
        "desctwo": "Get a haircut that complements your style and personality. We offer a variety of cuts",
        "image01": barber
    },
    {
        "id": 3,
        "productName": "Makeup Artist",
        "description": "Enhancing Your Natural Beauty",
        "desctwo": "Our makeup artist will create the perfect look for any occasion, tailored to your unique features",
        "image01": makeup
    },
    {
        "id": 4,
        "productName": "Fashion Designing",
        "description": "Designing Your Dreams",
        "desctwo": "Our fashion designer will bring your style vision to life with custom creations that make a statement",
        "image01": fashion
    },
    {
        "id": 5,
        "productName": "Hair Stylist",
        "description": "Creating Hair Magic",
        "desctwo": "Our hair stylist will transform your hair with cuts, colors, and styles that suit your personality",
        "image01": hairStylist
    },
    {
        "id": 6,
        "productName": "Delivery Service",
        "description": "Bringing Convenience to Your Doorstep",
        "desctwo": "Fast and reliable delivery service to ensure your packages arrive safely and on time",
        "image01": delivery
    },
    {
        "id": 7,
        "productName": "Laundry Service",
        "description": "Clean Clothes, Hassle-Free",
        "desctwo": "Experience the convenience of our laundry service, providing you with fresh, clean clothes every time",
        "image01": laundary
    }
]
export default Service