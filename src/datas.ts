export interface menuGroupType {
  id: number;
  menu_name: string;
  price: string;
}

export interface dataType {
  [key: string]: string | number | boolean | undefined | menuGroupType[];
  id: number;
  menu_kind: string;
  menu_group: menuGroupType[];
}

export const datas: dataType[] = [
  {
    id: 0,
    menu_kind: '대표 메뉴',
    menu_group: [
      {
        id: 100,
        menu_name: '야채 곱창 세트',
        price: '23,000',
      },
      {
        id: 101,
        menu_name: '순대 곱창 세트',
        price: '23,000',
      },
    ],
  },
  {
    id: 1,
    menu_kind: '기본 메뉴',
    menu_group: [
      {
        id: 200,
        menu_name: '야채 곱창',
        price: '18,000',
      },
      {
        id: 201,
        menu_name: '순대 곱창',
        price: '18,000',
      },
      {
        id: 202,
        menu_name: '막창',
        price: '19,000',
      },
    ],
  },
  {
    id: 2,
    menu_kind: '사이드 메뉴',
    menu_group: [
      {
        id: 300,
        menu_name: '셀프 날치알 주먹밥',
        price: '3,000',
      },
      {
        id: 301,
        menu_name: '계란찜',
        price: '3,000',
      },
      {
        id: 302,
        menu_name: '냉면',
        price: '4,000',
      },
      {
        id: 303,
        menu_name: '물만두',
        price: '6,000',
      },
    ],
  },
  {
    id: 3,
    menu_kind: '추가사리',
    menu_group: [
      {
        id: 400,
        menu_name: '곱창 추가',
        price: '4,000',
      },
      {
        id: 401,
        menu_name: '순대 추가',
        price: '2,000',
      },
      {
        id: 402,
        menu_name: '당면 추가',
        price: '2,000',
      },
      {
        id: 403,
        menu_name: '떡 추가',
        price: '2,000',
      },
      {
        id: 404,
        menu_name: '치즈 추가',
        price: '3,000',
      },
    ],
  },
  {
    id: 4,
    menu_kind: '음료',
    menu_group: [
      {
        id: 500,
        menu_name: '콜라',
        price: '2,000',
      },
      {
        id: 501,
        menu_name: '사이다',
        price: '2,000',
      },
      {
        id: 502,
        menu_name: '웰치스',
        price: '2,000',
      },
      {
        id: 503,
        menu_name: '쿨피스',
        price: '1,500',
      },
    ],
  },
];
