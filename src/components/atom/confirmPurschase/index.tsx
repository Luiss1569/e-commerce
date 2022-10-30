import React, { memo, useCallback, useEffect } from "react";
import Cart from "@/interfaces/cart";
import { useDispatch, useSelector } from "react-redux";
import { confirmPurchase, resetCart } from "../../../store/cart/actions";
import { rootState } from "../../../store/reducers";
import toastr from "toastr";

const Item = ({ label, value }: { label: string; value: string | number }) => {
  return (
    <div className="flex gap-5 justify-start items-center">
      <h5 className="text-base text-indigo-700">{label}:</h5>
      <h6 className="text-base font-bold break-words">{value}</h6>
    </div>
  );
};

const ConfirmPurchaseComponent: React.FC = () => {
  const cart: Cart = useSelector((state: rootState) => state.cart);

  const {
    payment,
    address,
    totalSales,
    totalItems,
    status: { post: status },
  } = cart;

  if (!payment || !address) return <div></div>;

  const dispatch = useDispatch();

  const handleConfirmPurchase = () => {
    toastr.clear();
    dispatch(confirmPurchase(cart));
  };

  const PaymentItem = useCallback(
    () => (
      <div className="flex flex-col">
        <Item label="Nome" value={payment.name} />
        <Item label="CPF" value={payment.cpf} />
        <Item label="Número do cartão" value={payment.cardNumber} />
        <Item label="Validade" value={payment.validity} />
        <Item label="Código de segurança" value={payment.securityCode} />
      </div>
    ),
    [payment],
  );

  const AddressItem = useCallback(
    () => (
      <div className="flex flex-col">
        <Item label="Rua" value={address.street} />
        <Item label="Bairro" value={address.neighborhood} />
        <Item label="Cidade" value={address.city} />
        <Item label="Complemento" value={address.complement} />
      </div>
    ),
    [address],
  );

  const TotalSalesItem = useCallback(
    () => (
      <div className="flex flex-col">
        <Item label="Total de itens" value={totalItems} />
        <Item
          label="Total da compra"
          value={`R$ ${parseFloat(totalSales.toString()).toFixed(2)}`}
        />
      </div>
    ),
    [totalItems, totalSales],
  );

  useEffect(() => {
    if (status.success) {
      toastr.success("Compra realizada com sucesso!");
      dispatch(resetCart());
    }

    if (status.error) {
      toastr.error("Ocorreu um erro ao realizar a compra!");
    }

    if (status.loading) {
      toastr.info("Realizando compra...");
    }
  }, [status]);

  return (
    <>
      <h2 className="text-2xl font-bold text-indigo-500">Confirmar Compra</h2>
      <div className="p-2 flex flex-col gap-5 mt-5">
        <div className="flex flex-col gap-2 divide-y">
          <h3 className="text-xl font-bold text-indigo-500">
            Forma de Pagamento
          </h3>
          <PaymentItem />
        </div>
        <div className="flex flex-col gap-2 divide-y">
          <h3 className="text-xl font-bold text-indigo-500">
            Endereço de Entrega
          </h3>
          <AddressItem />
        </div>
        <div className="flex flex-col gap-2 divide-y">
          <h3 className="text-xl font-bold text-indigo-500">
            Resumo da Compra
          </h3>
          <TotalSalesItem />
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="bg-indigo-500 text-lg text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-indigo-700 disabled:opacity-50"
            onClick={handleConfirmPurchase}
            disabled={status.loading}
          >
            Confirmar Compra
          </button>
        </div>
      </div>
    </>
  );
};

export default memo(ConfirmPurchaseComponent);
