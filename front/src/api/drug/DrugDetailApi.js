import { API_URL_DRUG } from '../api';

// 의약품 상세조회(제품명, 이미지, 성분, 제형)
export async function DrugDataApi(id) {
  try {
    const response = await fetch(`${API_URL_DRUG}/info/${id}`, {
      headers: {
        Authorization: `Bearer`,
        Accept: 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
