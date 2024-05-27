# 구현과제 2. Surveey

## 구현과제 설명

> 이 과제는 [스모어](https://home.smore.im/template?type=form&c=survey)를 모티브로 제작되었습니다.

> 나만의 설문조사 만들기

> 제약사항

- 설문 진행은 퍼널 뷰로 이루어져야 합니다. 한 화면에는 한 문항만 보여야 합니다.
- 설문 문항 개수는 5개 이상이어야 합니다.
- 조건에 맞지 않는 입력의 경우, 에러가 명시적으로 표현되어야 하며 다음 스텝으로 넘어갈 수 없어야 합니다.
- 필수/선택이 명시적으로 표현되어야 합니다.

## 기술 스택

- Next.js v14
- TailwindCSS
- @shadcn/ui
- React Hook Form
- Zod
- Swagger-typescript-api

## 기획 의도 및 구현 내용

해당 과제는 일일호프에서 이성친구 매칭을 위한 설문지를 작성하는 것에 영감을 받아, 웹 폼으로 제출하는 것을 구현하고자 하였습니다 🤗 아래는 구현한 내용입니다.

1. 기본(필수)정보:
   `mbti`, `name`, `email`, `gender`
2. 추가 정보:
   `instagramId `, `age`, `type(이상형)`
3. 나에 대한 소개:
   `animal` 본인과 닮은 동물 선택
4. 밸런스 게임:
   `situation` 총 네 가지 질문으로, 각 상황에 대한 선택

## 내 코드에서 강조할 부분

- react-hook-form & zod

  메인 페이지에서 zod object에 대한 스키마를 정의했으며, react-hook-form을 사용하여 전체 필드의 값들을 하나로 묶어 관리합니다. 각 스텝 컴포넌트에서는 useFormContext 훅을 사용해 각 필드의 값을 등록하고 에러 상태를 가져옵니다.

- 에러 메세지 처리

  Zod로 객체를 정의할 때 입력 조건 및 제약에 따라 에러메세지를 함께 설정하여, 사용자가 올바르지 않은 입력을 시도할 때 명시적으로 에러를 표시합니다. 해당 형식에 맞지 않게 입력하고 버튼을 클릭하게 되면 각 스텝 컴포넌트에서는 `formState.errors.필드명`으로 에러 상태를 확인하고 `formState .errors.필드명.message`로 에러 메세지를 띄워줍니다.

  ```
  export const RegisterSchema = z.object({
    mbti: z.string().min(1, { message: ErrorMessages.mbti }),
    name: z.string().min(1, { message: ErrorMessages.name }),
    gender: z.string().min(1, { message: ErrorMessages.gender }),
    email: z.string().email(ErrorMessages.email),
    instagramId: z.string(),
    age: z.coerce
      .number()
      .min(20, { message: ErrorMessages.age })
      .max(100)
      .optional(),
    type: z.string().optional(),
    animal: z.string().min(1, { message: ErrorMessages.animal }),
    situation: z
      .array(
        z.object({
          scenario: z.number(),
          choice: z.number(),
        }),
      )
      .length(4),
  });
  ```

- 다음 버튼 구현

  한 페이지에서 통합적으로 다음 단계로 이동하는 버튼을 관리하며, 각 단계에서 필요한 필드의 유효성을 확인합니다. 이에, 각 스텝에서 검증해야하는 필드들을 가져온 뒤, `methods.trigger`로 각 필드의 valid 상태를 판단하였습니다.

  ```const handleNextStep = async () => {
    const currentStepFields = getStepFields();
    const valid = await methods.trigger(currentStepFields as []);
    if (valid && step < Steps.length - 1) {
      setStep(step + 1);
    }
  };
  ```

## 내 코드에서 부족한 부분

- 한 화면에 한 문항만 표시

  구현 제약사항이었던 “한 화면에는 한 문항만 보여야 합니다”를 준수하지 못했습니다. 기획 컨셉에 따른 질문 구성 특성 상 한 화면에 한 문항만 배치하는 것이 어렵다고 생각해 여러 질문을 한 화면에 두게 되었는데, 구현 제약사항을 과제 시작 전에 먼저 꼼꼼히 살펴보고 제약사항을 우선으로 하여 과제를 진행해야 했던 것 같습니다.

- 사용성 개선

  input의 placeholder 값 설정이나 각 입력 값에 대한 더 꼼꼼한 형식 처리를 하지 않아 사용성 측면에서 조금 떨어지는 부분이 있는 것 같습니다.

- `Step4` 최적화

  Step4에서 밸런스 게임 답변 선택 부분의 코드를 더 깔끔하고 최적화된 방식으로 수정하여 가독성을 향상시킬 필요가 있습니다. 현재는 답변을 선택하면 바로 form의 value 값에 바로 적용되도록 되어 있는데, 모든 답변을 선택 후 한번에 적용하는 방식으로 수정하는 것이 좋을 것 같고, onClick 함수 부분을 따로 분리하거나 좀 더 가독성 좋게 개선해야 할 것 같습니다.
