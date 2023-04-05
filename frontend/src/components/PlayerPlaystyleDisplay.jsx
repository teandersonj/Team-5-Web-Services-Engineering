// Conditionally render style for player playstyle preference
const PlayerPlaystyleDisplay = ({ playstyle }) => {
    const getPlaystyleClassName = () => {
      switch (playstyle) {
        case 'Casual':
          return 'greenStatusWide';
        case 'Semi-Casual':
          return 'blueStatusWide';
        case 'Competitive':
          return 'greyStatusWide';
        default:
          return '';
      }
    };
  
    return (
      <div className={`${getPlaystyleClassName()}`}>
        {playstyle}
      </div>
    );
  };

  export default PlayerPlaystyleDisplay;