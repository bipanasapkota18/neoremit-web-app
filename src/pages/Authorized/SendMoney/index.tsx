import { useState } from "react";
import CardPayment from "./CardPayment/CardPayment";
import PaymentConfirmation from "./PaymentConfirmation";
import Invoice from "./PaymentConfirmation/Invoice";
import MpinConfirmation from "./PaymentConfirmation/MpinConfirmation";
import PaymentDetails from "./PaymentDetails";
import ReceipientAccount from "./ReceipientAccount";
import Recipient from "./Recipient";
import SendMoneyForm from "./SendMoney";

const SendMoney = () => {
  const [pageName, setPageName] = useState<string>("sendMoney");
  const [beneficiaryId, setBeneficiaryId] = useState<number>();
  const [beneficiaryAccountId, setBeneficiaryAccountId] = useState<number>();
  const [newTransfer, setNewTransfer] = useState<boolean>(false);

  const renderComponent = (name: string) => {
    switch (name) {
      case "sendMoney":
        return <SendMoneyForm setPageName={setPageName} />;

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
            beneficiaryId={beneficiaryId ?? 0}
            setBeneficiaryAccountId={setBeneficiaryAccountId}
          />
        );

      case "paymentDetails":
        return (
          <PaymentDetails
            setPageName={setPageName}
            beneficiaryId={beneficiaryId ?? 0}
            beneficiaryAccountId={beneficiaryAccountId ?? 0}
            newTransfer={newTransfer}
          />
        );

      case "cardPayment":
        return <CardPayment setPageName={setPageName} />;

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
  return <h1>{renderComponent(pageName)}</h1>;
};

export default SendMoney;
