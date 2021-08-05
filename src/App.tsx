import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';

import MenuGroupNav from './components/MenuGroupNav';
import MenuList from './components/MenuList';
import { datas, dataType } from './datas';

export default function App(): React.ReactElement {
  const [data] = useState<dataType[]>(datas);
  const [selectedNavIndex, setSelectedNavIndex] = useState(0);

  const navbarContainerRef = useRef<HTMLDivElement | null>(null);
  const navbarItemRef = useRef<HTMLLIElement[]>([]);
  const menuGroupContainerRef = useRef<HTMLDivElement[]>([]);

  const NAVBAR_HEIGHT = navbarContainerRef.current ? navbarContainerRef.current.getBoundingClientRect().height : 0;
  const NAVBAR_ITEM_WIDTH = navbarItemRef.current[selectedNavIndex]
    ? navbarItemRef.current[selectedNavIndex].getBoundingClientRect().width
    : 0;

  // ------------ 긱 메뉴그룹의 컨테이너 ref 배열 만들기 ------------
  const addToMenuGroupContainerRefs = useCallback((el: HTMLDivElement) => {
    if (el && !menuGroupContainerRef.current.includes(el)) {
      menuGroupContainerRef.current.push(el);
    }
  }, []);

  // ------------ 긱 Navbar의 아이템(버튼)의 ref 배열 만들기 ------------
  const addToNavbarItemRefs = useCallback((el: HTMLLIElement) => {
    if (el && !navbarItemRef.current.includes(el)) {
      navbarItemRef.current.push(el);
    }
  }, []);

  // ------------ 스크롤을 내리거나 올릴 때 Navbar 가로 스크롤 이동 ------------
  useEffect(() => {
    navbarContainerRef.current?.scrollTo({
      left: navbarItemRef.current[selectedNavIndex].offsetLeft - NAVBAR_ITEM_WIDTH - 20,
      behavior: 'smooth',
    });
  }, [selectedNavIndex, NAVBAR_ITEM_WIDTH]);

  // ------------ Navbar 아이템(버튼) 클릭시 해당 메뉴그룹이 Navbar 바로 아래로 이동 ------------
  const scrollToMenuGroupContainer = useCallback(
    (groupIndex: number) => {
      window.scrollTo({ behavior: 'smooth', top: menuGroupContainerRef.current[groupIndex].offsetTop - NAVBAR_HEIGHT });
    },
    [menuGroupContainerRef, NAVBAR_HEIGHT]
  );

  // ------------ IntersectionObserver ------------
  const observerOptions: IntersectionObserverInit = useMemo(
    () => ({
      root: null,
      rootMargin: `-${NAVBAR_HEIGHT}px 0px 0px 0px`,
      threshold: 0.05,
    }),
    [NAVBAR_HEIGHT]
  );

  const observerCallback: IntersectionObserverCallback = useCallback((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting && entry.intersectionRatio > 0) {
        // root에서 나가는 엘리먼트
        const index = menuGroupContainerRef.current.indexOf(entry.target as HTMLDivElement);

        if (entry.boundingClientRect.y <= 0 && entry.intersectionRatio <= 0.05) {
          setSelectedNavIndex(index + 1);
        }
      } else if (entry.isIntersecting && (entry.rootBounds?.height as number) / 2 > entry.boundingClientRect.top) {
        // root에 들어오는 엘리먼트이면서 root 엘리먼트의 절반보다 위에 있는 엘리먼트일 때
        const index = menuGroupContainerRef.current.indexOf(entry.target as HTMLDivElement);
        setSelectedNavIndex(index);
      }
    });
  }, []);

  useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver(observerCallback, observerOptions);
    menuGroupContainerRef.current.forEach((ref) => observer.observe(ref));
    return () => observer.disconnect();
  }, [observerCallback, observerOptions]);

  // ------------ 스크롤이 맨 위일 때 index 0 / 맨 아래일 경우 마지막 index ------------
  const scrollEvent = useCallback(() => {
    if (window.scrollY === 0) {
      setSelectedNavIndex(0);
    } else if (Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight) {
      setSelectedNavIndex(data.length - 1);
    }
  }, [data]);

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);
    return () => window.removeEventListener('scroll', scrollEvent);
  }, [scrollEvent]);

  return (
    <Container>
      <Intro>
        <StoreName>효선이네 곱창</StoreName>
        <p>최근리뷰 300 | 최근사장님댓글 280</p>
      </Intro>
      <MenuGroupNav
        data={data}
        navbarContainerRef={navbarContainerRef}
        addToNavbarItemRefs={addToNavbarItemRefs}
        scrollToMenuGroupContainer={scrollToMenuGroupContainer}
        selectedNavIndex={selectedNavIndex}
      />
      <MenuList data={data} addToMenuGroupContainerRefs={addToMenuGroupContainerRefs} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  max-width: 1024px;
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const Intro = styled.div`
  width: 100%;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const StoreName = styled.h1`
  margin-bottom: 10px;
`;
