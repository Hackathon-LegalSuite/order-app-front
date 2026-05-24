type ModalDeleteProductProps = {
  name: string
  onConfirm: () => void
  onCancel: () => void
}

const ModalDeleteProduct = ({ name, onConfirm, onCancel }: ModalDeleteProductProps) => {
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onCancel} />
      <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
        <div className="bg-card rounded-3xl p-6 w-full max-w-sm flex flex-col gap-4">
          <h3 className="font-bold text-lg text-center">¿Cancelar el plato?</h3>
          <p className="text-secondary text-sm text-center">
            ¿Seguro que deseas Cancelar <span className="font-semibold text-one">{name}</span> de tu pedido?
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 rounded-xl bg-secondary/20 text-primary font-semibold text-sm"
            >
              No, mantener
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 py-3 rounded-xl bg-danger text-white font-semibold text-sm"
            >
              Sí, Cancelar plato
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalDeleteProduct
