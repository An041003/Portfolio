import React, { useState, useEffect, useRef } from 'react';
import './myblog.css';

const ReadMore = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const textRef = useRef(null); 

useEffect(() => {
  const textElement = textRef.current;
  if (textElement) {
    let lineHeight = window.getComputedStyle(textElement).lineHeight;
    if (lineHeight === "normal") {
      lineHeight = 24; 
    } else {
      lineHeight = parseInt(lineHeight);
    }

    if (!isNaN(lineHeight)) {
      const lines = Math.ceil(textElement.scrollHeight / lineHeight);
      console.log('Giá trị lines:', lines);
      console.log('Scroll height:', textElement.scrollHeight);
      if (lines > 4) { 
        setIsExpanded(false); 
      }
    } else {
      console.error('Không thể xác định lineHeight.');
    }
  }
}, []);

      

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="read-more-container">
      <p ref={textRef} className={isExpanded ? 'text expanded' : 'text'}>
        {children}
      </p>
      {textRef.current && textRef.current.scrollHeight > 100 && ( 
        <span className="read-more-link" onClick={toggleReadMore}>
          {isExpanded ? 'Thu gọn' : 'Xem thêm'}
        </span>
      )}
    </div>
  );
};

export default ReadMore;