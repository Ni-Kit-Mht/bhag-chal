const Cell = ({ value, onClick }) => {
    return (
      <div
        onClick={onClick}
        style={{
          width: '60px',
          height: '60px',
          backgroundColor: '#f0d9b5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer'
        }}
      >
        {value === 'bhag' && (
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'red'
          }} />
        )}
        {value === 'bhakra' && (
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'black'
          }} />
        )}
      </div>
    );
  };
  
  export default Cell;