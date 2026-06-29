import React from 'react';

/**
 * Detects if the current browser session is running in incognito/private mode.
 * Uses the FileSystem API availability heuristic — incognito mode in most
 * browsers disables persistent storage APIs.
 */
function isIncognito() {
  return new Promise((resolve) => {
    const fs = window.RequestFileSystem || window.webkitRequestFileSystem;
    if (!fs) {
      resolve(false); // API not available — assume normal mode
      return;
    }
    fs(
      window.TEMPORARY,
      100,
      () => resolve(false), // success → normal mode
      () => resolve(true)   // error → likely incognito
    );
  });
}

/**
 * IncognitoWarning — Renders a dismissable banner explaining that the
 * Burner Wallet's private key is stored in localStorage, which will be
 * cleared when the incognito tab is closed, resulting in permanent loss
 * of funds.
 *
 * Usage: Insert <IncognitoWarning /> near the top of the main App layout,
 *        e.g. right below <Header /> in src/App.js.
 */
export default class IncognitoWarning extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incognito: null,   // null = checking, true = incognito, false = normal
      dismissed: false,
    };
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      isIncognito().then((result) => {
        this.setState({ incognito: result });
      });
    }
  }

  handleDismiss = () => {
    this.setState({ dismissed: true });
  };

  render() {
    const { incognito, dismissed } = this.state;

    // Still detecting or not incognito or already dismissed
    if (incognito !== true || dismissed) return null;

    return (
      <div style={{
        background: '#ff9800',
        color: '#000',
        padding: '12px 16px',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '2px solid #e68900',
      }}>
        <span>
          <strong>⚠️ Incognito Warning:</strong> You are in private browsing mode.
          Your private key is stored in your browser's temporary storage, which
          will be <u>permanently deleted</u> when you close this tab. Transfer
          funds to a permanent wallet before closing to avoid loss.
        </span>
        <button
          onClick={this.handleDismiss}
          style={{
            background: '#000',
            color: '#fff',
            border: 'none',
            padding: '4px 12px',
            cursor: 'pointer',
            borderRadius: '3px',
            marginLeft: '12px',
            whiteSpace: 'nowrap',
          }}
        >
          Got it
        </button>
      </div>
    );
  }
}
