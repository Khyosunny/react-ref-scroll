import React from 'react';
import styled, { css } from 'styled-components';
import { selectedDataType } from '../datas';

interface MenuGroupNavProps {
  data: selectedDataType[];
  onMenuGroupSelected: (index: number) => void;
  navbarRef: React.MutableRefObject<HTMLDivElement | null>;
  selectedNavIndex: number;
}

export default function MenuGroupNav({
  data,
  onMenuGroupSelected,
  navbarRef,
  selectedNavIndex,
}: MenuGroupNavProps): React.ReactElement {
  return (
    <NavContainer ref={navbarRef}>
      <NavBar>
        {data?.map((data, index) => (
          <MenuGroup
            key={data.id}
            onClick={() => onMenuGroupSelected(index)}
            backgroundColor={selectedNavIndex === index}
          >
            {data.menu_kind}
          </MenuGroup>
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
  padding: 10px 20px;
  display: flex;
  column-gap: 30px;
`;

const MenuGroup = styled.li<StyleProps>`
  overflow: auto;
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
