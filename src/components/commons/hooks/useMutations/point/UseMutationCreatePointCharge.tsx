import { gql, useMutation } from "@apollo/client";
import { FETCH_LOGIN_USER } from "../../useQueries/user/UseQueryFetchLoginUser";

export const CREATE_POINT_CHARGE = gql`
  mutation createPointCharge($impUid: ID!, $amount: Int!) {
    createPointCharge(impUid: $impUid, amount: $amount) {
      id
      impUid
      amount
      user {
        id
        name
      }
    }
  }
`;

export const UseMutationCreatePointCharge = () => {
  const mutation = useMutation(CREATE_POINT_CHARGE, {
    refetchQueries: [{ query: FETCH_LOGIN_USER }],
  });

  return mutation;
};
