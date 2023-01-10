import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, errorDesc: "" };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.

      return { hasError: true, errorDesc: error };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.error(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
            <div>
              Ups, ha habido un error.
            </div>
        ) 
      }
  
      return this.props.children; 
    }
  }

  export default ErrorBoundary;