import { useState } from "react";
import CardPaymentVAmerica from "./CardPayment/CardPaymentVAmerica";
import PaymentConfirmation from "./PaymentConfirmation";
import Invoice from "./PaymentConfirmation/Invoice";
import MpinConfirmation from "./PaymentConfirmation/MpinConfirmation";
import PaymentDetails from "./PaymentDetails";
import ReceipientAccount from "./ReceipientAccount";
import Recipient from "./Recipient";
import SendMoneyForm from "./SendMoney";
import VAmericaSendMoneyForm from "./VAmericaSendMoney";

const SendMoney = () => {
  const [pageName, setPageName] = useState<string>("sendMoney");
  const [beneficiaryId, setBeneficiaryId] = useState<string>();
  const [beneficiaryAccountId, setBeneficiaryAccountId] = useState<number>();
  const [newTransfer, setNewTransfer] = useState<boolean>(false);

  const renderComponent = (name: string) => {
    switch (name) {
      case "sendMoney":
        return <VAmericaSendMoneyForm setPageName={setPageName} />;

      case "selectRecipient":
        return (
          <Recipient
            setPageName={setPageName}
            setBeneficiaryId={setBeneficiaryId}
            setNewTransfer={setNewTransfer}
          />
        );

      case "recipientAccountDetails":
        return (
          <ReceipientAccount
            setPageName={setPageName}
            beneficiaryId={beneficiaryId ?? ""}
            setBeneficiaryAccountId={setBeneficiaryAccountId}
          />
        );

      case "paymentDetails":
        return (
          <PaymentDetails
            setPageName={setPageName}
            beneficiaryId={beneficiaryId ?? ""}
            beneficiaryAccountId={beneficiaryAccountId ?? 0}
            newTransfer={newTransfer}
          />
        );

      case "cardPayment":
        return <CardPaymentVAmerica setPageName={setPageName} />;

      case "paymentConfirmation":
        return <PaymentConfirmation setPageName={setPageName} />;

      case "mpinConfirmation":
        return <MpinConfirmation setPageName={setPageName} />;

      case "invoice":
        return <Invoice />;

      default:
        return <SendMoneyForm setPageName={setPageName} />;
    }
  };
  return <>{renderComponent(pageName)}</>;
};

export default SendMoney;
