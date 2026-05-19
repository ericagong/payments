## 🎯 Step1 목표

- 카드 정보 입력 페이지 (카드번호 / 만료일 / 보안코드 / 카드 비밀번호 / 소유자 이름)
- 실시간 카드 UI 반영
- 필수 필드 충족 시 Next 버튼 활성화
- Stepper 기반 구조로 Step2/Step3 확장 가능하게 설계
- 모든 입력 컴포넌트는 Primitive 기반 + Headless 로직 분리
- Controlled & Uncontrolled 명확히 구분
- Storybook 상호작용 테스트 가능하도록 컴포넌트 구조화

> 카드 소유자 이름은 미션 명시 요구사항은 아니지만 일반적인 카드 등록 UX를 따라 포함했다. 필수 필드 명세(`useNextButtonState`)에서는 제외한다.

## 🏗️ STEP1 전체 아키텍처

```
Step1: 카드 정보 입력
 ├─ FormProvider (필드 상태 관리)
 ├─ StepperProvider (플로우 관리)
 ├─ CardPreview (실시간 카드 UI)
 ├─ CardNumberField (Overlay)
 ├─ ExpirationDateField (MM / YY, 자동 포커스)
 ├─ SecurityCodeField (마스킹)
 ├─ PasswordField (2-cell, 자동 포커스)
 ├─ OwnerNameField (Counter)
 └─ NextButton (필수 필드 충족 시 활성화)
```

# 📘 구현 순서

## 1) Primitive UI

### 역할

- DOM 추상화 레이어 = native 태그를 그대로 감싼 React wrapper
- native props 그대로 통과 (Controlled / Uncontrolled 둘 다 호출자가 선택)
- 스타일을 갖지 않음

### 구성

`Box / Button / Form / Input / Label`

> Slot / asChild 합성 구조는 도입하지 않았다. 현재 사용처에서 외부 컴포넌트 합성이 일어나지 않아, 합성 needs가 실제로 등장한 시점에 도입할 영역으로 미뤘다. 결정 배경은 PR 본문 "설계 집중 1" 참고.

## 2) Overlay 입력 처리

### 역할

- raw 입력층과 display 표시층을 겹쳐서 렌더
- 사용자는 raw input에 입력하고, 화면에는 format + mask가 적용된 display가 보임
- raw input은 텍스트를 투명하게 두고 caret만 노출, display는 `aria-hidden`

### 구현

`useOverlayLayer(raw, format, mask)` hook이 `format → mask` 순으로 변환한 문자열을 반환한다. 필드 컴포넌트가 이 결과를 display 박스에 그리고, raw input과 display 박스를 CSS로 겹친다.

```tsx
const displayValue = useOverlayLayer(rawValue, formatCardNumber, maskAfterEighth);
```

- `format → mask` 순서가 중요: mask가 separator 위치를 보존하면서 숫자만 마스킹하려면 format이 먼저 separator를 끼워 넣은 상태여야 한다. 역순이면 마스킹된 `*`까지 separator 사이에 끼어 망가진다.
- `maxLength`는 hook이 아니라 `useInput`의 rule이 책임진다 (책임 분리).

> 현재 Overlay 사용처는 카드번호 한 곳이라 단순 hook으로 충분하다. 두 곳 이상으로 늘어나면 Compound 형태(`<OverlayInput.Root>` / `<OverlayInput.Input>` / `<OverlayInput.Display>`)로 끌어올린다.

## 3) Form 상태 관리

### 모델

- 값은 ref(`formDataRef`)에 저장하여 입력당 비용을 통제
- 화면에 반영해야 하는 파생 상태(`dirty` / `touched` / `errors` / `isValid`)만 setState로 동기화
- 외부에서 본 표면은 controlled (`useInput`이 `{ value, onChange, onBlur }` 반환), 내부 저장은 ref 기반

### API

```tsx
<FormProvider>{children}</FormProvider>;

const { value, onChange, onBlur } = useInput('cardNumber', {
  sanitize: onlyNumeric,
  required: true,
  maxLength: 16,
  // normalize?: (value) => string  (blur 시 정규화)
  // validate?: (value) => boolean  (검증)
});
```

`useInput`은 hook 호출 자체가 등록 역할을 한다. 별도 `registerField` 단계는 두지 않는다.

### `isComplete`를 필드에 두지 않은 이유

완성 여부의 정의(예: 카드번호가 16자리 다 차야 완성인가? Luhn 검증까지 통과해야 완성인가?)는 시점마다 달라지는 **정책** 결정이다. 필드에 정의를 박으면 정책 변경이 다섯 필드로 흩어진다. 그래서 필드는 raw 값만 들고, 완성 판정은 `useNextButtonState`의 명세 한 곳에 모은다.

## 4) 각 Field 구현

각 필드는 Primitive + atomic hook(`useInput`, `useOverlayLayer`, `useAutoAdvance`)을 **직접 조합**한다. 별도 필드 hook(`useCardNumberField` 등)은 두지 않는다.

> 도메인 로직이 순수함수(`formatCardNumber`, `maskAfterEighth`)와 atomic hook으로 충분히 분해되어, 필드 hook이 그 조각을 합쳐 부르는 빈 껍데기가 되기 때문. 결정 배경은 PR 본문 "설계 집중 2" 참고.

### 필드별 도메인 규칙

| 필드                  | 도메인 규칙                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------ |
| CardNumberField       | `sanitize=onlyNumeric`, `maxLength=16`, format=4자리마다 `-`, mask=8자리 이후 `*`          |
| ExpirationDateField   | month(`maxLength=2`, normalize=`01` padding, validate=1~12), year(`maxLength=2`), 자동 포커스 |
| SecurityCodeField     | `sanitize=onlyNumeric`, `maxLength=3`, `type='password'`                                   |
| PasswordField         | 2-cell, 각 `maxLength=1`, `type='password'`, 자동 포커스                                   |
| OwnerNameField        | `maxLength=30`, 카운터 표시                                                                |

## 5) 유효성 기반 `useNextButtonState`

필수 필드가 모두 충족됐을 때만 다음 버튼 활성화.

### API

```ts
const { isAllRequiredComplete } = useNextButtonState();
```

### 내부 명세

```ts
const REQUIRED_FIELDS = [
  { name: 'cardNumber', minLength: 16 },
  { name: 'month', minLength: 2, validate: (v) => 1 <= Number(v) && Number(v) <= 12 },
  { name: 'year', minLength: 2 },
  { name: 'securityCode', minLength: 3 },
  { name: 'firstPasswordDigit', minLength: 1 },
  { name: 'secondPasswordDigit', minLength: 1 },
];
```

- 필드 키는 `month`/`year`, `firstPasswordDigit`/`secondPasswordDigit`처럼 **자동 포커스 이동과 개별 검증을 위해** 쪼개졌다.
- OwnerName은 필수에서 제외 (미션 명시 요구가 아님).

## 6) Stepper

### API

```tsx
<StepperProvider steps={['register', 'completed']}>
  <Stepper>
    <Stepper.Step name='register'>...</Stepper.Step>
    <Stepper.Step name='completed'>...</Stepper.Step>
  </Stepper>
</StepperProvider>;

const { currentStep, next, prev, goTo } = useStepperContext();
```

- `goTo`를 기본 API로 두어 비선형 진입과 분기까지 표현 가능하게 한다.
- Stepper는 카드 등록 도메인을 모르는 generic 추상이라 Step2/Step3에서도 그대로 재사용한다.

> 결정 배경(왜 `goTo`를 1급 API로 두었는지, 왜 Compound 형태인지)은 PR 본문 "설계 집중 3" 참고.

## 7) Step1 페이지 조립

```tsx
<StepperProvider steps={['register', 'completed']}>
  <FormProvider>
    <StepHeader onBack={() => navigate('/list')} />
    <Stepper>
      <Stepper.Step name='register'>
        <CardPreview />
        <CardRegisterForm onSubmitted={() => stepper.next()} />
      </Stepper.Step>
      <Stepper.Step name='completed'>
        <CompletedStep onConfirm={() => navigate('/list')} />
      </Stepper.Step>
    </Stepper>
  </FormProvider>
</StepperProvider>
```

## 8) Storybook 상호작용 테스트

- 각 필드별 스토리: `CardNumberField`, `ExpirationDateField`, `SecurityCodeField`, `PasswordField`, `OwnerNameField`
- 통합 시나리오: `CardRegisterForm.stories.tsx`의 `NextButtonState`
  - 초기 상태 → 다음 버튼 disabled
  - 모든 필수 필드 입력 → 다음 버튼 enabled

### 시나리오 커버리지

- 카드번호 4자리 단위 `-` 자동 삽입
- 카드번호 8자리 이후 마스킹
- 만료일 자동 포커스 (월 → 년), normalize (`1` → `01`)
- 만료월 validate (1~12)
- 보안코드 마스킹
- 비밀번호 multi-box 자동 포커스
- 이름 카운터
- 필수값 미완 → Next disabled, 완료 → Next enabled
