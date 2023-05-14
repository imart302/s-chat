import React from 'react';

interface MessageProps {
  user: string;
  message: string;
  date: Date;
}

export const Message: React.FC<MessageProps> = (props) => {
  return <div className='d-flex' style={{width: '100%'}}>
    <span style={{color: "#4600c7", whiteSpace: 'pre'}}>{props.user+': '}</span>
    <p style={{wordWrap: 'break-word', width: '80%'}}>{" "}{props.message}</p>
  </div>;
};
