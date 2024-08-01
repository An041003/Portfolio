import React from 'react';
import './Introduction.css';
import { Link } from 'react-router-dom';
import Header from '../Navigation/header';
import I from '../../img/me.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
function Introduction(){

window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  const scrollTop = window.scrollY;

  if (scrollTop > 100) {
    header.classList.add('light-bg'); 
  } else {
    header.classList.remove('light-bg');
  }
});    

return(
    <>
    <Header/>
    <button className='back'><Link to="/about"><FontAwesomeIcon icon ={faArrowLeft}/></Link></button>
    <div className='preamble'>
        <nav className='scrolldown'>SCROLLDOWN</nav>
        <div className='preamble-text'>
            <p>A Few Things</p> 
            <div className="preamble-underline"></div>
            <p>About Me</p>
            <div className="preamble-underline"></div>
        </div>
        <img src={I} className="preamble-img" />
    </div>
    <div className='whoiam'>
        <div className='whoiam-title'>
            <p>—</p>
            <p>01</p>
            <p>WHO I AM</p>
        </div>
        
    </div>
    <div className='myfavorites'></div>
    <div className='myskill'></div>
    </>
    
)

};
export default Introduction;