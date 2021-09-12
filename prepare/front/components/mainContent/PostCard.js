import React, { useCallback, useState } from 'react';

import style from '../../styles/css/postCard.module.css';

const PostCard = () => {
  const [clicks, setClicks] = useState(true);
  const click = useCallback(() => {
    setClicks((prev) => !prev);
  }, [clicks]);
  return (
    <div className={style.a}>
      <div className={style.maxWidth}>
        <div>
          <h1>
            {clicks ? (
              <svg
                onClick={click}
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
              </svg>
            ) : (
              <svg
                onClick={click}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 339.467 309.273"
              >
                <g id="シンプルなフォルダアイコン2" transform="translate(0 -22.771)">
                  <path
                    id="패스_4"
                    data-name="패스 4"
                    d="M326.511,92.986A44.178,44.178,0,0,0,295.23,80.03H165.7a10.854,10.854,0,0,1-10.847-10.848V67.008a44.235,44.235,0,0,0-44.237-44.237H44.237A44.235,44.235,0,0,0,0,67.008v220.8a44.235,44.235,0,0,0,44.237,44.232H295.23a44.235,44.235,0,0,0,44.237-44.232V124.268A44.163,44.163,0,0,0,326.511,92.986ZM306.077,287.811a10.836,10.836,0,0,1-10.848,10.842H44.237A10.835,10.835,0,0,1,33.39,287.811V67.008A10.845,10.845,0,0,1,44.238,56.161h66.373a10.845,10.845,0,0,1,10.847,10.848v2.173A44.235,44.235,0,0,0,165.7,113.419H295.23a10.847,10.847,0,0,1,10.847,10.848Z"
                    transform="translate(0 0)"
                    fill="#4b4b4b"
                  />
                </g>
              </svg>
            )}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
