import React from 'react';
import styles from '@/styles/Chat.module.scss';

interface MessageProps {
  user: string;
  message: string;
  date: Date;
}

export const Message: React.FC<MessageProps> = (props) => {
  return <div className={styles.messageContainer}>
    <div className={styles.innerMessageContainer}>
      <span style={{color: "#4600c7", whiteSpace: 'pre'}}>{props.user+': '}</span>
      <p style={{wordWrap: 'break-word', width: '80%'}}>{" "}{props.message}</p>
    </div>
    <p style={{fontSize: '10px', marginLeft: '5px', marginBottom: '5px'}}>{props.date.toLocaleDateString()}{" "}{props.date.toLocaleTimeString()}</p>
  </div>;
};
