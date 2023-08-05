import { useState, useRef, useEffect, ReactNode } from "react";
import { Box, Flex, useTheme } from "@chakra-ui/react";

// A custom hook to get the mouse position relative to an element
const useMousePosition = (element: HTMLElement | null) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const updateMousePosition = (ev: MouseEvent) => {
    if (element) {
      const rect = element.getBoundingClientRect();
      setMousePosition({
        x: ev.clientX - rect.left,
        y: ev.clientY - rect.top,
      });
    }
  };

  useEffect(() => {
    if (element) {
      element.addEventListener("mousemove", updateMousePosition);
    }
    return () => {
      if (element) {
        element.removeEventListener("mousemove", updateMousePosition);
      }
    };
  }, [element]);

  return mousePosition;
};

// A custom hook to get the size of an element
const useElementSize = (element: HTMLElement | null) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const updateSize = () => {
    if (element) {
      setSize({
        width: element.offsetWidth,
        height: element.offsetHeight,
      });
    }
  };

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [element]);

  return size;
};

interface ResizableSplitPaneProps {
  children: ReactNode[]; // The two sections to be rendered
}

export const Experiments = ({ children }: ResizableSplitPaneProps) => {
  const theme = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const [resizing, setResizing] = useState(false);
  const mousePosition = useMousePosition(containerRef.current);
  const containerSize = useElementSize(containerRef.current);
  const initialRatio: number =
    parseFloat(localStorage.getItem("split-ratio") || "0.5") || 0.5;
  const [newRatio, setNewRatio] = useState(initialRatio);
  const [direction, setDirection] = useState<"row" | "column">("row");

  useEffect(() => {
    if (containerSize.width > containerSize.height && resizing) {
      setNewRatio(mousePosition.x / containerSize.width);
      localStorage.setItem("split-ratio", newRatio.toString());
    } else if (containerSize.width < containerSize.height && resizing) {
      setNewRatio(mousePosition.y / containerSize.height);
      localStorage.setItem("split-ratio", newRatio.toString());
    }
  }, [mousePosition]);

  useEffect(() => {
    setDirection(containerSize.width > containerSize.height ? "row" : "column");
  }, [containerSize]);

  const cursor = direction === "row" ? "col-resize" : "row-resize";
  const ratio = Math.max(0.2, Math.min(0.8, newRatio));
  return (
    <Flex
      ref={containerRef}
      direction={direction}
      height="full"
      width="full"
      id="Experiments-Flex"
      onMouseUp={() => setResizing(false)}
    >
      <Box flex={ratio} mr={4} overflow="auto">
        {children && (children[0] ?? "default value")}
      </Box>
      <Flex
        ref={handleRef}
        direction={direction === "row" ? "column" : "row"}
        align="center"
        justify="center"
        bg={resizing ? "gray.400" : "gray.100"}
        _hover={{ bg: resizing ? "gray.400" : "gray.300" }}
        onMouseDown={() => setResizing(true)}
        cursor={cursor}
        width={direction === "row" ? theme.space[resizing ? 4 : 2] : "100%"}
        height={direction === "column" ? theme.space[resizing ? 4 : 2] : "100%"}
      />
      <Box flex={1 - ratio} overflow="auto" ml={4}>
        {children && (children[1] ?? "default value")}
      </Box>
    </Flex>
  );
};
