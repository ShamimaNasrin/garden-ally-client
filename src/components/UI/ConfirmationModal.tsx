type DeleteConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-zinc-900 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 w-[400px] rounded-md shadow-lg relative">
        <h2 className="text-xl font-bold text-black text-center mb-4">
          Confirm Deletion
        </h2>
        <p className="text-gray-700 text-center mb-6">
          Are you sure you want to delete this item?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
          >
            Confirm
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
