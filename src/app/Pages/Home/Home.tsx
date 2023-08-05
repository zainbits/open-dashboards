import {
  Box,
  IconButton,
  // Flex,
  HStack,
  Select,
  // VStack,
  Code,
  Flex,
  // useMediaQuery,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import {
  AiOutlineDelete,
  AiOutlinePlayCircle,
  AiOutlinePlus,
} from "react-icons/ai";
import { observer } from "mobx-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Grid } from "react-loader-spinner";

import { Input, Experiments } from "../../Components";
import { QueryModel, queryStore } from "../../xstore";

const QueryForm = ({
  query,
  setRightPaneData,
  setLoading,
}: {
  query: QueryModel;
  setRightPaneData: Dispatch<SetStateAction<any>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (fieldValues: FieldValues) => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      method: fieldValues.method,
      request: fieldValues.request,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    fetch("http://127.0.0.1:8000/opensearch-eu", requestOptions)
      .then((response) => response.json())
      .then((result) => setRightPaneData(result))
      .catch((error) => setRightPaneData({ data: error.toString() }));
    setLoading(false);
  };

  return (
    <HStack as="form" alignItems="flex-start" onSubmit={handleSubmit(onSubmit)}>
      <Select
        defaultValue={query.method}
        {...register("method", {
          onChange: (e) => {
            console.log(e);
          },
        })}
        w={40}
        size="sm"
        justifySelf={"flex-start"}
      >
        <option value="get">GET</option>
        <option value="put">PUT</option>
        <option value="delete">DELETE</option>
      </Select>
      <Input
        rightElement={
          <Flex flexDirection="row" mr={6}>
            <IconButton
              variant="ghost"
              onClick={() => queryStore.deleteQuery(query)}
              size="xs"
              icon={<AiOutlineDelete />}
              aria-label="run"
              _hover={{ bg: "red.400", color: "white" }}
            />
            <IconButton
              variant="ghost"
              size="xs"
              icon={<AiOutlinePlayCircle />}
              type="submit"
              aria-label="run"
              _hover={{ bg: "blue.400", color: "white" }}
            />
          </Flex>
        }
        {...register("request", {
          required: "This field is required!",
          value: query.path,
        })}
        error={errors?.request?.message?.toString()}
      />
    </HStack>
  );
};

const _Home = () => {
  // const [isLargerThan768] = useMediaQuery("(min-width: 1180px)");
  const [rightPaneDate, setRightPaneData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const replacer = (_: string, value: any) => {
    if (value === null) {
      return undefined;
    }
    return value;
  };
  return (
    <Experiments>
      <Box id="leftHomePane">
        {queryStore.queryList.map((query, key) => {
          return (
            <QueryForm
              query={query}
              setRightPaneData={setRightPaneData}
              setLoading={setLoading}
              key={key}
            />
          );
        })}
        <IconButton
          variant="ghost"
          size="xs"
          icon={<AiOutlinePlus />}
          form="mahform"
          onClick={() => queryStore.addQuery()}
          aria-label="run"
        />
      </Box>
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
              {JSON.stringify(rightPaneDate?.data, replacer, 2)}
            </Code>
          </Box>
        )}
      </Flex>
    </Experiments>
  );
};

export const Home = observer(_Home);
