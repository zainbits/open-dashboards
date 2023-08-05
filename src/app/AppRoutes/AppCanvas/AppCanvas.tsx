import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface HomeProps {
  children: ReactNode;
}

export const AppCanvas = ({ children }: HomeProps) => {
  return (
    <Flex h="100vh" w="100vw" id="super-canvas">
      <Sidebar />
      <Flex p={2} id="appcanvas-flex" w="calc(100vw - 150px)">
        {children}
      </Flex>
    </Flex>
  );
};
