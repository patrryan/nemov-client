import { gql, useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import {
  IMutation,
  IMutationToggleProductPickArgs,
} from "../../../../../commons/types/generated/types";
import { FETCH_IS_PICKED } from "../../useQueries/pick/UseQueryFetchIsPicked";
import { FETCH_PICK_COUNT_OF_PRODUCT } from "../../useQueries/pick/UseQueryFetchPickCountOfProduct";

// 찜하기 기능
export const TOGGLE_PRODUCT_PICK = gql`
  mutation toggleProductPick($productId: ID!) {
    toggleProductPick(productId: $productId)
  }
`;

export const UseMutationToggleProductPick = () => {
  const router = useRouter();
  const [toggleProductPick] = useMutation<
    Pick<IMutation, "toggleProductPick">,
    IMutationToggleProductPickArgs
  >(TOGGLE_PRODUCT_PICK, {
    refetchQueries: [
      { query: FETCH_PICK_COUNT_OF_PRODUCT, variables: { productId: router.query.productId } },
      { query: FETCH_IS_PICKED, variables: { productId: router.query.productId } },
    ],
  });

  const productPick = async (productId: string) => {
    try {
      return await toggleProductPick({
        variables: {
          productId,
        },
      });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      Modal.error({ content: "로그인이 필요한 서비스입니다." });
    }
  };

  return { toggleProductPick, productPick };
};
