import React from "react";
import InternalServerErrorPage from "../components/InternalServerErrorPage";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Just log for now, could be reported elsewhere
    console.error(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <InternalServerErrorPage
          logo={this.props.children?.props?.logo}
          description={this.state.error?.message}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
