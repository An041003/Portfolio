import React, { useState, useEffect, useRef } from 'react';
import './myblog.css';

const ReadMore = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const textRef = useRef(null); 

  useEffect(() => {
    const textElement = textRef.current;
    if (textElement) {
      const lineHeight = parseInt(window.getComputedStyle(textElement).lineHeight);
      const lines = Math.ceil(textElement.scrollHeight / lineHeight);
      if (lines > 4) { 
        setIsExpanded(false); 
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