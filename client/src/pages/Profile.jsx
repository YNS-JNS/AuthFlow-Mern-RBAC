
const Profile = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-1/2 my-9">
        <div className="bg-white overflow-hidden shadow rounded-lg border">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              User Profile
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Authenticated successful :D
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


// import React from 'react';

// const Profile = () => {
//   return (
//     <div className="flex justify-center w-full">
//       <div className="w-1/2 my-9">
//         <div className="bg-white overflow-hidden shadow rounded-lg border">
//           <div className="px-4 py-5 sm:px-6">
//             <h3 className="text-lg leading-6 font-medium text-gray-900">
//               User Profile
//             </h3>
//             <p className="mt-1 max-w-2xl text-sm text-gray-500">
//               This is some information about the user.
//             </p>
//           </div>
//           <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
//             <dl className="sm:divide-y sm:divide-gray-200">
//               <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                 <dt className="text-sm font-medium text-gray-500">
//                   Full name
//                 </dt>
//                 <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                   John Doe
//                 </dd>
//               </div>
//               <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                 <dt className="text-sm font-medium text-gray-500">
//                   Email address
//                 </dt>
//                 <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                   johndoe@example.com
//                 </dd>
//               </div>
//               <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                 <dt className="text-sm font-medium text-gray-500">
//                   Phone number
//                 </dt>
//                 <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                   (123) 456-7890
//                 </dd>
//               </div>
//               <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                 <dt className="text-sm font-medium text-gray-500">
//                   Address
//                 </dt>
//                 <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                   123 Main St<br />Anytown, USA 12345
//                 </dd>
//               </div>
//             </dl>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
