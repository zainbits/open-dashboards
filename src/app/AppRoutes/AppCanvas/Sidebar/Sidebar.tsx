import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SidebarButton = ({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const variant = location.pathname === to ? "solid" : "outline";
  return (
    <Button
      borderRadius={0}
      // colorScheme="brand"
      onClick={() => navigate(to)}
      size="sm"
      w="full"
      variant={variant}
    >
      {children}
    </Button>
  );
};

export const Sidebar = () => {
  const [sidebarExpand, setSidebarExpand] = useState<boolean>(false);
  return (
    <Flex
      bg="blue.400"
      m="2px"
      direction="column"
      transition="width 0.1s ease-in-out"
      w={sidebarExpand ? "350px" : "150px"}
      justifyContent={"space-between"}
    >
      <VStack w="full" p="20px">
        <SidebarButton to="/">
          <Text noOfLines={1}>Home</Text>
        </SidebarButton>
        {/* <SidebarButton to="/alpha">
          <Text noOfLines={1}>Alp</Text>
        </SidebarButton> */}
      </VStack>
      <VStack p={0}>
        {/* <Button borderRadius={0} w="full">
          Footer
        </Button> */}
        <Button
        bg="gray.200"
          borderRadius={0}
          alignSelf="flex-end"
          mr={-4}
          mb={4}
          w={6}
          h={6}
          onClick={() => setSidebarExpand(!sidebarExpand)}
        >
          {sidebarExpand ? "<" : ">"}
        </Button>
      </VStack>
    </Flex>
  );
};
