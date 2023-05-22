import React from 'react';
import {Button} from "react-bootstrap";
import Icon from "./Icon.jsx";

const IconBtn = (props) => {
    const {icon, text, ...btnProps} = props;
    return (
        <Button
            variant="outline-primary"
            {...btnProps}
        >
            <Icon icon={icon} />
            <span className="visually-hidden">{text}</span>
        </Button>
    );
};

export default IconBtn;