import React from "react";

type Props = {
  selectedUser: any;
  messageList: any;
  currentUser: any;
};

const DisplayMessages: React.FC<Props> = ({ selectedUser, messageList, currentUser }) => {
  return (
    <>
      {messageList &&
        messageList
          .filter(
            (message: any) =>
              (message.to === selectedUser?.id && message.from === currentUser?.id) ||
              (message.from === selectedUser?.id && message.to === currentUser?.id)
          )
          .map(({ message, from }: any, index: number) => {
            return (
              <React.Fragment key={index}>
                {from === currentUser?.id ? (
                  <div className="flex gap-4 self-end  break-all ">
                    <p className="self-end px-8 py-1 rounded-lg bg-secondary text-white  ">{message}</p>
                  </div>
                ) : (
                  <div className="flex gap-4 break-all">
                    <p className="text-grey px-8 py-1 rounded-lg bg-white">{message}</p>
                  </div>
                )}
              </React.Fragment>
            );
          })}
    </>
  );
};

export default DisplayMessages;
