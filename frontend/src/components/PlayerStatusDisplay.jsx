//  Conditionally render style for player status
const PlayerStatusDisplay = ({ overrideStyle, status }) => {
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
      <div className={`flexDirectionColumn alignContentCenter justifyContentCenter ${getStatusClassName()}`} style={overrideStyle ?? {}}>
        {status}
      </div>
    );
  };

  export default PlayerStatusDisplay;
