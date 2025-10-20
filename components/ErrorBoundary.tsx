import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  // FIX: Replaced state property initializer with a constructor to explicitly initialize state
  // and ensure `this.props` is correctly recognized by TypeScript. This resolves the error
  // "Property 'props' does not exist on type 'ErrorBoundary'".
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  // FIX: Added explicit ReactNode return type to the render method. This helps resolve a TypeScript
  // type inference issue where `this.props` was not being correctly recognized on the class instance.
  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Terjadi Kesalahan Aplikasi</h1>
            <p className="text-gray-700 mb-4">
              Maaf, aplikasi mengalami masalah dan tidak dapat dimuat. Hal ini seringkali disebabkan oleh kesalahan konfigurasi (misalnya, kunci API yang hilang).
            </p>
            <p className="text-gray-600">
              Silakan coba segarkan halaman. Jika masalah berlanjut, hubungi dukungan teknis.
            </p>
            {this.state.error && (
              <pre className="mt-6 p-4 bg-gray-50 text-left text-sm text-red-700 rounded-md overflow-auto">
                {this.state.error.message}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
