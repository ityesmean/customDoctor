import React from 'react';
import styled from 'styled-components';

const SFooterBox = styled.div`
  position: absolute;
  width: 100vw;
  height: 13vh;
  background-color: #f5f6fa;
  bottom: 0;
  left: 0;
`;

const SFooterTag = styled.div`
  margin-left: 3vw;
  margin-right: 3vw;
  margin-top: 3vw;
  margin-bottom: 3vw;
`;

const SFooterText = styled.div`
  margin-left: 3vw;
  margin-right: 3vw;
  margin-top: 3vw;
  margin-bottom: 3vw;
`;

function Footer() {
  return (
    <SFooterBox>
      <SFooterTag>
        개인정보 처리방침 | 이용약관 | 위치기반 서비스 이용약관 | 회사소개 |
        병원 가입문의 | 문의하기 | 공지사항
      </SFooterTag>
      <SFooterText>
        맞닥은 의료정보의 중개서비스 또는 의료정보중개시스템의 제공자로서,
        의료정보의 당사자가 아니며, 의료정보와 관련된 의무와 책임은 각
        의료기관에게 있습니다.
      </SFooterText>
    </SFooterBox>
  );
}

export default Footer;
