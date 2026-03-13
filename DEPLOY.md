# 🚀 Pixel Agent Dashboard 배포 가이드

## 방법 1: Vercel (추천) - 1분 완료

1. https://vercel.com/new 에 접속
2. GitHub 계정으로 로그인
3. "Import Git Repository" 클릭
4. `coegeonu7065/pixel-agent-dashboard` 저장소 선택
5. "Deploy" 클릭
6. 완료! 자동으로 `https://pixel-agent-dashboard.vercel.app` 생성

## 방법 2: Netlify - 드래그 앤 드롭

1. https://app.netlify.com/drop 에 접속
2. `D:\projects\pixel-agent-dashboard\dist` 폴를 드래그
3. 완료! URL 자동 생성

## 방법 3: GitHub Pages

1. https://github.com/new 에서 저장소 생성
   - 이름: `pixel-agent-dashboard`
   - Public 선택

2. Git 연결 (PowerShell에서):
```powershell
cd D:\projects\pixel-agent-dashboard
git remote add origin https://github.com/coegeonu7065/pixel-agent-dashboard.git
git branch -M main
git push -u origin main
```

3. GitHub에서:
   - Settings > Pages
   - Source: GitHub Actions
   - Actions 탭에서 배포 확인

4. 완료! `https://coegeonu7065.github.io/pixel-agent-dashboard/`

---

## 🏢 대시보드 기능

- **대시보드**: 실시간 통계, 에이전트 현황
- **에이전트 관리**: 고용/해고, 스킬 확인
- **에이전트 마켓**: 새 에이전트 고용
- **작업 보드**: 칸반 스타일 작업 관리
- **Pixel Lab 에이전트**: 클로이, 맥스, 루나, 제이크, 에이미

## 📁 프로젝트 위치
`D:\projects\pixel-agent-dashboard`

## 🔧 기술 스택
- Next.js 16 + TypeScript
- Tailwind CSS
- Zustand (상태 관리)
- Recharts (차트)

## 🦊 Pixel Lab 에이전트 이미지
- 클로이: 개발자
- 맥스: 디자이너  
- 루나: 프로젝트 매니저
- 제이크: 데이터 분석가
- 에이미: 콘텐츠 크리에이터
