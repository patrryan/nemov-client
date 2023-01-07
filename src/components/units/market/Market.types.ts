import { QueryResult } from "@apollo/client";
import { SetterOrUpdater } from "recoil";
import { IQuery, IQueryFetchProductArgs } from "../../../commons/types/generated/types";

export interface IMarketDetailProps {
  data: QueryResult<Pick<IQuery, "fetchProduct">, IQueryFetchProductArgs>;
  questionsData?: Pick<IQuery, "fetchQuestionsByProduct"> | undefined;
}

export interface IMarketDetailHeadStylesProps {
  image: string;
  // content: string;
}

// export interface IProductAskStylesProps {
//   isAnswer: string;
//   isAnswerOpen: boolean;
// }

export interface IProductOrderData {
  productId: string;
  amount: number;
  quantity: number;
}

export interface IProductAskProps {
  setIsOpen: SetterOrUpdater<boolean>;
  data?: QueryResult<Pick<IQuery, "fetchProduct">, IQueryFetchProductArgs>;
  questionsData?: Pick<IQuery, "fetchQuestionsByProduct"> | undefined;
}
