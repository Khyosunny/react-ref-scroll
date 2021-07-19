import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';

import MenuGroupNav from './components/MenuGroupNav';
import MenuList from './components/MenuList';
import { datas, selectedDataType, dataType } from './datas';

export default function App(): React.ReactElement {
  const [data, setData] = useState<dataType[]>(datas);
  const [selectedNavIndex, setSelectedNavIndex] = useState(0);

  const navbarRef = useRef<HTMLDivElement | null>(null);
  const menuListDivRef = useRef<HTMLDivElement[]>([]);
  const NAVBAR_HEIGHT = navbarRef.current ? navbarRef.current.getBoundingClientRect().height : 0;

  const scrollToElement = useCallback(
    (groupIndex: number) => {
      window.scrollTo({ behavior: 'smooth', top: menuListDivRef.current[groupIndex].offsetTop - NAVBAR_HEIGHT });
    },
    [menuListDivRef, NAVBAR_HEIGHT]
  );

  const onMenuGroupSelected = useCallback(
    (groupIndex: number) => {
      const datas: selectedDataType[] = data.map((data, index) => ({ ...data, selected: index === groupIndex }));
      setData(datas);
      scrollToElement(groupIndex);
    },
    [scrollToElement, data]
  );

  const addToDivRefs = useCallback((el: HTMLDivElement) => {
    if (el && !menuListDivRef.current.includes(el)) {
      menuListDivRef.current.push(el);
    }
  }, []);

  const scrollEvent = useCallback(() => {
    if (window.scrollY === 0) {
      setSelectedNavIndex(0);
    } else if (Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight) {
      setSelectedNavIndex(data.length - 1);
    }
  }, [data]);

  const observerOptions = useMemo(
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
        const index = menuListDivRef.current.indexOf(entry.target as HTMLDivElement);
        if (entry.boundingClientRect.y < 0) {
          setSelectedNavIndex(index + 1);
        } else {
          setSelectedNavIndex(index - 1);
        }
      }
    });
  }, []);

  useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver(observerCallback, observerOptions);
    menuListDivRef.current.forEach((ref) => observer.observe(ref));
    return () => observer.disconnect();
  }, [observerCallback, observerOptions]);

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
        navbarRef={navbarRef}
        onMenuGroupSelected={onMenuGroupSelected}
        selectedNavIndex={selectedNavIndex}
      />
      <MenuList data={data} addToDivRefs={addToDivRefs} />
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
