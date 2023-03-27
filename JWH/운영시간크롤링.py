import time
import csv
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
from time import sleep
from bs4 import BeautifulSoup
import re
import json

driver = webdriver.Chrome('chromedriver_win32\chromedriver.exe')

# 상세페이지에서 작업
def inDetail():
    time.sleep(1)
    # 전화번호 출력
    tel = driver.find_elements(By.CSS_SELECTOR, '.xlx7Q ')
    if not tel :
        print("전화번호 정보 없음\n")
    else:
#         print(tel[0].text)
        telList.append(tel[0].text)
    
    # 상세페이지에서 영업시간 열기 클릭
    details = driver.find_elements(By.CSS_SELECTOR, '.RMgN0 ')
    if not details:
        lineDetails = driver.find_elements(By.CSS_SELECTOR, '.gKP9i')
        if not lineDetails:
            print("영업시간 정보 없음\n")
        else:
            linehours = driver.find_elements(By.CSS_SELECTOR, '.U7pYf')
            etc = ""
            for linehour in linehours:
                etc = etc + linehour.text.split("\n")[0] + "/"
                time.sleep(1)
#                 print(etc)
#                 print('\n')
                etcList.append(etc)
    else:
        details[0].send_keys(Keys.ENTER)
        time.sleep(2)
        # 요일이 있는지 확인
        days = driver.find_elements(By.CSS_SELECTOR, '.i8cJw ')
        
        # 영업시간 리스트에 등록
        def insertHour(num, str):
            if days[num].text == '월':
                monList.append(str)
            elif days[num].text == '화':
                tueList.append(str)
            elif days[num].text == '수':
                wedList.append(str)
            elif days[num].text == '목':
                thuList.append(str)
            elif days[num].text == '금':
                friList.append(str)
            elif days[num].text == '토':
                satList.append(str)
            else:
                sunList.append(str)
        
        if not days:
            hours = driver.find_elements(By.CSS_SELECTOR, '.A_cdD')
            etc = ""
            for hour in hours:
                etc = etc + hour.text.split("\n")[0] + "/"
            time.sleep(1)
#             print(etc)
#             print('\n')
            etcList.append(etc)
        else:
            # 영업시간 출력 
            hours = driver.find_element(By.CSS_SELECTOR, '.gKP9i.RMgN0')
            first=hours.find_elements(By.CSS_SELECTOR, '.H3ua4')
            idx = 0
            for hour in first :
                if idx==7 : break
                thisTime = ""
                if first[0].text != '':
#                     print(days[idx].text, end=' ')
#                     print(first[0].text.split("\n")[0], end='/')
                    insertHour(idx, first[0].text.split("\n")[0])
                else:
                    t = first[0].find_element(By.TAG_NAME, 'span')
#                     print(days[idx].text, end=' ')
#                     print(t.text.split("\n")[0], end='/')
                    insertHour(idx, t.text.split("\n")[0])     
                idx+=1
#             print('\n')
            
# 목록페이지 -> 상세페이지 이동
def goDetail():
    time.sleep(1)
#     print(items[0].get_attribute('data-title'))
    # 검색 결과 리스트의 a태그 클릭
    links = items[0].find_elements(By.CSS_SELECTOR, '.a_item ')
    links[0].send_keys(Keys.ENTER) 
    time.sleep(1)

# 병원 이름이 맞는지 체크
def checkHospital():
    time.sleep(1)
    name = driver.find_elements(By.CSS_SELECTOR, '.Fc1rA ')
    dbname = line[3]
    namestr = name[0].text
    if namestr[-3:] in dbname:
        return True
    else:
        return False

    
    
# 검색할 데이터 임포트

for filenum in range (6,764) :
    f = open("DataCrawling/DataCrawling"+str(filenum)+".csv", 'r', encoding='utf-8')
    rdr = csv.reader(f)    
  
    secuList = [] # 암호화코드
    telList = [] # 전화번호
    monList = [] # 월요일 운영시간
    tueList = [] # 화요일 운영시간
    wedList = [] # 수요일 운영시간
    thuList = [] # 목요일 운영시간
    friList = [] # 금요일 운영시간
    satList = [] # 토요일 운영시간
    sunList = [] # 일요일 운영시간
    etcList = [] # 기타
    number = -1
    for line in rdr:
        number = number + 1
        if number==0: continue
        print("-------", end=' ')
        print(number, end=' ')
        print("-------\n")

        secuList.append(line[1])

        # 전화번호로 검색
        data = line[2]
        driver.get(f"https://m.map.naver.com/search2/search.naver?query="+ data)
        driver.implicitly_wait(3)

        # 검색 결과 리스트
        items = driver.find_elements(By.CSS_SELECTOR, '._item ')

        # 검색 결과가 없다면
        if not items:
#                 print("주소+이름으로 다시 검색합니다.\n")

                # 주소+이름으로 검색
                data = line[3]
                driver.get(f"https://m.map.naver.com/search2/search.naver?query="+ data)
                driver.implicitly_wait(3)

                # 검색 결과 리스트
                items = driver.find_elements(By.CSS_SELECTOR, '._item ')
                # 검색 결과가 없다면
                if not items:
#                     print("검색결과 정보 없음\n")
                    etcList.append("정보 없음")
                # 검색 결과가 있다면
                else:
                    # 목록페이지 -> 상세페이지 이동
                    goDetail()
                    # 상세페이지에서 작업
                    inDetail()

        # 검색 결과가 있다면
        else:
            goDetail()
            # 병원 이름이 맞는지 체크
            if not checkHospital():
#                 print("주소+이름으로 다시 검색합니다.\n")

                # 주소+이름으로 검색
                data = line[3]
                driver.get(f"https://m.map.naver.com/search2/search.naver?query="+ data)
                driver.implicitly_wait(3)

                # 검색 결과 리스트
                items = driver.find_elements(By.CSS_SELECTOR, '._item ')
                # 검색 결과가 없다면
                if not items:
#                     print("검색결과 정보 없음\n")
                    etcList.append("정보 없음")
                # 검색 결과가 있다면
                else:
                    # 목록페이지 -> 상세페이지 이동
                    goDetail()
                    # 상세페이지에서 작업
                    inDetail()

            # 병원 이름이 맞다면
            else:
                inDetail()

        if len(telList) == number-1:
            telList.append("null")
        if len(monList) == number-1:
            monList.append("null")
        if len(tueList) == number-1:
            tueList.append("null")
        if len(wedList) == number-1:
            wedList.append("null")
        if len(thuList) == number-1:
            thuList.append("null")
        if len(friList) == number-1:
            friList.append("null")
        if len(satList) == number-1:
            satList.append("null")
        if len(sunList) == number-1:
            sunList.append("null")
        if len(etcList) == number-1:
            etcList.append("null")

    f.close()

    data = {"secu":secuList, "tel":telList, "mon":monList, "tue":tueList, "wed":wedList, "thu":thuList, "fri":friList, "sat":satList, "sun":sunList, "etc":etcList}
    df = pd.DataFrame(data)
    print(df.head(5))

    df.to_csv("result/result"+str(filenum)+".csv", encoding = "utf-8-sig")