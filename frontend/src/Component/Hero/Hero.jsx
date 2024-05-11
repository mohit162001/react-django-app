import React, { useContext } from 'react';
import './hero.css';
import hand_icon from '../Assests/hand_icon.png';
import arrow_icon from '../Assests/arrow.png';
import hero_img from '../Assests/hero_image.png';
import { ShopContext } from '../../Context/ShowContext';
const Hero = () => {
    const {theme}=useContext(ShopContext)
  return (
    <div className={theme==='dark-theme'?"hero-dark":"hero"}>
        <div className="hero-left">
            <h2>NEW ARRIVALS ONLY</h2>
            <div>
                <div className="hero-hand-icon">
                    <p>NEW</p>
                    <img src={hand_icon} alt="alternative" />
                </div>
                <p>collections</p>
                <p>for everyone</p>
            </div>
            <div className="hero-latest-btn">
                <div className='scroll-btn'>
                    <a href="#newcollection" className="scrollTo">Latest Collection</a>
                    <img src={arrow_icon} alt="alternative" />
                </div>
            </div>
        </div>
        <div className="hero-right">
            <img src={hero_img} alt="alternative" />
        </div>
    </div>
  )
}

export default Hero;