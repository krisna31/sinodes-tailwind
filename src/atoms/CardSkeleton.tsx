import React from 'react'

function CardSkeleton() {
  return (
    <>
      <div className="bg-slate-400 mx-auto w-1/2 md:w-2/5 p-3 rounded-lg text-center text-sm mb-3 border border-white-300 shadow-lg max-w-sm">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1 justify-center items-center flex flex-col">
            <div className="h-4 bg-slate-200 rounded-sm w-20"></div>
            <div className="h-2 bg-slate-200 rounded w-32"></div>
            <div className="h-2 bg-slate-200 rounded w-32"></div>
            <div className='flex flex-row gap-6'>
              <div className="h-4 bg-slate-200 rounded-lg w-8"></div>
              <div className="h-4 bg-slate-200 rounded-lg w-8"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardSkeleton