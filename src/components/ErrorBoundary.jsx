import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="fold" style={{ padding: '4rem', textAlign: 'center', color: '#ff4444' }}>
          <h2>UI Component Failed to Load</h2>
          <p>{this.state.error?.message}</p>
          <button 
            className="btn-primary futuristic-btn"
            onClick={() => this.setState({ hasError: false })}
            style={{ marginTop: '2rem' }}
          >
            Retry
          </button>
        </section>
      );
    }
    return this.props.children;
  }
}
