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

const myBasket = atom({
  key: 'myMedicine',
  default: [
    {
      name: '아토르반정',
    },
    {
      name: '에페린정',
    },
    {
      name: '가나모티에스알정15mg'
    },
    {
      name: '타이레놀',
    },
    {
      name: '약1',
    },
    {
      name: '약2',
    }
  ],
  effects_UNSTABLE: [persistAtom]
})



export { isDarkModeAtom, isUserAtom, hospitalSearchSelectedOption, myBasket };
