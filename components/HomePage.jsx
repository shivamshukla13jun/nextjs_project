import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useDataFetch} from "../hooks/DataFetchHook"
import Banner from "./Banner"
import Caroesel from "./Carousel/Caroesel"
import { ServiceApi } from '@/redux/apiService';
const {useGetListsQuery,useGetBannersQuery}=ServiceApi
const HomePage = () => {
  const {isError,isLoading,data}=useGetBannersQuery()
  const Lists=useGetListsQuery()
  return (
    < >
     {
      
     }
     <Banner isLoading={isLoading} isError={isError} data={data?data.data:[]}/>
    <Caroesel Loading={Lists.isLoading} Error={Lists.isError}movies={Lists.data?Lists.data.data:[]} />

    </>
  )
}

export default HomePage