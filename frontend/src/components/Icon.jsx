import React from 'react';

const statusMap = {
    'send': {
        logo: '/assets/img/send.svg#send',
        alt: '🕑',
    },
    'back': {
        logo: '/assets/img/back.svg#back',
        alt: '🕑',
    },
    'add': {
        logo: '/assets/img/add.svg#add',
        alt: '🕑',
    },
}

const Icon = ({icon, className, style}) => {
    const {logo, alt} = statusMap[icon];
    return (
        <svg className={`${className} bi-icon`} style={{...style}}>
            <use href={logo}></use>
        </svg>
    );
};

export default Icon;