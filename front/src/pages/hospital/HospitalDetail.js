import React from "react";
import { useParams, useLocation } from "react-router-dom";

import KakaoMap from "../../components/kakao/KakaoMap";

function HospitalDetail() {

    const information = useLocation()
    const { hospitalId } = useParams();

    const { xPosition, yPosition } = information.state.information
    // const xPosition = information.state.information.xPosition
    // const yPosition = information.state.information.yPosition

    console.log(information.state.information)
    return (
        <>
            <KakaoMap x={xPosition} y={yPosition} />
            <div>이건 {hospitalId} 번 페이지 입니다.</div>
        </>
    )
}

export default HospitalDetail