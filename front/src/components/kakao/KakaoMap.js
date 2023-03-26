/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
/* global kakao */
import React, { useEffect } from "react";
import PropTypes from 'prop-types'
import { useLocation } from "react-router-dom";

const { kakao } = window;

function KakaoMap({ x, y }) {


    useEffect(() => {
        var mapContainer = document.getElementById('map') // 지도를 표시할 div 
        var mapOption = {
            center: new kakao.maps.LatLng(x, y), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

        // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        var map = new kakao.maps.Map(mapContainer, mapOption);

        // 마커가 표시될 위치 입니다.
        var markerPosition = new kakao.maps.LatLng(x, y);

        // 마커를 생성합니다.
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });

        marker.setMap(map);
    }, [])


    return (
        <>
            <div id="map" style={{ width: '500px', height: '500px' }}></div>
            <div></div>
        </>
    )
}

KakaoMap.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number
};

KakaoMap.defaultProps = {
    x: null,
    y: null,
};

export default KakaoMap