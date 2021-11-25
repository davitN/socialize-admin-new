import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

class GlobalLoader extends React.Component {
  start = () => this.setState({ ...this.state, showLoader: true });
  stop = () => this.setState({ ...this.state, showLoader: false });

  state = {
    showLoader: false,
  };

  render() {
    return this.state.showLoader ? (
      <div
        style={{
          position: 'fixed',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(141,141,141, 0.4)',
          top: 0,
          left: 0,
        }}
      >
        <ClipLoader color={'#d7ffd9'} loading={true} size={50} />
      </div>
    ) : null;
  }
}

export default GlobalLoader;
