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
  default: [],
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
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const myPositionState = atom({
  key: 'myPositionState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const LoginState = atom({
  key: 'LoginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

const hospitalDescState = atom({
  key: 'hospitalDescState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

const hospitalBasicState = atom({
  key: 'hospitalBasicState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

const hospitalFavoriteState = atom({
  key: 'hospitalFavoriteState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

const FavoriteState = atom({
  key: 'FavoriteState',
  default: null,
})
const searchOptionState = atom({
  key: 'searchOptionState',
  default: [],

  effects_UNSTABLE: [persistAtom],
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
  myPositionState,
  LoginState,
  hospitalDescState,
  hospitalBasicState,
  hospitalFavoriteState,
  FavoriteState,
  searchOptionState,
};
