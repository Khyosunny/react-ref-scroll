import React from 'react';
import styled, { css } from 'styled-components';
import { dataType } from '../datas';

interface MenuGroupNavProps {
  data: dataType[];
  navbarContainerRef: React.MutableRefObject<HTMLDivElement | null>;
  addToNavbarItemRefs: (el: HTMLLIElement) => void;
  scrollToMenuGroupContainer: (index: number) => void;
  selectedNavIndex: number;
}

export default function MenuGroupNav({
  data,
  navbarContainerRef,
  addToNavbarItemRefs,
  scrollToMenuGroupContainer,
  selectedNavIndex,
}: MenuGroupNavProps): React.ReactElement {
  return (
    <NavContainer ref={navbarContainerRef}>
      <NavBar>
        {data?.map((menu, index) => (
          <NavItem
            key={menu.id}
            ref={addToNavbarItemRefs}
            onClick={() => scrollToMenuGroupContainer(index)}
            backgroundColor={selectedNavIndex === index}
          >
            {menu.menu_kind}
          </NavItem>
        ))}
      </NavBar>
    </NavContainer>
  );
}

type StyleProps = {
  backgroundColor?: boolean;
};

const NavContainer = styled.div<StyleProps>`
  width: 100%;
  overflow: auto;
  transition: all 500ms ease-in;
  position: sticky;
  top: 0;
  left: 0;
  background-color: white;
`;

const NavBar = styled.ul`
  width: max-content;
  padding: 10px 30px;
  display: flex;
  column-gap: 30px;
`;

const NavItem = styled.li<StyleProps>`
  overflow-x: scroll;
  width: max-content;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 30px;
  font-size: 18px;

  &:active {
    border: none;
    background-color: #c7c7c7;
  }

  ${(props) =>
    props.backgroundColor
      ? css`
          border: none;
          background-color: #eee;
        `
      : css`
          background-color: transparent;
          border: 2px solid #eee;
        `}
`;
