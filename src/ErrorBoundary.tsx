import React, { PropsWithChildren } from "react";

interface IProps {
}

interface IState {
  hasError: boolean;
  error: any;
}

export class ErrorBoundary extends React.Component<IProps & PropsWithChildren, IState> {
  constructor(props: { [key: string]: any }) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      console.log('→→→→→→→→→→', this.state.error);
      return (<p>Error</p>)
    }

    return this.props.children;
  }
}