import React, { useEffect, useRef } from 'react';
import './Introduction.css';
import { Link } from 'react-router-dom';
import Header from '../Navigation/header';
import I from '../../img/me.jpg';
import Pool from '../../img/pool.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import html from '../../img/html.svg';
import ps from '../../img/ps.svg';
import js from '../../img/js.svg';
import figma from '../../img/figma.svg';
import SkillProgress from './SkillProgress.js';

function Introduction() {
  const mainRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      const main = mainRef.current;
      const scrollTop = window.scrollY;

      if (header) {
        if (scrollTop > 760) {
          header.classList.add('light-bg');
        } else {
          header.classList.remove('light-bg');
        }
      }

      if (main) {
        if (scrollTop > 700) {
          main.classList.add('light-bg');
        } else {
          main.classList.remove('light-bg');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);


    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Header />
      <main ref={mainRef}>
        <button className='back'>
          <Link to="/about"><FontAwesomeIcon icon={faArrowLeft} /></Link>
        </button>
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
          <div className='my-title'>
            <p>—</p>
            <p>01</p>
            <p>WHO I AM</p>
          </div>
          <div className='whoiam-content'>
            <p>Nguyen Binh An</p>
            <p>I was born in 2003 in Hanoi. Since 2021, I have been studying in the Vietnam-Japan IT faculty at Hanoi University of Science and Technology</p>
            <p>Looking forward, my aspiration is to become a skilled web designer and developer.</p>
            <img src={Pool} className="whoiam-img" />
          </div>
        </div>
        <div className='myhobby'>
          <div className='my-title'>
            <p>—</p>
            <p>02</p>
            <p>MY HOBBY</p>
          </div>
          <div className='myhobby-content'>
            <div className='myhobby-section'>

            </div>
            <div className='myhobby-section'>

            </div>
            <div className='myhobby-section'>

            </div>
          </div>
        </div>
        <div className='myskill'>
          <div className='my-title'>
            <p>—</p>
            <p>03</p>
            <p>SKILL SET</p>
          </div>
          <div className='myskill-content'>
            <div className='myskill-col'>
              <div className='myskill-row'>
                <img src={js} alt="Javascript" className='svgicon' />
                <SkillProgress skill="Javascript" years="2 YEARS" progress={70} />
              </div>
              <div className='myskill-row'>
                <img src={html} alt="HTML/CSS" className='svgicon' />
                <SkillProgress skill="HTML/CSS" years="2 YEARS" progress={90} />
              </div>
            </div>
            <div className='myskill-col'>
              <div className='myskill-row'>
                <img src={ps} alt="Photoshop" className='svgicon' />
                <SkillProgress skill="Photoshop" years="1 MONTH" progress={30} />
              </div>
              <div className='myskill-row'>
                <img src={figma} alt="Figma" className='svgicon' />
                <SkillProgress skill="Figma" years="3 MONTH" progress={60} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <span>binhan214981@gmail.com</span>
        <span>0784073629</span>
      </footer>
    </>
  );
}

export default Introduction;
