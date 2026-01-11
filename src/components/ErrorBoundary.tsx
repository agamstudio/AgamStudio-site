import React from "react";
import { Button } from "@/components/ui/button";

type ErrorBoundaryProps = {
  name?: string;
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: unknown;
};

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.error("[ErrorBoundary]", this.props.name ?? "component", error);
  }

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto glass-strong rounded-2xl p-8 border border-border/40">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            משהו קרס בחלק הזה של הדף
          </h2>
          <p className="text-muted-foreground mb-6">
            {this.props.name ? `Section: ${this.props.name}` : ""} אפשר לרענן או להמשיך לגלול – שאר האתר עדיין אמור לעבוד.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button variant="default" onClick={this.handleReload}>
              רענון
            </Button>
            <Button variant="secondary" onClick={() => this.setState({ hasError: false, error: undefined })}>
              נסה שוב
            </Button>
          </div>
        </div>
      </section>
    );
  }
}
