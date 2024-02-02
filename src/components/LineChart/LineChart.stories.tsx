import type { Meta, StoryObj } from '@storybook/react'
import LineChart, { LineChartProps } from './LineChart'
import React from 'react'


const meta: Meta<typeof LineChart> = {
  title: 'Charts/LineChart',
  component: LineChart
}
export default meta
type Story = StoryObj<typeof LineChart>
export const Default: Story = (args: LineChartProps) => (
  <div className='relative flex flex-wrap gap-5'>
    <div className='' style={{ width: '40%' }}>
      <LineChart {...args} />
    </div>
  </div>
)
Default.args = {
  lineSets: [
    {
      data: [
        { x: 1, y: 10, label: 'Point 1' },
        { x: 2, y: 20, label: 'Point 2' },
        { x: 3, y: 15, label: 'Point 3' },
        { x: 4, y: 30, label: 'Point 4' },
        { x: 5, y: 40, label: 'Point 5' },
        { x: 6, y: 35, label: 'Point 6' }
      ],
      strokeColor: '#514d4d',
      label: 'Line Set 1'
    },
    {
      data: [
        {
          x: 1,
          y: 20,
          label: 'Point 1',
          tooltip_data: {
            balance: 10,
            bills: 10,
            income: 10,
            month: 'enero',
            year: 2021
          }
        },
        {
          x: 2,
          y: 30,
          label: 'Point 2',
          tooltip_data: {
            balance: 10,
            bills: 10,
            income: 10,
            month: 'enero',
            year: 2021
          }
        },
        {
          x: 3,
          y: 25,
          label: 'Point 3',
          tooltip_data: {
            balance: 10,
            bills: 10,
            income: 10,
            month: 'enero',
            year: 2021
          }
        },
        {
          x: 4,
          y: 40,
          label: 'Point 4',
          tooltip_data: {
            balance: 10,
            bills: 10,
            income: 10,
            month: 'enero',
            year: 2021
          }
        },
        {
          x: 5,
          y: 50,
          label: 'Point 5',
          tooltip_data: {
            balance: 10,
            bills: 10,
            income: 10,
            month: 'enero',
            year: 2021
          }
        },
        {
          x: 6,
          y: 45,
          label: 'Point 6',
          tooltip_data: {
            balance: 10,
            bills: 10,
            income: 10,
            month: 'enero',
            year: 2021
          }
        }
      ],
      strokeColor: '#AF1685',
      label: 'Line Set 2'
    }
    // Agrega más conjuntos de datos según sea necesario
  ],
  height: 200,
  width: 450,
  horizontalGuides: 5,
  precision: 1,
  intermittentX: 2,
  xAxisLabels: [
    'Label 1',
    'Label 2',
    'Label 3',
    'Label 4',
    'Label 5',
    'Label 6'
  ],
  renderToolTip: () => (
    <div className='flex w-min flex-col gap-3 rounded-lg bg-[#333333] p-2 text-white'>
      <p className='text-[8px]'>Tooltip data</p>
    </div>
  ),
  options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ],
  onChange: (value) => console.log(value),
  title: 'Sample Line Chart',
  fontSize: 6,
  backgroundColorLine: '#AF168510'
}
