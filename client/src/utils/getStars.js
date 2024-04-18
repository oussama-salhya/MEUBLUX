import { BsStarFill, BsStar } from 'react-icons/bs'
export const getStars = (rating, hover) => {
    if (hover) {
        return Array.from({ length: 5 }, (_, index) => {
            const ratingValue = index + 1;
            return ratingValue <= rating || ratingValue <= hover ? <BsStarFill key={index} /> : <BsStar key={index} />
        })
    }
    return Array.from({ length: 5 }, (_, index) => {
        return (
            rating >= (index + 1) ? <BsStarFill key={index} /> : <BsStar key={index} />

        )
    })
}