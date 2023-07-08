import React, { useState } from 'react'
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { useSelector } from 'react-redux';

export default function GroupsChart() {
const {groups,options,branches,students} = useSelector(state=>state)

    ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);
    const chartConfigs = {
        type: 'column2d',
        width: 600,
        height: 400,
        dataFormat: 'json',
        dataSource: {
            "chart": {
              "caption": "Nombre De Stagiaire Pour Chaque Group",
              "xAxisName": "Groups",
              "yAxisName": "Stagiaires",
              "numberSuffix": "",
            },
            "data": groups.map(item=>{return{"label":branches.find(elem => elem.id == options.find(elem1 => elem1.id == item.option).branch).key + '-' +(options.find(elem=>elem.id==item.option).key!=="TC"?options.find(elem=>elem.id==item.option).key+"-":"") + item.name,"value":students.filter(elem=>elem.group==item.id).length}})
          },
      };
    return <ReactFC {...chartConfigs} />
}
