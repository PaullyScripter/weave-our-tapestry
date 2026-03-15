import { useEffect, useRef, useState } from "react";

type WindowProps = {
  title: string;
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
  initialWidth?: number;
  initialHeight?: number;
  onClose?: () => void;
};

export function Window({
  title,
  children,
  initialX = 80,
  initialY = 80,
  initialWidth = 700,
  initialHeight = 500,
  onClose,
}: WindowProps) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({
    width: initialWidth,
    height: initialHeight,
  });

  const dragRef = useRef({
    dragging: false,
    offsetX: 0,
    offsetY: 0,
  });

  const resizeRef = useRef({
    resizing: false,
    startX: 0,
    startY: 0,
    startWidth: initialWidth,
    startHeight: initialHeight,
  });

  function startDrag(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    dragRef.current.dragging = true;
    dragRef.current.offsetX = e.clientX - pos.x;
    dragRef.current.offsetY = e.clientY - pos.y;
  }

  function startResize(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    resizeRef.current.resizing = true;
    resizeRef.current.startX = e.clientX;
    resizeRef.current.startY = e.clientY;
    resizeRef.current.startWidth = size.width;
    resizeRef.current.startHeight = size.height;
  }

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (dragRef.current.dragging) {
        setPos({
          x: Math.max(0, e.clientX - dragRef.current.offsetX),
          y: Math.max(0, e.clientY - dragRef.current.offsetY),
        });
      }

      if (resizeRef.current.resizing) {
        const dx = e.clientX - resizeRef.current.startX;
        const dy = e.clientY - resizeRef.current.startY;

        setSize({
          width: Math.max(320, resizeRef.current.startWidth + dx),
          height: Math.max(220, resizeRef.current.startHeight + dy),
        });
      }
    }

    function onMouseUp() {
      dragRef.current.dragging = false;
      resizeRef.current.resizing = false;
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [pos.x, pos.y, size.width, size.height]);

  return (
    <div
      className="window-tab"
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        width: size.width,
        height: size.height,
        border: "1px solid #999",
        borderRadius: 8,
        background: "#fff",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        overflow: "hidden",
      }}
    >
      <div
        className="window-titlebar"
        onMouseDown={startDrag}
        style={{
          padding: "10px 12px",
          background: "#f3f3f3",
          borderBottom: "1px solid #ddd",
          cursor: "move",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          userSelect: "none",
          fontWeight: 700,
        }}
      >
        <span>{title}</span>

        {onClose && (
          <button
            type="button"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={onClose}
            style={{
              border: "1px solid #ccc",
              background: "#fff",
              borderRadius: 6,
              padding: "4px 8px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        )}
      </div>

      <div
        className="window-content"
        onMouseDown={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          padding: 12,
          height: "calc(100% - 48px)",
          boxSizing: "border-box",
          overflow: "auto",
        }}
      >
        {children}
      </div>

      <div
        onMouseDown={startResize}
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: 16,
          height: 16,
          cursor: "nwse-resize",
          background: "linear-gradient(135deg, transparent 50%, #999 50%)",
        }}
      />
    </div>
  );
}