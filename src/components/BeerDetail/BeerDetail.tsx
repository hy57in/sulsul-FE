import styled from '@emotion/styled';
import React, { useState } from 'react';
import clipboard from 'clipboard-polyfill';

import { Beer } from '@/types/Beer';
import BeerImageMasking from '@/components/commons/BeerImageMasking';
import { LikeToggleButton, ShareButton } from '@/components/Header/extras';

type BeerDetailProp = {
  url: string;
  isCompact: boolean;
};
type BeerDetailProps = Omit<Beer, 'id' | 'content' | 'feel'> & BeerDetailProp;

const BeerDetail = (props: BeerDetailProps) => {
  const {
    country,
    type,
    name,
    nameEng,
    imageUrl,
    alcohol,
    price,
    volume,
    isLiked,
    url,
    isCompact,
    ...rest
  } = props;
  const [isBookMarked, setIsBookmarked] = useState(false);
  const beerInfo = [
    { title: '종류', content: type },
    { title: '원산지', content: country?.name },
    { title: '도수', content: `${alcohol}%` },
    { title: '용량', content: `${volume}ml` },
    { title: '가격', content: `${price}원` },
  ];

  return (
    <StyledBeerDetail isCompact={isCompact} {...rest}>
      {!isCompact ? (
        <TitleAndIconContainer>
          <BeerNameWrapper>
            <BeerName>{name}</BeerName>
            <BeerNameEng>{nameEng}</BeerNameEng>
          </BeerNameWrapper>
          <IconWrapper>
            <ShareButton
              onClick={async () => {
                await clipboard.writeText(url);
                alert(url);
              }}
            />
            <LikeToggleButton
              defaultIsLiking={true}
              onLike={async () => alert('좋아요')}
              onUnLike={async () => alert('좋아요 해제')}
            />
          </IconWrapper>
        </TitleAndIconContainer>
      ) : undefined}
      <InfoAndBeerImage>
        <InfoTableWrapper>
          {beerInfo.map(({ title, content }) => (
            <InfoTable key={title}>
              <Title>{title}</Title>
              <Content>{content}</Content>
            </InfoTable>
          ))}
        </InfoTableWrapper>
        <StyledBeerImageMasking width="70px">
          <BeerImage src={imageUrl} />
        </StyledBeerImageMasking>
      </InfoAndBeerImage>
    </StyledBeerDetail>
  );
};

export default BeerDetail;

const StyledBeerDetail = styled.div<{ isCompact: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: auto;
  min-height: ${(p) => (p.isCompact ? '11.87rem' : '17.48rem')};
  padding: 1.7rem;
  background-color: ${({ theme }) => theme.color.black80};
  border-radius: 0.9rem;
`;

const TitleAndIconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 70px;
  margin-bottom: 10px;
`;

const BeerNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const BeerName = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
  line-height: 26px;
  color: ${({ theme }) => theme.color.white};
  margin-bottom: 0.6rem;
`;

const BeerNameEng = styled.div`
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 17px;
  color: ${({ theme }) => theme.color.grey4};
`;

const IconWrapper = styled.div`
  display: flex;
  height: fit-content;
  gap: 10px;
`;

const InfoAndBeerImage = styled.div`
  display: flex;
  align-items: center;
`;

const InfoTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const InfoTable = styled.div`
  display: flex;
  min-width: 150px;
`;

const Title = styled.p`
  font-size: 1.1rem;
  line-height: 160%;
  font-weight: 400;
  color: ${({ theme }) => theme.color.white};
  width: 5rem;
`;

const Content = styled.p`
  font-size: 1.2rem;
  line-height: 160%;
  font-weight: 700;
  color: ${({ theme }) => theme.color.white};
`;

const BeerImage = styled.img`
  width: auto;
  height: 100%;
`;

// NOTE: 마스킹 참고 : https://www.w3schools.com/css/css3_masking.asp
const StyledBeerImageMasking = styled(BeerImageMasking)`
  margin-left: auto;
  margin-right: 1rem;
`;
