import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// 아래 temp 는 추후에 삭제 예정

const temp = atom({
  key: 'temp',
  default: false,
});

const isDarkModeAtom = atom({
  key: 'isDarkModeAtom',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export { temp, isDarkModeAtom };
