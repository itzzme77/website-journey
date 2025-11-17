import React, { useEffect, useRef, useState } from 'react';

interface CodeEditorProps {
  initialCode: string;
  language: string;
  theme?: string;
  height?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

declare global {
  interface Window {
    monaco: any;
    require: any;
  }
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  language,
  theme = 'vs-dark',
  height = '400px',
  onChange,
  readOnly = false
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (editorRef.current) {
      // Load Monaco Editor
      if (window.require) {
        window.require.config({
          paths: { vs: 'https://unpkg.com/monaco-editor@0.44.0/min/vs' }
        });

        window.require(['vs/editor/editor.main'], () => {
          if (editorRef.current && !editor) {
            const monacoEditor = window.monaco.editor.create(editorRef.current, {
              value: initialCode,
              language: language,
              theme: theme,
              readOnly: readOnly,
              automaticLayout: true,
              fontSize: 14,
              fontFamily: 'Fira Code, JetBrains Mono, Consolas, monospace',
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              minimap: { enabled: false },
              contextmenu: false,
              selectOnLineNumbers: true,
              glyphMargin: false,
              folding: true,
              lineDecorationsWidth: 10,
              lineNumbersMinChars: 3,
              renderLineHighlight: 'line',
              scrollbar: {
                vertical: 'visible',
                horizontal: 'visible',
                useShadows: false,
                verticalHasArrows: false,
                horizontalHasArrows: false,
                verticalScrollbarSize: 8,
                horizontalScrollbarSize: 8
              },
              overviewRulerBorder: false,
              hideCursorInOverviewRuler: true,
              wordWrap: 'on',
              wrappingStrategy: 'advanced'
            });

            // Handle content changes
            if (onChange) {
              monacoEditor.onDidChangeModelContent(() => {
                onChange(monacoEditor.getValue());
              });
            }

            setEditor(monacoEditor);
            setIsLoading(false);
          }
        });
      }
    }

    return () => {
      if (editor) {
        editor.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (editor && initialCode !== editor.getValue()) {
      editor.setValue(initialCode);
    }
  }, [initialCode, editor]);

  return (
    <div className="code-editor-container" style={{ position: 'relative', height }}>
      {isLoading && (
        <div className="editor-loading" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1e1e1e',
          color: '#fff',
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="loading-spinner" style={{
              width: '20px',
              height: '20px',
              border: '2px solid #333',
              borderTop: '2px solid #06b6d4',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            Loading Code Editor...
          </div>
        </div>
      )}
      <div
        ref={editorRef}
        style={{
          width: '100%',
          height: '100%',
          border: '1px solid rgba(6, 182, 212, 0.2)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}
      />
    </div>
  );
};

export default CodeEditor;
