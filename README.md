# 배포

[✨ not-woowacourse.te6.in/survey](https://not-woowacourse.te6.in/survey)

# 강조할 부분

metadata 객체 하나만 수정하면 모든 폼 구성이 동적으로 이루어질 수 있도록 하는 것을 중점으로 구현해 보았습니다.

직접 만든 [@te6/ui](https://www.npmjs.com/package/@te6/ui)의 인풋 컴포넌트들이 react-hook-form 사용을 전제하고 만들어졌기에 이번에는 있는 컴포넌트를 가져다 사용했습니다. 덕분에 다크 모드도 지원하고 디자인에는 거의 시간을 들이지 않을 수 있었습니다.

폼이라는 점에서 클라이언트 컴포넌트가 커버하는 범위가 클 수밖에 없지만, 그럼에도 최대한 서버에서 렌더링하는 컴포넌트의 수를 확보하고자 했습니다.

# 부족한 부분

Multiselect(체크박스 여러 개)나 field array같은 인풋은 `mode`를 `onChange`로, 나머지 일반 input은 `onBlur`로 설정하고 싶었는데 useForm의 파라미터에 하나로 묶여 있어서 아직은 직접 이벤트 리스너를 등록해서 원할 때마다 `trigger()`를 실행시키지 않는 이상 불가능한 것 같습니다.

따라서 일단은 `onChange`가 일어날 때마다 validate하도록 해 두었는데, 폼 안에서 이것저것 계산하는 코드가 존재해서 폼이 커지면 퍼포먼스에 악영향이 있을 것 같습니다. ㅠㅠ

백엔드 API와 `metadata.items`의 형태를 약간이나마 비슷하게 맞췄으면 개발하기 조금 더 수월했을 것 같다는 생각도 듭니다.

# 이해하는 데에 도움을 주는 내용

설문 제목, 질문 내용, 답변 형식(Zod 스키마)을 포함한 대부분의 내용이 하나의 객체(metadata)에서 관리됩니다. 이때 이 객체가 Zod 스키마 자체가 아니고, Zod 스키마를 `restrictions`에 담은 다양한 내용을 담은 object이기 때문에 @hookform/resolvers의 `zodResolver`가 알아들을 수 있는 형태로 변환해주는 과정이 필요했습니다.

또한 multiselect 종류의 문항의 경우 `restrictions`를 두는 대신 `options` 배열의 항목에서 `required`로 넘겨준 불리언 값을 `zodResolver`에 먹여주기 직전에 Zod 스키마를 생성합니다. (이것들이 딱히 직관적인 방법인지는 잘 모르겠습니다. form-provider.tsx 참고 부탁드립니다!)
