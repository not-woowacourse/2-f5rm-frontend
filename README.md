# 구현과제 2. Surveey

> 이 과제는 [스모어](https://home.smore.im/template?type=form&c=survey)를 모티브로 제작되었습니다.

> 해당 구현과제의 문제는 [여기](https://github.com/not-woowacourse/2-surveey-frontend)에서 볼 수 있어요.

배포 링크 : https://not-woowacourse-surveey.yopark.dev

## 기술 스택

- Next.js v14
- TailwindCSS
- @shadcn/ui
- React Hook Form
- Zod
- Swagger-typescript-api
- 기타 자잘하게 사용한 스택
  - @tanstack/query
  - Recoil
  - Recoil-persist (설문 중 새로고침 시 정보 복구)

## 구현한 기능

_우리들은 모두 어린이였다_ 라는 컨셉을 바탕으로 한 설문조사

설문은 퍼널 형태로 진행됩니다.

1. `START`
2. `ENTER_AGE` (Q1) : 당신의 나이를 입력해주세요
3. `ENTER_GENDER` (Q2) : 당신의 성별을 입력해주세요
4. `ENTER_MBTI` (Q3) : 현재 당신의 MBTI를 입력해주세요
5. `ENTER_CHILDHOOD_DREAM` (Q4) : 당신의 어릴적 꿈은 무엇인가요?
6. `ENTER_MOST_IMPORTANT_VALUE` (Q5) : 지금 당신의 삶에서 가장 중요한 가치를 말해주세요
7. `ENTER_LIFE_SATISFACTION` (Q6) : 10년 뒤의 내가 봤을 때 지금 당신의 삶은 몇 점인가요?
8. `ENTER_EMAIL` (Q7) : 당신의 이메일을 입력해주세요 (선택)
9. `SUBMIT`

답변을 저장해두었다가 마지막에 하나의 폼으로 제출합니다.

```tsx
const SURVEY_FUNNEL_STEP = {
  START: 'start',
  ENTER_AGE: 'enter-age',
  ENTER_GENDER: 'enter-gender',
  ENTER_MBTI: 'enter-mbti',
  ENTER_CHILDHOOD_DREAM: 'enter-childhood-dream',
  ENTER_MOST_IMPORTANT_VALUE: 'enter-most-important-value',
  ENTER_LIFE_SATISFACTION: 'enter-life-satisfaction',
  ENTER_EMAIL: 'enter-email',
  SUBMIT: 'submit',
} as const;

const surveyFormSchema = z.object({
  age: z.coerce.number().int().positive().lte(OLDEST_PERSON_AGE),
  gender: z.enum(getValues(GENDER)),
  mbti: z.enum(getValues(MBTI)),
  childhoodDream: z.string().min(1),
  mostImportantValue: z.enum(getValues(MOST_IMPORTANT_VALUE)),
  lifeSatisfaction: z.coerce.number().int().gte(1).lte(10),
  email: z.string().email().optional(),
});
```

## 내 코드에서 강조할 부분

웹으로 퍼널을 구현하기 때문에 **유저가 뒤로가기(서비스 내에서 제공하는 버튼이 아닌 실제 뒤로가기)와 새로고침을 할 가능성**을 고려해야 한다고 판단하였습니다.

- **[뒤로가기에 안전]** 퍼널의 각 스텝을 단순 상태로 저장하지 않고 `?funnel-step=enter-age` 형태의 SearchParam으로 관리하여 뒤로가기 버튼 클릭 시 이전 스텝으로 이동할 수 있도록 제작하였습니다.
- **[새로고침에 안전]** Recoil-persist 라이브러리를 이용, 다음 스텝으로 넘어갈 때마다 현재 스텝의 답변 정보를 sessionStorage에 저장합니다. 퍼널 마운트 시점에 이미 보관된 formValues가 있다면 기본값으로 지정합니다.
- **[SearchParam 조작에 안전]** 상태와 달리 SearchParam의 경우 사용자가 직접 입력하여 스텝을 조작하는 일이 발생할 수 있습니다. 각 스텝 마운트 시점에 getFields를 통해 이전 스텝의 필수 답변 정보가 모두 들어있는지 확인하며, 조건 미충족 시 잘못된 스텝 접근으로 간주하여 처음부터 진행하도록 리다이렉트합니다. 제출 이후 뒤로가기를 통해 다시 제출 스텝으로 이동하려는 경우도 막아줍니다.

@toss/use-funnel 코드를 바탕으로 **useFunnel 훅을 직접 제작**하여 코드의 가독성을 높였습니다.

- SearchParam에 따라 targetStep을 정하는 로직을 Funnel 컴포넌트 안으로 집어넣어 관심사를 분리하였습니다.
- @toss/use-funnel은 `next/router`를 바탕으로 하는 Next.js v13 환경을 가정하고 작성되었기 때문에 `next/navigation`을 바탕으로 하는 Next.js v14 환경에서는 사용할 수 없습니다.

```tsx
const RootPage = () => {
  const { Funnel, setStep } = useFunnel({
    steps: getValues(SURVEY_FUNNEL_STEP),
    initialStep: SURVEY_FUNNEL_STEP.START,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Funnel>
          <Funnel.Step name={SURVEY_FUNNEL_STEP.START}>
            <StartStep onNext={() => setStep(SURVEY_FUNNEL_STEP.ENTER_AGE)} />
          </Funnel.Step>
          <Funnel.Step name={SURVEY_FUNNEL_STEP.ENTER_AGE}>
            <EnterAgeStep
              onNext={() => setStep(SURVEY_FUNNEL_STEP.ENTER_GENDER)}
            />
          </Funnel.Step>
          {/* 중략 */}
          <Funnel.Step name={SURVEY_FUNNEL_STEP.ENTER_EMAIL}>
            <EnterEmailStep onNext={() => setStep(SURVEY_FUNNEL_STEP.SUBMIT)} />
          </Funnel.Step>
          <Funnel.Step name={SURVEY_FUNNEL_STEP.SUBMIT}>
            <SubmitStep />
          </Funnel.Step>
        </Funnel>
      </form>
    </FormProvider>
  );
};
```

React Hook Form + shadcn/ui의 조합을 적극 활용하였습니다.

- 퍼널의 폼을 FormProvider로 넘깁니다. 전역 상태관리가 아닌 Context 기반이기 때문에 보다 안전하게 상태를 사용할 수 있습니다.
- register가 아닌 Controller 방식을 사용합니다.

```tsx
const EnterAgeStep = ({ onNext }: PropsWithOnNext) => {
  const { control, getFieldState, setFocus, getValues } = useFormContext();

  const { invalid } = getFieldState(SURVEY_FORM_NAME.AGE);

  return (
    <div>
      <div>
        <p>Q1</p>
        <h1>당신의 나이를 입력해주세요</h1>
      </div>
      <FormField
        control={control}
        name={SURVEY_FORM_NAME.AGE}
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel
              htmlFor={SURVEY_FORM_ID.AGE}
              className="text-sm text-white"
            >
              만 나이
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                inputMode="numeric"
                id={SURVEY_FORM_ID.AGE}
                min="1"
                max="122"
                placeholder="예) 23"
                className="text-black"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
```

Swagger-typescript-api를 사용하여 Axios 관련 코드 작성을 대폭 자동화하였습니다.

- Dto 타입 작성, axiosInstance, request 함수 작성 등을 자동화해줍니다.
- 스웨거가 잘 작성되어있다는 가정하에 매우 유용한 기능입니다.

## 내 코드에서 부족한 부분

Framer-motion을 깔아놓고 정작 사용하진 못했습니다. 스텝 이동간 애니메이션이 있으면 더 자연스러울 듯합니다.

Color Picker, Datetime Picker 등을 사용해보려 했는데 시간관계상 사용해보지 못했습니다. 입력 방식이 다양해지고 제약조건이 많아질수록 더 실무에 가까운 코드 관리를 경험할 수 있었을텐데 그 수준까지는 아니었던 것 같습니다.

렌더링 최적화에 대해서 별로 생각하지 못했습니다. React Devtools로 확인한 결과, 폼 입력 변경 시 전체 컴포넌트가 렌더링되었는데... 최적화할 여지가 많아보입니다.

이번에도 테스트 코드를 짜지 못했습니다.

## 간단 회고

저번 toodoo 구현할 때는 컴포넌트를 엄청 쪼개는 컨셉이었다면, 이번 구현은 _거인의 어깨 위에 올라서기_ 컨셉이라 할 수 있겠습니다.

시중에 있는 좋은 라이브러리란 라이브러리는 다 가져다 썼다는 이야기입니다. (React Hook Form, Zod, @shadcn/ui, useFunnel 등)

라이브러리를 가져다 쓰는게, 예시로 제공해주는 코드를 짤 때는 굉장히 코드의 안정성이 높아져서 장점으로 작용하는 동시에, **예시에 없는 요구사항의 코드를 작성해야 할 때 이게 정확한 사용법이 맞을지 굉장히 불안**해져서 단점이 되어버리는 듯합니다.

따라서 라이브러리를 사용할 때 밑단에서 어떤 기전으로 작동하는지 _대강이라도_ 이해를 하고 사용하는 자세가 필요하다고 생각했습니다.

```tsx
const useFunnel = <Steps extends NonEmptyArray<string>>({
  steps,
  initialStep,
}: UseFunnelParams<Steps>) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const Funnel = useMemo(
    () =>
      Object.assign(
        function (props: FunnelProps<Steps>) {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const searchParams = useSearchParams();

          const step =
            searchParams.get(SEARCH_PARAMS.FUNNEL_STEP) ?? initialStep;

          return <TargetFunnel<Steps> steps={steps} step={step} {...props} />;
        },
        {
          Step: FunnelStep,
        },
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  {
    /* 중략 */
  }

  return {
    Funnel,
    setStep,
  } as const;
};
```

@toss/use-funnel에 위와 비슷한 코드가 있었는데, 왜 useMemo로 굳이 컴포넌트를 감싸야 하는지 몰랐기에 처음에는 그냥 빼고 아래와 같이 옮겨왔었습니다.

```tsx
const useFunnel = <Steps extends NonEmptyArray<string>>({
  steps,
  initialStep,
}: UseFunnelParams<Steps>) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const Funnel = (props: FunnelProps<Steps>) => {
    const searchParams = useSearchParams();

    const step = searchParams.get(QUERY_KEY.FUNNEL_STEP) ?? initialStep;

    return <TargetFunnel<Steps> steps={steps} step={step} {...props} />;
  };

  {
    /* 중략 */
  }

  return {
    Funnel,
    setStep,
  } as const;
};
```

커스텀 훅 안에서 컴포넌트를 선언하는 것은 권장되지 않는 패턴이지만 steps, initialStep 인자를 활용하려면 어쩔 수 없었습니다.

하지만 이렇게 제작한 useFunnel을 도입하자 큰 문제가 발생하였습니다.

**한 글자 입력할 때마다 포커싱이 아웃되는 버그**였습니다.

긴 시간의 디버깅 끝에 결국 useMemo를 사용하여 문제를 해결하였으나, 처음 문제가 발생하였을 때에는 당황하였습니다.

1. Dynamic Loading 하고 있는 HookFormDevTool 문제일까 의심하였습니다.
2. input autoFocus를 사용하여 억지로 focus를 유지시키려 하였습니다. 하지만 퍼널로 분리되어있을 뿐 form 내에 autoFocus가 여러 개인 상황은 말이 안 되었습니다.
3. FormProvider의 상태관리 문제일 것이라 의심...
4. shadcn/ui의 Controller에 ref를 주입하여 focus를 주려고 함...

(기타 등등 별 짓 다함)

이게 라이브러리 내부 로직을 제대로 모르니까 버그가 발생하였을 때 그동안 애매하게 써왔던 부분 모두를 의심하는 사단이 난 겁니다. 물론 논리적으로 말이 안 되는 걸 알면서도요.

기존 퍼널 로직에선 잘 되었는데 useFunnel로 교체 시 문제가 발생한 상황. 그렇다면 당연히 useFunnel 내부 로직을 가장 심각하게 따져봤어야 하는 게 당연하잖아요..?

~~원래 코드에 버그가 있었는데 어떤 말도 안되는 이유로 정상 작동했다가 useFunnel 교체 시에 그 버그가 나왔다.. 는 가능성은 굉장히 희박하거든요.~~

_**쇠사슬의 강도는 가장 강한 고리가 결정하는 것이 아니라 가장 약한 고리가 전체 강도를 결정한다.**_
