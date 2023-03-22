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

export { isDarkModeAtom, isUserAtom, hospitalSearchSelectedOption };
