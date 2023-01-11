// import styled from "@emotion/styled";
import InfiniteScroll from "react-infinite-scroller";
import { IQuery } from "../../../commons/types/generated/types";

interface IInfiniteScroll01Props {
  data?: Pick<IQuery, "fetchProducts">;
  fetchMore?: any;
  children: JSX.Element;
}

export default function InfiniteScroll01(props: IInfiniteScroll01Props) {
  const onLoadMore = () => {
    if (props.data?.fetchProducts === undefined) return;
    console.log("fetchProducts 총 개수", props.data.fetchProducts.length);
    console.log("page:", Math.ceil(props.data.fetchProducts.length / 9) + 1);
    console.log("floor page:", Math.floor(props.data.fetchProducts.length / 9) + 1);
    props.fetchMore({
      variables: {
        page: Math.ceil(props.data.fetchProducts.length / 9) + 1,
      },
      updateQuery: (prev: Pick<IQuery, "fetchProducts">, { fetchMoreResult }: any) => {
        console.log("이전 페이지", prev, "새로운 페이지", fetchMoreResult.fetchProducts);
        if (!fetchMoreResult?.fetchProducts) {
          return {
            fetchProducts: [...prev.fetchProducts],
          };
        }
        return {
          fetchProducts: [...prev.fetchProducts, ...fetchMoreResult?.fetchProducts],
        };
      },
    });
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        overflow: "auto",
        paddingTop: "10px",
        justifyContent: "center",
      }}
    >
      <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true} useWindow={false}>
        {props.children}
      </InfiniteScroll>
    </div>
  );
}
