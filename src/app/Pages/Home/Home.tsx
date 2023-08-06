import { observer } from "mobx-react";
import { useState } from "react";

import { LeftPane } from "./LeftPane";
import { RightPane } from "./RightPane";
import { SplitPanel } from "../../Components";


const _Home = () => {
  const loading = false
  const [queryResponse, setQueryResponse] = useState<any>({})

  return (
    <SplitPanel>
      <LeftPane setQueryResponse={setQueryResponse} />
      <RightPane loading={loading} queryResponse={queryResponse} />
    </SplitPanel>
  );
};

export const Home = observer(_Home);
