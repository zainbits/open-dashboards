import React from "react";
import { Grid } from "react-loader-spinner";
import { Flex, Code, Box } from "@chakra-ui/react";

const replacer = (_: string, value: any) => {
  if (value === null) {
    return undefined;
  }
  return value;
};

interface RightPaneProps {
  loading: boolean;
  queryResponse: any;
}

export const RightPane: React.FC<RightPaneProps> = ({ loading, queryResponse }) => {
  return (
    <Flex
      id="rightHomePane"
      p={1}
      h="full"
      w="full"
      alignItems={loading ? "center" : "start"}
      justifyContent={loading ? "center" : "start"}
    >
      {loading && (
        <Grid
          height="80"
          width="80"
          color="#4299e1"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      {!loading && (
        <Box>
          <Code fontSize="xs" whiteSpace="pre-wrap">
            {JSON.stringify(queryResponse?.data, replacer, 2)}
          </Code>
        </Box>
      )}
    </Flex>
  )
}