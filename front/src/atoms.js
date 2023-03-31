/* eslint-disable eqeqeq */
/* eslint-disable no-empty */
/* eslint-disable no-cond-assign */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import * as _ from 'lodash';
import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const isDarkModeAtom = atom({
  key: 'isDarkModeAtom',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

const isUserAtom = atom({
  key: 'isUserAtom',
  default: true,
  effects_UNSTABLE: [persistAtom],
});

const hospitalSearchSelectedOption = atom({
  key: 'hospitalSearchSelectedOption',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const pillSearchSelectedOption = atom({
  key: 'pillSearchSelectedOption',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const drugDetailInfo = atom({
  key: 'drugDetailInfo',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
const drugAvoidInfo = atom({
  key: 'drugAvoidInfo',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const myBasketState = atom({
  key: 'myBasketState',
  default: [
    {
      name: '약1',
      isChecked: 'unChecked',
    },
    {
      name: '약2',
      isChecked: 'unChecked',
    },
    {
      name: '약3',
      isChecked: 'unChecked',
    },
    {
      name: '약4',
      isChecked: 'unChecked',
    },
    {
      name: '약5',
      isChecked: 'unChecked',
    },
    {
      name: '약6',
      isChecked: 'unChecked',
    },
    {
      name: '약7',
      isChecked: 'unChecked',
    },
    {
      name: '약8',
      isChecked: 'unChecked',
    },
    {
      name: '가나모티에스알정15mg',
      isChecked: 'unChecked',
    },
    {
      name: '타이레놀',
      isChecked: 'unChecked',
    },
  ],
  effects_UNSTABLE: [persistAtom],
  dangerouslyAllowMutability: true,
});

const deleteMyBasketSelector = selector({
  key: 'deleteMyBasketSelector',
  get: ({ get }) => {
    const myBasket = get(myBasketState);
    return myBasket;
  },
  set: ({ set, get }, deleteValue) => {
    const myBasket = get(myBasketState);

    const deletedMyBasket = myBasket.filter(item => {
      if (item === deleteValue) {
        return false;
      } else {
        return true;
      }
    });
    set(myBasketState, deletedMyBasket);
  },
});

const medicineSearchResult = atom({
  key: 'medicineSearchResult',
  default: [],
});

const checkedMedicineState = atom({
  key: 'checkedItemsState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const hospitalSearchResultState = atom({
  key: 'hospitalSearchResultState',
  default: [
    {
      hospitalName: '카카오',
      latlng: new kakao.maps.LatLng(33.450705, 126.570677),
    },
    {
      hospitalName: '생태연못',
      latlng: new kakao.maps.LatLng(33.450936, 126.569477),
    },
    {
      hospitalName: '텃밭',
      latlng: new kakao.maps.LatLng(33.450879, 126.56994),
    },
    {
      hospitalName: '근린공원',
      latlng: new kakao.maps.LatLng(33.451393, 126.570738),
    },
  ],
});

export {
  isDarkModeAtom,
  isUserAtom,
  hospitalSearchSelectedOption,
  pillSearchSelectedOption,
  myBasketState,
  deleteMyBasketSelector,
  medicineSearchResult,
  drugDetailInfo,
  drugAvoidInfo,
  checkedMedicineState,
  hospitalSearchResultState,
};
