import { atom } from "recoil";
import mockData from '../mockData';

//initially sort mock data by first name
const sortData = mockData.sort((a, b) => {
  const nameA = a.firstName
  const nameB = b.firstName
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
});

export const contactArrayState = atom({
  key: 'contactArrayState',
  default: [...sortData]
});

export const resetTableSortState = atom({
  key: 'resetTableSortState',
  default: false
});
