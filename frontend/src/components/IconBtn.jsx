import React from 'react';
import {Button} from "react-bootstrap";
import Icon from "./Icon";

/*
className="p-0 border-0 align-self-center"
style={{ height: '24px', width: '24px', marginRight: '16px' }}
onClick={() => dispatch(toList())}

className="p-0 m-0 border-0"
style={{ lineHeight: '0px', height: '24px', width: '24px' }}
id="addChanel"
onClick={createChannel}

className="message-btn"
style={{ lineHeight: '0px'}}
type="submit"
disabled={message === ''}


*/

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