import React from 'react';
import styled from 'styled-components';
import { dataType } from '../datas';

interface MenuListProps {
  data: dataType[];
  addToMenuGroupContainerRefs: (el: HTMLDivElement) => void;
}

export default function MenuList({ data, addToMenuGroupContainerRefs }: MenuListProps): React.ReactElement {
  return (
    <>
      {data?.map((data) => {
        if (data.menu_kind === '대표 메뉴') {
          return (
            <MainMenuGroupContainer key={data.id} ref={addToMenuGroupContainerRefs}>
              <div>
                <MainMenuGroupTitle> - {data.menu_kind} - </MainMenuGroupTitle>
              </div>
              <Ul>
                {data.menu_group.map((menu) => (
                  <Li key={menu.id}>
                    <Row>
                      <Column>
                        <MenuName>{menu.menu_name}</MenuName>
                        <Price>{menu.price}원</Price>
                      </Column>
                      <GrayBox />
                    </Row>
                  </Li>
                ))}
              </Ul>
            </MainMenuGroupContainer>
          );
        }
        return (
          <MenuGroupContainer key={data.id} ref={addToMenuGroupContainerRefs}>
            <MenuGroupTitleBar>
              <h2>{data.menu_kind}</h2>
            </MenuGroupTitleBar>
            <Ul>
              {data.menu_group.map((menu) => (
                <Li key={menu.id}>
                  <Row>
                    <Column>
                      <MenuName>{menu.menu_name}</MenuName>
                      <Price>{menu.price}원</Price>
                    </Column>
                    <GrayBox />
                  </Row>
                </Li>
              ))}
            </Ul>
          </MenuGroupContainer>
        );
      })}
    </>
  );
}

const MainMenuGroupContainer = styled.div`
  width: 90%;
  margin-bottom: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #ede7e2;
  background-color: white;
`;

const MainMenuGroupTitle = styled.h2`
  margin: 20px;
`;

const MenuGroupContainer = styled.div`
  width: 100%;
`;

const MenuGroupTitleBar = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #eee;
`;

const Ul = styled.ul`
  width: 100%;
`;

const Li = styled.li`
  padding: 10px 20px;
  background-color: white;
  border-bottom: 1px solid #eee;

  &:last-child {
    border: none;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const MenuName = styled.h3`
  font-size: 20px;
`;

const Price = styled.p`
  font-size: 16px;
`;

const GrayBox = styled.div`
  width: 100px;
  height: 80px;
  background-color: lightgray;
`;
