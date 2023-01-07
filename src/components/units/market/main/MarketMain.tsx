import { GlobalWrapper } from "../../../../commons/styles/globalStyles";
import * as S from "./MarketMain.styles";
// import MarketCategory from "../category/MarketCategory";
import * as ID from "../categories/list/item-display/ItemDisplay";
import * as IDS from "../categories/list/item-display/ItemDisplay.styles";
import { CustomArrowProps } from "react-slick";
import MarketCategory from "../categories/category/MarketCategory";
import { UseQueryFetchCategories } from "../../../commons/hooks/useQueries/product/UseQueryFetchCategories";
import { UseQueryFetchLoginUser } from "../../../commons/hooks/useQueries/user/UseQueryFetchLoginUser";
import { UseQueryFetchProductsOfBestSelling } from "../../../commons/hooks/useQueries/product/UseQueryFetchProductsOfBestSelling";
import { UseQueryFetchProductsOfRecommend } from "../../../commons/hooks/useQueries/product/UseQueryFetchProductsOfRecommend";

const NextArrow = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => (
  <div {...props}>
    <IDS.NextArrowIcon />
  </div>
);

const PrevArrow = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => (
  <div {...props}>
    <IDS.PrevArrowIcon />
  </div>
);

export default function MarketMain() {
  const { data: bestItemData } = UseQueryFetchProductsOfBestSelling();
  const { data: recItemData } = UseQueryFetchProductsOfRecommend();

  console.log("추천상품", recItemData);

  // const curRecItemData = recItemData?.fetchProductsOfRecommend.filter((rec) => {
  //   if (!rec.isOutOfStock) {
  //     return rec;
  //   } else {
  //     return undefined;
  //   }
  // });

  // console.log("추천상품 중 매진 아닌것", curRecItemData);

  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "ease-in-out",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const { data: categoryData } = UseQueryFetchCategories();
  const { data: loginUserData } = UseQueryFetchLoginUser();

  return (
    <GlobalWrapper>
      <S.MarketMainContainer>
        <MarketCategory categoryData={categoryData}></MarketCategory>
        <S.MainItemsWrapper>
          <S.PageLine />
          <S.RecommendItemSection01>
            <S.MarketMainHeader01>
              <S.HeaderSpan>
                {!loginUserData ? `` : `${loginUserData.fetchLoginUser.name}님,`}
              </S.HeaderSpan>
              이런 상품은 어떠신가요?
              <S.HeaderDiv01>추천상품</S.HeaderDiv01>
            </S.MarketMainHeader01>
            <S.ItemsWrapper01>
              {recItemData?.fetchProductsOfRecommend.map((rec) => (
                <ID.ItemDisPlay02 key={rec.id} recData={rec} />
              ))}
              {/* <ID.ItemDisPlay02 key={rec.id} recData={rec} />; */}
            </S.ItemsWrapper01>
          </S.RecommendItemSection01>
          <S.MainMarketSection01>
            <S.MarketMainHeader02>
              네모비 회원이 선택한 상품
              <S.HeaderDiv02>베스트</S.HeaderDiv02>
            </S.MarketMainHeader02>
            <S.ItemsWrapper02>
              <IDS.StyledSlider02 {...settings}>
                {new Array(8).fill(1).map((_, index) => (
                  <ID.ItemDisPlay01 key={index}></ID.ItemDisPlay01>
                ))}
              </IDS.StyledSlider02>
            </S.ItemsWrapper02>
          </S.MainMarketSection01>
        </S.MainItemsWrapper>
      </S.MarketMainContainer>
    </GlobalWrapper>
  );
}
