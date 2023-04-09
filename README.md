# SSAFY 분산 프로젝트 '맞닥'

## : 한 눈에 들어오는 메디컬 서비스

![타이틀](DOCS/images/%ED%83%80%EC%9D%B4%ED%8B%80.png)

<br>

# ✔ Project Summary

### 개발 기간 : 2023.02.27 ~ 2023.04.07

  <br>
  <br>

## Back-Ground

---

- 병원을 고를 떄 **신뢰성 있는** 병원 및 의약품 정보를 찾기 어려움
- 내가 원하는 **니즈를 충족**하는 병원을 찾기 힘듦
  ![Untitled](DOCS/images/start.png)
  ![Untitled](DOCS/images/%ED%94%84%EB%A1%A4%EB%A1%9C%EA%B7%B82.png)

<br>
<br>

## 시장 분석

- 사람들은 병원을 고를 때 **거리 > 영업시간 > 의료진 수** 순으로 병원을 알아봄
  ![Untitled](DOCS/images/%EC%8B%9C%EC%9E%A5%EB%B6%84%EC%84%9D.png)

  <br>

## 서비스 설명

- 한 눈에 들어오는 **메디컬 서비스**

![Untitled](DOCS/images/%EC%84%9C%EB%B9%84%EC%8A%A4%EC%86%8C%EA%B0%9C1.png)

- 증상에 따른 병원을 **필터링**
- **신뢰성** 있는 병원 및 의약품 정보 제공
- **사용자 맞춤** 서비스 제공
  ![Untitled](DOCS/images/%EC%84%9C%EB%B9%84%EC%8A%A4%EC%86%8C%EA%B0%9C2.png)

<br>

# ✔ Information

## 메인 기능

- 현 위치에서 **5km 이내에 영업중**인 병원 정보 제공
- **증상에 따른** 병원정보 제공
- 병원 및 의약품의 **자세한** 정보 제공
- 복용중인 **약 관리** 및 병원 **즐겨찾기**
  <br>

![Untitled](DOCS/images/%EC%8B%9C%EC%97%B0%EC%8B%9C%EB%82%98%EB%A6%AC%EC%98%A4/Untitled%204.png)
![Untitled](DOCS/images/%EC%8B%9C%EC%97%B0%EC%8B%9C%EB%82%98%EB%A6%AC%EC%98%A4/Untitled%2020.png)

## 기대효과

---

- 아플 때 **신속하게** 원하는 조건의 병원을 찾을 수 있다.
- 의약품의 **성분** 및 **함께 복용하면 안 되는** 약을 확인함으로써 유용하게 **건강을 관리**할 수 있다.
- 병원 및 의약품의 자세한 정보를 **맞닥**에서 **한 번에** 알 수 있다.

![Untitled](DOCS/images/%EA%B8%B0%EB%8C%80%ED%9A%A8%EA%B3%BC.png)

## 더 자세한 기능은 📺 [시연시나리오](./DOCS/시연시나리오.md)를 참고해주세요 !

<br>

# 설계 및 산출물

### ERD

![Untitled](DOCS/images/erd.png)

### Architecture

![Untitled](DOCS/images/%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98.JPG)

## 🏣 [기획서](./DOCS/맞닥_기획서.md)

## 📜 [기능명세서](./DOCS/기능명세서.md)

## 🔑 [DB컬럼설명](./DOCS/DB컬럼설명.md)

## 📡 [API명세서](./DOCS/API명세서.md)

## 📎 [최종 발표 PPT](./DOCS/%EB%A7%9E%EB%8B%A5-%EC%B5%9C%EC%A2%85%EB%B0%9C%ED%91%9C.pdf)

## 🏹 [포팅메뉴얼](./DOCS/%ED%8F%AC%ED%8C%85%EB%A7%A4%EB%89%B4%EC%96%BC.md)

## 📺 [시연시나리오](./DOCS/시연시나리오.md)

<br>

### 배포(CI/CD)

---

- AWS EC2 - ubuntu os 20.04 LTS
- Docker
- k8s (kubeadm)
- Nginx
  - Nginx Ingress controller와 service로 분기처리 및 로드밸런싱
- Jenkins
  - Master/Agent로 병렬 처리
  - pipeline 스크립트 작성으로 CI/CD 적용(GitOps)
- ArgoCD
- https
  - cert-manager + letsencrypte를 통한 인증서 발급
- Grafana + Prometheus

<br>

# ✔ Cooperation

### - Git

![깃](/DOCS/images/git.png)

### - Jira

![지라](/DOCS/images/jira.png)

### - Notion

### - MatterMost

### - Webex

### - Discord

<br><br>

## 팀원 소개

![Untitled](/DOCS/images/%ED%8C%80%EC%9B%90%EC%86%8C%EA%B0%9C.png)
