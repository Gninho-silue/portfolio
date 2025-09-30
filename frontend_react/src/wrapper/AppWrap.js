import React from 'react';
import { NavigationDots, SocialMedia } from '../components';


const AppWrap =  (Component, idName, classNames) => function HOC() {
    const year = new Date().getFullYear();

  return (
    <div id={idName} className={`app__container ${classNames}`}>
        <SocialMedia />

        <div className='app__wrapper app__flex'>
            <Component />
            <div className='copyright'>
                <p className='p-text'> Silue © All rights reserved</p>
                <p className='p-text'>{year}</p>
            </div>
        </div>
        <NavigationDots active={idName} />
    </div>
  );
};

export default AppWrap
