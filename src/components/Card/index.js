import { memo } from 'react';

import './style.css';

const Card = ({title, img, desc}) => {
    return (
        <div className = 'card' >
            <img className = 'card-img'  alt='img of smth' src = {img} ></img>
            <div className = 'card-title' >{title}</div>
            <div className = 'card-desc' >{desc}</div>
        </div>
    );
}

export default memo(Card);