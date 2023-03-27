import { atom } from 'recoil';
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

const myBasket = atom({
  key: 'myBasket',
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
  // effects_UNSTABLE: [persistAtom],
  dangerouslyAllowMutability: true,
});

export {
  isDarkModeAtom,
  isUserAtom,
  hospitalSearchSelectedOption,
  pillSearchSelectedOption,
  myBasket,
};
