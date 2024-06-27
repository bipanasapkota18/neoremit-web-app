import { toastFail } from "@neoWeb/utility/Toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "./service-api";
import { NeoHttpClient } from "./service-axios";

export interface PromoCodeValidationRequest {
  code: string;
  amount: string;
  sendingCountryId: number | null;
  receivingCountryId: number | null;
  payoutMethodId: number | null;
}

export interface BeneficiaryvalidationRequest {
  payoutMethodId: number;
  payoutPartnerId: number;
  accountName: string;
  accountNumber: string;
}

export interface SenderValidationRequest {
  payoutMethodType: string;
  cardDetail: CardDetail;
  bankDetail: BankDetail;
}

export interface BankDetail {
  bankName: string;
  accountNumber: string;
  bankAccType: string;
}

export interface CardDetail {
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cardType: string;
}

export interface ConfirmPaymentRequest {
  beneficiaryName: string;
  beneficiaryBankName: string;
  beneficiaryId: number;
  beneficiaryAccountNumber: string;
  remarks: string;
  totalAmount: number;
  sendingAmount: number;
  receivingAmount: number;
  sendingCountryId: number;
  receivingCountryId: number;
  paymentPurpose: string;
  payoutMethodId: number;
  payoutPartnerId: number;
  processBy: string;
  mpin: number;
}
const validatePromoCode = (data: PromoCodeValidationRequest) => {
  return NeoHttpClient.post(api.send_money.promo_code_validate, data);
};

const useValidatePromoCode = () => {
  return useMutation({
    mutationFn: validatePromoCode,
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

const validateBeneficiary = (data: BeneficiaryvalidationRequest) => {
  return NeoHttpClient.post(api.send_money.beneficiary_validate, data);
};

const useValidateBeneficiary = () => {
  return useMutation({
    mutationFn: validateBeneficiary,
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

const validateSender = (data: SenderValidationRequest) => {
  return NeoHttpClient.post(api.send_money.validate_sender, data);
};

const useValidateSender = () => {
  return useMutation({
    mutationFn: validateSender,
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

const confirmPayment = (data: ConfirmPaymentRequest) => {
  return NeoHttpClient.post(api.send_money.confirm_payment, data);
};
const useConfirmPayment = () => {
  return useMutation({
    mutationFn: confirmPayment,
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

export {
  useConfirmPayment,
  useValidateBeneficiary,
  useValidatePromoCode,
  useValidateSender
};
