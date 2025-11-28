## 🎯 Step1 목표

- 카드 정보 입력 페이지 (카드번호 / 만료일 / CVC / 비밀번호(2) / 소유자 이름)
- 실시간 카드 UI 반영
- 필수 필드 충족 시 Next 버튼 활성화
- Stepper 기반 구조로 Step2/Step3 확장 가능하게 설계
- 모든 입력 컴포넌트는 Primitive 기반 + Headless 로직 분리
- Controlled & Uncontrolled 명확히 구분
- Storybook 상호작용 테스트 가능하도록 컴포넌트 구조화

## 🏗️ STEP1 전체 아키텍처

```
Step1: 카드 정보 입력
 ├─ CardFormProvider (전역 필드 상태 관리)
 ├─ StepperProvider (플로우 관리)
 ├─ CardPreview (실시간 카드 UI)
 ├─ CardNumberField (OverlayInput Single)
 ├─ ExpiryField (OverlayInput Single)
 ├─ CVCField (OverlayInput Single)
 ├─ PasswordField (OverlayInput Multi-box)
 ├─ OwnerNameField (Input + Counter)
 └─ NextButton (필수 필드 충족 시 활성화)
```

## 📘 구현 순서

좋아, 은채야.
**이게 훨씬 간결하고 실제 구현 흐름 그대로라서 Step1에 딱 맞아.**

너가 정리한 순서를 기반으로,
실제로 바로 따라 만들 수 있도록 **짧고 명확한 API 스타일 구현 순서**로 다시 정제해줄게.

---

# 📘 **STEP1 구현 순서 (간결·실전형)**

## 1) **Primitive UI 만들기**

> 스타일 최소, 기능 최소, 오직 UI 구조만 담당하는 컴포넌트들

**필수 Primitive**

```txt
<Input />
<Label />
<Button />
<Box />
<Flex />
<CardPreview />   // 카드 UI 최소 버전
```

**역할**

- 절대 로직 넣지 않음
- OverlayInput과 조합될 수 있는 기본 UI
- 스타일은 최소: border, padding 정도만

---

## 2) **Overlay 관련 로직 생성**

> 카드번호/만료일/CVC/비밀번호처럼 “포맷/마스킹/자동삽입”이 필요한 입력의 핵심 로직

### OverlayInput API

```tsx
<OverlayInput.Root variant="single" | "multi" boxes={2?}>
  <OverlayInput.Input />      // raw-only 입력
  <OverlayInput.Display />    // masked/formatted overlay
</OverlayInput.Root>
```

### 핵심 Hook

```ts
useOverlayInput({
  maxLength,
  format(raw) => formatted,
  mask(formatted) => masked
});
```

**핵심 포인트**

- caret jump 없음
- raw만 state로 유지
- multi-box (PIN/비번 2자리) 지원

---

## 3) **FormContext + registerField 구성**

> 모든 필드의 raw 상태 + isComplete 값을 전역으로 추적

### API

```tsx
<CardFormProvider>{children}</CardFormProvider>
```

### 내부

```ts
registerField('cardNumber', {
  raw,
  isComplete,
});
```

---

## 4) **각 Field 구현 (Field Hooks)**

> Step1의 핵심 로직.
> OverlayInput + FormContext + validation을 조합하는 Headless Field 단위.

### 필요한 Field Hooks

```txt
useCardNumberField()
useExpiryField()
useCvcField()
usePasswordField()
useOwnerNameField()
```

각 훅이 내부에서:

1. `useOverlayInput()` 호출
2. raw/formatted/masked 계산
3. isComplete / isValid 판단
4. FormContext의 `registerField()`로 상태 전달
5. 필드 UI는 Primitive + OverlayInput 조합

---

## 5) **유효성 기반 useNextButtonState 구현**

> 필수 필드가 모두 isComplete일 때만 다음 버튼 활성화

### API

```ts
const { isAllRequiredComplete } = useNextButtonState();
```

### 내부 로직

```ts
const REQUIRED_FIELDS = ['cardNumber', 'expiry', 'cvc', 'password', 'ownerName'];

const isAllRequiredComplete = REQUIRED_FIELDS.every((name) => fields[name]?.isComplete);
```

---

## 6) **Step1 페이지 조립**

> 지금까지 만든 것을 단순하게 조립하는 화면 구성

### 구조

```tsx
<CardFormProvider>
  <CardPreview />

  <CardNumberField />
  <ExpiryField />
  <CvcField />
  <PasswordField />
  <OwnerNameField />

  <Button disabled={!isAllRequiredComplete}>다음</Button>

  <Button onClick={goBack}>뒤로가기</Button>
</CardFormProvider>
```

---

## 7) **Storybook 상호작용 테스트 도입**

> Step1 전체 플로우 검증

### 테스트 시나리오

- 카드번호 입력 → 4자리 단위 `-` 자동 삽입
- 카드번호 8자리 이후 마스킹
- 만료일 `MM / YY` 자동 생성
- CVC `***` 처리
- 비밀번호 multi-box 렌더링
- 이름 필드 카운터 동작
- 필수값 미완 → Next disabled
- 필수값 완료 → Next enabled

Storybook에서 Interaction Test로 자동 검증 가능.
