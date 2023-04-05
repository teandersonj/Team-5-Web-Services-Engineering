//  Conditionally render style for player status
const PlayerStatusDisplay = ({ status }) => {
    const getStatusClassName = () => {
      switch (status) {
        case 'Online':
          return 'blueStatusWide';
        case 'In-Game':
          return 'greenStatusWide';
        case 'Offline':
          return 'greyStatusWide';
        default:
          return '';
      }
    };
  
    return (
      <div className={`${getStatusClassName()}`}> {status} </div>
    );
  };

  export default PlayerStatusDisplay;