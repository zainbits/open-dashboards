import { observer } from 'mobx-react-lite';
import React, { Dispatch, SetStateAction } from 'react';
import { Box, Flex, HStack, IconButton, Select } from '@chakra-ui/react';
import { AiOutlineDelete, AiOutlinePlayCircle, AiOutlinePlus } from 'react-icons/ai';

import { Input } from '../../../Components';
import { QueryItem, queryStore } from '../../../xstore'


interface QueryFormProps {
  obj: QueryItem;
  setQueryResponse: Dispatch<SetStateAction<any>>
}

const QueryForm: React.FC<QueryFormProps> = ({ obj, setQueryResponse }) => {
  const handleDeleteObject = (id: number) => {
    queryStore.deleteQuery(id);
  };

  const handleChange = (qid: number, method: string, path: string) => {
    queryStore.handleChange(qid, method, path);
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      method: obj.method,
      request: obj.path,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    console.log("submitting", raw)
    fetch("http://127.0.0.1:8000/opensearch-eu", requestOptions)
      .then((response) => response.json())
      .then((result) => setQueryResponse(result))
      .catch((error) => setQueryResponse({ data: error.toString() }));
  }

  return (
    <HStack alignItems="flex-start" as="form" onSubmit={handleOnSubmit}>
      <Select
        onChange={(e) => { handleChange(obj.qid, e.target.value, obj.path) }}
        value={obj.method}
        w={40}
        size="sm"
        justifySelf={"flex-start"}
      >
        <option value="get">GET</option>
        <option value="put">PUT</option>
        <option value="delete">DELETE</option>
      </Select>
      <Input
        name="value"
        rightElement={
          <Flex flexDirection="row" mr={6}>
            <IconButton
              variant="ghost"
              onClick={() => handleDeleteObject(obj.qid)}
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
        value={obj.path}
        onChange={(e) => handleChange(obj.qid, obj.method, e.target.value)}
      />
    </HStack>
  )
}

interface LeftPaneProps {
  setQueryResponse: Dispatch<SetStateAction<any>>
}

export const LeftPane: React.FC<LeftPaneProps> = observer(({ setQueryResponse }) => {
  const handleAddObject = () => {
    queryStore.addQuery();
  };

  return (
    <Box id="leftHomePane">
      {queryStore.objectList.map((obj, key) => (
        <QueryForm obj={obj} setQueryResponse={setQueryResponse} key={key} />
      ))}
      <IconButton
        variant="ghost"
        size="xs"
        icon={<AiOutlinePlus />}
        form="mahform"
        onClick={handleAddObject}
        aria-label="run"
      />
    </Box>
  );
});
