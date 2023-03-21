import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  border: 1px solid gray;
  /* width: 100%; */
`;

const SHeader = styled.div`
  display: flex;
  align-items: center;
  height: 5vw;
  width: 100%;
  margin: 0 10vw 0 2.5vw;
`;

const SContentsWrapper = styled.div`
  height: 0;
  width: 100%;
  overflow: hidden;
  transition: height 0.35s ease;
`;

const SContent = styled.div`
  padding: 1vw 0 1vw 0;
`;

const SLine = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #aaa;
  line-height: 0.1em;
`;

const SRow = styled.div`
  border-bottom: 1px solid #aaa;
  display: flex;
  justify-content: space-around;
`;

const Simage = styled.div`
  padding: 2vw 1vw 2vw 1vw;
`;

const SBox = styled.div``;

const Stext = styled.div`
  padding: 1vw 0 1vw 0;
`;

const StextBox = styled.div`
  width: 30vw;
`;

const SButton = styled.div`
  top: 8px;
  right: 8px;
  font-size: 3vw;
  position: absolute;
`;

function PillsAccordian({ data }) {
  const parentRef = React.useRef(null);
  const childRef = React.useRef(null);

  const [isCollapse, setIsCollapse] = React.useState(false);

  const handleButtonClick = React.useCallback(
    event => {
      event.stopPropagation();
      if (parentRef.current === null || childRef.current === null) {
        return;
      }
      if (parentRef.current.clientHeight > 0) {
        parentRef.current.style.height = '0';
      } else {
        parentRef.current.style.height = `${childRef.current.clientHeight}px`;
      }
      setIsCollapse(!isCollapse);
    },
    [isCollapse],
  );

  const parentRefHeight = parentRef.current?.style.height ?? '0px';
  const buttonText = parentRefHeight === '0px' ? '열기' : '닫기';

  return (
    <SContainer>
      <SHeader onClick={handleButtonClick}>
        {data.title}
        <SButton>{buttonText}</SButton>
      </SHeader>
      <SLine />
      <SContentsWrapper ref={parentRef}>
        <SContent ref={childRef}>
          {/* {data.pillGroup} */}
          <SBox>
            {data.pillGroup !== null
              ? data.pillGroup.map(item => (
                  <SRow key={item.id}>
                    <Simage>이미지 자리</Simage>
                    <StextBox>
                      <Stext>{item.pillTitle}</Stext>
                      <Stext>{item.pillIngre}</Stext>
                    </StextBox>
                  </SRow>
                ))
              : null}
          </SBox>
          <Stext>메모</Stext>
          <Stext>{data.memo}</Stext>
        </SContent>
      </SContentsWrapper>
    </SContainer>
  );
}

PillsAccordian.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    pillGroup: PropTypes.arrayOf(
      PropTypes.shape({
        pillTitle: PropTypes.string,
        pillIngre: PropTypes.string,
      }),
    ),
    memo: PropTypes.string,
  }),
};

PillsAccordian.defaultProps = {
  data: null,
};

export default PillsAccordian;
