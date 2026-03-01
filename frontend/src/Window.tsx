import { useEffect, useRef, useState} from "react";

export function Window({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  const [pos, setPos] = useState({ x: 40, y: 120 });
  const [size, setSize] = useState({ w: 320, h: 220 });

  const dragState = useRef<any>(null);
  const borderSize = 6;

  function getResizeDirection(e: React.PointerEvent) {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const left = x < borderSize;
    const right = x > rect.width - borderSize;
    const top = y < borderSize;
    const bottom = y > rect.height - borderSize;

    if (top && left) return "nw";
    if (top && right) return "ne";
    if (bottom && left) return "sw";
    if (bottom && right) return "se";
    if (top) return "n";
    if (bottom) return "s";
    if (left) return "w";
    if (right) return "e";

    return null;
  }

  function onPointerDown(e: React.PointerEvent) {
    if (e.button !== 0) return;

    const dir = getResizeDirection(e);

    dragState.current = {
      mode: dir ? "resize" : "drag",
      direction: dir,
      startMouse: { x: e.clientX, y: e.clientY },
      startPos: { ...pos },
      startSize: { ...size },
    };

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  useEffect(() => {
    function onMove(e: PointerEvent) {
      const st = dragState.current;
      if (!st) return;

      const dx = e.clientX - st.startMouse.x;
      const dy = e.clientY - st.startMouse.y;

      if (st.mode === "drag") {
        setPos({
          x: st.startPos.x + dx,
          y: st.startPos.y + dy,
        });
      }

      if (st.mode === "resize") {
        let { w, h } = st.startSize;
        let { x, y } = st.startPos;

        const minW = 200;
        const minH = 120;

        if (st.direction?.includes("e")) {
          w = Math.max(minW, st.startSize.w + dx);
        }
        if (st.direction?.includes("s")) {
          h = Math.max(minH, st.startSize.h + dy);
        }
        if (st.direction?.includes("w")) {
          w = Math.max(minW, st.startSize.w - dx);
          x = st.startPos.x + dx;
        }
        if (st.direction?.includes("n")) {
          h = Math.max(minH, st.startSize.h - dy);
          y = st.startPos.y + dy;
        }

        setSize({ w, h });
        setPos({ x, y });
      }
    }

    function onUp() {
      dragState.current = null;
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  function updateCursor(e: React.PointerEvent) {
    const dir = getResizeDirection(e);

    const el = e.currentTarget as HTMLElement;

    if (!dir) {
      el.style.cursor = "default";
      return;
    }

    const map: any = {
      n: "ns-resize",
      s: "ns-resize",
      e: "ew-resize",
      w: "ew-resize",
      ne: "nesw-resize",
      sw: "nesw-resize",
      nw: "nwse-resize",
      se: "nwse-resize",
    };

    el.style.cursor = map[dir] || "default";
  }

  return (
    <div
      className="window-tab"
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        width: size.w,
        height: size.h,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={updateCursor}
    >
      <div className="window-titlebar">
        <span className="window-title">{title}</span>
      </div>

      <div className="window-content">{children}</div>
    </div>
  );
}