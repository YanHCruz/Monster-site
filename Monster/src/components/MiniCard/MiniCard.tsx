import './MiniCard.css';

interface MiniCardProps {
    image: string;
    title: string;
    price: string;
    stars: string;
}

export function MiniCard({ image, title, price, stars }: MiniCardProps) {
    return (
        <div className="mini-card">
            <div className="img-box">
                <img src={image} alt={title} />
            </div>

            <div className="card-details">
                <h3>{title}</h3>
                <div className="stars">{stars}</div>
                <p className="price">{price}</p>
            </div>
        </div>
    );
}