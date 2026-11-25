'use client';

import { PDFViewer } from '@embedpdf/react-pdf-viewer';

export default function PdfTopPreview({ fileUrl }: { fileUrl: string }) {
  const toolbarOffsetPx = 48; // Adjust to match the exact toolbar height

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl select-none pointer-events-none">
      <div
        style={{
          position: 'absolute',
          top: `-${toolbarOffsetPx}px`,
          left: 0,
          right: 0,
          height: `calc(900px)`,
        }}
      >
        <PDFViewer
          config={{
            src: fileUrl,
          }}
          style={{ width: '100%', height: '100%' }}
        />
        
      </div>
    </div>
  );
}