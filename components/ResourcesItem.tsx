// import React from 'react'

// type Props = {}

// const COLLEGE_LIST: { college: string; courses: string[] }[] = [
//   {
//     college: 'DTU',
//     courses: ['AC102', 'AC103', 'AC104', 'EE101', 'EE102', 'EE103'],
//   },
//   {
//     college: 'NSUT',
//     courses: ['AC102', 'AC103', 'AC104', 'EE101', 'EE102', 'EE103'],
//   },
//   {
//     college: 'IGDTUW',
//     courses: ['AC102', 'AC103', 'AC104', 'EE101', 'EE102', 'EE103'],
//   },
//   {
//     college: 'IIIT',
//     courses: ['AC102', 'AC103', 'AC104', 'EE101', 'EE102', 'EE103'],
//   },
// ]

// const ResourcesItem: React.FC<{ setFiles: (pr) => {} }> = ({ setFiles }) => {
//   const collegeChangeHandler = (college: string, index: number) => {
//     setFiles((prev) => {
//       return [
//         ...prev.slice(0, index),
//         { ...prev[index], college },
//         ...prev.slice(index + 1),
//       ]
//     })
//   }

//   return (
//     <div>
//       <select
//         className='text-black'
//         onClick={(e: any) => {
//           collegeChangeHandler(e.target?.value, idx)
//         }}
//       >
//         {COLLEGE_LIST.map((college) => {
//           return (
//             <option key={college.college} value={college.college}>
//               {college.college}
//             </option>
//           )
//         })}
//       </select>
//       <select
//         className='text-black'
//         onClick={(e: any) => {
//           collegeChangeHandler(e.target?.value, idx)
//         }}
//       >
//         {COLLEGE_LIST.map((college) => {
//           return (
//             <option key={college.college} value={college.college}>
//               {college.college}
//             </option>
//           )
//         })}
//       </select>
//     </div>
//   )
// }

// export default ResourcesItem
