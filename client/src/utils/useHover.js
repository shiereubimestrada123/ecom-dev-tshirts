import React, { useState, useRef, useEffect } from 'react';

const useHover = (props) => {
  const [value, setValue] = useState(false);

  const refHover = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(
    () => {
      const { current } = refHover;
      if (current) {
        current.addEventListener('mouseover', handleMouseOver);
        current.addEventListener('mouseout', handleMouseOut);

        return () => {
          current.removeEventListener('mouseover', handleMouseOver);
          current.removeEventListener('mouseout', handleMouseOut);
        };
      }
    },
    [] // Recall only if ref changes
  );

  return [refHover, value];
};

export default useHover;
