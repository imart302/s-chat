import React from 'react';

interface MessageProps {
  user: string;
  message: string;
  date: Date;
}

export const Message: React.FC<MessageProps> = (props) => {
  return <div>Message</div>;
};
