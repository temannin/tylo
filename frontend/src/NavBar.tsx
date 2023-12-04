import { useShallow } from "zustand/react/shallow";
import { useBoardStore } from "./utils/state";

export default function NavBar() {
  const { showCardDetails, setShowCardDetails, expand, setExpand } =
    useBoardStore(
      useShallow((state) => ({
        showCardDetails: state.showCardDetails,
        setShowCardDetails: state.setShowCardDetails,
        expand: state.expand,
        setExpand: state.setExpand,
      }))
    );

  const detailsStyling = showCardDetails ? "bg-gray-200" : "bg-transparent";
  const expandStyling = expand ? "bg-gray-200" : "bg-transparent";
  const defaultStyling = `float-right mr-2 mt-2 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center`;

  return (
    <>
      <div className="w-full h-12 pr-8">
        <div className="fixed w-full bg-white" style={{ right: 0 }}>
          <button
            onClick={() => {
              setShowCardDetails(!showCardDetails);
            }}
            type="button"
            className={`${detailsStyling} ${defaultStyling}`}
            data-modal-hide="defaultModal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <button
            onClick={() => {
              setExpand(!expand);
            }}
            type="button"
            className={`${expandStyling} ${defaultStyling}`}
            data-modal-hide="defaultModal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
