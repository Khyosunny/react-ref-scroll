# IntersectionObserver 을 사용한 scroll event

## 만들게 된 이유 :

- 자주 사용하고 있는 배달의 민족 앱에서 메뉴를 고르다가 y 스크롤이 움직임과 동시에 버튼이 액티브 되고, 메뉴 카테고리 버튼들의 x 스크롤도 이동이 되는 것이 신기해서 만들어보고 싶단 생각이 들었습니다.

## 처음에는..

scroll 이벤트리스너 함수 내부에서 반복문을 사용하며 각 엘리먼트 요소의 top 값, bottom 값 등을 찾아 만들어보려 했으나 스크롤이 실행될 때 마다 반복문이 실행되는 것은 성능에 문제를 일으킬 수 있어 새로 알게 된 IntersectionObserver를 사용해보기로 하였습니다.

IntersectonObserver 는 비동기적으로 실행되기 때문에 렌더링 성능에 부담을 덜어줍니다.
인피니티 스크롤이나 이미지 lazy loading 등에서도 많이 사용되는 것 같은데 해당 예제들도 기회가 되면 진행 해볼 예정입니다.

---

디자인은 별도로 진행하지 않고 비슷한 느낌이 나도록 바로 스타일드컴포넌트로 css작업 하였습니다.

![intersectionobserver-scroll-01](https://user-images.githubusercontent.com/71235165/128375085-c017f47e-121b-491a-97f2-9509d227a947.gif)

![intersectionobserver-scroll-02](https://user-images.githubusercontent.com/71235165/128375166-55c86e1a-08d4-47b4-a071-81cc74a0ea32.gif)
