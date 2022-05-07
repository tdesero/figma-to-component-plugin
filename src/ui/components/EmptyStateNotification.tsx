import "./EmptyStateNotification.css";

export const EmptyStateNotification = ({ msg }) => {
  return (
    <div className="empty-state-notification">
      <div className="empty-state-notification__content">
        <div className="empty-state-notification__img">
          <div className="empty-state-notification__rectangle-780"></div>
          <div className="empty-state-notification__rectangle-779"></div>
          <div className="empty-state-notification__rectangle-782"></div>
          <div className="empty-state-notification__rectangle-781"></div>
          <div className="empty-state-notification__rectangle-783"></div>
          <svg
            className="empty-state-notification__mouse-pointer"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 2L6.71333 13.3133L8.38667 8.38667L13.3133 6.71333L2 2Z"
              fill="white"
              stroke="black"
              stroke-linecap="square"
            />
            <path
              d="M8.6665 8.6665L12.6665 12.6665"
              stroke="black"
              stroke-linecap="square"
            />
          </svg>
        </div>
        <div className="empty-state-notification__text">{msg}</div>
      </div>
    </div>
  );
};
