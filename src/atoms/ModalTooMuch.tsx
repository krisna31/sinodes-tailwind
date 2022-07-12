import { Dispatch, SetStateAction } from "react"


const ModalTooMuch = (
  { showModalTooMuch, setShowModalTooMuch, maxCard }
    : {
      showModalTooMuch: boolean, setShowModalTooMuch: Dispatch<SetStateAction<boolean>>, maxCard: number
    }) => {
  return (
    <>{
      showModalTooMuch && <div className="container justify-center items-center  flex-1 min-w-full pt-5 flex">
        <div className="fixed bg-black w-screen h-screen top-0 bottom-0 right-0 left-0 slateTransparent flex justify-center items-center">
          <div className="w-full lg:w-1/3 mx-auto md:mx-0 flex justify-center items-center">
            <div className="bg-slate-50 p-10 flex flex-col w-1/2 shadow-xl rounded-xl dark:bg-slate-300">
              <h2 className="text-center font-bold text-gray-800  m-1">Your total note is <span className="text-red-700 font-bold mt-3">{maxCard}</span></h2>
              <h2 className="font-bold text-gray-800 text-center text-sm m-1 mb-4">please delete a few of it then you can add new note again or contact the developer</h2>
              <button type="submit" className="w-full py-4 bg-green-600 rounded-lg text-green-100"
                onClick={() => setShowModalTooMuch(false)}>
                <div className="flex flex-row items-center justify-center">
                  <div className="font-bold mr-2">Ok</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    }
    </>
  )
}

export default ModalTooMuch